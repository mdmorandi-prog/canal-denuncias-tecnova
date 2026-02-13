import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/comite/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/comite');
            const isLoginPage = nextUrl.pathname.startsWith('/comite/login');

            if (isOnDashboard) {
                if (isLoginPage) return true; // Always allow access to login page
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // If logged in and on login page, redirect to dashboard
                if (isLoginPage) {
                    return Response.redirect(new URL('/comite', nextUrl));
                }
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
