// Script para criar usuário do comitê
// Executar com: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts

import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Criar membro do comitê padrão
    const hashedPassword = await bcrypt.hash('comite123', 10)

    const member = await prisma.committeeMember.upsert({
        where: { email: 'comite@hospitalsaocarlos.com.br' },
        update: {},
        create: {
            name: 'Coordenador do Comitê',
            email: 'comite@hospitalsaocarlos.com.br',
            password: hashedPassword,
            role: 'coordenador',
            active: true,
        },
    })

    console.log('Membro do comitê criado:', member.email)
    console.log('Senha: comite123')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
