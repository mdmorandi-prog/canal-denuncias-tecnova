import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { sendNewMessageNotification } from '@/lib/email'

export const runtime = 'nodejs'

// GET - Listar mensagens de uma denúncia
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    const { protocol } = await params

    // Auth check: Is it the committee or public with protocol?
    // Since protocol is secret/hard-to-guess, possession of protocol implies authorization for that specific complaint (for the whistleblower).
    // Committee members should be authenticated.

    // Ideally, for Committee, we might want to check session, but checking protocol existence is key.
    // If it's a committee member accessing via dashboard, they have the protocol too.

    try {
        const messages = await prisma.complaintMessage.findMany({
            where: {
                complaint: {
                    protocol: protocol
                }
            },
            include: {
                attachments: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return NextResponse.json(messages)
    } catch (error) {
        console.error('Error fetching messages:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar mensagens' },
            { status: 500 }
        )
    }
}

// POST - Enviar nova mensagem
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    const { protocol } = await params
    const session = await auth()

    try {
        const body = await request.json()
        const { message } = body

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Mensagem inválida' }, { status: 400 })
        }

        if (!session) {
            return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
        }

        // Force sender as 'comite' for this protected route
        const sender = 'comite'

        // Verify complaint exists
        const complaint = await prisma.complaint.findUnique({
            where: { protocol }
        })

        if (!complaint) {
            return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })
        }

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

        // Send Email Notification (Async, don't block)
        // If sender is 'denunciante', notify committee.
        // If sender is 'comite', notify whistleblower (if they provided email/wants response - Logic to be refined in email service).
        try {
            await sendNewMessageNotification(complaint, newMessage)
        } catch (emailError) {
            console.error('Failed to send email notification:', emailError)
        }

        return NextResponse.json(newMessage)

    } catch (error) {
        console.error('Error sending message:', error)
        return NextResponse.json(
            { error: 'Erro ao enviar mensagem' },
            { status: 500 }
        )
    }
}
