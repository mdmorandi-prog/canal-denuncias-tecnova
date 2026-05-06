import type { Metadata } from 'next'
import './globals.css'
import { NovaAssistant } from '@/components/NovaAssistant'

export const metadata: Metadata = {
    title: 'Canal de Denúncias Tecnova',
    description: 'Canal de Denúncias Tecnova. Sistema seguro para relatos de irregularidades em conformidade com a Lei 14.457/22 e NR1.',
    keywords: ['denúncia', 'compliance', 'NR1', 'assédio', 'tecnova', 'ética'],
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
                <NovaAssistant />
            </body>
        </html>
    )
}
