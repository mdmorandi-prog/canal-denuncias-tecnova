import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateProtocol } from '@/lib/crypto'
import { sendNewComplaintNotification } from '@/lib/email'

export const runtime = 'nodejs'

// POST - Criar nova denúncia
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            type,
            unit,
            sector,
            shift,
            occurrenceDate,
            accusedName,
            accusedPosition,
            description,
            witnesses,
            isAnonymous,
            reporterName,
            reporterEmail,
            reporterPhone,
            wantsResponse,
        } = body

        if (!type || !description) {
            return NextResponse.json(
                { error: 'Tipo e descrição são obrigatórios' },
                { status: 400 }
            )
        }

        // Gerar protocolo único
        const protocol = generateProtocol()

        // Criar denúncia
        const complaint = await prisma.complaint.create({
            data: {
                protocol,
                type,
                unit: unit || null,
                sector: sector || null,
                shift: shift || null,
                occurrenceDate: occurrenceDate ? new Date(occurrenceDate) : null,
                accusedName: accusedName || null,
                accusedPosition: accusedPosition || null,
                description,
                witnesses: witnesses || null,
                isAnonymous: isAnonymous ?? true,
                reporterName: isAnonymous ? null : reporterName,
                reporterEmail: isAnonymous ? null : reporterEmail,
                reporterPhone: isAnonymous ? null : reporterPhone,
                wantsResponse: wantsResponse ?? false,
                status: 'nova',
                priority: determinePriority(type),
            },
        })

        // Log de auditoria
        await prisma.auditLog.create({
            data: {
                action: 'criacao',
                entityType: 'complaint',
                entityId: complaint.id,
                details: JSON.stringify({ protocol, type, isAnonymous }),
            },
        })

        // Enviar notificação por e-mail ao comitê
        await sendNewComplaintNotification(protocol, type, isAnonymous ?? true)

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

// GET - Listar denúncias (apenas para comitê)
export async function GET(request: NextRequest) {
    try {
        const complaints = await prisma.complaint.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: {
                        messages: true,
                        attachments: true,
                    },
                },
            },
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

// Determinar prioridade baseado no tipo
function determinePriority(type: string): string {
    const highPriority = ['assedio_sexual', 'seguranca_paciente']
    const mediumPriority = ['assedio_moral', 'corrupcao']

    if (highPriority.includes(type)) return 'alta'
    if (mediumPriority.includes(type)) return 'normal'
    return 'baixa'
}
