import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const complaint = await prisma.complaint.create({
        data: {
            protocol: 'TEST-1234-5678',
            type: 'MÁ_CONDUTA',
            description: 'Descrição de teste para verificação de PDF.',
            status: 'NOVA',
            priority: 'ALTA',
            isAnonymous: false,
            reporterName: 'Denunciante Teste',
            reporterEmail: 'teste@exemplo.com',
            reporterPhone: '11999999999',
            unit: 'Tecnova Central',
            sector: 'Emergência',
        } as any
    })
    console.log('Test complaint created:', complaint.protocol)
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
