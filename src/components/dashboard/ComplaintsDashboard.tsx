'use client'

import { useState, useEffect } from 'react'
import {
    Card,
    DonutChart,
    BarChart as TremorBarChart,
    Title,
    Text,
    Flex,
    Metric,
    Icon,
    Badge,
    Grid,
    ProgressBar,
    AreaChart,
} from '@tremor/react'
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
    departmentData: TypeData[]
    monthlyData: MonthlyData[]
}

const COLORS = ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8']

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
            <div className="bg-white p-4 rounded-xl shadow-sm ring-1 ring-slate-900/5 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-900 text-balance flex items-center gap-2">
                    <Activity className="size-5 text-slate-700" />
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl ring-1 ring-slate-900/5 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 shadow-sm text-slate-700">
                        <FileText className="size-5" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Recebidas</p>
                        <p className="text-2xl font-bold text-slate-900 tabular-nums tracking-tight">{data.kpis.total}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl ring-1 ring-slate-900/5 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 shadow-sm text-slate-700">
                        <AlertTriangle className="size-5" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Em Aberto</p>
                        <p className="text-2xl font-bold text-slate-900 tabular-nums tracking-tight">{data.kpis.open}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl ring-1 ring-slate-900/5 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 shadow-sm text-slate-700">
                        <CheckCircle className="size-5" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Procedentes</p>
                        <p className="text-2xl font-bold text-slate-900 tabular-nums tracking-tight">{data.kpis.procedentes}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl ring-1 ring-slate-900/5 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
                    <div className="flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 shadow-sm text-slate-700">
                        <Clock className="size-5" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">SLA Médio (Fechadas)</p>
                        <p className="text-2xl font-bold text-slate-900 tabular-nums tracking-tight">
                            {data.kpis.averageSlaClosed} <span className="text-sm font-normal text-slate-500">dias</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Type Distribution */}
                <Card className="ring-1 ring-slate-900/5 shadow-sm">
                    <Title className="text-slate-900">Denúncias por Categoria</Title>
                    <Text className="mb-6">Distribuição total de relatos por tipo</Text>
                    {data.typeData.length > 0 ? (
                        <DonutChart
                            className="h-72 mt-4"
                            data={data.typeData}
                            category="value"
                            index="name"
                            colors={['slate', 'blue', 'indigo', 'cyan', 'sky', 'gray']}
                            showAnimation={true}
                            valueFormatter={(number: number) => `${number} relatos`}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-72 text-slate-400">Sem dados no período</div>
                    )}
                </Card>

                {/* Sector Distribution */}
                <Card className="ring-1 ring-slate-900/5 shadow-sm lg:col-span-2">
                    <Title className="text-slate-900">Denúncias por Setor</Title>
                    <Text className="mb-6">Comparativo de incidentes por área hospitalar</Text>
                    {data.departmentData && data.departmentData.length > 0 ? (
                        <TremorBarChart
                            className="h-80 mt-4"
                            data={data.departmentData}
                            index="name"
                            categories={['value']}
                            colors={['blue']}
                            layout="vertical"
                            showAnimation={true}
                            valueFormatter={(number: number) => `${number} relatos`}
                            showLegend={false}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-80 text-slate-400">Sem dados de setor informados</div>
                    )}
                </Card>

                {/* Monthly Trend */}
                <Card className="ring-1 ring-slate-900/5 shadow-sm">
                    <Title className="text-slate-900">Acompanhamento Mensal</Title>
                    <Text className="mb-6">Evolução do status das denúncias ao longo do tempo</Text>
                    {data.monthlyData.length > 0 ? (
                        <TremorBarChart
                            className="h-80 mt-4"
                            data={data.monthlyData}
                            index="label"
                            categories={['open', 'procedente', 'improcedente']}
                            colors={['amber', 'emerald', 'rose']}
                            stack={true}
                            showAnimation={true}
                            valueFormatter={(number: number) => `${number} casos`}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-80 text-slate-400">Sem dados no período</div>
                    )}
                </Card>

            </div>
        </div>
    )
}
