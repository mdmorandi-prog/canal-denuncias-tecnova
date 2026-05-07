import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendNewMessageNotification } from '@/lib/email'

export const runtime = 'nodejs'

// POST - Enviar nova mensagem (Público - Denunciante)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { protocol, message } = body

        if (!protocol || typeof protocol !== 'string') {
            return NextResponse.json({ error: 'Protocolo inválido' }, { status: 400 })
        }

        if (!message && message !== '') {
            return NextResponse.json({ error: 'Mensagem inválida' }, { status: 400 })
        }

        // Verify complaint exists
        const complaint = await prisma.complaint.findUnique({
            where: { protocol }
        })

        if (!complaint) {
            return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })
        }

        // Force sender as 'denunciante'
        const sender = 'denunciante'

        // Create Message
        const newMessage = await prisma.complaintMessage.create({
            data: {
                complaintId: complaint.id,
                sender,
                message,
                isRead: false
            }
        })

        // Update Complaint updated_at
        await prisma.complaint.update({
            where: { id: complaint.id },
            data: { updatedAt: new Date() }
        })

        // Send Email Notification to Committee
        try {
            await sendNewMessageNotification(complaint, newMessage)
        } catch (emailError) {
            console.error('Failed to send email notification:', emailError)
        }

        return NextResponse.json(newMessage)

    } catch (error) {
        console.error('Error sending message (public):', error)
        return NextResponse.json(
            { error: 'Erro ao enviar mensagem' },
            { status: 500 }
        )
    }
}
