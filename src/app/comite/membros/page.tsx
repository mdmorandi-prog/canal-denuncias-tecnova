'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
    ChevronLeft, Plus, User, Mail, Shield, ShieldAlert,
    Edit2, Trash2, LogOut, Loader2, AlertTriangle, CheckCircle2, Save
} from 'lucide-react'
import { getMembers, createMember, updateMember, deleteMember } from './actions'

type Member = {
    id: string
    name: string
    email: string
    role: "admin" | "member" | "auditor" | string
    active: boolean
    createdAt: Date
}

export default function MembrosPage() {
    const router = useRouter()
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState(true)

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    // Form state
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: '',
        password: '',
        role: 'member',
        active: true
    })

    useEffect(() => {
        fetchMembers()
    }, [])

    const fetchMembers = async () => {
        setLoading(true)
        const result = await getMembers()
        if (result.success && result.data) {
            setMembers(result.data as Member[])
        } else {
            setError(result.error || 'Erro ao carregar membros')
        }
        setLoading(false)
    }

    const openCreateModal = () => {
        setIsEditing(false)
        setFormData({ id: '', name: '', email: '', password: '', role: 'member', active: true })
        setError('')
        setSuccess('')
        setIsModalOpen(true)
    }

    const openEditModal = (member: Member) => {
        setIsEditing(true)
        setFormData({
            id: member.id,
            name: member.name,
            email: member.email,
            password: '', // Don't populate password
            role: member.role,
            active: member.active
        })
        setError('')
        setSuccess('')
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Tem certeza que deseja remover permanentemente o usuário ${name}?`)) return

        setLoading(true)
        const result = await deleteMember(id)
        if (result.success) {
            setSuccess('Usuário removido com sucesso')
            fetchMembers()
        } else {
            alert(result.error || 'Erro ao remover usuário')
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError('')
        setSuccess('')

        try {
            const submitData = {
                ...formData,
                role: formData.role as "admin" | "member" | "auditor"
            }

            const result = isEditing
                ? await updateMember(formData.id, submitData)
                : await createMember(submitData)

            if (result.success) {
                setSuccess(isEditing ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!')
                fetchMembers()
                setTimeout(() => {
                    setIsModalOpen(false)
                    setSuccess('')
                }, 1500)
            } else {
                setError(result.error || 'Erro ao salvar usuário')
            }
        } catch (err) {
            setError('Erro inesperado ocorreu.')
        } finally {
            setSaving(false)
        }
    }

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin':
                return <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit"><ShieldAlert className="h-3 w-3" /> Admin</span>
            case 'auditor':
                return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit"><Shield className="h-3 w-3" /> Auditor</span>
            default:
                return <span className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit"><User className="h-3 w-3" /> Membro</span>
        }
    }

    if (loading && members.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <Loader2 className="animate-spin h-8 w-8 text-primary-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-neutral-100">
            {/* Header */}
            <header className="bg-primary-900 text-white py-4 shadow-md">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/comite" className="flex items-center gap-2 text-primary-200 hover:text-white transition">
                            <ChevronLeft className="h-5 w-5" />
                            Voltar
                        </Link>
                        <h1 className="text-xl font-bold border-l border-primary-700 pl-4">
                            Gestão do Comitê
                        </h1>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/comite/login' })}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-200 hover:text-red-100 p-2 rounded-lg transition flex items-center gap-2"
                        title="Sair do sistema"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium hidden sm:inline">Sair</span>
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-800">Membros Autorizados</h2>
                        <p className="text-neutral-500 text-sm mt-1">Gerencie os acessos ao painel de denúncias</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Novo Membro
                    </button>
                </div>

                {success && !isModalOpen && (
                    <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2 border border-green-100 animate-fadeIn">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        {success}
                    </div>
                )}

                {error && !isModalOpen && (
                    <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2 border border-red-100 animate-fadeIn">
                        <AlertTriangle className="h-5 w-5 shrink-0" />
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-50 border-b border-neutral-200">
                                <tr>
                                    <th className="text-left p-4 text-sm font-medium text-neutral-600">Nome</th>
                                    <th className="text-left p-4 text-sm font-medium text-neutral-600">Contato</th>
                                    <th className="text-left p-4 text-sm font-medium text-neutral-600">Função</th>
                                    <th className="text-center p-4 text-sm font-medium text-neutral-600">Status</th>
                                    <th className="text-right p-4 text-sm font-medium text-neutral-600">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-neutral-500">
                                            Nenhum membro encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    members.map((member) => (
                                        <tr key={member.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition">
                                            <td className="p-4">
                                                <div className="font-medium text-neutral-900">{member.name}</div>
                                                <div className="text-xs text-neutral-500">
                                                    Criado em {new Date(member.createdAt).toLocaleDateString('pt-BR')}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 text-neutral-600 text-sm">
                                                    <Mail className="h-4 w-4 shrink-0 text-neutral-400" />
                                                    {member.email}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {getRoleBadge(member.role)}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className={`inline-flex h-2.5 w-2.5 rounded-full ${member.active ? 'bg-green-500' : 'bg-red-500'}`} title={member.active ? 'Ativo' : 'Inativo'}></span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(member)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(member.id, member.name)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal de Criação / Edição */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-5 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
                            <h3 className="text-lg font-bold text-neutral-800">
                                {isEditing ? 'Editar Membro' : 'Novo Membro do Comitê'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-neutral-400 hover:text-neutral-600 transition"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            {error && (
                                <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg flex items-center gap-2 border border-red-100 text-sm font-medium">
                                    <AlertTriangle className="h-4 w-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 border border-green-100 text-sm font-medium">
                                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                                    {success}
                                </div>
                            )}

                            <form id="member-form" onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Nome Completo</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="input-field w-full"
                                        required
                                        minLength={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">E-mail Corporativo</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="input-field w-full"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                                        Senha de Acesso {isEditing && <span className="text-neutral-400 text-xs font-normal">(deixe em branco para não alterar)</span>}
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                        className="input-field w-full"
                                        required={!isEditing}
                                        minLength={6}
                                        placeholder={isEditing ? '••••••••' : 'No mínimo 6 caracteres'}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Função</label>
                                        <select
                                            value={formData.role}
                                            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                            className="input-field w-full bg-white"
                                        >
                                            <option value="member">Membro Padrão</option>
                                            <option value="auditor">Auditor (Leitura)</option>
                                            <option value="admin">Administrador</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                                        <select
                                            value={formData.active ? 'true' : 'false'}
                                            onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.value === 'true' }))}
                                            className="input-field w-full bg-white"
                                        >
                                            <option value="true">Ativo</option>
                                            <option value="false">Bloqueado</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-5 border-t border-neutral-200 bg-neutral-50 flex justify-end gap-3 rounded-b-xl">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 font-medium hover:bg-neutral-100 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                form="member-form"
                                disabled={saving}
                                className="btn-primary flex items-center gap-2 min-w-[120px] justify-center"
                            >
                                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                {saving ? "Salvando..." : "Salvar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
