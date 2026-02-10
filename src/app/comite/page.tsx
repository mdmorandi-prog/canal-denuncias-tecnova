'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Shield,
    AlertTriangle,
    Clock,
    CheckCircle,
    XCircle,
    Archive,
    Eye,
    MessageCircle,
    Filter,
    RefreshCw,
    Users,
    FileText,
    Settings,
    LogOut
} from 'lucide-react'

interface Complaint {
    id: string
    protocol: string
    type: string
    status: string
    priority: string
    isAnonymous: boolean
    unit?: string
    sector?: string
    createdAt: string
    _count: {
        messages: number
        attachments: number
    }
}

const STATUS_INFO: Record<string, { label: string; icon: typeof Clock; color: string }> = {
    nova: { label: 'Nova', icon: Clock, color: 'bg-blue-100 text-blue-800' },
    em_analise: { label: 'Em Análise', icon: AlertTriangle, color: 'bg-yellow-100 text-yellow-800' },
    procedente: { label: 'Procedente', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
    improcedente: { label: 'Improcedente', icon: XCircle, color: 'bg-red-100 text-red-800' },
    arquivada: { label: 'Arquivada', icon: Archive, color: 'bg-neutral-100 text-neutral-800' },
}

const TIPO_LABELS: Record<string, string> = {
    assedio_moral: 'Assédio Moral',
    assedio_sexual: 'Assédio Sexual',
    corrupcao: 'Corrupção',
    seguranca_paciente: 'Segurança do Paciente',
    violacao_normas: 'Violação de Normas',
    outros: 'Outros',
}

const PRIORITY_COLORS: Record<string, string> = {
    baixa: 'bg-neutral-100 text-neutral-600',
    normal: 'bg-blue-100 text-blue-600',
    alta: 'bg-orange-100 text-orange-600',
    urgente: 'bg-red-100 text-red-600',
}

export default function ComitePage() {
    const [complaints, setComplaints] = useState<Complaint[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('todos')

    const fetchComplaints = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/complaints')
            const data = await response.json()
            setComplaints(data)
        } catch (error) {
            console.error('Error fetching complaints:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComplaints()
    }, [])

    const filteredComplaints = filter === 'todos'
        ? complaints
        : complaints.filter(c => c.status === filter)

    const stats = {
        total: complaints.length,
        novas: complaints.filter(c => c.status === 'nova').length,
        emAnalise: complaints.filter(c => c.status === 'em_analise').length,
        procedentes: complaints.filter(c => c.status === 'procedente').length,
    }

    return (
        <div className="min-h-screen bg-neutral-100">
            {/* Header */}
            <header className="bg-primary-900 text-white py-4">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo-hsc.png"
                            alt="Hospital São Carlos"
                            width={180}
                            height={60}
                            className="h-14 w-auto"
                        />
                        <div className="border-l border-primary-700 pl-4">
                            <h1 className="text-xl font-bold">Painel do Comitê de Ética</h1>
                            <p className="text-primary-200 text-sm">Canal de Denúncias</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/comite/configuracoes"
                            className="bg-primary-800 hover:bg-primary-700 text-white p-2 rounded-lg transition"
                            title="Configurações de E-mail"
                        >
                            <Settings className="h-5 w-5" />
                        </Link>
                        <button
                            onClick={fetchComplaints}
                            className="text-primary-200 hover:text-white transition flex items-center gap-2"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Atualizar
                        </button>
                        <button
                            onClick={() => signOut({ callbackUrl: '/comite/login' })}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-200 hover:text-red-100 p-2 rounded-lg transition flex items-center gap-2"
                            title="Sair do sistema"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="text-sm font-medium">Sair</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-primary-900">{stats.total}</p>
                                <p className="text-sm text-neutral-500">Total</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Clock className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-600">{stats.novas}</p>
                                <p className="text-sm text-neutral-500">Novas</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-yellow-600">{stats.emAnalise}</p>
                                <p className="text-sm text-neutral-500">Em Análise</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-green-600">{stats.procedentes}</p>
                                <p className="text-sm text-neutral-500">Procedentes</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
                    <div className="flex items-center gap-4">
                        <Filter className="h-5 w-5 text-neutral-400" />
                        <span className="text-sm font-medium text-neutral-600">Filtrar:</span>
                        <div className="flex gap-2">
                            {['todos', 'nova', 'em_analise', 'procedente', 'improcedente', 'arquivada'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 rounded-full text-sm transition ${filter === f
                                        ? 'bg-primary-900 text-white'
                                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                        }`}
                                >
                                    {f === 'todos' ? 'Todos' : STATUS_INFO[f]?.label || f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Complaints List */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-neutral-50 border-b">
                            <tr>
                                <th className="text-left p-4 text-sm font-medium text-neutral-600">Protocolo</th>
                                <th className="text-left p-4 text-sm font-medium text-neutral-600">Tipo</th>
                                <th className="text-left p-4 text-sm font-medium text-neutral-600">Status</th>
                                <th className="text-left p-4 text-sm font-medium text-neutral-600">Prioridade</th>
                                <th className="text-left p-4 text-sm font-medium text-neutral-600">Local</th>
                                <th className="text-left p-4 text-sm font-medium text-neutral-600">Data</th>
                                <th className="text-left p-4 text-sm font-medium text-neutral-600">Msgs</th>
                                <th className="text-left p-4 text-sm font-medium text-neutral-600">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-neutral-500">
                                        Carregando...
                                    </td>
                                </tr>
                            ) : filteredComplaints.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-neutral-500">
                                        Nenhuma denúncia encontrada.
                                    </td>
                                </tr>
                            ) : (
                                filteredComplaints.map((complaint) => (
                                    <tr key={complaint.id} className="border-b hover:bg-neutral-50 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono font-medium text-primary-900">
                                                    {complaint.protocol}
                                                </span>
                                                {complaint.isAnonymous && (
                                                    <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
                                                        Anônimo
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm">{TIPO_LABELS[complaint.type] || complaint.type}</span>
                                        </td>
                                        <td className="p-4">
                                            {STATUS_INFO[complaint.status] && (
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_INFO[complaint.status].color}`}>
                                                    {STATUS_INFO[complaint.status].label}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[complaint.priority] || ''}`}>
                                                {complaint.priority}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-neutral-600">
                                            {complaint.sector || complaint.unit || '-'}
                                        </td>
                                        <td className="p-4 text-sm text-neutral-600">
                                            {new Date(complaint.createdAt).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1 text-neutral-500">
                                                <MessageCircle className="h-4 w-4" />
                                                <span className="text-sm">{complaint._count.messages}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Link
                                                href={`/comite/${complaint.protocol}`}
                                                className="flex items-center gap-1 text-primary-600 hover:text-primary-800 text-sm font-medium"
                                            >
                                                <Eye className="h-4 w-4" />
                                                Ver
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
