
import { prisma } from '../src/lib/prisma'

async function main() {
    console.log('Testando conexão com o banco...')

    try {
        // Tentar ler configs
        const configs = await prisma.emailConfig.findMany()
        console.log('Configs encontradas:', configs)

        // Tentar criar/atualizar uma config de teste
        const config = await prisma.emailConfig.create({
            data: {
                host: 'smtp.test.ts',
                port: 587,
                user: 'test_user',
                pass: 'test_pass',
                from: 'test@test.ts',
                updatedBy: 'script_test'
            }
        })
        console.log('Config criada:', config)

        // Limpar depois
        await prisma.emailConfig.delete({ where: { id: config.id } })
        console.log('Config deletada.')

    } catch (error) {
        console.error('Erro no teste:', error)
    } finally {
        await prisma.$disconnect()
    }
}

main()
