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

    // Find complaint (case-insensitive)
    const complaint = await prisma.complaint.findFirst({
        where: { 
            protocol: {
                equals: protocol,
                mode: 'insensitive'
            }
        }
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
        // If it's a public blob, we can just redirect to it for maximum reliability
        // Public blobs have .public.blob.vercel-storage.com in their URL
        if (attachment.filepath.includes('.public.blob.')) {
            return NextResponse.redirect(attachment.filepath)
        }

        // For private blobs, we still need to proxy
        const blobHeaders: Record<string, string> = {}
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            blobHeaders['Authorization'] = `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`
        }

        const response = await fetch(attachment.filepath, {
            headers: blobHeaders,
            cache: 'no-store'
        })

        if (!response.ok) {
            console.error(`Blob fetch failed for ${attachment.filename}: ${response.status} ${response.statusText}`)
            // Fallback: try to redirect anyway, maybe it's accessible
            return NextResponse.redirect(attachment.filepath)
        }

        const blobContent = await response.arrayBuffer()

        return new NextResponse(blobContent, {
            status: 200,
            headers: {
                'Content-Type': attachment.mimetype || 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${encodeURIComponent(attachment.filename)}"`,
                'Content-Length': blobContent.byteLength.toString(),
                'Cache-Control': 'no-store, must-revalidate',
            }
        })

    } catch (error) {
        console.error('Error downloading file:', error)
        // Final fallback: redirect to the direct URL
        return NextResponse.redirect(attachment.filepath)
    }
}

