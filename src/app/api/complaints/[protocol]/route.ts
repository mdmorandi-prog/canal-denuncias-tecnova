import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { sendStatusUpdateEmail } from '@/lib/email'

export const runtime = 'nodejs'

// GET - Obter detalhes da denúncia (Protegido para Comitê)
// Nota: O endpoint público de tracking é /api/complaints/track
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    const { protocol } = await params
    const session = await auth()

    if (!session) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    try {
        const complaint = await prisma.complaint.findUnique({
            where: { protocol },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                    include: { attachments: true }
                },
                attachments: true,
                aiAnalysis: true
            }
        })

        if (!complaint) {
            return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })
        }

        return NextResponse.json(complaint)
    } catch (error) {
        console.error('Error fetching complaint details:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar detalhes da denúncia' },
            { status: 500 }
        )
    }
}

// PATCH - Atualizar status/prioridade (Protegido para Comitê)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    const { protocol } = await params
    const session = await auth()

    if (!session) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { status, priority, assignedTo } = body

        // Verificar se denúncia existe
        const existingComplaint = await prisma.complaint.findUnique({
            where: { protocol }
        })

        if (!existingComplaint) {
            return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })
        }

        // Prepare update data
        const updateData: any = { updatedAt: new Date() }
        if (status) updateData.status = status
        if (priority) updateData.priority = priority
        if (assignedTo !== undefined) updateData.assignedTo = assignedTo

        if (status === 'arquivada' || status === 'procedente' || status === 'improcedente') {
            updateData.closedAt = new Date()
        }

        // Update
        const updatedComplaint = await prisma.complaint.update({
            where: { protocol },
            data: updateData
        })

        // Log audit
        await prisma.auditLog.create({
            data: {
                action: 'atualizacao',
                entityType: 'complaint',
                entityId: existingComplaint.id,
                userId: session.user?.email || 'unknown', // Using email as ID proxy for now
                details: JSON.stringify({ changes: body }),
            }
        })

        // Notify whistleblower if status changed and they have email/wantsResponse
        if (status && status !== existingComplaint.status) {
            if (existingComplaint.reporterEmail && existingComplaint.wantsResponse) {
                try {
                    await sendStatusUpdateEmail(
                        existingComplaint.reporterEmail,
                        existingComplaint.protocol,
                        status
                    )
                } catch (emailError) {
                    console.error('Failed to send status update email:', emailError)
                }
            }
        }

        return NextResponse.json(updatedComplaint)

    } catch (error) {
        console.error('Error updating complaint:', error)
        return NextResponse.json(
            { error: 'Erro ao atualizar denúncia' },
            { status: 500 }
        )
    }
}
