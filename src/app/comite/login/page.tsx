'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react'

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/comite'

    const [email, setEmail] = useState('admin@tecnova.ind.br')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [step, setStep] = useState<'credentials' | 'code'>('credentials')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmitCredentials = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Erro ao validar credenciais')
                setLoading(false)
                return
            }

            setStep('code')
        } catch (err) {
            setError('Erro ao conectar ao servidor')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitCode = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                email,
                password,
                code,
                redirect: false,
            })

            if (result?.error) {
                setError('Código incorreto ou expirado')
            } else {
                router.push(callbackUrl)
                router.refresh()
            }
        } catch (err) {
            setError('Erro ao validar código')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-authority flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <Image
                        src="/logo-tecnova.png"
                        alt="Tecnova"
                        width={240}
                        height={80}
                        className="mx-auto mb-6 h-20 w-auto"
                    />
                    <h1 className="text-2xl font-bold text-primary-900">
                        Comitê de Ética
                    </h1>
                    <p className="text-neutral-600 mt-2">
                        Acesso restrito aos membros do comitê
                    </p>
                </div>

                {step === 'credentials' ? (
                    <form onSubmit={handleSubmitCredentials} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                E-mail
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@tecnova.ind.br"
                                    className="input-field pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input-field pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Verificando...
                                </>
                            ) : (
                                <>
                                    <Lock className="h-5 w-5" />
                                    Entrar
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmitCode} className="space-y-6">
                        <div className="text-center p-4 bg-primary-50 rounded-lg border border-primary-100 mb-6">
                            <Mail className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                            <p className="text-sm text-primary-900">
                                Enviamos um código de 6 dígitos para o e-mail <strong>{email}</strong>.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2 text-center">
                                Código de Autenticação (2FA)
                            </label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="000000"
                                className="input-field text-center text-2xl tracking-widest font-mono py-3"
                                required
                                maxLength={6}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={loading || code.length < 6}
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Validando...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="h-5 w-5" />
                                        Acessar Painel
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep('credentials')}
                                disabled={loading}
                                className="text-sm text-primary-600 hover:text-primary-800 transition"
                            >
                                Voltar e tentar novamente
                            </button>
                        </div>
                    </form>
                )}

                <p className="text-center text-sm text-neutral-500 mt-6">
                    Canal de Denúncias Tecnova<br />
                    Acesso exclusivo para membros autorizados
                </p>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}
