'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
    Shield,
    Lock,
    User,
    ChevronLeft,
    Upload,
    AlertCircle,
    CheckCircle,
    X,
    FileText,
    Loader2
} from 'lucide-react'

const TIPOS_OCORRENCIA = [
    { value: 'assedio_moral', label: 'Assédio Moral', desc: 'Humilhações, isolamento, perseguição' },
    { value: 'assedio_sexual', label: 'Assédio Sexual', desc: 'Propostas ou comportamentos sexuais indesejados' },
    { value: 'corrupcao', label: 'Corrupção', desc: 'Fraudes, desvios, propinas' },
    { value: 'seguranca_paciente', label: 'Segurança do Paciente', desc: 'Práticas que colocam pacientes em risco' },
    { value: 'violacao_normas', label: 'Violação de Normas', desc: 'Descumprimento de protocolos e regras' },
    { value: 'outros', label: 'Outros', desc: 'Outras irregularidades' },
]

const TURNOS = [
    { value: 'manha', label: 'Manhã' },
    { value: 'tarde', label: 'Tarde' },
    { value: 'noite', label: 'Noite' },
    { value: 'integral', label: 'Integral (8:45h)' },
]

function NovaDenunciaContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tipo = searchParams.get('tipo') || 'anonimo'
    const isAnonimo = tipo === 'anonimo'

    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [protocol, setProtocol] = useState('')
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        type: '',
        sector: '',
        shift: '',
        occurrenceDate: '',
        accusedName: '',
        accusedPosition: '',
        description: '',
        witnesses: '',
        reporterName: '',
        reporterEmail: '',
        reporterPhone: '',
        wantsResponse: false,
    })

    const [files, setFiles] = useState<File[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setFiles(prev => [...prev, ...newFiles].slice(0, 5)) // Max 5 files
        }
    }

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    isAnonymous: isAnonimo,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao enviar denúncia')
            }

            setProtocol(data.protocol)
            setSuccess(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao enviar denúncia')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>

                    <h1 className="text-2xl font-bold text-primary-900 mb-2">
                        Denúncia Registrada!
                    </h1>
                    <p className="text-neutral-600 mb-6">
                        Sua denúncia foi recebida com sucesso e será analisada pelo Comitê de Ética.
                    </p>

                    <div className="bg-primary-50 rounded-xl p-6 mb-6">
                        <p className="text-sm text-primary-700 mb-2">Seu protocolo de acompanhamento:</p>
                        <p className="text-3xl font-mono font-bold text-primary-900 tracking-wider">
                            {protocol}
                        </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
                        <div className="flex gap-3">
                            <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                            <div className="text-sm text-yellow-800">
                                <p className="font-semibold mb-1">Importante:</p>
                                <p>Guarde este protocolo em local seguro. Ele é a única forma de acompanhar sua denúncia.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link
                            href={`/acompanhar?protocolo=${protocol}`}
                            className="btn-primary w-full text-center"
                        >
                            Acompanhar Denúncia
                        </Link>
                        <Link
                            href="/"
                            className="text-primary-600 hover:text-primary-800"
                        >
                            Voltar ao início
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
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

            {/* Form Container */}
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Tipo de denúncia badge */}
                <div className="flex justify-center mb-6">
                    {isAnonimo ? (
                        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            <span className="font-medium">Denúncia Anônima</span>
                        </div>
                    ) : (
                        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="font-medium">Denúncia Identificada</span>
                        </div>
                    )}
                </div>

                <h1 className="text-2xl font-bold text-center text-primary-900 mb-2">
                    Registrar Denúncia
                </h1>
                <p className="text-center text-neutral-600 mb-8">
                    Preencha os campos abaixo com o máximo de detalhes possível.
                </p>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${step >= s ? 'bg-primary-900 text-white' : 'bg-neutral-200 text-neutral-500'
                                    }`}>
                                    {s}
                                </div>
                                {s < 3 && <div className={`w-12 h-1 ${step > s ? 'bg-primary-900' : 'bg-neutral-200'}`} />}
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        {/* Step 1: Tipo e Local */}
                        {step === 1 && (
                            <div className="space-y-6 animate-fadeIn">
                                <h2 className="text-lg font-semibold text-primary-900 mb-4">
                                    Informações da Ocorrência
                                </h2>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Tipo de Ocorrência *
                                    </label>
                                    <div className="grid gap-3">
                                        {TIPOS_OCORRENCIA.map((tipo) => (
                                            <label
                                                key={tipo.value}
                                                className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition ${formData.type === tipo.value
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-neutral-200 hover:border-neutral-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={tipo.value}
                                                    checked={formData.type === tipo.value}
                                                    onChange={handleChange}
                                                    className="mt-1"
                                                />
                                                <div>
                                                    <span className="font-medium">{tipo.label}</span>
                                                    <p className="text-sm text-neutral-500">{tipo.desc}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Setor / Departamento
                                    </label>
                                    <input
                                        type="text"
                                        name="sector"
                                        value={formData.sector}
                                        onChange={handleChange}
                                        placeholder="Ex: UTI, Emergência, Administrativo"
                                        className="input-field"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Data da Ocorrência
                                        </label>
                                        <input
                                            type="date"
                                            name="occurrenceDate"
                                            value={formData.occurrenceDate}
                                            onChange={handleChange}
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Turno
                                        </label>
                                        <select
                                            name="shift"
                                            value={formData.shift}
                                            onChange={handleChange}
                                            className="input-field"
                                        >
                                            <option value="">Selecione...</option>
                                            {TURNOS.map((t) => (
                                                <option key={t.value} value={t.value}>{t.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Detalhes */}
                        {step === 2 && (
                            <div className="space-y-6 animate-fadeIn">
                                <h2 className="text-lg font-semibold text-primary-900 mb-4">
                                    Detalhes da Denúncia
                                </h2>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Nome do Denunciado (se conhecido)
                                        </label>
                                        <input
                                            type="text"
                                            name="accusedName"
                                            value={formData.accusedName}
                                            onChange={handleChange}
                                            placeholder="Nome da pessoa envolvida"
                                            className="input-field"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Cargo / Função do Denunciado
                                        </label>
                                        <input
                                            type="text"
                                            name="accusedPosition"
                                            value={formData.accusedPosition}
                                            onChange={handleChange}
                                            placeholder="Ex: Enfermeiro Chefe, Gerente"
                                            className="input-field"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Descrição Detalhada *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Descreva o ocorrido com o máximo de detalhes: o que aconteceu, quando, como, quem estava presente..."
                                        rows={6}
                                        className="input-field resize-none"
                                        required
                                    />
                                    <p className="text-sm text-neutral-500 mt-1">
                                        {formData.description.length} / 5000 caracteres
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Testemunhas (se houver)
                                    </label>
                                    <textarea
                                        name="witnesses"
                                        value={formData.witnesses}
                                        onChange={handleChange}
                                        placeholder="Nomes de pessoas que presenciaram o fato"
                                        rows={2}
                                        className="input-field resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                                        Evidências (opcional)
                                    </label>
                                    <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary-400 transition">
                                        <input
                                            type="file"
                                            multiple
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                                            <p className="text-neutral-600">
                                                Clique para anexar arquivos
                                            </p>
                                            <p className="text-sm text-neutral-400 mt-1">
                                                PDF, Word, imagens ou áudios (máx. 10MB cada, até 5 arquivos)
                                            </p>
                                        </label>
                                    </div>

                                    {files.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {files.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-neutral-50 rounded-lg p-3">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-5 w-5 text-neutral-400" />
                                                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                                                        <span className="text-xs text-neutral-400">
                                                            ({(file.size / 1024).toFixed(1)} KB)
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="text-neutral-400 hover:text-red-500"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Contato (se identificado) ou Confirmação */}
                        {step === 3 && (
                            <div className="space-y-6 animate-fadeIn">
                                <h2 className="text-lg font-semibold text-primary-900 mb-4">
                                    {isAnonimo ? 'Confirmação' : 'Seus Dados'}
                                </h2>

                                {!isAnonimo && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                                Seu Nome *
                                            </label>
                                            <input
                                                type="text"
                                                name="reporterName"
                                                value={formData.reporterName}
                                                onChange={handleChange}
                                                placeholder="Nome completo"
                                                className="input-field"
                                                required={!isAnonimo}
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                                    E-mail
                                                </label>
                                                <input
                                                    type="email"
                                                    name="reporterEmail"
                                                    value={formData.reporterEmail}
                                                    onChange={handleChange}
                                                    placeholder="seu@email.com"
                                                    className="input-field"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                                    Telefone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="reporterPhone"
                                                    value={formData.reporterPhone}
                                                    onChange={handleChange}
                                                    placeholder="(00) 00000-0000"
                                                    className="input-field"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {isAnonimo && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <Lock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                            <div className="text-sm text-blue-800">
                                                <p className="font-semibold mb-1">Denúncia 100% Anônima</p>
                                                <p>Sua identidade não será registrada. O sistema não armazena IP ou qualquer dado que permita sua identificação.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="wantsResponse"
                                        name="wantsResponse"
                                        checked={formData.wantsResponse}
                                        onChange={handleChange}
                                        className="mt-1"
                                    />
                                    <label htmlFor="wantsResponse" className="text-sm text-neutral-700">
                                        Desejo receber retorno sobre a apuração desta denúncia
                                        {isAnonimo && ' (você poderá consultar pelo protocolo)'}
                                    </label>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex gap-3">
                                        <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                                        <div className="text-sm text-yellow-800">
                                            <p className="font-semibold mb-1">Declaração de Veracidade</p>
                                            <p>Ao enviar esta denúncia, declaro que as informações prestadas são verdadeiras e que estou ciente de que denúncias falsas podem gerar responsabilização civil e criminal.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <div className="flex gap-3">
                                <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="btn-secondary"
                            >
                                Voltar
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={() => {
                                    if (step === 1 && !formData.type) {
                                        setError('Selecione o tipo de ocorrência')
                                        return
                                    }
                                    if (step === 2 && !formData.description) {
                                        setError('Preencha a descrição da denúncia')
                                        return
                                    }
                                    setError('')
                                    setStep(step + 1)
                                }}
                                className="btn-primary"
                            >
                                Continuar
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="h-5 w-5" />
                                        Enviar Denúncia
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function NovaDenunciaPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
            </div>
        }>
            <NovaDenunciaContent />
        </Suspense>
    )
}
