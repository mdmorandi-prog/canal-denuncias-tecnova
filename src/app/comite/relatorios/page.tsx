'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, LogOut } from 'lucide-react'
import { AutoLogoutGuard } from '@/components/AutoLogoutGuard'
import { ComplaintsDashboard } from '@/components/dashboard/ComplaintsDashboard'

export default function RelatoriosPage() {
    return (
        <div className="min-h-screen bg-neutral-100">
            <AutoLogoutGuard />
            {/* Header */}
            <header className="bg-authority text-white py-4 shadow-md">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/comite" className="flex items-center gap-2 text-primary-200 hover:text-white transition">
                            <ChevronLeft className="h-5 w-5" />
                            Voltar
                        </Link>
                        <h1 className="text-xl font-bold border-l border-primary-700 pl-4">
                            Dashboards Analíticos
                        </h1>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/comite/login' })}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-200 hover:text-red-100 p-2 rounded-lg transition flex items-center gap-2"
                        title="Sair do sistema"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium">Sair</span>
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <ComplaintsDashboard />
            </main>
        </div>
    )
}
