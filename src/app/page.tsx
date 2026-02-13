'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Shield,
    Lock,
    Eye,
    FileText,
    ChevronRight,
    AlertTriangle,
    UserX,
    Scale,
    Heart,
    CheckCircle2,
    ArrowRight
} from 'lucide-react'

export default function HomePage() {
    const [showInfo, setShowInfo] = useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
            {/* Header */}
            <header className="bg-primary-900 text-white py-4">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo-hsc.png"
                            alt="Hospital São Carlos"
                            width={180}
                            height={60}
                            className="h-14 w-auto"
                        />
                        <h1 className="text-xl font-bold">Canal de Denúncias</h1>
                    </div>
                    <Link
                        href="/acompanhar"
                        className="text-primary-200 hover:text-white transition flex items-center gap-2"
                    >
                        <Eye className="h-4 w-4" />
                        Acompanhar Denúncia
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-primary-900 text-white py-16 pb-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Sua voz importa. Sua segurança é prioridade.
                    </h2>
                    <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
                        Este canal foi criado para você relatar irregularidades com total segurança
                        e confidencialidade, em conformidade com a Lei 14.457/22 e NR1.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/nova-denuncia?tipo=anonimo"
                            className="btn-secondary flex items-center gap-2"
                        >
                            <Lock className="h-5 w-5" />
                            Denunciar Anonimamente
                        </Link>
                        <Link
                            href="/nova-denuncia?tipo=identificado"
                            className="bg-white/20 text-white border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition flex items-center gap-2"
                        >
                            <UserX className="h-5 w-5" />
                            Identificar-me na Denúncia
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <a
                            href="http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/Lei/L14457.htm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-800/50 hover:bg-primary-800 text-primary-100 px-4 py-2 rounded-full transition flex items-center gap-2 text-sm border border-primary-700"
                        >
                            <FileText className="h-4 w-4" />
                            Ler Lei 14.457/22
                        </a>
                        <a
                            href="https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-paritaria-permanente-ctpp/arquivos-site-antigo-da-ctpp/normas-regulamentadoras/nr-01-atualizada-2022.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-800/50 hover:bg-primary-800 text-primary-100 px-4 py-2 rounded-full transition flex items-center gap-2 text-sm border border-primary-700"
                        >
                            <Shield className="h-4 w-4" />
                            Ler NR-01
                        </a>
                    </div>
                </div>
            </section>

            {/* Garantias */}
            <section className="max-w-6xl mx-auto px-4 -mt-12">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-card rounded-xl p-6 text-center animate-fadeIn">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="h-7 w-7 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">100% Seguro</h3>
                        <p className="text-neutral-600 text-sm">
                            Criptografia de ponta e sem rastreamento de IP para denúncias anônimas.
                        </p>
                    </div>

                    <div className="glass-card rounded-xl p-6 text-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="h-7 w-7 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Confidencial</h3>
                        <p className="text-neutral-600 text-sm">
                            Apenas o Comitê de Ética tem acesso aos relatos, sem interferência da diretoria.
                        </p>
                    </div>

                    <div className="glass-card rounded-xl p-6 text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Scale className="h-7 w-7 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Proteção Legal</h3>
                        <p className="text-neutral-600 text-sm">
                            Garantia de não-retaliação conforme Lei 14.457/22 e NR1.
                        </p>
                    </div>
                </div>
            </section>

            {/* O que pode ser denunciado */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-center mb-8 text-primary-900">
                    O que pode ser denunciado?
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-5 border border-neutral-200 hover:border-primary-300 transition">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Assédio Moral</h4>
                                <p className="text-sm text-neutral-600">
                                    Humilhações, isolamento, sobrecarga intencional e perseguição sistemática.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-neutral-200 hover:border-primary-300 transition">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center shrink-0">
                                <Heart className="h-5 w-5 text-pink-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Assédio Sexual</h4>
                                <p className="text-sm text-neutral-600">
                                    Propostas, comentários ou comportamentos de cunho sexual indesejados.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-neutral-200 hover:border-primary-300 transition">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">
                                <Scale className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Corrupção</h4>
                                <p className="text-sm text-neutral-600">
                                    Desvios, fraudes, propinas e irregularidades financeiras.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-neutral-200 hover:border-primary-300 transition">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <Shield className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Segurança do Paciente</h4>
                                <p className="text-sm text-neutral-600">
                                    Práticas que coloquem em risco a saúde ou integridade dos pacientes.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-neutral-200 hover:border-primary-300 transition">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                <FileText className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Violação de Normas</h4>
                                <p className="text-sm text-neutral-600">
                                    Descumprimento de protocolos, regulamentos e código de ética.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-neutral-200 hover:border-primary-300 transition">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
                                <ChevronRight className="h-5 w-5 text-neutral-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Outras Irregularidades</h4>
                                <p className="text-sm text-neutral-600">
                                    Qualquer conduta antiética que prejudique a instituição ou colaboradores.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infográfico: Entendendo o Assédio Moral */}
            <section className="bg-primary-50 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-2 text-primary-900">
                        Entendendo o Assédio Moral
                    </h2>
                    <p className="text-center text-neutral-600 mb-8">
                        Conforme orientações da NR1 sobre riscos psicossociais
                    </p>

                    <div className="bg-white rounded-xl p-8 shadow-sm">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold text-lg mb-4 text-red-700 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5" />
                                    O que É assédio moral:
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Conduta <strong>repetitiva e sistemática</strong> (não pontual)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Humilhações públicas ou privadas recorrentes</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Isolamento intencional do colaborador</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Sobrecarga de trabalho desproporcional</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Retirada de tarefas e esvaziamento de funções</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-500 mt-1">✗</span>
                                        <span>Ameaças e intimidações constantes</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-4 text-green-700 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5" />
                                    O que NÃO É assédio moral:
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Cobranças pontuais de metas ou resultados</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Feedback construtivo sobre desempenho</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Conflitos pontuais entre colegas</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Exercício legítimo do poder diretivo</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Advertências formais justificadas</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span>Reorganização de equipes e funções</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Como funciona */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-2xl font-bold text-center mb-8 text-primary-900">
                    Como funciona o processo?
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="bg-white rounded-xl p-6 text-center w-full md:w-48">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-900 font-bold text-xl">
                            1
                        </div>
                        <h4 className="font-semibold mb-1">Você denuncia</h4>
                        <p className="text-sm text-neutral-600">Preencha o formulário com os detalhes</p>
                    </div>

                    <ArrowRight className="h-6 w-6 text-neutral-400 hidden md:block" />

                    <div className="bg-white rounded-xl p-6 text-center w-full md:w-48">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-900 font-bold text-xl">
                            2
                        </div>
                        <h4 className="font-semibold mb-1">Recebe protocolo</h4>
                        <p className="text-sm text-neutral-600">Código único para acompanhar</p>
                    </div>

                    <ArrowRight className="h-6 w-6 text-neutral-400 hidden md:block" />

                    <div className="bg-white rounded-xl p-6 text-center w-full md:w-48">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-900 font-bold text-xl">
                            3
                        </div>
                        <h4 className="font-semibold mb-1">Análise do Comitê</h4>
                        <p className="text-sm text-neutral-600">Investigação sigilosa</p>
                    </div>

                    <ArrowRight className="h-6 w-6 text-neutral-400 hidden md:block" />

                    <div className="bg-white rounded-xl p-6 text-center w-full md:w-48">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-900 font-bold text-xl">
                            4
                        </div>
                        <h4 className="font-semibold mb-1">Resposta</h4>
                        <p className="text-sm text-neutral-600">Retorno sobre providências</p>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="bg-primary-900 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Pronto para fazer sua denúncia?</h2>
                    <p className="text-primary-200 mb-8">
                        Sua coragem em reportar pode proteger você e seus colegas.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/nova-denuncia?tipo=anonimo"
                            className="btn-secondary flex items-center gap-2"
                        >
                            <Lock className="h-5 w-5" />
                            Denunciar Anonimamente
                        </Link>
                        <Link
                            href="/nova-denuncia?tipo=identificado"
                            className="bg-white/20 text-white border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition flex items-center gap-2"
                        >
                            <UserX className="h-5 w-5" />
                            Identificar-me
                        </Link>
                    </div>
                </div>
            </section>

            {/* Disclaimer: Gestão vs Assédio */}
            <section className="bg-neutral-100 py-12 border-t border-neutral-200">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Scale className="h-6 w-6 text-neutral-600" />
                        <h2 className="text-xl font-bold text-neutral-800">
                            Sobre Cobrança de Metas e Gestão
                        </h2>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-primary-900 border-y border-r border-neutral-200">
                        <p className="text-neutral-700 mb-4 leading-relaxed">
                            O Canal de Denúncias é uma ferramenta para combater desvios de conduta graves. Ressaltamos que o exercício regular da gestão — incluindo a <strong>cobrança por produtividade</strong>, o cumprimento de <strong>horários</strong> e a exigência de <strong>padrões de qualidade</strong> — <strong>não configura assédio moral</strong>.
                        </p>
                        <p className="text-neutral-700 leading-relaxed">
                            O contrato de trabalho confere à empresa o direito de dirigir a prestação de serviços. Denúncias devem focar em situações de abuso de autoridade, constrangimento ilegal ou violação de direitos, e não em insatisfações com o modelo de gestão legítimo.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-800 text-neutral-400 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-neutral-500 text-sm">Canal de Denúncias</span>
                        </div>
                        <p className="text-sm text-center md:text-right">
                            Em conformidade com Lei 14.457/22 e NR1.<br />
                            © 2024 DM Consultoria em TI Ltda. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
