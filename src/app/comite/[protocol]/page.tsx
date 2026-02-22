'use client'

import { useState, useEffect, Suspense, use } from 'react'
import Link from 'next/link'
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
    FileText,
    Download,
    User,
    Calendar,
    MapPin,
    AlertTriangle,
    Save,
    Sparkles,
    Tag,
    Activity,
    RefreshCw
} from 'lucide-react'

import { AutoLogoutGuard } from '@/components/AutoLogoutGuard'
import { exportToPDF } from '@/lib/pdf-export'

// Types
interface Message {
    id: string
    sender: 'denunciante' | 'comite'
    message: string
    createdAt: string
    isRead: boolean
}

interface Attachment {
    id: string
    filename: string
    mimeType: string
    size: number
}

interface Complaint {
    id: string
    protocol: string
    type: string
    status: string // nova, em_analise, procedente, improcedente, arquivada
    priority: string // baixa, normal, alta, urgente
    description: string
    unit?: string
    sector?: string
    shift?: string
    occurrenceDate?: string
    accusedName?: string
    accusedPosition?: string
    witnesses?: string
    isAnonymous: boolean
    reporterName?: string
    reporterEmail?: string
    reporterPhone?: string
    wantsResponse: boolean
    createdAt: string
    updatedAt: string
    messages: Message[]
    attachments: Attachment[]
    aiAnalysis?: {
        sentiment: string
        urgency: string
        summary: string
        keyEntities: string
        riskLevel?: string | null
        recommendedActions?: string | null
        legalFramework?: string | null
    } | null
}

const STATUS_OPTIONS = [
    { value: 'nova', label: 'Nova' },
    { value: 'em_analise', label: 'Em Análise' },
    { value: 'procedente', label: 'Procedente' },
    { value: 'improcedente', label: 'Improcedente' },
    { value: 'arquivada', label: 'Arquivada' },
]

