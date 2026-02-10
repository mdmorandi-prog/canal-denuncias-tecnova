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

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError('E-mail ou senha incorretos')
            } else {
                router.push(callbackUrl)
                router.refresh()
            }
        } catch (err) {
            setError('Erro ao fazer login')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <Image
                        src="/logo-hsc.png"
                        alt="Hospital São Carlos"
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

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                placeholder="seu@email.com"
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
                                Entrando...
                            </>
                        ) : (
                            <>
                                <Lock className="h-5 w-5" />
                                Entrar
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-neutral-500 mt-6">
                    Canal de Denúncias HSC<br />
                    Acesso exclusivo para membros autorizados
                </p>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-b from-primary-900 to-primary-800 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}
