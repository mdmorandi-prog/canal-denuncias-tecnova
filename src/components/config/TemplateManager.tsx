'use client'

import { useState, useEffect } from 'react'
import { Save, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react'

interface EmailTemplate {
    id: string
    type: string
    subject: string
    body: string
}

export function TemplateManager() {
    const [templates, setTemplates] = useState<EmailTemplate[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Controlled state for current edits
    const [activeTemplate, setActiveTemplate] = useState<string>('RECEIVED')
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        fetchTemplates()
    }, [])

    const fetchTemplates = async () => {
        try {
            const res = await fetch('/api/config/templates')
            if (res.ok) {
                const data = await res.json()
                setTemplates(data)

                // Initialize form with 'RECEIVED' template if it exists
                const initial = data.find((t: EmailTemplate) => t.type === 'RECEIVED')
                if (initial) {
                    setSubject(initial.subject)
                    setBody(initial.body)
                }
            }
        } catch (err) {
            setError('Erro ao carregar templates')
        } finally {
            setLoading(false)
        }
    }

    const handleSelectTemplate = (type: string) => {
        setActiveTemplate(type)
        const found = templates.find(t => t.type === type)
        if (found) {
            setSubject(found.subject)
            setBody(found.body)
        } else {
            setSubject('')
            setBody('')
        }
        setError('')
        setSuccess('')
    }

    const handleSave = async () => {
        if (!subject || !body) {
            setError('Assunto e corpo do e-mail são obrigatórios.')
            return
        }

        setSaving(true)
        setError('')
        setSuccess('')

        try {
            const res = await fetch('/api/config/templates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: activeTemplate,
                    subject,
                    body
                })
            })

            if (!res.ok) throw new Error('Falha ao salvar template')

            setSuccess('Template salvo com sucesso!')
            setTimeout(() => setSuccess(''), 3000)

            // Refresh list behind the scenes
            fetchTemplates()

        } catch (err) {
            setError('Erro salvar as informações. Tente novamente.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center p-12">
                <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row min-h-[500px]">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-neutral-50 border-r border-neutral-200 p-4">
                <h3 className="text-sm font-bold text-neutral-800 mb-4 uppercase tracking-wider">Modelos Disponíveis</h3>
                <nav className="space-y-2">
                    <button
                        onClick={() => handleSelectTemplate('RECEIVED')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTemplate === 'RECEIVED' ? 'bg-primary-100 text-primary-800' : 'text-neutral-600 hover:bg-neutral-200'
                            }`}
                    >
                        Denúncia Recebida
                    </button>
                    <button
                        onClick={() => handleSelectTemplate('STATUS_UPDATE')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTemplate === 'STATUS_UPDATE' ? 'bg-primary-100 text-primary-800' : 'text-neutral-600 hover:bg-neutral-200'
                            }`}
                    >
                        Atualização de Status
                    </button>
                    <button
                        onClick={() => handleSelectTemplate('RESOLVED')}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTemplate === 'RESOLVED' ? 'bg-primary-100 text-primary-800' : 'text-neutral-600 hover:bg-neutral-200'
                            }`}
                    >
                        Denúncia Concluída
                    </button>
                </nav>
            </div>

            {/* Editor Area */}
            <div className="flex-1 p-6 lg:p-8 flex flex-col">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                        {activeTemplate === 'RECEIVED' ? 'Template: Denúncia Recebida' :
                            activeTemplate === 'STATUS_UPDATE' ? 'Template: Atualização de Status' :
                                'Template: Denúncia Concluída'}
                    </h2>
                    <p className="text-sm text-neutral-500">
                        Variáveis dinâmicas suportadas (use chaves duplas): {'{{protocol}}'}, {'{{status}}'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2 border border-red-100 mb-6">
                        <AlertTriangle className="h-5 w-5 shrink-0" />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2 border border-green-100 mb-6 animate-fadeIn">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        {success}
                    </div>
                )}

                <div className="space-y-6 flex-1">
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Assunto do E-mail
                        </label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="ex: Atualização no Protocolo {{protocol}}"
                            className="input-field w-full font-medium"
                        />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <label className="block text-sm font-medium text-neutral-700 mb-2 flex justify-between">
                            Corpo do E-mail (HTML)
                        </label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="input-field w-full font-mono text-sm leading-relaxed flex-1 min-h-[250px] resize-y"
                            placeholder="<div><h2>Olá!</h2><p>Seu protocolo {{protocol}} foi atualizado.</p></div>"
                        />
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn-primary flex items-center gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <Save className="h-5 w-5" />
                                Salvar Escopo
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
