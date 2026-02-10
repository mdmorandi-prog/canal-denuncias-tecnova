import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendStatusUpdateEmail } from '@/lib/email'

// GET - Buscar denúncia por protocolo
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    try {
        const { protocol } = await params

        const complaint = await prisma.complaint.findUnique({
            where: { protocol },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' }
                },
                attachments: true
            }
        })

        if (!complaint) {
            return NextResponse.json(
                { error: 'Denúncia não encontrada' },
                { status: 404 }
            )
        }

        return NextResponse.json(complaint)
    } catch (error) {
        console.error('Error fetching complaint:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar denúncia' },
            { status: 500 }
        )
    }
}

// PATCH - Atualizar status da denúncia
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    try {
        const { protocol } = await params
        const body = await request.json()
        const { status, priority } = body

        const complaint = await prisma.complaint.update({
            where: { protocol },
            data: {
                ...(status && { status }),
                ...(priority && { priority }),
                ...(status === 'arquivada' && { closedAt: new Date() })
            }
        })

        // Enviar notificação de mudança de status
        if (status && complaint.reporterEmail) {
            await sendStatusUpdateEmail(complaint.reporterEmail, protocol, status)
        }

        // Log de auditoria
        await prisma.auditLog.create({
            data: {
                action: 'alteracao_status',
                entityType: 'complaint',
                entityId: complaint.id,
                details: JSON.stringify({ newStatus: status, oldStatus: complaint.status })
            }
        })

        return NextResponse.json(complaint)
    } catch (error) {
        console.error('Error updating complaint:', error)
        return NextResponse.json(
            { error: 'Erro ao atualizar denúncia' },
            { status: 500 }
        )
    }
}
