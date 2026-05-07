import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { analyzeComplaintData } from '@/lib/nexus'

export const runtime = 'nodejs'

// POST /api/complaints/[protocol]/analyze - Re-run AI analysis (AuditorIA v2)
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ protocol: string }> }
) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { protocol } = await params

    try {
        // Fetch the complaint with all context + investigation diary actions
        const complaint = await prisma.complaint.findUnique({
            where: { protocol },
            select: {
                id: true,
                description: true,
                type: true,
                sector: true,
                accusedPosition: true,
                actions: {
                    orderBy: { createdAt: 'asc' },
                    select: { actionType: true, authorName: true, description: true, createdAt: true }
                }
            }
        })

        if (!complaint) {
            return NextResponse.json({ error: 'Denúncia não encontrada' }, { status: 404 })
        }

        // Run AuditorIA v2 with full complaint context + diary action history
        const insights = await analyzeComplaintData({
            description: complaint.description,
            type: complaint.type,
            sector: complaint.sector ?? undefined,
            accusedPosition: complaint.accusedPosition ?? undefined,
            actions: complaint.actions,  // Investigation diary history
        })

        if (!insights) {
            const hasKey = !!process.env.GEMINI_API_KEY
            if (!hasKey) {
                return NextResponse.json({ error: 'Chave GEMINI_API_KEY não configurada neste ambiente.' }, { status: 503 })
            }
            return NextResponse.json({ error: 'A IA não retornou resultado. Tente novamente.' }, { status: 500 })
        }

        // Upsert the analysis record (update if exists, create if not)
        await prisma.complaintAnalysis.upsert({
            where: { complaintId: complaint.id },
            update: {
                sentiment: insights.sentiment,
                urgency: insights.urgency,
                summary: insights.summary,
                keyEntities: insights.keyEntities,
                riskLevel: insights.riskLevel,
                recommendedActions: insights.recommendedActions,
                legalFramework: insights.legalFramework,
                suggestedVerdict: insights.suggestedVerdict,
                suggestedSla: insights.suggestedSla,
            },
            create: {
                complaintId: complaint.id,
                sentiment: insights.sentiment,
                urgency: insights.urgency,
                summary: insights.summary,
                keyEntities: insights.keyEntities,
                riskLevel: insights.riskLevel,
                recommendedActions: insights.recommendedActions,
                legalFramework: insights.legalFramework,
                suggestedVerdict: insights.suggestedVerdict,
                suggestedSla: insights.suggestedSla,
            }
        })

        return NextResponse.json({ success: true, message: 'Análise atualizada com sucesso.' })
    } catch (error) {
        console.error('Error re-analyzing complaint:', error)
        return NextResponse.json({ error: 'Erro ao re-analisar denúncia' }, { status: 500 })
    }
}
