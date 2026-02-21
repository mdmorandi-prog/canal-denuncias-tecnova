import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(req: Request) {
    try {
        const session = await auth()
        if (!session) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const url = new URL(req.url)
        const startParam = url.searchParams.get('startDate')
        const endParam = url.searchParams.get('endDate')

        // Build where clause based on date filters
        const whereClause: any = {}

        if (startParam || endParam) {
            whereClause.createdAt = {}
            if (startParam) {
                whereClause.createdAt.gte = new Date(startParam)
            }
            if (endParam) {
                // Set to end of day
                const endDate = new Date(endParam)
                endDate.setHours(23, 59, 59, 999)
                whereClause.createdAt.lte = endDate
            }
        }

        const complaints = await prisma.complaint.findMany({
            where: whereClause,
            select: {
                id: true,
                status: true,
                type: true,
                priority: true,
                createdAt: true,
                closedAt: true
            },
            orderBy: { createdAt: 'asc' }
        })

        // Basic KPIs
        const total = complaints.length
        const open = complaints.filter((c: any) => ['nova', 'em_analise'].includes(c.status)).length
        const closed = complaints.filter((c: any) => ['procedente', 'improcedente', 'arquivada'].includes(c.status)).length
        const procedentes = complaints.filter((c: any) => c.status === 'procedente').length
        const improcedentes = complaints.filter((c: any) => c.status === 'improcedente').length

        // SLA Calculation (Average days open for closed complaints only, or overall?)
        // Usually SLA is measured on closed items, but we can measure current active ones too. Let's do closed items real SLA.
        const closedComplaintsWithSla = complaints.filter((c: any) => c.closedAt)
        let totalSlaDays = 0

        closedComplaintsWithSla.forEach((c: any) => {
            if (c.closedAt) {
                const msDiff = new Date(c.closedAt).getTime() - new Date(c.createdAt).getTime()
                totalSlaDays += msDiff / (1000 * 3600 * 24)
            }
        })

        const averageSlaClosed = closedComplaintsWithSla.length > 0
            ? Math.round(totalSlaDays / closedComplaintsWithSla.length)
            : 0

        // Group by Type (for Pie Chart)
        const typeDistribution = complaints.reduce((acc: Record<string, number>, current: any) => {
            acc[current.type] = (acc[current.type] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const typeData = Object.keys(typeDistribution).map(key => ({
            name: key,
            value: typeDistribution[key]
        }))

        // Group by Month (for Bar/Line Chart)
        const monthlyDistribution = complaints.reduce((acc: Record<string, any>, current: any) => {
            // format YYYY-MM
            const monthStr = new Date(current.createdAt).toISOString().slice(0, 7)

            if (!acc[monthStr]) {
                acc[monthStr] = {
                    month: monthStr,
                    total: 0,
                    procedente: 0,
                    improcedente: 0,
                    open: 0
                }
            }

            acc[monthStr].total += 1

            if (current.status === 'procedente') acc[monthStr].procedente += 1
            else if (current.status === 'improcedente') acc[monthStr].improcedente += 1
            else if (['nova', 'em_analise'].includes(current.status)) acc[monthStr].open += 1

            return acc
        }, {} as Record<string, any>)

        const monthlyData = Object.values(monthlyDistribution).sort((a: any, b: any) => a.month.localeCompare(b.month))

        return NextResponse.json({
            kpis: {
                total,
                open,
                closed,
                procedentes,
                improcedentes,
                averageSlaClosed
            },
            typeData,
            monthlyData
        })
    } catch (error) {
        console.error('Stats API Error:', error)
        return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
    }
}
