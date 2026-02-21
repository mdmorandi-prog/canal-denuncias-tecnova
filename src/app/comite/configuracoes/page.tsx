
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { ChevronLeft, Save, Mail, AlertTriangle, CheckCircle2, Server, Lock, User, Key, Globe, LogOut, Settings2, FileText } from 'lucide-react'
import { AutoLogoutGuard } from '@/components/AutoLogoutGuard'
import { TemplateManager } from '@/components/config/TemplateManager'

export default function ConfigPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [activeTab, setActiveTab] = useState<'smtp' | 'templates'>('smtp')

    const [config, setConfig] = useState({
        host: '',
        port: 587,
        secure: false,
        user: '',
        pass: '',
        from: 'Canal de Denúncias <no-reply@hospital.com>'
    })

    useEffect(() => {
        fetchConfig()
    }, [])

    const fetchConfig = async () => {
        try {
            const res = await fetch('/api/config/email')
            if (res.ok) {
                const data = await res.json()
                if (data) {
                    setConfig(prev => ({
                        ...data,
                        pass: '' // Senha não vem do servidor
                    }))
                }
            }
        } catch (err) {
            console.error('Erro ao carregar configurações:', err)
            setError('Erro ao carregar configurações')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError('')
        setSuccess('')

        try {
            const res = await fetch('/api/config/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            })

            if (!res.ok) throw new Error('Falha ao salvar')

            setSuccess('Configurações salvas com sucesso!')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError('Erro ao salvar as configurações. Verifique os dados.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-100">
            <AutoLogoutGuard />
            {/* Header */}
            <header className="bg-primary-900 text-white py-4 shadow-md">
                <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/comite" className="flex items-center gap-2 text-primary-200 hover:text-white transition">
                            <ChevronLeft className="h-5 w-5" />
                            Voltar
                        </Link>
                        <h1 className="text-xl font-bold border-l border-primary-700 pl-4">
                            Configuração de E-mail
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

            <main className="max-w-4xl mx-auto px-4 py-8">

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-neutral-200">
                    <button
                        onClick={() => setActiveTab('smtp')}
                        className={`pb-3 px-2 flex items-center gap-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'smtp'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700'
                            }`}
                    >
                        <Settings2 className="h-4 w-4" />
                        Servidor SMTP
                    </button>
                    <button
                        onClick={() => setActiveTab('templates')}
                        className={`pb-3 px-2 flex items-center gap-2 font-medium text-sm transition-colors border-b-2 ${activeTab === 'templates'
                            ? 'border-primary-600 text-primary-600'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700'
                            }`}
                    >
                        <FileText className="h-4 w-4" />
                        Templates de E-mail
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-neutral-200">
                    {activeTab === 'smtp' ? (
                        <>
                            <div className="p-6 bg-neutral-50 border-b border-neutral-200 flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <Mail className="h-6 w-6 text-blue-700" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-neutral-800">Servidor SMTP</h2>
                                    <p className="text-sm text-neutral-500">Configure as credenciais para envio de notificações</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                {error && (
                                    <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2 border border-red-100">
                                        <AlertTriangle className="h-5 w-5 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2 border border-green-100 animate-fadeIn">
                                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                                        {success}
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Host */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                                            <Server className="h-4 w-4" />
                                            Servidor SMTP (Host)
                                        </label>
                                        <input
                                            type="text"
                                            name="host"
                                            value={config.host}
                                            onChange={handleChange}
                                            placeholder="ex: smtp.gmail.com"
                                            className="input-field w-full"
                                            required
                                        />
                                    </div>

                                    {/* Port */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                                            <Globe className="h-4 w-4" />
                                            Porta
                                        </label>
                                        <input
                                            type="number"
                                            name="port"
                                            value={config.port}
                                            onChange={handleChange}
                                            placeholder="587"
                                            className="input-field w-full"
                                            required
                                        />
                                    </div>

                                    {/* User */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                                            <User className="h-4 w-4" />
                                            Usuário
                                        </label>
                                        <input
                                            type="text"
                                            name="user"
                                            value={config.user}
                                            onChange={handleChange}
                                            placeholder="seu-email@dominio.com"
                                            className="input-field w-full"
                                            required
                                        />
                                    </div>

                                    {/* Pass */}
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                                            <Key className="h-4 w-4" />
                                            Senha
                                        </label>
                                        <input
                                            type="password"
                                            name="pass"
                                            value={config.pass}
                                            onChange={handleChange}
                                            placeholder={config.pass ? '••••••••' : 'Digite a senha do app'}
                                            className="input-field w-full"
                                            required={!config.pass}
                                        />
                                        <p className="text-xs text-neutral-500">
                                            Se estiver usando Gmail, use uma Senha de App.
                                        </p>
                                    </div>

                                    {/* From */}
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                                            <Mail className="h-4 w-4" />
                                            Remetente (From)
                                        </label>
                                        <input
                                            type="text"
                                            name="from"
                                            value={config.from}
                                            onChange={handleChange}
                                            placeholder="Nome <email@dominio.com>"
                                            className="input-field w-full"
                                            required
                                        />
                                    </div>

                                    {/* Secure */}
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition">
                                            <input
                                                type="checkbox"
                                                name="secure"
                                                checked={config.secure}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-medium flex items-center gap-2">
                                                    <Lock className="h-3 w-3" />
                                                    Conexão Segura (SSL/TLS)
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                    Geralmente falso para porta 587 (STARTTLS) e verdadeiro para 465.
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-neutral-200 flex justify-end gap-3">
                                    <Link
                                        href="/comite"
                                        className="px-6 py-2 border border-neutral-300 rounded-lg text-neutral-700 font-medium hover:bg-neutral-50 transition"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="btn-primary flex items-center gap-2 min-w-[150px] justify-center"
                                    >
                                        {saving ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Salvando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-5 w-5" />
                                                Salvar Configurações
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <TemplateManager />
                    )}
                </div>
            </main>
        </div>
    )
}
