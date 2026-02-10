import type { Metadata } from 'next'
import './globals.css'
import { CarlitosAssistant } from '@/components/CarlitosAssistant'

export const metadata: Metadata = {
    title: 'Canal de Denúncias HSC',
    description: 'Canal de Denúncias - Hospital Santa Catarina. Sistema seguro para relatos de irregularidades em conformidade com a Lei 14.457/22 e NR1.',
    keywords: ['denúncia', 'compliance', 'NR1', 'assédio', 'hospital', 'ética'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR">
            <body className="antialiased">
                {/* Skip link para acessibilidade WCAG 2.1 */}
                <a href="#main-content" className="skip-link">
                    Pular para o conteúdo principal
                </a>

                <main id="main-content">
                    {children}
                </main>
                <CarlitosAssistant />
            </body>
        </html>
    )
}
