import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const exportComplaintToPDF = async (protocol: string) => {
    // 1. Encontrar o elemento principal da página de detalhes
    const element = document.getElementById('pdf-content') as HTMLElement

    if (!element) return

    // Apply a temporary class to hide buttons during export instead of mutating styles directly
    element.classList.add('pdf-exporting')
    const buttons = element.querySelectorAll('button')
    buttons.forEach((btn) => {
        btn.setAttribute('data-pdf-hidden', 'true')
        // Inline style fallback if CSS isn't enough
        btn.style.visibility = 'hidden'
    })

    try {
        // 2. Converter o HTML em um Canvas do tipo Imagem
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: true, // Enable logging for debugging if it fails again
            backgroundColor: '#ffffff',
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight
        })

        // 3. Calcular dimensões para A4
        const imgWidth = 210 // mm
        const pageHeight = 297 // mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        const imgData = canvas.toDataURL('image/jpeg', 1.0)

        // 4. Instanciar PDF e adicionar a imagem
        const pdf = new jsPDF('p', 'mm', 'a4')

        // Adicionar cabeçalho corporativo (Logo + Data)
        pdf.setFontSize(16)
        pdf.setTextColor('#1e3a5f')
        pdf.text('Canal de Denúncias HSC - Relatório Confidencial', 15, 20)

        pdf.setFontSize(10)
        pdf.setTextColor('#666666')
        pdf.text(`Protocolo: ${protocol}`, 15, 28)
        pdf.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 15, 33)

        pdf.line(15, 38, 195, 38) // Linha divisória

        let heightLeft = imgHeight
        let position = 45 // Posição Y inicial (abaixo do cabeçalho)
        let pageCount = 1

        // Add the first page image
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= (pageHeight - position)

        // Add additional pages if the content is longer than one A4 page
        while (heightLeft > 0 && pageCount < 10) { // Limit to 10 pages to prevent infinite loops
            position = heightLeft - imgHeight // Calculate the new negative Y offset
            pdf.addPage()
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight
            pageCount++
        }

        // 5. Salvar o documento
        pdf.save(`Denuncia_${protocol}.pdf`)

    } catch (error) {
        console.error('Erro ao gerar PDF:', error)
        alert('Erro ao exportar PDF. Tente novamente.')
    } finally {
        element.classList.remove('pdf-exporting')
        buttons.forEach((btn) => {
            btn.removeAttribute('data-pdf-hidden')
            btn.style.visibility = 'visible'
        })
    }
}
