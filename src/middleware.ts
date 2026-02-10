import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Rotas do comitê que precisam de autenticação
    if (pathname.startsWith('/comite') && pathname !== '/comite/login') {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET || "canal-denuncias-hsc-secret-key-2024"
        })

        if (!token) {
            const loginUrl = new URL('/comite/login', request.url)
            loginUrl.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    // Redirecionar do login se já estiver autenticado
    if (pathname === '/comite/login') {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET || "canal-denuncias-hsc-secret-key-2024"
        })

        if (token) {
            return NextResponse.redirect(new URL('/comite', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/comite/:path*']
}
