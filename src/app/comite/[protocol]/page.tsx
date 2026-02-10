'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import {
    ChevronLeft,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Archive,
    MessageCircle,
    Send,
    Loader2,
    User,
    MapPin,
    Calendar,
    FileText,
    AlertTriangle,
    RefreshCw,
    LogOut
} from 'lucide-react'

interface Message {
    id: string
    sender: string
    message: string
    createdAt: string
    isRead: boolean
}

interface Complaint {
    id: string
    protocol: string
    type: string
    status: string
    priority: string
    isAnonymous: boolean
    unit?: string
    sector?: string
    shift?: string
    occurrenceDate?: string
    accusedName?: string
    accusedPosition?: string
    description: string
    witnesses?: string
    reporterName?: string
    reporterEmail?: string
    reporterPhone?: string
    wantsResponse: boolean
    createdAt: string
    updatedAt: string
    messages: Message[]
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

const TURNO_LABELS: Record<string, string> = {
    matutino: 'Matutino (06h - 12h)',
    vespertino: 'Vespertino (12h - 18h)',
    noturno: 'Noturno (18h - 06h)',
    nao_sei: 'Não informado',
}

export default function ComplaintDetailPage() {
    const params = useParams()
    const router = useRouter()
    const protocol = params.protocol as string

    const [complaint, setComplaint] = useState<Complaint | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [sendingMessage, setSendingMessage] = useState(false)
    const [updatingStatus, setUpdatingStatus] = useState(false)

    const fetchComplaint = async () => {
        try {
            const response = await fetch(`/api/complaints/${protocol}`)
            if (!response.ok) {
                throw new Error('Denúncia não encontrada')
            }
            const data = await response.json()
            setComplaint(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar denúncia')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComplaint()
    }, [protocol])

    const sendMessage = async () => {
        if (!newMessage.trim() || !complaint) return

        setSendingMessage(true)
        try {
            const response = await fetch(`/api/complaints/${protocol}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessage, sender: 'comite' }),
            })

            if (!response.ok) {
                throw new Error('Erro ao enviar mensagem')
            }

            setNewMessage('')
            fetchComplaint()
        } catch (err) {
            setError('Erro ao enviar mensagem')
        } finally {
            setSendingMessage(false)
        }
    }

    const updateStatus = async (newStatus: string) => {
        if (!complaint) return

        setUpdatingStatus(true)
        try {
            const response = await fetch(`/api/complaints/${protocol}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            })

            if (!response.ok) {
                throw new Error('Erro ao atualizar status')
            }

            fetchComplaint()
        } catch (err) {
            setError('Erro ao atualizar status')
        } finally {
            setUpdatingStatus(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        )
    }

    if (error || !complaint) {
        return (
            <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
                <div className="bg-white rounded-xl p-8 text-center max-w-md">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h1 className="text-xl font-bold text-neutral-900 mb-2">Erro</h1>
                    <p className="text-neutral-600 mb-4">{error || 'Denúncia não encontrada'}</p>
                    <Link href="/comite" className="btn-primary">
                        Voltar ao Painel
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-100">
            {/* Header */}
            <header className="bg-primary-900 text-white py-4">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/comite" className="flex items-center gap-2 text-primary-200 hover:text-white transition">
                            <ChevronLeft className="h-5 w-5" />
                            Voltar
                        </Link>
                        <div className="h-8 w-px bg-primary-700" />
                        <Image
                            src="/logo-hsc.png"
                            alt="Hospital São Carlos"
                            width={180}
                            className="h-14 w-auto"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchComplaint}
                            className="text-primary-200 hover:text-white transition flex items-center gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
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
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Coluna Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Cabeçalho da Denúncia */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-sm text-neutral-500 mb-1">Protocolo</p>
                                    <p className="text-2xl font-mono font-bold text-primary-900">{complaint.protocol}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {STATUS_INFO[complaint.status] && (
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_INFO[complaint.status].color}`}>
                                            {STATUS_INFO[complaint.status].label}
                                        </span>
                                    )}
                                    {complaint.isAnonymous && (
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-600">
                                            Anônimo
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span className="font-medium">Tipo:</span>
                                    <span>{TIPO_LABELS[complaint.type] || complaint.type}</span>
                                </div>
                                <div className="flex items-center gap-2 text-neutral-600">
                                    <Calendar className="h-4 w-4" />
                                    <span className="font-medium">Registrado em:</span>
                                    <span>{new Date(complaint.createdAt).toLocaleDateString('pt-BR')}</span>
                                </div>
                                {complaint.unit && (
                                    <div className="flex items-center gap-2 text-neutral-600">
                                        <MapPin className="h-4 w-4" />
                                        <span className="font-medium">Unidade:</span>
                                        <span>{complaint.unit}</span>
                                    </div>
                                )}
                                {complaint.sector && (
                                    <div className="flex items-center gap-2 text-neutral-600">
                                        <FileText className="h-4 w-4" />
                                        <span className="font-medium">Setor:</span>
                                        <span>{complaint.sector}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Descrição */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-primary-900 mb-4">Descrição da Ocorrência</h2>
                            <p className="text-neutral-700 whitespace-pre-wrap">{complaint.description}</p>

                            {complaint.witnesses && (
                                <div className="mt-4 pt-4 border-t">
                                    <h3 className="text-sm font-medium text-neutral-600 mb-2">Testemunhas:</h3>
                                    <p className="text-neutral-700">{complaint.witnesses}</p>
                                </div>
                            )}
                        </div>

                        {/* Mensagens */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-4 bg-primary-50 border-b border-primary-100">
                                <h2 className="font-semibold text-primary-900 flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5" />
                                    Comunicação com Denunciante
                                </h2>
                            </div>

                            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                                {complaint.messages.length === 0 ? (
                                    <p className="text-center text-neutral-500 py-8">
                                        Nenhuma mensagem ainda.
                                    </p>
                                ) : (
                                    complaint.messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`p-4 rounded-lg ${msg.sender === 'comite'
                                                ? 'bg-primary-50 border-l-4 border-primary-500 ml-8'
                                                : 'bg-neutral-50 border-l-4 border-neutral-300 mr-8'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-sm font-medium">
                                                    {msg.sender === 'comite' ? 'Comitê de Ética' : 'Denunciante'}
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                    {new Date(msg.createdAt).toLocaleDateString('pt-BR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-sm text-neutral-700">{msg.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Enviar Mensagem */}
                            <div className="p-4 border-t bg-neutral-50">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Responder ao denunciante..."
                                        className="input-field text-sm"
                                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={sendingMessage || !newMessage.trim()}
                                        className="btn-primary px-4"
                                    >
                                        {sendingMessage ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <Send className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coluna Lateral */}
                    <div className="space-y-6">
                        {/* Alterar Status */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-primary-900 mb-4">Alterar Status</h2>
                            <div className="space-y-2">
                                {Object.entries(STATUS_INFO).map(([status, info]) => (
                                    <button
                                        key={status}
                                        onClick={() => updateStatus(status)}
                                        disabled={updatingStatus || complaint.status === status}
                                        className={`w-full p-3 rounded-lg text-left flex items-center gap-3 transition ${complaint.status === status
                                            ? 'bg-primary-100 border-2 border-primary-500'
                                            : 'bg-neutral-50 hover:bg-neutral-100 border-2 border-transparent'
                                            } ${updatingStatus ? 'opacity-50' : ''}`}
                                    >
                                        <info.icon className="h-5 w-5" />
                                        <span className="font-medium">{info.label}</span>
                                        {complaint.status === status && (
                                            <CheckCircle className="h-4 w-4 text-primary-600 ml-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dados do Denunciado */}
                        {(complaint.accusedName || complaint.accusedPosition) && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-primary-900 mb-4">Denunciado</h2>
                                <div className="space-y-3 text-sm">
                                    {complaint.accusedName && (
                                        <div>
                                            <p className="text-neutral-500">Nome</p>
                                            <p className="font-medium">{complaint.accusedName}</p>
                                        </div>
                                    )}
                                    {complaint.accusedPosition && (
                                        <div>
                                            <p className="text-neutral-500">Cargo</p>
                                            <p className="font-medium">{complaint.accusedPosition}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Dados do Denunciante (se identificado) */}
                        {!complaint.isAnonymous && complaint.reporterName && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-primary-900 mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Denunciante
                                </h2>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="text-neutral-500">Nome</p>
                                        <p className="font-medium">{complaint.reporterName}</p>
                                    </div>
                                    {complaint.reporterEmail && (
                                        <div>
                                            <p className="text-neutral-500">E-mail</p>
                                            <p className="font-medium">{complaint.reporterEmail}</p>
                                        </div>
                                    )}
                                    {complaint.reporterPhone && (
                                        <div>
                                            <p className="text-neutral-500">Telefone</p>
                                            <p className="font-medium">{complaint.reporterPhone}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Informações Adicionais */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-primary-900 mb-4">Informações</h2>
                            <div className="space-y-3 text-sm">
                                {complaint.shift && (
                                    <div>
                                        <p className="text-neutral-500">Turno</p>
                                        <p className="font-medium">{TURNO_LABELS[complaint.shift] || complaint.shift}</p>
                                    </div>
                                )}
                                {complaint.occurrenceDate && (
                                    <div>
                                        <p className="text-neutral-500">Data da Ocorrência</p>
                                        <p className="font-medium">
                                            {new Date(complaint.occurrenceDate).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-neutral-500">Última Atualização</p>
                                    <p className="font-medium">
                                        {new Date(complaint.updatedAt).toLocaleDateString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
