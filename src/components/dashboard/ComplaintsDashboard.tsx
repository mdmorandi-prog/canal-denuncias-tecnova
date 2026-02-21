'use client'

import { useState, useEffect } from 'react'
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts'
import {
    AlertTriangle, CheckCircle, Clock,
    FileText, Activity, Loader2, Calendar
} from 'lucide-react'

interface KPIStats {
    total: number
    open: number
    closed: number
    procedentes: number
    improcedentes: number
    averageSlaClosed: number
}

interface TypeData {
    name: string
    value: number
}

interface MonthlyData {
    month: string
    total: number
    procedente: number
    improcedente: number
    open: number
}

interface DashboardData {
    kpis: KPIStats
    typeData: TypeData[]
    monthlyData: MonthlyData[]
}

const COLORS = ['#1e3a5f', '#ef4444', '#f59e0b', '#10b981', '#6366f1', '#8b5cf6']

const TIPO_LABELS: Record<string, string> = {
    assedio_moral: 'Assédio Moral',
    assedio_sexual: 'Assédio Sexual',
    corrupcao: 'Corrupção',
    seguranca_paciente: 'Segurança do Paciente',
    violacao_normas: 'Violação de Normas',
    outros: 'Outros',
}

export function ComplaintsDashboard() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Filters
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const fetchData = async () => {
        setLoading(true)
        setError('')
        try {
            let url = '/api/complaints/stats'
            const params = new URLSearchParams()
            if (startDate) params.append('startDate', startDate)
            if (endDate) params.append('endDate', endDate)
            if (params.toString()) url += `?${params.toString()}`

            const res = await fetch(url)
            if (!res.ok) throw new Error('Falha ao buscar dados do painel')

            const json = await res.json()

            // Format labels for charts
            if (json.typeData) {
                json.typeData = json.typeData.map((d: any) => ({
                    ...d,
                    name: TIPO_LABELS[d.name] || d.name
                }))
            }

            if (json.monthlyData) {
                json.monthlyData = json.monthlyData.map((d: any) => {
                    const [year, month] = d.month.split('-')
                    return {
                        ...d,
                        label: `${month}/${year}`
                    }
                })
            }

            setData(json)
        } catch (err: any) {
            setError(err.message || 'Erro desconhecido')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [startDate, endDate])

    if (loading && !data) return (
        <div className="flex justify-center items-center p-12 bg-white rounded-xl shadow-sm border border-slate-100">
            <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
        </div>
    )

    if (error) return (
        <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 font-medium text-center">
            {error}
        </div>
    )

    if (!data) return null

    return (
        <div className="space-y-6 mb-8">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary-600" />
                    Métricas Gerais
                </h2>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <input
                            type="date"
                            className="bg-transparent text-sm text-slate-700 outline-none"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className="text-slate-400">até</span>
                        <input
                            type="date"
                            className="bg-transparent text-sm text-slate-700 outline-none"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        {(startDate || endDate) && (
                            <button
                                onClick={() => { setStartDate(''); setEndDate(''); }}
                                className="ml-2 text-xs text-primary-600 hover:text-primary-800 font-medium"
                            >
                                Limpar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="bg-primary-50 p-3 rounded-lg text-primary-600">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Recebidas</p>
                        <p className="text-2xl font-bold text-slate-800">{data.kpis.total}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="bg-amber-50 p-3 rounded-lg text-amber-600">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Em Aberto</p>
                        <p className="text-2xl font-bold text-slate-800">{data.kpis.open}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Procedentes</p>
                        <p className="text-2xl font-bold text-slate-800">{data.kpis.procedentes}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg text-slate-600">
                        <Clock className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">SLA Médio (Fechadas)</p>
                        <p className="text-2xl font-bold text-slate-800">
                            {data.kpis.averageSlaClosed} <span className="text-sm font-normal text-slate-500">dias</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Type Distribution */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-800 mb-6">Denúncias por Categoria</h3>
                    <div className="h-[300px]">
                        {data.typeData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.typeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.typeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: any) => [`${value} denúncia(s)`, 'Quantidade']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">Sem dados no período</div>
                        )}
                    </div>
                </div>

                {/* Monthly Trend */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-800 mb-6">Acompanhamento Mensal</h3>
                    <div className="h-[300px]">
                        {data.monthlyData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ fill: '#f8fafc' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="open" name="Em Aberto" stackId="a" fill="#f59e0b" radius={[0, 0, 4, 4]} />
                                    <Bar dataKey="procedente" name="Procedente" stackId="a" fill="#10b981" />
                                    <Bar dataKey="improcedente" name="Improcedente" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">Sem dados no período</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
