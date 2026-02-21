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
                occurrenceDate: occurrenceDateStr ? new Date(occurrenceDateStr) : null,
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

        // --- PHASE 4: BACKGROUND AI SENTIMENT ANALYSIS ---
        // Fire and forget: We don't await this so the user gets their protocol immediately
        analyzeComplaintData(description).then(async (insights: ComplaintInsights | null) => {
            if (insights) {
                try {
                    await prisma.complaintAnalysis.create({
                        data: {
                            complaintId: complaint.id,
                            sentiment: insights.sentiment,
                            urgency: insights.urgency,
                            summary: insights.summary,
                            keyEntities: insights.keyEntities
                        }
                    })
                    console.log(`✅ AI Analysis saved for complaint ${complaint.id}`)
                } catch (dbError) {
                    console.error('❌ Failed to save AI analysis to database:', dbError)
                }
            }
        }).catch((aiError: any) => {
            console.error('❌ AI Analysis background task failed:', aiError)
        });
        // -------------------------------------------------

        return NextResponse.json({
            success: true,
            protocol: complaint.protocol,
            message: 'Denúncia registrada com sucesso',
        })
    } catch (error) {
        console.error('Error creating complaint:', error)
        return NextResponse.json(
            { error: 'Erro ao registrar denúncia' },
            { status: 500 }
        )
    }
}



// Determinar prioridade baseado no tipo
function determinePriority(type: string): string {
    const highPriority = ['assedio_sexual', 'seguranca_paciente']
    const mediumPriority = ['assedio_moral', 'corrupcao']

    if (highPriority.includes(type)) return 'alta'
    if (mediumPriority.includes(type)) return 'normal'
    return 'baixa'
}
