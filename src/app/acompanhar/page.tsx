'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
    Shield,
    Search,
    ChevronLeft,
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Archive,
    MessageCircle,
    Send,
    Loader2
} from 'lucide-react'

interface Message {
    id: string
    sender: string
    message: string
    createdAt: string
    isRead: boolean
}

interface Complaint {
    protocol: string
    type: string
    status: string
    createdAt: string
    updatedAt: string
    messages: Message[]
}

const STATUS_INFO: Record<string, { label: string; icon: typeof Clock; color: string }> = {
    nova: { label: 'Nova', icon: Clock, color: 'text-blue-600 bg-blue-100' },
    em_analise: { label: 'Em Análise', icon: AlertCircle, color: 'text-yellow-600 bg-yellow-100' },
    procedente: { label: 'Procedente', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
    improcedente: { label: 'Improcedente', icon: XCircle, color: 'text-red-600 bg-red-100' },
    arquivada: { label: 'Arquivada', icon: Archive, color: 'text-neutral-600 bg-neutral-100' },
}

const TIPO_LABELS: Record<string, string> = {
    assedio_moral: 'Assédio Moral',
    assedio_sexual: 'Assédio Sexual',
    corrupcao: 'Corrupção',
    seguranca_paciente: 'Segurança do Paciente',
    violacao_normas: 'Violação de Normas',
    outros: 'Outros',
}

function AcompanharContent() {
    const searchParams = useSearchParams()
    const initialProtocol = searchParams.get('protocolo') || ''

    const [protocol, setProtocol] = useState(initialProtocol)
    const [complaint, setComplaint] = useState<Complaint | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [newMessage, setNewMessage] = useState('')
    const [sendingMessage, setSendingMessage] = useState(false)

    const searchComplaint = async () => {
        if (!protocol.trim()) {
            setError('Digite o protocolo')
            return
        }

        setLoading(true)
        setError('')
        setComplaint(null)

        try {
            const response = await fetch(`/api/complaints/track?protocol=${encodeURIComponent(protocol)}`)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Denúncia não encontrada')
            }

            setComplaint(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar denúncia')
        } finally {
            setLoading(false)
        }
    }

    const sendMessage = async () => {
        if (!newMessage.trim() || !complaint) return

        setSendingMessage(true)

        try {
            const response = await fetch(`/api/complaints/track/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    protocol: complaint.protocol,
                    message: newMessage
                }),
            })

            if (!response.ok) {
                throw new Error('Erro ao enviar mensagem')
            }

            setNewMessage('')
            // Recarregar denúncia para ver nova mensagem
            searchComplaint()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao enviar mensagem')
        } finally {
            setSendingMessage(false)
        }
    }

    useEffect(() => {
        if (initialProtocol) {
            searchComplaint()
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
            {/* Header */}
            <header className="bg-primary-900 text-white py-4">
                <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-primary-200 hover:text-white transition">
                        <ChevronLeft className="h-5 w-5" />
                        Voltar
                    </Link>
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo-hsc.png"
                            alt="Hospital São Carlos"
                            width={180}
                            height={60}
                            className="h-14 w-auto"
                        />
                        <span className="font-semibold text-lg">Canal de Denúncias</span>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center text-primary-900 mb-2">
                    Acompanhar Denúncia
                </h1>
                <p className="text-center text-neutral-600 mb-8">
                    Digite o protocolo recebido para consultar o andamento.
                </p>

                {/* Search Box */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={protocol}
                            onChange={(e) => setProtocol(e.target.value.toUpperCase())}
                            placeholder="Ex: ABCD-1234-EFGH"
                            className="input-field font-mono text-lg tracking-wider"
                            onKeyDown={(e) => e.key === 'Enter' && searchComplaint()}
                        />
                        <button
                            onClick={searchComplaint}
                            disabled={loading}
                            className="btn-primary flex items-center gap-2 shrink-0"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <Search className="h-5 w-5" />
                            )}
                            Buscar
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Complaint Details */}
                {complaint && (
                    <div className="space-y-6 animate-fadeIn">
                        {/* Status Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm text-neutral-500">Protocolo</p>
                                    <p className="text-xl font-mono font-bold text-primary-900">{complaint.protocol}</p>
                                </div>

                                {STATUS_INFO[complaint.status] && (
                                    <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${STATUS_INFO[complaint.status].color}`}>
                                        {(() => {
                                            const Icon = STATUS_INFO[complaint.status].icon
                                            return <Icon className="h-4 w-4" />
                                        })()}
                                        <span className="font-medium">{STATUS_INFO[complaint.status].label}</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-neutral-500">Tipo</p>
                                    <p className="font-medium">{TIPO_LABELS[complaint.type] || complaint.type}</p>
                                </div>
                                <div>
                                    <p className="text-neutral-500">Data do Registro</p>
                                    <p className="font-medium">
                                        {new Date(complaint.createdAt).toLocaleDateString('pt-BR', {
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

                        {/* Messages */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-4 bg-primary-50 border-b border-primary-100">
                                <h2 className="font-semibold text-primary-900 flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5" />
                                    Mensagens
                                </h2>
                            </div>

                            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                                {complaint.messages.length === 0 ? (
                                    <p className="text-center text-neutral-500 py-8">
                                        Nenhuma mensagem ainda. O Comitê de Ética entrará em contato em breve.
                                    </p>
                                ) : (
                                    complaint.messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`p-4 rounded-lg ${msg.sender === 'comite'
                                                ? 'bg-primary-50 border-l-4 border-primary-500'
                                                : 'bg-neutral-50 border-l-4 border-neutral-300'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-sm font-medium">
                                                    {msg.sender === 'comite' ? 'Comitê de Ética' : 'Você'}
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

                            {/* Send Message */}
                            <div className="p-4 border-t bg-neutral-50">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Enviar mensagem ao Comitê..."
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
                )}
            </div>
        </div>
    )
}

export default function AcompanharPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
            </div>
        }>
            <AcompanharContent />
        </Suspense>
    )
}
