'use client'

import { useState, useRef, useEffect } from 'react'
import { Heart, X, Send, MessageCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

const KNOWLEDGE_BASE = [
    {
        keywords: ['assedio', 'moral', 'humilhação', 'gritos', 'xingamento', 'ignorar'],
        response: "Sinto muito que você esteja passando por uma situação difícil ou buscando informações sobre isso. O assédio moral geralmente envolve condutas repetitivas que expõem a pessoa a situações humilhantes ou constrangedoras. Se você está se sentindo desconfortável, saiba que este é um espaço seguro para relatar o que está acontecendo.",
    },
    {
        keywords: ['sexual', 'toque', 'prazer', 'intimo', 'íntimo', 'beijo', 'proposta'],
        response: "É fundamental que você se sinta seguro(a) em seu ambiente de trabalho. O assédio sexual pode ser definido como qualquer conduta de natureza sexual não desejada. Se você tem dúvidas ou se sentiu invadido(a), estou aqui para explicar e acolher, garantindo seu total sigilo e proteção.",
    },
    {
        keywords: ['anonimo', 'anônimo', 'identidade', 'nome', 'seguro', 'descobrir', 'ip'],
        response: "Sua tranquilidade é nossa prioridade absoluta. O canal de denúncias oferece a opção 100% anônima, onde nenhuma informação pessoal ou digital (como IP) é registrada. Você pode fazer seu relato com a certeza de que sua identidade estará protegida.",
    },
    {
        keywords: ['corrupção', 'propina', 'dinheiro', 'desvio', 'roubo'],
        response: "A integridade é um valor essencial. Se você presenciou ou suspeita de atos como desvio de recursos, pagamentos indevidos ou fraudes, seu relato é vital. Garantimos confidencialidade total para que você possa reportar essas situações sem medo.",
    },
    {
        keywords: ['acompanhar', 'ver', 'status', 'resposta', 'protocolo'],
        response: "Para acompanhar um relato, você precisa do número de protocolo gerado ao final da denúncia. Com ele, basta acessar a opção 'Acompanhar' na tela inicial. Se você perdeu o protocolo de uma denúncia anônima, infelizmente não é possível recuperá-lo por segurança, mas você pode fazer um novo relato.",
    },
    {
        keywords: ['lei', '14457', 'nr1', 'cipa'],
        response: "A Lei 14.457/22 e a NR-1 reforçam o compromisso das empresas com um ambiente de trabalho seguro e livre de violências, especialmente para mulheres. Este canal é uma das ferramentas para garantir que esses direitos sejam respeitados na prática.",
    }
]

const DEFAULT_RESPONSE = "Entendo sua dúvida. Como sou um assistente virtual focado em acolhimento e orientações básicas, talvez eu não tenha essa resposta específica agora. Mas lembre-se: você pode usar o canal para relatar qualquer situação que julgue incorreta ou que te cause desconforto, e o Comitê analisará com todo cuidado."

const WELCOME_MESSAGE = "Olá, eu sou o Carlitos! 💙 Estou aqui para acolher você com segurança, discrição e sem pressão. Se tiver dúvidas sobre os tipos de denúncia, anonimato ou como funciona o processo, pode me perguntar. Como posso ajudar você a se sentir mais tranquilo(a) hoje?"

export function CarlitosAssistant() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [mounted, setMounted] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setMounted(true)
        setMessages([
            {
                id: 'welcome',
                text: WELCOME_MESSAGE,
                sender: 'bot',
                timestamp: new Date()
            }
        ])
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        if (isOpen) {
            scrollToBottom()
        }
    }, [messages, isOpen])

    if (!mounted) return null

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault()

        if (!inputValue.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue('')
        setIsTyping(true)

        // Simulate processing delay for natural feel
        setTimeout(() => {
            const lowerInput = userMessage.text.toLowerCase()
            let matchedResponse = DEFAULT_RESPONSE

            for (const item of KNOWLEDGE_BASE) {
                if (item.keywords.some(k => lowerInput.includes(k))) {
                    matchedResponse = item.response
                    break
                }
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: matchedResponse,
                sender: 'bot',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, botMessage])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
            {/* Chat Window */}
            <div
                className={cn(
                    "bg-white rounded-2xl shadow-2xl border border-primary-100 overflow-hidden transition-all duration-300 origin-bottom-right w-[350px] max-w-[90vw]",
                    isOpen ? "scale-100 opacity-100 mb-2" : "scale-0 opacity-0 h-0 w-0 mb-0"
                )}
            >
                {/* Header */}
                <div className="bg-primary-900 p-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white/20">
                            <Heart className="h-6 w-6 text-primary-900 fill-primary-900 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">Carlitos</h3>
                            <p className="text-xs text-primary-200 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full block"></span>
                                Assistente Virtual
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="h-[400px] overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                                msg.sender === 'user'
                                    ? "bg-primary-100 text-primary-900 self-end rounded-tr-none"
                                    : "bg-white text-slate-700 self-start rounded-tl-none border border-slate-100"
                            )}
                        >
                            {msg.sender === 'bot' && (
                                <p className="text-[10px] font-bold text-primary-500 mb-1 uppercase tracking-wider">Carlitos</p>
                            )}
                            {msg.text}
                            <p className="text-[10px] opacity-50 mt-1 text-right">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="bg-white text-slate-500 self-start rounded-2xl rounded-tl-none border border-slate-100 p-3 shadow-sm flex gap-1 items-center">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Digite sua dúvida..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all text-slate-800 placeholder:text-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-primary-900 text-white p-2.5 rounded-full hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                        <Send className="h-5 w-5 ml-0.5" />
                    </button>
                </form>

                {/* Disclaimer Footer */}
                <div className="bg-slate-50 px-4 py-2 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                        <Info className="h-3 w-3" />
                        Suas conversas não são gravadas.
                    </p>
                </div>
            </div>

            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "group relative flex items-center justify-center w-16 h-16 bg-white text-primary-900 shadow-lg transition-transform hover:scale-110 active:scale-95 border-2 border-primary-100",
                    // Heart shape using clip-path could be used, but a rounded button with a large heart icon is cleaner and more accessible for a chat button
                    "rounded-full"
                )}
                aria-label="Abrir assistente virtual Carlitos"
            >
                {/* Heart Pulse Effect */}
                <div className="absolute inset-0 rounded-full border-2 border-primary-200 animate-ping opacity-20 group-hover:opacity-40"></div>

                {isOpen ? (
                    <X className="h-8 w-8 transition-transform" />
                ) : (
                    <Heart className="h-8 w-8 text-primary-900 fill-primary-900 animate-pulse drop-shadow-sm" />
                )}

                {/* Notification Badge if closed (optional logic could go here) */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                    </span>
                )}
            </button>
        </div>
    )
}
