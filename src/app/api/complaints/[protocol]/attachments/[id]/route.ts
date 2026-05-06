import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export const runtime = 'nodejs'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string, id: string }> }
) {
    const { protocol, id } = await params
    const session = await auth()

    // Find complaint
    const complaint = await prisma.complaint.findUnique({
        where: { protocol }
    })

    if (!complaint) {
        return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })
    }

    // Find attachment
    const attachment = await prisma.complaintAttachment.findUnique({
        where: { id }
    })

    if (!attachment || attachment.complaintId !== complaint.id) {
        return NextResponse.json({ error: 'Anexo não encontrado' }, { status: 404 })
    }

    try {
        // Fetch from Vercel Blob using the Read/Write Token
        const response = await fetch(attachment.filepath, {
            headers: {
                Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch from Blob: ${response.statusText}`)
        }

        // Return the file stream with correct headers
        return new NextResponse(response.body, {
            status: 200,
            headers: {
                'Content-Type': attachment.mimetype,
                'Content-Disposition': `attachment; filename="${attachment.filename}"`,
                'Content-Length': attachment.size.toString(),
            }
        })

    } catch (error) {
        console.error('Error downloading file:', error)
        return NextResponse.json(
            { error: 'Erro ao fazer download do arquivo' },
            { status: 500 }
        )
    }
}
