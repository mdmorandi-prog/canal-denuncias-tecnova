import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

// POST - Enviar mensagem
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    try {
        const { protocol } = await params
        const body = await request.json()
        const { message, sender = 'denunciante' } = body

        if (!message) {
            return NextResponse.json(
                { error: 'Mensagem é obrigatória' },
                { status: 400 }
            )
        }

        // Buscar denúncia
        const complaint = await prisma.complaint.findUnique({
            where: { protocol },
        })

        if (!complaint) {
            return NextResponse.json(
                { error: 'Denúncia não encontrada' },
                { status: 404 }
            )
        }

        // Criar mensagem
        const newMessage = await prisma.complaintMessage.create({
            data: {
                complaintId: complaint.id,
                sender,
                message,
            },
        })

        // Log de auditoria
        await prisma.auditLog.create({
            data: {
                action: 'mensagem_enviada',
                entityType: 'message',
                entityId: newMessage.id,
                details: JSON.stringify({ protocol, sender }),
            },
        })

        return NextResponse.json({
            success: true,
            message: 'Mensagem enviada com sucesso',
        })
    } catch (error) {
        console.error('Error sending message:', error)
        return NextResponse.json(
            { error: 'Erro ao enviar mensagem' },
            { status: 500 }
        )
    }
}

// GET - Listar mensagens
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
                    orderBy: { createdAt: 'asc' },
                },
            },
        })

        if (!complaint) {
            return NextResponse.json(
                { error: 'Denúncia não encontrada' },
                { status: 404 }
            )
        }

        return NextResponse.json(complaint.messages)
    } catch (error) {
        console.error('Error fetching messages:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar mensagens' },
            { status: 500 }
        )
    }
}
