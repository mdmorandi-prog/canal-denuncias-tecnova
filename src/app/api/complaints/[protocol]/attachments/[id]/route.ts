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
        // Fetch from Vercel Blob
        // Note: For private blobs, the token is mandatory. For public ones, it's optional.
        const blobHeaders: Record<string, string> = {}
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            blobHeaders['Authorization'] = `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`
        }

        const response = await fetch(attachment.filepath, {
            headers: blobHeaders
        })

        if (!response.ok) {
            console.error(`Blob fetch failed for ${attachment.filename}: ${response.status} ${response.statusText}`)
            // If failed with token, try without (maybe it's public)
            if (blobHeaders['Authorization']) {
                const retryResponse = await fetch(attachment.filepath)
                if (retryResponse.ok) {
                    return serveBlob(retryResponse, attachment)
                }
            }
            throw new Error(`Failed to fetch from Blob: ${response.statusText}`)
        }

        return serveBlob(response, attachment)

    } catch (error) {
        console.error('Error downloading file:', error)
        return NextResponse.json(
            { error: 'Erro ao fazer download do arquivo' },
            { status: 500 }
        )
    }
}

function serveBlob(response: Response, attachment: any) {
    const headers = new Headers()
    headers.set('Content-Type', attachment.mimetype || 'application/octet-stream')
    // RFC 5987 compliant filename encoding
    const encodedFilename = encodeURIComponent(attachment.filename).replace(/['()]/g, escape).replace(/\*/g, '%2A')
    headers.set('Content-Disposition', `attachment; filename="${attachment.filename}"; filename*=UTF-8''${encodedFilename}`)
    
    if (attachment.size > 0) {
        headers.set('Content-Length', attachment.size.toString())
    }

    return new NextResponse(response.body, {
        status: 200,
        headers
    })
}
