import crypto from 'crypto'

/**
 * Gera um protocolo único para a denúncia
 * Hash SHA-256 truncado para 12 caracteres alfanuméricos
 */
export function generateProtocol(): string {
    const timestamp = Date.now().toString()
    const random = crypto.randomBytes(16).toString('hex')
    const data = `${timestamp}-${random}`

    const hash = crypto
        .createHash('sha256')
        .update(data)
        .digest('hex')
        .toUpperCase()

    // Retorna os primeiros 12 caracteres formatados: XXXX-XXXX-XXXX
    const truncated = hash.substring(0, 12)
    return `${truncated.slice(0, 4)}-${truncated.slice(4, 8)}-${truncated.slice(8, 12)}`
}

/**
 * Criptografa dados sensíveis (para anexos)
 */
export function encryptData(data: Buffer, key: string): Buffer {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key.padEnd(32, '0')), iv)
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()])
    return Buffer.concat([iv, encrypted])
}

/**
 * Descriptografa dados
 */
export function decryptData(encryptedData: Buffer, key: string): Buffer {
    const iv = encryptedData.subarray(0, 16)
    const data = encryptedData.subarray(16)
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key.padEnd(32, '0')), iv)
    return Buffer.concat([decipher.update(data), decipher.final()])
}
