import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@tecnova.ind.br'
    const password = 'admin123' // In production, use a strong password
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.committeeMember.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Administrador do Comitê',
            password: hashedPassword,
            role: 'admin',
        },
    })

    console.log({ user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
