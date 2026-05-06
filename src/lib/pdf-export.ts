import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'

interface ExportOptions {
    elementId: string
    title: string
    filename: string
    protocol?: string
    data?: any
    type?: 'complaint' | 'dashboard' // New: specialized export types
}

export const exportToPDF = async ({ elementId, title, filename, protocol, data, type }: ExportOptions) => {
    // Determine type automatically if not provided
    const exportType = type || (data?.protocol ? 'complaint' : 'dashboard')

    if (exportType === 'complaint' && data) {
        return generateHighFidelityComplaintReport(data, filename)
    }

    if (exportType === 'dashboard' && data) {
        return generateHighFidelityDashboardReport(data, elementId, filename)
    }

    // Default Fallback
    return generateDOMCapture(elementId, title, filename)
}

const GREY = [39, 39, 42] // Zinc-800 (Pure Industrial Grey)
const EMERALD = [16, 185, 129]
const SLATE = [100, 116, 139]

/**
 * HIGH FIDELITY COMPLAINT REPORT
 */
const generateHighFidelityComplaintReport = async (complaint: any, filename: string) => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const margin = 20
    const pageWidth = 210

    // Header
    pdf.setFillColor(GREY[0], GREY[1], GREY[2])
    pdf.rect(0, 0, pageWidth, 40, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(22)
    pdf.text('TECNOVA', margin, 20)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Canal de Ética e Transparência Industrial', margin, 28)
    pdf.setFontSize(12)
    pdf.text('RELATÓRIO DE INVESTIGAÇÃO', pageWidth - margin, 20, { align: 'right' })
    pdf.text(`Protocolo: ${complaint.protocol}`, pageWidth - margin, 28, { align: 'right' })

    let currentY = 55

    // Case Info
    pdf.setTextColor(GREY[0], GREY[1], GREY[2])
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.text('1. Informações Gerais', margin, currentY)
    pdf.line(margin, currentY + 2, pageWidth - margin, currentY + 2)
    
    currentY += 12
    const info = [
        ['Tipo:', complaint.type || 'N/A'],
        ['Status:', (complaint.status || 'N/A').toUpperCase()],
        ['Setor:', complaint.sector || 'Não informado'],
        ['Data:', new Date(complaint.createdAt).toLocaleString('pt-BR')]
    ]
    
    info.forEach(([label, value]) => {
        pdf.setFontSize(10); pdf.setFont('helvetica', 'bold'); pdf.text(label, margin, currentY)
        pdf.setFont('helvetica', 'normal'); pdf.text(value, margin + 40, currentY)
        currentY += 7
    })

    // Description
    currentY += 8
    pdf.setFontSize(14); pdf.setFont('helvetica', 'bold')
    pdf.text('2. Relato Original', margin, currentY)
    pdf.line(margin, currentY + 2, pageWidth - margin, currentY + 2)
    currentY += 10
    pdf.setFontSize(10); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(60, 60, 60)
    const splitDesc = pdf.splitTextToSize(complaint.description, pageWidth - (margin * 2))
    pdf.text(splitDesc, margin, currentY)
    currentY += (splitDesc.length * 5) + 12

    // Table
    if (complaint.actions?.length > 0) {
        if (currentY > 240) { pdf.addPage(); currentY = 20 }
        pdf.setTextColor(GREY[0], GREY[1], GREY[2])
        pdf.setFontSize(14); pdf.setFont('helvetica', 'bold')
        pdf.text('3. Diário de Ações', margin, currentY)
        autoTable(pdf, {
            startY: currentY + 5,
            head: [['Data', 'Autor', 'Tipo', 'Descrição']],
            body: complaint.actions.map((a: any) => [
                new Date(a.createdAt).toLocaleDateString('pt-BR'),
                a.authorName,
                a.actionType.toUpperCase(),
                a.description
            ]),
            headStyles: { fillColor: GREY },
            margin: { left: margin, right: margin }
        })
        currentY = (pdf as any).lastAutoTable.finalY + 15
    }

    // Analysis
    if (complaint.aiAnalysis) {
        if (currentY > 230) { pdf.addPage(); currentY = 20 }
        pdf.setTextColor(GREY[0], GREY[1], GREY[2])
        pdf.setFontSize(14); pdf.setFont('helvetica', 'bold')
        pdf.text('4. Parecer AuditorIA', margin, currentY)
        currentY += 10
        pdf.setFillColor(248, 250, 252); pdf.rect(margin, currentY, pageWidth - (margin * 2), 30, 'F')
        pdf.setFontSize(9); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(70, 70, 70)
        pdf.text(pdf.splitTextToSize(complaint.aiAnalysis.summary, pageWidth - (margin * 2) - 10), margin + 5, currentY + 7)
        
        if (complaint.aiAnalysis.suggestedVerdict) {
            currentY += 35
            pdf.setFillColor(EMERALD[0], EMERALD[1], EMERALD[2], 0.1)
            pdf.setDrawColor(EMERALD[0], EMERALD[1], EMERALD[2])
            pdf.rect(margin, currentY, pageWidth - (margin * 2), 15, 'FD')
            pdf.setTextColor(EMERALD[0], EMERALD[1], EMERALD[2])
            pdf.setFont('helvetica', 'bold'); pdf.text(`VEREDITO: ${complaint.aiAnalysis.suggestedVerdict}`, margin + 5, currentY + 9)
        }
    }

    addFooters(pdf)
    pdf.save(`${filename}.pdf`)
}

