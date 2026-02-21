// Sistema de E-mail para notificações
// Por padrão, apenas loga no console. Configure SMTP no .env para enviar e-mails reais.

interface EmailOptions {
    to: string
    subject: string
    html: string
}

import { prisma } from '@/lib/prisma'

async function getEmailConfig() {
    try {
        const config = await prisma.emailConfig.findFirst({
            orderBy: { updatedAt: 'desc' }
        })
        return config
    } catch (error) {
        // Se falhar ao buscar no banco (ex: durante build), retorna null
        return null
    }
}

async function sendEmail(options: EmailOptions): Promise<boolean> {
    const dbConfig = await getEmailConfig()

    // Verificar se tem config no banco E se é segura (tem todos os campos)
    const hasDbConfig = dbConfig && dbConfig.host && dbConfig.user && dbConfig.pass

    // Verificar variáveis de ambiente como fallback
    const hasEnvConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS

    if (!hasDbConfig && !hasEnvConfig) {
        // Modo simulação - apenas loga no console
        console.log('📧 [EMAIL SIMULADO]')
        console.log('Para:', options.to)
        console.log('Assunto:', options.subject)
        console.log('Conteúdo:', options.html) // Para exibir o token de 2FA nos logs da Vercel
        console.log('---')
        return true
    }

    try {
        // Importar nodemailer dinamicamente
        const nodemailer = await import('nodemailer')

        // Prioridade: Banco de dados > Env Vars
        const host = dbConfig?.host || process.env.SMTP_HOST
        const port = dbConfig?.port || parseInt(process.env.SMTP_PORT || '587')
        const secure = dbConfig ? dbConfig.secure : (process.env.SMTP_SECURE === 'true')
        const user = dbConfig?.user || process.env.SMTP_USER
        const pass = dbConfig?.pass || process.env.SMTP_PASS
        const from = dbConfig?.from || process.env.SMTP_FROM || 'Canal de Denúncias HSC <noreply@hospitalsaocarlos.com.br>'

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
        })

        await transporter.sendMail({
            from,
            to: options.to,
            subject: options.subject,
            html: options.html,
        })

        console.log('✅ E-mail enviado para:', options.to)
        return true
    } catch (error) {
        console.error('❌ Erro ao enviar e-mail:', error)
        return false
    }
}

// Notificar comitê sobre nova denúncia
export async function sendNewComplaintNotification(
    protocol: string,
    type: string,
    isAnonymous: boolean
): Promise<void> {
    const comiteEmail = process.env.COMITE_EMAIL || 'comite@hospitalsaocarlos.com.br'

    const tipoLabels: Record<string, string> = {
        assedio_moral: 'Assédio Moral',
        assedio_sexual: 'Assédio Sexual',
        corrupcao: 'Corrupção',
        seguranca_paciente: 'Segurança do Paciente',
        violacao_normas: 'Violação de Normas',
        outros: 'Outros',
    }

    await sendEmail({
        to: comiteEmail,
        subject: `🚨 Nova Denúncia Registrada - ${protocol}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: #1e3a5f; padding: 20px; border-radius: 8px 8px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">Canal de Denúncias HSC</h1>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
                    <h2 style="color: #1e3a5f; margin-top: 0;">Nova Denúncia Recebida</h2>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p style="margin: 5px 0;"><strong>Protocolo:</strong> ${protocol}</p>
                        <p style="margin: 5px 0;"><strong>Tipo:</strong> ${tipoLabels[type] || type}</p>
                        <p style="margin: 5px 0;"><strong>Origem:</strong> ${isAnonymous ? 'Anônima' : 'Identificada'}</p>
                    </div>
                    
                    <p style="color: #666;">Acesse o painel do comitê para analisar esta denúncia.</p>
                    
                    <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/comite/${protocol}" 
                       style="display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 6px; margin-top: 10px;">
                        Ver Denúncia
                    </a>
                </div>
                <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
                    Hospital São Carlos - Canal de Denúncias<br>
                    Em conformidade com Lei 14.457/22 e NR1
                </p>
            </div>
        `,
    })
}

