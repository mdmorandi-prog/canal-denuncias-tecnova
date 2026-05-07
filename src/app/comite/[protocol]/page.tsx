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
    RefreshCw,
    BookOpen,
    PlusCircle,
    Paperclip,
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
    attachments?: Attachment[]
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
    deadline?: string | null
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
            suggestedVerdict?: string | null
            suggestedSla?: number | null
        } | null
}

interface ComplaintAction {
    id: string
    authorName: string
    actionType: string
    description: string
    createdAt: string
    attachments?: Attachment[]
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
    { value: 'normal', label: 'Normal', color: 'bg-slate-100 text-slate-800' },
    { value: 'alta', label: 'Alta', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgente', label: 'Urgente', color: 'bg-red-100 text-red-800' },
]

const TIPO_LABELS: Record<string, string> = {
    assedio_moral: 'Assédio Moral',
    assedio_sexual: 'Assédio Sexual',
    corrupcao: 'Corrupção',
    seguranca_trabalho: 'Segurança do Trabalho',
    violacao_normas: 'Violação de Normas',
    outros: 'Outros',
}

const DIARY_TYPES = [
    { value: 'entrevista', label: 'Entrevista', icon: MessageCircle, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
    { value: 'documento', label: 'Documento', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
    { value: 'cautelar', label: 'Cautelar', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    { value: 'notificacao', label: 'Notificação', icon: Send, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    { value: 'reuniao', label: 'Reunião', icon: Calendar, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
    { value: 'juridico', icon: Activity, label: 'Jurídico', color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-300' },
    { value: 'ia_sugestao', label: 'Sugerido pela IA', icon: Sparkles, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { value: 'outro', label: 'Outro', icon: PlusCircle, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
]

function ComplaintDetail({ params }: { params: Promise<{ protocol: string }> }) {
    const { protocol } = use(params)

    const [complaint, setComplaint] = useState<Complaint | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Actions State
    const [newMessage, setNewMessage] = useState('')
    const [selectedChatFile, setSelectedChatFile] = useState<File | null>(null)
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
            await fetchComplaint()
        } catch (err) {
            alert('Erro de rede ao re-analisar.')
        } finally {
            setIsReanalyzing(false)
        }
    }

    // --- Investigation Diary State ---
    const [diaryActions, setDiaryActions] = useState<ComplaintAction[]>([])
    const [diaryAuthor, setDiaryAuthor] = useState('')
    const [diaryType, setDiaryType] = useState('entrevista')
    const [diaryDescription, setDiaryDescription] = useState('')
    const [selectedDiaryFile, setSelectedDiaryFile] = useState<File | null>(null)
    const [savingAction, setSavingAction] = useState(false)
    const [reanalyzingWithContext, setReanalyzingWithContext] = useState(false)
    const [isUpdatingDeadline, setIsUpdatingDeadline] = useState(false)

    const fetchDiaryActions = async () => {
        const res = await fetch(`/api/complaints/${protocol}/actions`)
        if (res.ok) setDiaryActions(await res.json())
    }

    useEffect(() => { fetchDiaryActions() }, [protocol])

    const handleAddAction = async () => {
        if (!diaryAuthor.trim() || (!diaryDescription.trim() && !selectedDiaryFile)) return
        setSavingAction(true)
        try {
            const res = await fetch(`/api/complaints/${protocol}/actions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    authorName: diaryAuthor, 
                    actionType: diaryType, 
                    description: diaryDescription || (selectedDiaryFile ? 'Arquivo anexado ao diário' : '') 
                }),
            })
            if (!res.ok) { alert('Erro ao registrar ação.'); return }
            const savedAction = await res.json()

            if (selectedDiaryFile && savedAction.id) {
                const formData = new FormData()
                formData.append('file', selectedDiaryFile)
                formData.append('actionId', savedAction.id)
                await fetch(`/api/complaints/${protocol}/attachments`, {
                    method: 'POST',
                    body: formData
                })
            }

            setDiaryDescription('')
            setSelectedDiaryFile(null)
            await fetchDiaryActions()
        } finally {
            setSavingAction(false)
        }
    }

    const handleReanalyzeWithContext = async () => {
        setReanalyzingWithContext(true)
        try {
            const res = await fetch(`/api/complaints/${protocol}/analyze`, { method: 'POST' })
            if (!res.ok) { const err = await res.json(); alert(err.error || 'Erro ao re-analisar'); return }
            await fetchComplaint()
        } finally {
            setReanalyzingWithContext(false)
        }
    }

    const handleSendMessage = async () => {
        if ((!newMessage.trim() && !selectedChatFile) || !complaint) return

        setSendingMessage(true)
        try {
            const response = await fetch(`/api/complaints/${protocol}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessage || (selectedChatFile ? 'Arquivo enviado' : '') }),
            })

            if (!response.ok) throw new Error('Erro ao enviar mensagem')
            const sentMsg = await response.json()

            if (selectedChatFile && sentMsg.id) {
                const formData = new FormData()
                formData.append('file', selectedChatFile)
                formData.append('messageId', sentMsg.id)
                await fetch(`/api/complaints/${protocol}/attachments`, {
                    method: 'POST',
                    body: formData
                })
            }

            setNewMessage('')
            setSelectedChatFile(null)
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

    const handleUpdateDeadline = async (newDeadline: Date | null) => {
        if (!complaint) return
        
        setIsUpdatingDeadline(true)
        try {
            const response = await fetch(`/api/complaints/${protocol}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    deadline: newDeadline ? newDeadline.toISOString() : null
                }),
            })

            if (!response.ok) throw new Error('Erro ao atualizar prazo')
            
            alert('Prazo atualizado com sucesso!')
            fetchComplaint()
        } catch (err) {
            alert('Erro ao atualizar prazo da denúncia')
        } finally {
            setIsUpdatingDeadline(false)
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
                            title: 'Relatório de Investigação de Compliance',
                            filename: `Relatorio-Tecnova-${complaint.protocol}`,
                            protocol: complaint.protocol,
                            data: {
                                ...complaint,
                                actions: diaryActions
                            }
                        })}
                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
                        title="Exportar Relatório Profissional"
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
                                                <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Resumo Executivo</p>
                                                    <p className="text-sm text-slate-700 leading-relaxed">{complaint.aiAnalysis?.summary}</p>
                                                </div>

                                                {/* Suggested Verdict */}
                                                {complaint.aiAnalysis?.suggestedVerdict && 
                                                 complaint.aiAnalysis.suggestedVerdict !== "Investigação em curso" && (
                                                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg shadow-sm border-l-4 border-l-emerald-500">
                                                        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                                                            <CheckCircle className="h-3.5 w-3.5" />
                                                            Parecer Sugerido pela AuditorIA
                                                        </p>
                                                        <p className="text-base font-bold text-slate-900 leading-relaxed">
                                                            {complaint.aiAnalysis.suggestedVerdict}
                                                        </p>
                                                        <p className="text-[10px] text-emerald-600 mt-2 font-medium">
                                                            Evidências suficientes detectadas no diário de ações para esta conclusão.
                                                        </p>
                                                    </div>
                                                )}

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
                                                            <li key={idx} className="flex items-center justify-between gap-2.5 text-sm group">
                                                                <div className="flex items-start gap-2.5">
                                                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center mt-0.5">{idx + 1}</span>
                                                                    <span className="text-slate-700">{action}</span>
                                                                </div>
                                                                <button
                                                                    onClick={() => {
                                                                        setDiaryDescription(action);
                                                                        
                                                                        // Auto-detect type
                                                                        const lower = action.toLowerCase();
                                                                        if (lower.includes('entrevista') || lower.includes('ouvir')) setDiaryType('entrevista');
                                                                        else if (lower.includes('documento') || lower.includes('evidência') || lower.includes('arquivo')) setDiaryType('documento');
                                                                        else if (lower.includes('jurídico') || lower.includes('lei') || lower.includes('legal')) setDiaryType('juridico');
                                                                        else if (lower.includes('notific') || lower.includes('comunic')) setDiaryType('notificacao');
                                                                        else if (lower.includes('reunião') || lower.includes('comitê')) setDiaryType('reuniao');
                                                                        else if (lower.includes('afastamento') || lower.includes('suspensão')) setDiaryType('cautelar');
                                                                        else setDiaryType('ia_sugestao');

                                                                        // Scroll to diary section
                                                                        const diarySection = document.getElementById('diary-section');
                                                                        if (diarySection) {
                                                                            diarySection.scrollIntoView({ behavior: 'smooth' });
                                                                            // Highlight the diary form briefly
                                                                            const form = diarySection.querySelector('.bg-slate-50');
                                                                            if (form) {
                                                                                form.classList.add('ring-2', 'ring-indigo-500', 'ring-offset-2');
                                                                                setTimeout(() => form.classList.remove('ring-2', 'ring-indigo-500', 'ring-offset-2'), 2000);
                                                                            }
                                                                        }
                                                                    }}
                                                                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1"
                                                                    title="Usar esta sugestão no diário"
                                                                >
                                                                    <PlusCircle className="h-3 w-3" />
                                                                    USAR
                                                                </button>
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

                        {/* Gestão de Prazo (SLA) */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-white" />
                                    <h2 className="text-base font-semibold text-white">Gestão de Prazo (SLA)</h2>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Prazo de Conclusão (Deadline)</label>
                                        {complaint.deadline ? (
                                            <div className="flex items-center gap-3">
                                                <div className={`px-4 py-2 rounded-lg font-bold border ${new Date(complaint.deadline) < new Date() ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                                    {new Date(complaint.deadline).toLocaleDateString('pt-BR')}
                                                    {new Date(complaint.deadline) < new Date() && <span className="ml-2 text-xs font-semibold uppercase">(Atrasado)</span>}
                                                </div>
                                                <button 
                                                    onClick={() => handleUpdateDeadline(null)}
                                                    disabled={isUpdatingDeadline}
                                                    className="text-xs text-red-500 hover:text-red-700 underline"
                                                >
                                                    Remover prazo
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-slate-500 italic">Nenhum prazo definido.</div>
                                        )}
                                    </div>
                                    
                                    {complaint.aiAnalysis?.suggestedSla && !complaint.deadline && (
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1">
                                            <div className="flex items-start gap-3">
                                                <Sparkles className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-blue-800 font-medium mb-1">
                                                        A IA sugere um prazo de <span className="font-bold">{complaint.aiAnalysis.suggestedSla} dias</span> para este nível de risco.
                                                    </p>
                                                    <button
                                                        onClick={() => {
                                                            const deadline = new Date();
                                                            deadline.setDate(deadline.getDate() + complaint.aiAnalysis!.suggestedSla!);
                                                            handleUpdateDeadline(deadline);
                                                        }}
                                                        disabled={isUpdatingDeadline}
                                                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded font-medium transition"
                                                    >
                                                        {isUpdatingDeadline ? 'Aprovando...' : 'Aprovar Prazo Sugerido'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Manual deadline picker */}
                                    <div className="flex-1 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                                        <label className="block text-xs font-medium text-slate-500 mb-2">Definir prazo manualmente:</label>
                                        <input 
                                            type="date" 
                                            className="w-full text-sm rounded-lg border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    const date = new Date(e.target.value);
                                                    // adjust for timezone offset if needed to avoid saving previous day
                                                    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
                                                    handleUpdateDeadline(date);
                                                }
                                            }}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Diário de Investigação Interno */}
                        <div id="diary-section" className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-white" />
                                    <h2 className="text-base font-semibold text-white">Diário de Investigação</h2>
                                    <span className="text-xs bg-white/20 text-white/80 px-2 py-0.5 rounded-full">Interno</span>
                                </div>
                                {diaryActions.length > 0 && (
                                    <button
                                        onClick={handleReanalyzeWithContext}
                                        disabled={reanalyzingWithContext}
                                        className="flex items-center gap-1.5 text-xs bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
                                    >
                                        {reanalyzingWithContext
                                            ? <><Loader2 className="h-3 w-3 animate-spin" /> Analisando...</>
                                            : <><Sparkles className="h-3 w-3" /> Re-analisar com contexto</>
                                        }
                                    </button>
                                )}
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Form */}
                                <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 space-y-3">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Registrar nova medida</p>
                                    <div className="space-y-3">
                                        <div className="flex gap-3">
                                            <div className="w-1/3">
                                                <input
                                                    type="text"
                                                    placeholder="Autor"
                                                    value={diaryAuthor}
                                                    onChange={e => setDiaryAuthor(e.target.value)}
                                                    className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-100 outline-none"
                                                />
                                            </div>
                                            <div className="w-2/3 flex flex-wrap gap-2">
                                                {DIARY_TYPES.map((type) => {
                                                    const Icon = type.icon;
                                                    const isSelected = diaryType === type.value;
                                                    return (
                                                        <button
                                                            key={type.value}
                                                            onClick={() => setDiaryType(type.value)}
                                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                                                                isSelected 
                                                                ? `${type.bg} ${type.border} ${type.color} ring-2 ring-offset-1 ring-primary-200 shadow-sm`
                                                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                                                            }`}
                                                        >
                                                            <Icon className={`h-3.5 w-3.5 ${isSelected ? type.color : 'text-slate-400'}`} />
                                                            {type.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <textarea
                                        rows={3}
                                        placeholder="Descreva detalhadamente o que foi feito..."
                                        value={diaryDescription}
                                        onChange={e => setDiaryDescription(e.target.value)}
                                        className="w-full p-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-primary-100 outline-none resize-none"
                                    />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                id="diary-file"
                                                className="hidden"
                                                onChange={(e) => setSelectedDiaryFile(e.target.files?.[0] || null)}
                                            />
                                            <label
                                                htmlFor="diary-file"
                                                className="flex items-center gap-2 text-sm text-slate-600 hover:text-primary-600 cursor-pointer px-2 py-1 rounded hover:bg-slate-100 transition"
                                            >
                                                <Paperclip className="h-4 w-4" />
                                                {selectedDiaryFile ? selectedDiaryFile.name : 'Anexar evidência'}
                                            </label>
                                            {selectedDiaryFile && (
                                                <button onClick={() => setSelectedDiaryFile(null)} className="text-slate-400 hover:text-red-500">
                                                    <XCircle className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                        <button
                                            onClick={handleAddAction}
                                            disabled={savingAction || !diaryAuthor.trim() || !diaryDescription.trim()}
                                            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-40"
                                        >
                                            {savingAction ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <PlusCircle className="h-3.5 w-3.5" />}
                                            Registrar medida
                                        </button>
                                    </div>
                                </div>

                                {/* Timeline */}
                                {diaryActions.length === 0 ? (
                                    <p className="text-center text-sm text-slate-400 py-4">Nenhuma medida registrada ainda.</p>
                                ) : (
                                    <div className="relative">
                                        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200" />
                                        <div className="space-y-4">
                                            {diaryActions.map((action) => {
                                                const cfg = DIARY_TYPES.find(t => t.value === action.actionType) || DIARY_TYPES[DIARY_TYPES.length - 1]
                                                const Icon = cfg.icon;
                                                return (
                                                    <div key={action.id} className="pl-10 relative">
                                                        <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-slate-400 border-2 border-white" />
                                                        <div className="bg-slate-50 rounded-lg border border-slate-100 p-3.5">
                                                            <div className="flex items-center justify-between mb-1.5">
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
                                                                    <span className="text-xs font-medium text-slate-700">{action.authorName}</span>
                                                                </div>
                                                                <span className="text-xs text-slate-400">
                                                                    {new Date(action.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-slate-700 leading-relaxed">{action.description}</p>
                                                            {action.attachments && action.attachments.length > 0 && (
                                                                <div className="mt-3 space-y-2">
                                                                    {action.attachments.map((att: any) => (
                                                                        <a 
                                                                            key={att.id} 
                                                                            href={`/api/complaints/${protocol}/attachments/${att.id}`}
                                                                            target="_blank"
                                                                            className="flex items-center gap-2 p-2 bg-white rounded border border-slate-200 text-sm hover:bg-slate-50 transition max-w-sm"
                                                                        >
                                                                            <FileText className="h-4 w-4 text-slate-500" />
                                                                            <span className="truncate flex-1 text-slate-700">{att.filename}</span>
                                                                            <span className="text-[10px] text-slate-400">
                                                                                {att.size > 1024 * 1024 
                                                                                    ? `${(att.size / (1024 * 1024)).toFixed(1)} MB` 
                                                                                    : `${(att.size / 1024).toFixed(0)} KB`}
                                                                            </span>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
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
                                            <a href={`/api/complaints/${protocol}/attachments/${att.id}`} target="_blank" className="text-primary-600 hover:text-primary-800 text-sm font-medium px-2">
                                                Baixar
                                            </a>
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
                                            {msg.attachments && msg.attachments.length > 0 && (
                                                <div className="mt-2 space-y-2">
                                                    {msg.attachments.map((att: any) => (
                                                        <a 
                                                            key={att.id} 
                                                            href={`/api/complaints/${protocol}/attachments/${att.id}`}
                                                            target="_blank"
                                                            className={`flex items-center gap-2 p-2 rounded text-xs transition ${
                                                                msg.sender === 'comite' 
                                                                    ? 'bg-primary-700 hover:bg-primary-800 text-white border-primary-500 border' 
                                                                    : 'bg-white hover:bg-slate-50 border-slate-200 border text-slate-700'
                                                            }`}
                                                        >
                                                            <FileText className="h-3 w-3 shrink-0" />
                                                            <span className="truncate flex-1">{att.filename}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl">
                                {selectedChatFile && (
                                    <div className="flex items-center justify-between p-2 mb-2 bg-white rounded border border-slate-200 text-sm text-slate-700">
                                        <div className="flex items-center gap-2 truncate">
                                            <Paperclip className="h-4 w-4 shrink-0 text-slate-400" />
                                            <span className="truncate">{selectedChatFile.name}</span>
                                        </div>
                                        <button onClick={() => setSelectedChatFile(null)} className="text-slate-400 hover:text-red-500">
                                            <XCircle className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <input
                                        type="file"
                                        id="chat-file"
                                        className="hidden"
                                        onChange={(e) => setSelectedChatFile(e.target.files?.[0] || null)}
                                    />
                                    <label
                                        htmlFor="chat-file"
                                        className="flex items-center justify-center px-3 bg-white border border-slate-200 text-slate-500 hover:text-primary-600 cursor-pointer rounded-lg hover:bg-slate-50 transition shrink-0"
                                    >
                                        <Paperclip className="h-5 w-5" />
                                    </label>
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
                                        disabled={sendingMessage || (!newMessage.trim() && !selectedChatFile)}
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
