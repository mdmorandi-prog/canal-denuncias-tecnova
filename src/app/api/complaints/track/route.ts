import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const protocol = searchParams.get('protocol')

    if (!protocol) {
        return NextResponse.json({ error: 'Protocolo obrigatório' }, { status: 400 })
    }

    try {
        const complaint = await prisma.complaint.findUnique({
            where: { protocol },
            select: {
                protocol: true,
                type: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                messages: {
                    select: {
                        id: true,
                        sender: true,
                        message: true,
                        createdAt: true,
                        isRead: true,
                        attachments: true,
                    },
                    orderBy: { createdAt: 'asc' }
                },
                actions: {
                    select: {
                        id: true,
                        description: true,
                        createdAt: true,
                        actionType: true,
                        attachments: true,
                    },
                    orderBy: { createdAt: 'asc' }
                }
            }
        })

        if (!complaint) {
            return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })
        }

        return NextResponse.json(complaint)
    } catch (error) {
        console.error('Error tracking complaint:', error)
        return NextResponse.json({ error: 'Erro ao buscar denúncia' }, { status: 500 })
    }
}
