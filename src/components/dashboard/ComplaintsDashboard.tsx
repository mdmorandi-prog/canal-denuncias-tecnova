'use client'

import { useState, useEffect } from 'react'
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList
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
    label?: string
}

interface DashboardData {
    kpis: KPIStats
    typeData: TypeData[]
    departmentData: TypeData[]
    monthlyData: MonthlyData[]
}

// Tons de Azul Petróleo Sóbrios
const PETROL_COLORS = [
    '#083344', // Cyan 950
    '#155e75', // Cyan 800
    '#0e7490', // Cyan 700
    '#164e63', // Cyan 900
    '#075985', // Sky 800
    '#0c4a6e', // Sky 900
    '#1e293b', // Slate 800
    '#334155', // Slate 700
]

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
        <div className="space-y-8 mb-12">
            {/* Filter Bar */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="size-5 text-primary-900" />
                    Painel Gerencial de Denúncias
                </h2>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
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
                                className="ml-2 text-xs text-primary-600 hover:text-primary-800 font-bold"
                            >
                                Limpar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md border-l-4 border-l-primary-900">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Total Recebidas</p>
                        <FileText className="h-5 w-5 text-primary-900 opacity-20" />
                    </div>
                    <p className="text-3xl font-black text-slate-900 tabular-nums">{data.kpis.total}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md border-l-4 border-l-amber-500">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Em Aberto</p>
                        <AlertTriangle className="h-5 w-5 text-amber-500 opacity-20" />
                    </div>
                    <p className="text-3xl font-black text-slate-900 tabular-nums">{data.kpis.open}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md border-l-4 border-l-emerald-500">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Procedentes</p>
                        <CheckCircle className="h-5 w-5 text-emerald-500 opacity-20" />
                    </div>
                    <p className="text-3xl font-black text-slate-900 tabular-nums">{data.kpis.procedentes}</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm transition-all hover:shadow-md border-l-4 border-l-slate-400">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">SLA Médio (Damas)</p>
                        <Clock className="h-5 w-5 text-slate-400 opacity-20" />
                    </div>
                    <p className="text-3xl font-black text-slate-900 tabular-nums">
                        {data.kpis.averageSlaClosed} <span className="text-lg font-bold text-slate-400">dias</span>
                    </p>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Type Distribution - Pie */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">Denúncias por Categoria</h3>
                    <div className="h-[350px]">
                        {data.typeData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data.typeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.typeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PETROL_COLORS[index % PETROL_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                                        formatter={(value: any) => [`${value} denúncia(s)`, 'Quantidade']}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 italic">Sem registros no período</div>
                        )}
                    </div>
                </div>

                {/* Monthly Evolution - Bar */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">Evolução Mensal</h3>
                    <div className="h-[350px]">
                        {data.monthlyData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend iconType="rect" />
                                    <Bar dataKey="open" name="Em Aberto" fill="#155e75" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Bar dataKey="procedente" name="Procedente" fill="#083344" radius={[4, 4, 0, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 italic">Sem registros no período</div>
                        )}
                    </div>
                </div>

                {/* Sector Distribution - Horizontal Bar */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
                    <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">Denúncias por Setor</h3>
                    <div className="h-[400px]">
                        {data.departmentData && data.departmentData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={data.departmentData}
                                    layout="vertical"
                                    margin={{ top: 5, right: 80, left: 40, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#1e293b', fontSize: 13, fontWeight: 700 }}
                                        width={140}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value: any) => [`${value} denúncia(s)`, 'Quantidade']}
                                    />
                                    <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                                        {data.departmentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PETROL_COLORS[index % PETROL_COLORS.length]} />
                                        ))}
                                        <LabelList dataKey="value" position="right" offset={10} style={{ fill: '#64748b', fontSize: 14, fontWeight: 800 }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 italic">Nenhum setor informado ainda</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
