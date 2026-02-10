import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

// GET - Buscar denúncia por protocolo (para acompanhamento)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const protocol = searchParams.get('protocol')

        if (!protocol) {
            return NextResponse.json(
                { error: 'Protocolo é obrigatório' },
                { status: 400 }
            )
        }

        const complaint = await prisma.complaint.findUnique({
            where: { protocol },
            select: {
                protocol: true,
                type: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                messages: {
                    orderBy: { createdAt: 'asc' },
                    select: {
                        id: true,
                        sender: true,
                        message: true,
                        createdAt: true,
                        isRead: true,
                    },
                },
            },
        })

        if (!complaint) {
            return NextResponse.json(
                { error: 'Denúncia não encontrada. Verifique o protocolo.' },
                { status: 404 }
            )
        }

        // Log de visualização
        await prisma.auditLog.create({
            data: {
                action: 'visualizacao_protocolo',
                entityType: 'complaint',
                entityId: complaint.protocol,
                details: JSON.stringify({ protocol }),
            },
        })

        return NextResponse.json(complaint)
    } catch (error) {
        console.error('Error tracking complaint:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar denúncia' },
            { status: 500 }
        )
    }
}