const PRIORITY_OPTIONS = [
    { value: 'baixa', label: 'Baixa', color: 'bg-green-100 text-green-800' },
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
    { value: 'alta', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgente', label: 'Urgente', color: 'bg-red-100 text-red-800' },
]

const TIPO_LABELS: Record<string, string> = {
    assedio_moral: 'Assédio Moral',
    assedio_sexual: 'Assédio Sexual',
    corrupcao: 'Corrupção',
    seguranca_paciente: 'Segurança do Paciente',
    violacao_normas: 'Violação de Normas',
    outros: 'Outros',
}

function ComplaintDetail({ params }: { params: Promise<{ protocol: string }> }) {
    const { protocol } = use(params)

    const [complaint, setComplaint] = useState<Complaint | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Actions State
    const [newMessage, setNewMessage] = useState('')
    const [sendingMessage, setSendingMessage] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isReanalyzing, setIsReanalyzing] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('')
    const [selectedPriority, setSelectedPriority] = useState('')

    const fetchComplaint = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/complaints/${protocol}`)
            if (!response.ok) {
                if (response.status === 401) window.location.href = '/comite/login'
                throw new Error('Erro ao carregar denúncia')
            }
            const data = await response.json()
            setComplaint(data)
            setSelectedStatus(data.status)
            setSelectedPriority(data.priority)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComplaint()
    }, [protocol])

    const handleReanalyze = async () => {
        setIsReanalyzing(true)
        try {
            const res = await fetch(`/api/complaints/${protocol}/analyze`, { method: 'POST' })
            if (!res.ok) {
                const err = await res.json()
                alert(err.error || 'Erro ao re-analisar')
                return
            }
            await fetchComplaint() // Refresh page data with new analysis
        } catch (err) {
            alert('Erro de rede ao re-analisar.')
        } finally {
            setIsReanalyzing(false)
        }
    }

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !complaint) return

        setSendingMessage(true)
        try {
            const response = await fetch(`/api/complaints/${protocol}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessage }),
            })

            if (!response.ok) throw new Error('Erro ao enviar mensagem')

            setNewMessage('')
            fetchComplaint() // Refresh to show new message
        } catch (err) {
            alert('Erro ao enviar mensagem')
        } finally {
            setSendingMessage(false)
        }
    }

    const handleUpdateComplaint = async () => {
        if (!complaint) return

        setIsUpdating(true)
        try {
            const response = await fetch(`/api/complaints/${protocol}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: selectedStatus,
                    priority: selectedPriority
                }),
            })

            if (!response.ok) throw new Error('Erro ao atualizar')

            alert('Denúncia atualizada com sucesso!')
            fetchComplaint()
        } catch (err) {
            alert('Erro ao atualizar denúncia')
        } finally {
            setIsUpdating(false)
        }
    }

    if (loading) return <div className="p-8 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary-600" /></div>
    if (error || !complaint) return <div className="p-8 text-center text-red-600 font-bold">{error || 'Denúncia não encontrada'}</div>

    return (
        <div className="min-h-screen bg-slate-50">
            <AutoLogoutGuard />
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/comite" className="text-slate-500 hover:text-primary-600 transition">
                            <ChevronLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-xl font-bold text-slate-800">
                            Protocolo: <span className="font-mono text-primary-600">{complaint.protocol}</span>
                        </h1>
                        <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium border border-primary-100">
                            {TIPO_LABELS[complaint.type] || complaint.type}
                        </span>
                    </div>
                    <button
                        onClick={() => exportToPDF({
                            elementId: 'pdf-content',
                            title: 'Canal de Denúncias HSC - Relatório Confidencial',
                            filename: `Denuncia_${complaint.protocol}`,
                            protocol: complaint.protocol
                        })}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
                        title="Exportar Denúncia para PDF"
                    >
                        <Download className="h-4 w-4" />
                        Exportar PDF
                    </button>
                </div>
            </header>

            <main id="pdf-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Details & Actions */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status & Priority Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-amber-500" />
                                Gestão do Caso
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 outline-none"
                                    >
                                        {STATUS_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Prioridade</label>
                                    <select
                                        value={selectedPriority}
                                        onChange={(e) => setSelectedPriority(e.target.value)}
                                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-100 outline-none"
                                    >
                                        {PRIORITY_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleUpdateComplaint}
                                    disabled={isUpdating}
                                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-50"
                                >
                                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>

                        {/* Análise IA Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-white" />
                                    <h2 className="text-base font-semibold text-white">AuditorIA</h2>
                                    <span className="text-xs bg-white/20 text-white/90 px-2 py-0.5 rounded-full">v2.0</span>
                                </div>
                                <button
                                    onClick={handleReanalyze}
                                    disabled={isReanalyzing}
                                    title="Re-analisar denúncia com AuditorIA v2"
                                    className="flex items-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                                >
                                    {isReanalyzing
                                        ? <><Loader2 className="h-3 w-3 animate-spin" /> Analisando...</>
                                        : <><RefreshCw className="h-3 w-3" /> Re-analisar</>
                                    }
                                </button>
                            </div>

                            <div className="p-6">
                                {complaint.aiAnalysis ? (() => {
                                    // Parse all JSON arrays
                                    let entities: string[] = []
                                    let actions: string[] = []
                                    let laws: string[] = []
                                    try { entities = JSON.parse(complaint.aiAnalysis.keyEntities || '[]') } catch { }
                                    try { actions = JSON.parse(complaint.aiAnalysis.recommendedActions || '[]') } catch { }
                                    try { laws = JSON.parse(complaint.aiAnalysis.legalFramework || '[]') } catch { }

                                    const riskConfig: Record<string, { bg: string; text: string; border: string }> = {
                                        'Baixo': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
                                        'Moderado': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
                                        'Alto': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
                                        'Crítico': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
                                    }
                                    const riskLevel = complaint.aiAnalysis.riskLevel || 'Moderado'
                                    const riskStyle = riskConfig[riskLevel] || riskConfig['Moderado']

                                    const urgencyHigh = ['alta', 'crítica'].includes(complaint.aiAnalysis.urgency.toLowerCase())

                                    return (
                                        <div className="space-y-5">
                                            {/* Summary */}
                                            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
                                                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">Resumo Executivo</p>
                                                <p className="text-sm text-slate-700 leading-relaxed">{complaint.aiAnalysis.summary}</p>
                                            </div>

                                            {/* Metrics Grid */}
                                            <div className="grid grid-cols-3 gap-3">
                                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                                                    <p className="text-xs text-slate-500 font-medium mb-1">Sentimento</p>
                                                    <p className="text-sm font-bold text-slate-800">{complaint.aiAnalysis.sentiment}</p>
                                                </div>
                                                <div className={`p-3 rounded-lg border text-center ${urgencyHigh ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                                                    <p className={`text-xs font-medium mb-1 ${urgencyHigh ? 'text-red-500' : 'text-amber-600'}`}>Urgência</p>
                                                    <p className={`text-sm font-bold ${urgencyHigh ? 'text-red-800' : 'text-amber-800'}`}>{complaint.aiAnalysis.urgency}</p>
                                                </div>
                                                <div className={`p-3 rounded-lg border text-center ${riskStyle.bg} ${riskStyle.border}`}>
                                                    <p className={`text-xs font-medium mb-1 ${riskStyle.text}`}>Risco Legal</p>
                                                    <p className={`text-sm font-bold ${riskStyle.text}`}>{riskLevel}</p>
                                                </div>
                                            </div>

                                            {/* Recommended Actions */}
                                            {actions.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                                                        Ações Recomendadas pelo Comitê
                                                    </p>
                                                    <ol className="space-y-2">
                                                        {actions.map((action, idx) => (
                                                            <li key={idx} className="flex items-start gap-2.5 text-sm">
                                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mt-0.5">{idx + 1}</span>
                                                                <span className="text-slate-700">{action}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            )}

                                            {/* Legal Framework */}
                                            {laws.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                                                        <FileText className="h-3.5 w-3.5 text-slate-500" />
                                                        Enquadramento Legal
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {laws.map((law, idx) => (
                                                            <span key={idx} className="text-xs bg-slate-800 text-slate-100 px-2.5 py-1 rounded-md font-medium">
                                                                {law}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Key Entities */}
                                            {entities.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                                                        <Tag className="h-3 w-3" /> Entidades Identificadas
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {entities.map((entity, idx) => (
                                                            <span key={idx} className="text-xs bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-md">
                                                                {entity}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })() : new Date().getTime() - new Date(complaint.createdAt).getTime() < 60000 ? (
                                    <div className="text-center py-6">
                                        <Loader2 className="h-6 w-6 animate-spin text-indigo-400 mx-auto mb-2" />
                                        <p className="text-sm text-slate-500">A Inteligência Artificial está processando este relato. Atualize a página em instantes.</p>
                                    </div>
                                ) : (
                                    <div className="text-center py-2">
                                        <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                                            <AlertTriangle className="h-4 w-4 text-orange-400" />
                                            Análise estrutural não disponível para este relato.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-slate-500" />
                                Relato
                            </h2>
                            <div className="prose prose-slate max-w-none bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 whitespace-pre-wrap">
                                {complaint.description}
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-6 pt-6 border-t border-slate-100">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="h-4 w-4 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-slate-900">Data do Ocorrido</p>
                                            <p className="text-slate-600">
                                                {complaint.occurrenceDate
                                                    ? new Date(complaint.occurrenceDate).toLocaleDateString('pt-BR')
                                                    : 'Não informada'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-slate-900">Localização</p>
                                            <p className="text-slate-600">
                                                {[complaint.unit, complaint.sector].filter(Boolean).join(' - ') || 'Não informada'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <User className="h-4 w-4 text-slate-400 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-slate-900">Envolvidos</p>
                                            <p className="text-slate-600">
                                                <strong>Acusado:</strong> {complaint.accusedName || 'Não informado'} <br />
                                                <span className="text-xs">({complaint.accusedPosition || 'Cargo não informado'})</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attachments */}
                        {complaint.attachments && complaint.attachments.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                                <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                    <Download className="h-5 w-5 text-slate-500" />
                                    Anexos ({complaint.attachments.length})
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {complaint.attachments.map((att: any) => (
                                        <div key={att.id} className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                                            <FileText className="h-8 w-8 text-primary-500 mr-3" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-900 truncate">{att.filename}</p>
                                                <p className="text-xs text-slate-500">{(att.size / 1024).toFixed(1)} KB</p>
                                            </div>
                                            {/* In a real app, this would be a secure download link */}
                                            <button className="text-primary-600 hover:text-primary-800 text-sm font-medium px-2">
                                                Baixar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Chat & Reporter Info */}
                    <div className="space-y-6">
                        {/* Reporter Info */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-slate-500" />
                                Denunciante
                            </h2>
                            {complaint.isAnonymous ? (
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                                    <p className="font-bold text-slate-700">Anônimo</p>
                                    <p className="text-xs text-slate-500 mt-1">Identidade protegida</p>
                                </div>
                            ) : (
                                <div className="space-y-2 text-sm">
                                    <p><span className="text-slate-500">Nome:</span> <span className="font-medium">{complaint.reporterName}</span></p>
                                    <p><span className="text-slate-500">Email:</span> <span className="font-medium">{complaint.reporterEmail || '-'}</span></p>
                                    <p><span className="text-slate-500">Telefone:</span> <span className="font-medium">{complaint.reporterPhone || '-'}</span></p>
                                </div>
                            )}
                        </div>

                        {/* Chat Interface */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-[600px]">
                            <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                                    <MessageCircle className="h-5 w-5 text-primary-600" />
                                    Chat com Denunciante
                                </h2>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                                {complaint.messages.length === 0 ? (
                                    <p className="text-center text-slate-400 text-sm py-8">
                                        Nenhuma mensagem trocada.
                                    </p>
                                ) : (
                                    complaint.messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.sender === 'comite'
                                                ? 'ml-auto bg-primary-600 text-white rounded-br-none'
                                                : 'mr-auto bg-slate-100 text-slate-800 rounded-bl-none'
                                                }`}
                                        >
                                            <p className="mb-1">{msg.message}</p>
                                            <p className={`text-[10px] text-right ${msg.sender === 'comite' ? 'text-primary-200' : 'text-slate-400'}`}>
                                                {new Date(msg.createdAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Digite sua resposta..."
                                        className="flex-1 input-field text-sm"
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={sendingMessage || !newMessage.trim()}
                                        className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition"
                                    >
                                        {sendingMessage ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function ComplaintDetailPage({ params }: { params: Promise<{ protocol: string }> }) {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 text-primary-600 animate-spin" /></div>}>
            <ComplaintDetail params={params} />
        </Suspense>
    )
}
