import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { send2FATokenEmail } from '@/lib/email'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: 'E-mail e senha são obrigatórios' }, { status: 400 })
        }

        const user = await prisma.committeeMember.findUnique({
            where: { email }
        })

        if (!user || !user.active) {
            return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
        }

        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + 10)

        // Upsert Token
        const existingToken = await prisma.twoFactorToken.findFirst({
            where: { email }
        })

        if (existingToken) {
            await prisma.twoFactorToken.update({
                where: { id: existingToken.id },
                data: { token: code, expires }
            })
        } else {
            await prisma.twoFactorToken.create({
                data: { email, token: code, expires }
            })
        }

        // Send Email async
        await send2FATokenEmail(email, code)

        return NextResponse.json({ success: true, message: 'Código 2FA enviado' })

    } catch (error) {
        console.error('2FA Error:', error)
        return NextResponse.json({ error: 'Erro interno ao processar login' }, { status: 500 })
    }
}
