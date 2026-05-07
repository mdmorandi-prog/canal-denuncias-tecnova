import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    const { protocol } = await params
    const session = await auth()

    // Auth validation: must have session (committee) OR be the whistleblower (knows protocol)
    // Both paths are implicitly allowed if they know the protocol, but we fetch the complaint first.
    const complaint = await prisma.complaint.findUnique({
        where: { protocol }
    })

    if (!complaint) {
        return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const messageId = formData.get('messageId') as string | null
        const actionId = formData.get('actionId') as string | null

        if (!file) {
            return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
        }

        // Optional: limit file size (e.g. 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'O arquivo deve ter no máximo 5MB' }, { status: 400 })
        }

        // Upload to Vercel Blob
        // Ensure messageId and actionId are null if they are empty strings
        const cleanMessageId = messageId && messageId.trim() !== '' ? messageId : null
        const cleanActionId = actionId && actionId.trim() !== '' ? actionId : null

        const blob = await put(file.name, file, {
            access: 'private',
            addRandomSuffix: true,
        })

        const attachment = await prisma.complaintAttachment.create({
            data: {
                complaintId: complaint.id,
                messageId: cleanMessageId,
                actionId: cleanActionId,
                filename: file.name,
                filepath: blob.url,
                mimetype: file.type,
                size: file.size,
            }
        })

        return NextResponse.json(attachment)

    } catch (error) {
        console.error('CRITICAL ERROR uploading attachment:', error)
        return NextResponse.json(
            { error: 'Erro ao processar anexo' },
            { status: 500 }
        )
    }
}
