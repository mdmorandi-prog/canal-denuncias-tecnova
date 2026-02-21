import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const exportComplaintToPDF = async (protocol: string) => {
    // 1. Encontrar o elemento principal da página de detalhes
    const element = document.querySelector('main') as HTMLElement

    if (!element) return

    // Ocultar botões indesejados no PDF temporariamente
    const buttons = element.querySelectorAll('button')
    const originalStyles: string[] = []

    buttons.forEach((btn, index) => {
        originalStyles[index] = btn.style.display
        btn.style.display = 'none'
    })

    try {
        // 2. Converter o HTML em um Canvas do tipo Imagem
        const canvas = await html2canvas(element, {
            scale: 2, // Melhorar qualidade
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
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

        // Calcular se o layout excede uma página
        let heightLeft = imgHeight
        let position = 45 // Posição Y inicial (abaixo do cabeçalho)

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= (pageHeight - position)

        // Adicionar páginas extras se necessário
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight
            pdf.addPage()
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight
        }

        // 5. Salvar o documento
        pdf.save(`Denuncia_${protocol}.pdf`)

    } catch (error) {
        console.error('Erro ao gerar PDF:', error)
        alert('Erro ao exportar PDF. Tente novamente.')
    } finally {
        // Restaurar estado original da UI
        buttons.forEach((btn, index) => {
            btn.style.display = originalStyles[index]
        })
    }
}
