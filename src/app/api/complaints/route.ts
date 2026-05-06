import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateProtocol } from '@/lib/crypto'
import { sendNewComplaintNotification } from '@/lib/email'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomBytes } from 'crypto'
import { auth } from '@/auth'
import { analyzeComplaintData, ComplaintInsights } from '@/lib/nexus'

export const runtime = 'nodejs'

// GET - Listar denúncias (Protegido)
export async function GET(request: NextRequest) {
    const session = await auth()

    if (!session) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    try {
        const complaints = await prisma.complaint.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { messages: true, attachments: true }
                }
            }
        })

        return NextResponse.json(complaints)
    } catch (error) {
        console.error('Error fetching complaints:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar denúncias' },
            { status: 500 }
        )
    }
}

// POST - Criar nova denúncia
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()

        // Extract fields
        const type = formData.get('type') as string
        const unit = formData.get('unit') as string | null
        const sector = formData.get('sector') as string | null
        const shift = formData.get('shift') as string | null
        const occurrenceDateStr = formData.get('occurrenceDate') as string | null
        const accusedName = formData.get('accusedName') as string | null
        const accusedPosition = formData.get('accusedPosition') as string | null
        const description = formData.get('description') as string
        const witnesses = formData.get('witnesses') as string | null
        const isAnonymousStr = formData.get('isAnonymous') as string
        const reporterName = formData.get('reporterName') as string | null
        const reporterEmail = formData.get('reporterEmail') as string | null
        const reporterPhone = formData.get('reporterPhone') as string | null
        const wantsResponseStr = formData.get('wantsResponse') as string | null

        const isAnonymous = isAnonymousStr === 'true'
        const wantsResponse = wantsResponseStr === 'true'

        if (!type || !description) {
            return NextResponse.json(
                { error: 'Tipo e descrição são obrigatórios' },
                { status: 400 }
            )
        }

        // Handle File Uploads
        const files = formData.getAll('files') as File[]
        const savedAttachments = []

        if (files.length > 0) {
            const uploadDir = join(process.cwd(), 'storage', 'uploads')
            await mkdir(uploadDir, { recursive: true })

            for (const file of files) {
                if (file.size > 10 * 1024 * 1024) continue // Skip > 10MB

                const bytes = await file.arrayBuffer()
                const buffer = Buffer.from(bytes)

                // Secure filename
                const hash = randomBytes(16).toString('hex')
                const ext = file.name.split('.').pop()
                const filename = `${hash}.${ext}`
                const filepath = join(uploadDir, filename)

                await writeFile(filepath, buffer)

                savedAttachments.push({
                    filename: file.name,
                    filepath: filename, // Store relative filename for security
                    mimetype: file.type,
                    size: file.size
                })
            }
        }

        // Generate protocol
        const protocol = generateProtocol()

        // Create Complaint with transaction to ensure attachments are linked
        const complaint = await prisma.complaint.create({
            data: {
                protocol,
                type,
                unit,
                sector,
                shift,
                occurrenceDate: (occurrenceDateStr && !isNaN(Date.parse(occurrenceDateStr))) ? new Date(occurrenceDateStr) : null,
                accusedName,
                accusedPosition,
                description,
                witnesses,
                isAnonymous,
                reporterName: isAnonymous ? null : reporterName,
                reporterEmail: isAnonymous ? null : reporterEmail,
                reporterPhone: isAnonymous ? null : reporterPhone,
                wantsResponse,
                status: 'nova',
                priority: determinePriority(type),
                attachments: {
                    create: savedAttachments
                }
            },
        })

        // Log audit
        await prisma.auditLog.create({
            data: {
                action: 'criacao',
                entityType: 'complaint',
                entityId: complaint.id,
                details: JSON.stringify({ protocol, type, isAnonymous, filesCount: savedAttachments.length }),
            },
        })

        // Send notification
        try {
            await sendNewComplaintNotification(protocol, type, isAnonymous)
        } catch (emailError) {
            console.error('Failed to send email notification:', emailError)
            // Continue execution, do not fail the request
        }

        // --- PHASE 4: AI SENTIMENT ANALYSIS (AuditorIA v2) ---
        try {
            const insights = await analyzeComplaintData({
                description,
                type,
                sector: sector ?? undefined,
                accusedPosition: accusedPosition ?? undefined,
            });

            const dataToSave = insights || {
                sentiment: "Indisponível",
                urgency: "Normal",
                riskLevel: "Moderado",
                summary: "A IA não pôde processar este relato. Verifique se a chave de API (GEMINI_API_KEY) está configurada corretamente no servidor corporativo.",
                keyEntities: "[]",
                recommendedActions: "[]",
                legalFramework: "[]",
            };

            await prisma.complaintAnalysis.create({
                data: {
                    complaintId: complaint.id,
                    sentiment: dataToSave.sentiment,
                    urgency: dataToSave.urgency,
                    summary: dataToSave.summary,
                    keyEntities: dataToSave.keyEntities,
                    riskLevel: dataToSave.riskLevel,
                    recommendedActions: dataToSave.recommendedActions,
                    legalFramework: dataToSave.legalFramework,
                }
            });
            console.log(`✅ AI Analysis v2 saved for complaint ${complaint.id}`);
        } catch (aiError) {
            console.error('❌ AI Analysis task failed:', aiError);
            try {
                await prisma.complaintAnalysis.create({
                    data: {
                        complaintId: complaint.id,
                        sentiment: "Erro",
                        urgency: "Normal",
                        summary: "Falha intermitente na comunicação com o servidor Gemini.",
                        keyEntities: "[]",
                        riskLevel: "Moderado",
                        recommendedActions: "[]",
                        legalFramework: "[]",
                    }
                });
            } catch (fallbackError) {
                console.error('Failed to save fallback AI error', fallbackError);
            }
        }
        // -------------------------------------------------

        return NextResponse.json({
            success: true,
            protocol: complaint.protocol,
            message: 'Denúncia registrada com sucesso',
        })
    } catch (error) {
        console.error('Error creating complaint:', error)
        return NextResponse.json(
            { error: `Erro ao registrar denúncia: ${error instanceof Error ? error.message : 'Erro desconhecido'}` },
            { status: 500 }
        )
    }
}



// Determinar prioridade baseado no tipo
function determinePriority(type: string): string {
    const highPriority = ['assedio_sexual', 'seguranca_trabalho']
    const mediumPriority = ['assedio_moral', 'corrupcao']

    if (highPriority.includes(type)) return 'alta'
    if (mediumPriority.includes(type)) return 'normal'
    return 'baixa'
}
