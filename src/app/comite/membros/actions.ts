'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'

const memberSchema = z.object({
    name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional().or(z.literal('')),
    role: z.enum(["admin", "member", "auditor"]).default("member"),
    active: z.boolean().default(true)
})

export async function getMembers() {
    try {
        const members = await prisma.committeeMember.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                active: true,
                createdAt: true
            },
            orderBy: { name: 'asc' }
        })
        return { success: true, data: members }
    } catch (error: any) {
        console.error("Error fetching members:", error)
        return { success: false, error: `Falha ao buscar membros: ${error?.message || 'Erro desconhecido'}` }
    }
}

export async function createMember(data: z.infer<typeof memberSchema>) {
    try {
        const validatedData = memberSchema.parse(data)

        if (!validatedData.password) {
            return { success: false, error: "Senha é obrigatória para novos usuários" }
        }

        const existingUser = await prisma.committeeMember.findUnique({
            where: { email: validatedData.email }
        })

        if (existingUser) {
            return { success: false, error: "Este e-mail já está em uso" }
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10)

        await prisma.committeeMember.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
                role: validatedData.role,
                active: validatedData.active
            }
        })

        revalidatePath('/comite/membros')
        return { success: true }
    } catch (error) {
        console.error("Error creating member:", error)
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0]?.message || "Dados inválidos" }
        }
        return { success: false, error: "Falha ao criar usuário" }
    }
}

export async function updateMember(id: string, data: z.infer<typeof memberSchema>) {
    try {
        const validatedData = memberSchema.parse(data)

        // Check if email belongs to someone else
        const existingUser = await prisma.committeeMember.findUnique({
            where: { email: validatedData.email }
        })

        if (existingUser && existingUser.id !== id) {
            return { success: false, error: "Este e-mail já está em uso por outro usuário" }
        }

        const updateData: any = {
            name: validatedData.name,
            email: validatedData.email,
            role: validatedData.role,
            active: validatedData.active
        }

        // Only update password if a new one is provided
        if (validatedData.password && validatedData.password.length >= 6) {
            updateData.password = await bcrypt.hash(validatedData.password, 10)
        }

        await prisma.committeeMember.update({
            where: { id },
            data: updateData
        })

        revalidatePath('/comite/membros')
        return { success: true }
    } catch (error) {
        console.error("Error updating member:", error)
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0]?.message || "Dados inválidos" }
        }
        return { success: false, error: "Falha ao atualizar usuário" }
    }
}

export async function deleteMember(id: string) {
    try {
        // Prevent deleting the last admin
        const memberToDelete = await prisma.committeeMember.findUnique({ where: { id } })

        if (memberToDelete?.role === 'admin') {
            const adminCount = await prisma.committeeMember.count({ where: { role: 'admin' } })
            if (adminCount <= 1) {
                return { success: false, error: "Não é possível excluir o único administrador do sistema." }
            }
        }

        await prisma.committeeMember.delete({
            where: { id }
        })

        revalidatePath('/comite/membros')
        return { success: true }
    } catch (error) {
        console.error("Error deleting member:", error)
        return { success: false, error: "Falha ao excluir usuário" }
    }
}
