import jsPDF from 'jspdf'
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

    // Nuclear Workaround for html2canvas oklch() support
    // We override window.getComputedStyle temporarily to sanitize oklch colors
    const originalGetComputedStyle = window.getComputedStyle;
    (window as any).getComputedStyle = (el: Element, pseudoElt?: string | null) => {
        const style = originalGetComputedStyle(el, pseudoElt);
        return new Proxy(style, {
            get(target: any, prop: string) {
                const value = target[prop];

                // Intercept getPropertyValue which is the most common way to read styles
                if (prop === 'getPropertyValue') {
                    return (name: string) => {
                        const val = target.getPropertyValue(name);
                        return (typeof val === 'string' && val.includes('oklch'))
                            ? val.replace(/oklch\([^)]+\)/g, '#f8fafc')
                            : val;
                    };
                }

                // Intercept direct property access
                if (typeof value === 'string' && value.includes('oklch')) {
                    return value.replace(/oklch\([^)]+\)/g, '#f8fafc');
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
        // 2. Converter o HTML em um Canvas do tipo Imagem
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight,
            onclone: (clonedDoc) => {
                // Nuclear Workaround for html2canvas oklch() support
                // html2canvas crashes on ANY oklch() color function.
                // Since this is a cloned document for export, we can be aggressive.

                const sanitizeValue = (val: string) => val.replace(/oklch\([^)]+\)/g, '#f8fafc');

                // 1. Process all stylesheets
                try {
                    for (const sheet of Array.from(clonedDoc.styleSheets)) {
                        try {
                            const rules = Array.from(sheet.cssRules);
                            rules.forEach((rule: any) => {
                                if (rule.style && rule.style.cssText.includes('oklch')) {
                                    rule.style.cssText = sanitizeValue(rule.style.cssText);
                                }
                            });
                        } catch (e) {
                            // Cross-origin sheets can't be accessed, but let's try to remove them if they might cause issues
                            if (sheet.ownerNode && sheet.ownerNode instanceof HTMLElement) {
                                // sheet.ownerNode.remove(); // Optional: remove if we suspect they carry oklch
                            }
                        }
                    }
                } catch (e) { }

                // 2. Process all elements to fix computed styles that html2canvas might read
                // We'll set inline styles to override anything in CSS that we couldn't reach
                const allElements = clonedDoc.getElementsByTagName('*');
                for (let i = 0; i < allElements.length; i++) {
                    const el = allElements[i] as HTMLElement;

                    // We'll check the most common properties and force them to be non-oklch
                    // This is more reliable than innerHTML replacement which might break SSR/hydration tags
                    try {
                        const style = window.getComputedStyle(el);
                        const propsToFix = ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke', 'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color'];

                        propsToFix.forEach(prop => {
                            const value = style.getPropertyValue(prop);
                            if (value && value.includes('oklch')) {
                                el.style.setProperty(prop, '#f8fafc', 'important');
                            }
                        });

                        // Fix background images (gradients)
                        const bgImg = style.backgroundImage;
                        if (bgImg && bgImg.includes('oklch')) {
                            el.style.setProperty('background-image', sanitizeValue(bgImg), 'important');
                        }
                    } catch (e) { }

                    // Secondary safety: sanitize any inline styles in the cloned document
                    if (el.style) {
                        for (let j = 0; j < el.style.length; j++) {
                            const prop = el.style[j];
                            const val = el.style.getPropertyValue(prop);
                            if (val && val.includes('oklch')) {
                                el.style.setProperty(prop, '#f8fafc', 'important');
                            }
                        }
                    }
                }
            }
        })

        // Restore original getComputedStyle immediately after canvas generation
        window.getComputedStyle = originalGetComputedStyle;

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
        pdf.text(title, 15, 20)

        pdf.setFontSize(10)
        pdf.setTextColor('#666666')
        if (protocol) {
            pdf.text(`Protocolo: ${protocol}`, 15, 28)
            pdf.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 15, 33)
            pdf.line(15, 38, 195, 38) // Linha divisória
        } else {
            pdf.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 15, 28)
            pdf.line(15, 33, 195, 33) // Linha divisória
        }

        const startY = protocol ? 45 : 40
        let heightLeft = imgHeight
        let position = startY
        let pageCount = 1

        // Add the first page image
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
        heightLeft -= (pageHeight - position)

        // Add additional pages if the content is longer than one A4 page
        while (heightLeft > 0 && pageCount < 10) {
            position = heightLeft - imgHeight
            pdf.addPage()
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight
            pageCount++
        }

        // 5. Salvar o documento
        pdf.save(`${filename}.pdf`)

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
