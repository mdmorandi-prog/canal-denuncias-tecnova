import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const templates = await prisma.emailTemplate.findMany()
        return NextResponse.json(templates)
    } catch (error) {
        console.error('Erro ao buscar templates de email:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const body = await req.json()
        const { type, subject, body: templateBody } = body

        if (!type || !subject || !templateBody) {
            return new NextResponse('Missing required fields', { status: 400 })
        }

        // Upsert operation to either create a new template of 'type' or overwrite an existing one.
        const template = await prisma.emailTemplate.upsert({
            where: { type },
            update: {
                subject,
                body: templateBody
            },
            create: {
                type,
                subject,
                body: templateBody
            }
        })

        return NextResponse.json(template)
    } catch (error) {
        console.error('Erro ao salvar template de email:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