/**
 * HIGH FIDELITY DASHBOARD REPORT
 */
const generateHighFidelityDashboardReport = async (data: any, elementId: string, filename: string) => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const margin = 15
    const pageWidth = 210

    // Cover Page
    pdf.setFillColor(GREY[0], GREY[1], GREY[2])
    pdf.rect(0, 0, pageWidth, 80, 'F')
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(28); pdf.setFont('helvetica', 'bold'); pdf.text('TECNOVA', margin, 35)
    pdf.setFontSize(16); pdf.setFont('helvetica', 'normal'); pdf.text('Relatório Executivo de Compliance', margin, 48)
    pdf.setFontSize(10); pdf.text(`Extraído em: ${new Date().toLocaleString('pt-BR')}`, margin, 58)

    // KPI Section
    let currentY = 95
    pdf.setTextColor(GREY[0], GREY[1], GREY[2])
    pdf.setFontSize(18); pdf.setFont('helvetica', 'bold'); pdf.text('Indicadores Chave (KPIs)', margin, currentY)
    currentY += 10

    const kpis = [
        { label: 'Total Recebidas', value: data.kpis.total, color: GREY },
        { label: 'Em Análise', value: data.kpis.open, color: [245, 158, 11] },
        { label: 'Procedentes', value: data.kpis.procedentes, color: EMERALD },
        { label: 'SLA Médio', value: `${data.kpis.averageSlaClosed} dias`, color: SLATE }
    ]

    kpis.forEach((kpi, idx) => {
        const x = margin + (idx % 2) * 95
        const y = currentY + Math.floor(idx / 2) * 25
        pdf.setFillColor(248, 250, 252); pdf.rect(x, y, 85, 20, 'F')
        pdf.setDrawColor(kpi.color[0], kpi.color[1], kpi.color[2]); pdf.line(x, y, x, y + 20)
        pdf.setFontSize(8); pdf.setTextColor(100, 116, 139); pdf.text(kpi.label.toUpperCase(), x + 5, y + 7)
        pdf.setFontSize(14); pdf.setTextColor(GREY[0], GREY[1], GREY[2]); pdf.text(String(kpi.value), x + 5, y + 15)
    })

    // Chart Captures
    currentY += 60
    pdf.setFontSize(18); pdf.setFont('helvetica', 'bold'); pdf.text('Análise Visual', margin, currentY)
    currentY += 10

    const charts = Array.from(document.querySelectorAll('.recharts-responsive-container')) as HTMLElement[]
    for (let i = 0; i < charts.length; i++) {
        const chartBox = charts[i].parentElement as HTMLElement
        const canvas = await html2canvas(chartBox, { scale: 3, useCORS: true })
        const imgData = canvas.toDataURL('image/jpeg', 0.95)
        const imgWidth = 180
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        if (currentY + imgHeight > 270) { pdf.addPage(); currentY = 20 }
        pdf.addImage(imgData, 'JPEG', margin, currentY, imgWidth, imgHeight)
        currentY += imgHeight + 15
    }

    addFooters(pdf)
    pdf.save(`${filename}.pdf`)
}

const addFooters = (pdf: jsPDF) => {
    const pageCount = (pdf as any).internal.getNumberOfPages()
    const pageWidth = 210
    for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8); pdf.setTextColor(180, 180, 180)
        pdf.text(`Página ${i} de ${pageCount} | TECNOVA INDÚSTRIA - RELATÓRIO CONFIDENCIAL`, pageWidth / 2, 285, { align: 'center' })
    }
}

const generateDOMCapture = async (elementId: string, title: string, filename: string) => {
    const el = document.getElementById(elementId)
    if (!el) return
    const canvas = await html2canvas(el, { scale: 2 })
    const pdf = new jsPDF('p', 'mm', 'a4')
    pdf.text(title, 10, 10)
    pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 10, 20, 190, (canvas.height * 190) / canvas.width)
    pdf.save(`${filename}.pdf`)
}
