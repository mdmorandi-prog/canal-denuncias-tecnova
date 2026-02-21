import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig: NextAuthConfig = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "E-mail", type: "email" },
                password: { label: "Senha", type: "password" },
                code: { label: "Código", type: "text" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const user = await prisma.committeeMember.findUnique({
                    where: { email: credentials.email as string }
                })

                if (!user || !user.active) {
                    return null
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                )

                if (!passwordMatch) {
                    return null
                }

                // --------- 2FA Validation ---------
                if (credentials.code) {
                    const tokenRecord = await prisma.twoFactorToken.findFirst({
                        where: { email: user.email }
                    })

                    // If token doesn't exist, doesn't match, or expired
                    if (!tokenRecord || tokenRecord.token !== credentials.code || tokenRecord.expires < new Date()) {
                        return null // Invalid 2FA
                    }

                    // Delete token after successful use
                    await prisma.twoFactorToken.delete({
                        where: { id: tokenRecord.id }
                    })
                } else {
                    // For security, if the code wasn't provided at all but they hit NextAuth, reject.
                    // Only the custom API handles generation.
                    return null
                }
                // ----------------------------------

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                (session.user as any).role = token.role
            }
            return session
        }
    },
    pages: {
        signIn: "/comite/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "canal-denuncias-hsc-secret-key-2024",
}

export const { auth, signIn, signOut } = NextAuth(authConfig)