// Notificar denunciante sobre mudança de status
export async function sendStatusUpdateEmail(
    email: string,
    protocol: string,
    newStatus: string
): Promise<void> {
    const statusLabels: Record<string, string> = {
        nova: 'Nova',
        em_analise: 'Em Análise',
        procedente: 'Procedente',
        improcedente: 'Improcedente',
        arquivada: 'Arquivada',
    }

    const formattedStatus = statusLabels[newStatus] || newStatus

    // Tentar buscar template customizado do BD
    try {
        const customTemplate = await prisma.emailTemplate.findUnique({
            where: { type: 'STATUS_UPDATE' }
        })

        if (customTemplate && customTemplate.body) {
            // Substituir variáveis dinâmicas
            const subject = customTemplate.subject
                .replace(/\{\{protocol\}\}/g, protocol)
                .replace(/\{\{status\}\}/g, formattedStatus)

            const body = customTemplate.body
                .replace(/\{\{protocol\}\}/g, protocol)
                .replace(/\{\{status\}\}/g, formattedStatus)

            await sendEmail({
                to: email,
                subject,
                html: body,
            })
            return // Se enviou com custom template, encerra
        }
    } catch (err) {
        console.error('Falha ao buscar template customizado. Usando fallback.', err)
    }

    // --- Fallback Original ---
    const statusMessages: Record<string, string> = {
        em_analise: 'Sua denúncia está sendo analisada pelo Comitê de Ética.',
        procedente: 'Após análise, sua denúncia foi considerada procedente e as medidas cabíveis serão tomadas.',
        improcedente: 'Após análise criteriosa, sua denúncia foi considerada improcedente.',
        arquivada: 'Sua denúncia foi arquivada.',
    }

    await sendEmail({
        to: email,
        subject: `Atualização da sua denúncia - ${protocol}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: #1e3a5f; padding: 20px; border-radius: 8px 8px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">Canal de Denúncias HSC</h1>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
                    <h2 style="color: #1e3a5f; margin-top: 0;">Atualização da Denúncia</h2>
                    
                    <p>O status da sua denúncia foi atualizado:</p>
                    
                    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p style="margin: 5px 0;"><strong>Protocolo:</strong> ${protocol}</p>
                        <p style="margin: 5px 0;"><strong>Novo Status:</strong> ${formattedStatus}</p>
                    </div>
                    
                    <p style="color: #666;">${statusMessages[newStatus] || ''}</p>
                    
                    <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/acompanhar?protocolo=${protocol}" 
                       style="display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 6px; margin-top: 10px;">
                        Acompanhar Denúncia
                    </a>
                </div>
                <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
                    Hospital São Carlos - Canal de Denúncias<br>
                    Este é um e-mail automático, não responda.
                </p>
            </div>
        `,
    })
}

// Notificar sobre nova mensagem no chat
export async function sendNewMessageNotification(
    complaint: any,
    message: any
): Promise<void> {
    const isFromCommittee = message.sender === 'comite'

    // Se for do comitê, notifica o denunciante (se tiver email)
    if (isFromCommittee) {
        if (!complaint.reporterEmail || !complaint.wantsResponse) return

        await sendEmail({
            to: complaint.reporterEmail,
            subject: `Nova mensagem sobre sua denúncia - ${complaint.protocol}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: #1e3a5f; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Canal de Denúncias HSC</h1>
                    </div>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
                        <h2 style="color: #1e3a5f; margin-top: 0;">Nova Mensagem Recebida</h2>
                        
                        <p>Você recebeu uma nova mensagem do Comitê de Ética referente à denúncia <strong>${complaint.protocol}</strong>.</p>
                        
                        <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #1e3a5f;">
                            <p style="margin: 0; font-style: italic;">"${message.message}"</p>
                        </div>
                        
                        <p style="color: #666;">Acesse o portal para responder.</p>
                        
                        <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/acompanhar?protocolo=${complaint.protocol}" 
                           style="display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; 
                                  text-decoration: none; border-radius: 6px; margin-top: 10px;">
                            Ver Mensagem
                        </a>
                    </div>
                </div>
            `,
        })
    }
    // Se for do denunciante, notifica o comitê
    else {
        const comiteEmail = process.env.COMITE_EMAIL || 'comite@hospitalsaocarlos.com.br'

        await sendEmail({
            to: comiteEmail,
            subject: `💬 Nova mensagem na denúncia ${complaint.protocol}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: #1e3a5f; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Canal de Denúncias HSC</h1>
                    </div>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
                        <h2 style="color: #1e3a5f; margin-top: 0;">Nova Mensagem do Denunciante</h2>
                        
                        <p>Uma nova mensagem foi enviada na denúncia <strong>${complaint.protocol}</strong>.</p>
                        
                        <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b;">
                            <p style="margin: 0; font-style: italic;">"${message.message}"</p>
                        </div>
                        
                        <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3001'}/comite/${complaint.protocol}" 
                           style="display: inline-block; background: #1e3a5f; color: white; padding: 12px 24px; 
                                  text-decoration: none; border-radius: 6px; margin-top: 10px;">
                            Responder
                        </a>
                    </div>
                </div>
            `,
        })
    }
}

// Notificar código 2FA
export async function send2FATokenEmail(
    email: string,
    token: string
): Promise<void> {
    await sendEmail({
        to: email,
        subject: `Seu código de acesso - Canal de Denúncias HSC`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: #1e3a5f; padding: 20px; border-radius: 8px 8px 0 0;">
                    <h1 style="color: white; margin: 0; font-size: 24px;">Canal de Denúncias HSC</h1>
                </div>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
                    <h2 style="color: #1e3a5f; margin-top: 0;">Código de Verificação (2FA)</h2>
                    
                    <p>Você solicitou acesso ao painel do Comitê de Ética. Use o código de 6 dígitos abaixo para concluir o login:</p>
                    
                    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                         <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #1e3a5f;">${token}</span>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">Este código é válido por 10 minutos. Se não foi você, contate o administrador imediatamente.</p>
                </div>
                <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
                    Hospital São Carlos - Segurança da Informação
                </p>
            </div>
        `,
    })
}
