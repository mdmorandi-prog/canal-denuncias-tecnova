
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const session = await auth()
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const config = await prisma.emailConfig.findFirst({
            orderBy: { updatedAt: 'desc' }
        })

        if (!config) {
            return NextResponse.json(null)
        }

        // Não retornar a senha por segurança
        const { pass, ...safeConfig } = config
        return NextResponse.json(safeConfig)

    } catch (error) {
        console.error('Erro ao buscar configuração de email:', error)
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
        const { host, port, user, pass, secure, from } = body

        if (!host || !port || !user || !pass || !from) {
            return new NextResponse('Missing fields', { status: 400 })
        }

        // Salvar nova configuração
        // Como o ID é autogerado, podemos criar um novo registro ou atualizar o existente
        // Para simplificar e manter histórico se quiser no futuro, vou criar um novo sempre e pegar o mais recente no GET
        // Mas para evitar lixo, vou verificar se já existe e atualizar.

        const existingConfig = await prisma.emailConfig.findFirst()

        let config
        if (existingConfig) {
            config = await prisma.emailConfig.update({
                where: { id: existingConfig.id },
                data: {
                    host,
                    port: parseInt(port),
                    user,
                    pass, // Idealmente encriptar
                    secure,
                    from,
                    updatedBy: session.user.email
                }
            })
        } else {
            config = await prisma.emailConfig.create({
                data: {
                    host,
                    port: parseInt(port),
                    user,
                    pass,
                    secure,
                    from,
                    updatedBy: session.user.email
                }
            })
        }

        return NextResponse.json(config)

    } catch (error) {
        console.error('Erro ao salvar configuração de email:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}
