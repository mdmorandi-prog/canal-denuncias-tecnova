import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

interface ExportOptions {
    elementId: string
    title: string
    filename: string
    protocol?: string
}

export const exportToPDF = async ({ elementId, title, filename, protocol }: ExportOptions) => {
    // 1. Encontrar o elemento principal
    const element = document.getElementById(elementId) as HTMLElement

    if (!element) {
        console.error(`Element with id ${elementId} not found`)
        return
    }

    // Apply a temporary class to hide buttons during export
    element.classList.add('pdf-exporting')
    const buttons = element.querySelectorAll('button')
    buttons.forEach((btn) => {
        btn.setAttribute('data-pdf-hidden', 'true')
        btn.style.visibility = 'hidden'
    })

    // Nuclear Workaround for html2canvas oklch()/oklab() support
    // We override window.getComputedStyle temporarily to sanitize modern CSS colors
    const originalGetComputedStyle = window.getComputedStyle;
    (window as any).getComputedStyle = (el: Element, pseudoElt?: string | null) => {
        const style = originalGetComputedStyle(el, pseudoElt);
        if (!style) return style;
        
        return new Proxy(style, {
            get(target: any, prop: string | symbol) {
                const value = target[prop as keyof CSSStyleDeclaration];

                // Intercept getPropertyValue which is the most common way to read styles
                if (prop === 'getPropertyValue') {
                    return (name: string) => {
                        const val = target.getPropertyValue(name);
                        return (typeof val === 'string' && (val.includes('oklch') || val.includes('oklab')))
                            ? val.replace(/(oklch|oklab)\([^)]+\)/g, '#f8fafc')
                            : val;
                    };
                }

                // Intercept direct property access
                if (typeof value === 'string' && (value.includes('oklch') || value.includes('oklab'))) {
                    return value.replace(/(oklch|oklab)\([^)]+\)/g, '#f8fafc');
                }

                // Bind methods to the original target
                if (typeof value === 'function') {
                    return value.bind(target);
                }
                return value;
            }
        }) as CSSStyleDeclaration;
    };

    try {
        const cards = Array.from(element.querySelectorAll('.bg-white.rounded-xl')) as HTMLElement[]

        if (cards.length === 0) {
            throw new Error("No cards found to export in the DOM.");
        }

        // Shared HTML2Canvas Options
        const getCanvasOptions = (node: HTMLElement) => ({
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: 1200, // force desktop width layout for cards if needed, but they are responsive
            onclone: (clonedDoc: Document) => {
                const sanitizeValue = (val: string) => val.replace(/(oklch|oklab)\([^)]+\)/g, '#f8fafc');
                try {
                    for (const sheet of Array.from(clonedDoc.styleSheets)) {
                        try {
                            const rules = Array.from(sheet.cssRules);
                            rules.forEach((rule: any) => {
                                if (rule.style && (rule.style.cssText.includes('oklch') || rule.style.cssText.includes('oklab'))) {
                                    rule.style.cssText = sanitizeValue(rule.style.cssText);
                                }
                            });
                        } catch (e) {}
                    }
                } catch (e) { }

                const allElements = clonedDoc.getElementsByTagName('*');
                for (let i = 0; i < allElements.length; i++) {
                    const el = allElements[i] as HTMLElement;
                    try {
                        const style = window.getComputedStyle(el);
                        const propsToFix = ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke', 'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color'];
                        propsToFix.forEach(prop => {
                            const value = style.getPropertyValue(prop);
                            if (value && (value.includes('oklch') || value.includes('oklab'))) {
                                el.style.setProperty(prop, '#f8fafc', 'important');
                            }
                        });
                        const bgImg = style.backgroundImage;
                        if (bgImg && (bgImg.includes('oklch') || bgImg.includes('oklab'))) {
                            el.style.setProperty('background-image', sanitizeValue(bgImg), 'important');
                        }
                    } catch (e) { }

                    if (el.style) {
                        for (let j = 0; j < el.style.length; j++) {
                            const prop = el.style[j];
                            const val = el.style.getPropertyValue(prop);
                            if (val && (val.includes('oklch') || val.includes('oklab'))) {
                                el.style.setProperty(prop, '#f8fafc', 'important');
                            }
                        }
                    }
                }
            }
        });

        // 3. Instanciar PDF
        const pdf = new jsPDF('p', 'mm', 'a4')

        // Dimensões A4
        const pageWidth = 210 // mm
        const pageHeight = 297 // mm
        const margin = 10
        const maxPrintableHeight = pageHeight - (margin * 2)
        const imgWidth = pageWidth - (margin * 2)

        // Adicionar cabeçalho corporativo (Logo + Data)
        pdf.setFontSize(16)
        pdf.setTextColor('#1e3a5f')
        pdf.text(title, margin, margin + 10)

        pdf.setFontSize(10)
        pdf.setTextColor('#666666')
        if (protocol) {
            pdf.text(`Protocolo: ${protocol}`, margin, margin + 18)
            pdf.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, margin, margin + 23)
            pdf.line(margin, margin + 28, pageWidth - margin, margin + 28) // Linha divisória
        } else {
            pdf.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, margin, margin + 18)
            pdf.line(margin, margin + 23, pageWidth - margin, margin + 23)
        }

        let currentY = protocol ? margin + 35 : margin + 30

        // Process each card sequentially to avoid text cutting!
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i]
            
            // Expand scroll height for export if it's the chat interface to capture all messages
            let originalHeight = '';
            let originalOverflow = '';
            if (card.querySelector('.overflow-y-auto')) {
                const scrollable = card.querySelector('.overflow-y-auto') as HTMLElement;
                if (scrollable) {
                    originalHeight = scrollable.style.height;
                    originalOverflow = scrollable.style.overflowY;
                    scrollable.style.height = 'auto'; // allow expansion
                    scrollable.style.overflowY = 'visible';
                }
            }

            const canvas = await html2canvas(card, getCanvasOptions(card))
            
            // Revert changes if necessary
            if (card.querySelector('.overflow-y-auto')) {
                const scrollable = card.querySelector('.overflow-y-auto') as HTMLElement;
                if (scrollable) {
                    scrollable.style.height = originalHeight;
                    scrollable.style.overflowY = originalOverflow;
                }
            }

            const imgHeight = (canvas.height * imgWidth) / canvas.width

            // Check if card fits on remaining page space
            if (currentY + imgHeight > pageHeight - margin && currentY !== margin) {
                // Doesn't fit, push to new page
                pdf.addPage()
                currentY = margin
            }

            // Check if card ITSELF is larger than the whole printable page
            if (imgHeight > maxPrintableHeight) {
                // Must slice the canvas natively to avoid PDF overlap
                const sliceHeightPx = Math.floor(canvas.width * (maxPrintableHeight / imgWidth))
                let currentSliceTopPx = 0

                while (currentSliceTopPx < canvas.height) {
                    const remainingPixels = canvas.height - currentSliceTopPx
                    const currentTargetHeightPx = Math.min(sliceHeightPx, remainingPixels)

                    const sliceCanvas = document.createElement('canvas')
                    sliceCanvas.width = canvas.width
                    sliceCanvas.height = currentTargetHeightPx
                    const ctx = sliceCanvas.getContext('2d')

                    ctx?.drawImage(canvas,
                        0, currentSliceTopPx, canvas.width, currentTargetHeightPx,
                        0, 0, canvas.width, currentTargetHeightPx
                    )

                    const sliceImgHeight = (currentTargetHeightPx * imgWidth) / canvas.width

                    // Ensure slice fits on page (usually fits perfectly due to math, except bottom padding)
                    if (currentY + sliceImgHeight > pageHeight - margin && currentY > margin + 1) { // Adding +1 for floating point safety
                        pdf.addPage()
                        currentY = margin
                    }

                    pdf.addImage(sliceCanvas.toDataURL('image/jpeg', 1.0), 'JPEG', margin, currentY, imgWidth, sliceImgHeight)
                    currentY += sliceImgHeight + 5 // 5mm margin between next piece/card
                    currentSliceTopPx += currentTargetHeightPx
                }
            } else {
                // Standard un-sliced add
                pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', margin, currentY, imgWidth, imgHeight)
                currentY += imgHeight + 5 // 5mm margin between cards
            }
        }

        // Restore original getComputedStyle immediately after canvas generation loops
        window.getComputedStyle = originalGetComputedStyle;

        // 5. Salvar o documento forçando o nome correto e a extensão .pdf
        try {
            const blob = pdf.output('blob')
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${filename}.pdf`
            document.body.appendChild(a)
            a.click()
            setTimeout(() => {
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
            }, 100)
        } catch (saveError) {
            console.warn('Fallback para pdf.save normal:', saveError)
            pdf.save(`${filename}.pdf`)
        }

    } catch (error: any) {
        console.error('Erro ao gerar PDF:', error)
        alert('Erro detalhado: ' + (error.message || String(error)) + '\n\nVerifique o console para mais detalhes.')
    } finally {
        // Just in case it threw
        if (window.getComputedStyle !== originalGetComputedStyle) {
            window.getComputedStyle = originalGetComputedStyle;
        }
        element.classList.remove('pdf-exporting')
        buttons.forEach((btn) => {
            btn.removeAttribute('data-pdf-hidden')
            btn.style.visibility = 'visible'
        })
    }
}
