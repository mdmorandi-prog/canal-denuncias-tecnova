import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export const runtime = 'nodejs'

// GET - List all actions for a complaint
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { protocol } = await params

    const complaint = await prisma.complaint.findUnique({
        where: { protocol },
        select: { id: true }
    })

    if (!complaint) return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })

    const actions = await prisma.complaintAction.findMany({
        where: { complaintId: complaint.id },
        orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(actions)
}

// POST - Add a new action to the investigation diary
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

    const { protocol } = await params

    const body = await request.json()
    const { authorName, actionType, description } = body

    if (!authorName?.trim() || !actionType || !description?.trim()) {
        return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 })
    }

    const complaint = await prisma.complaint.findUnique({
        where: { protocol },
        select: { id: true }
    })

    if (!complaint) return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })

    const action = await prisma.complaintAction.create({
        data: {
            complaintId: complaint.id,
            authorName: authorName.trim(),
            actionType,
            description: description.trim(),
        }
    })

    return NextResponse.json(action, { status: 201 })
}
