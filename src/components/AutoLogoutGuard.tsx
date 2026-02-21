'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'

interface AutoLogoutGuardProps {
    timeoutMinutes?: number
}

export function AutoLogoutGuard({ timeoutMinutes = 15 }: AutoLogoutGuardProps) {
    useEffect(() => {
        let timeoutId: NodeJS.Timeout

        const resetTimer = () => {
            if (timeoutId) clearTimeout(timeoutId)
            // Timeout triggers the logout and redirects with an expired flag
            timeoutId = setTimeout(() => {
                signOut({ callbackUrl: '/comite/login?expired=true' })
            }, timeoutMinutes * 60 * 1000)
        }

        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']

        const handleActivity = () => {
            resetTimer()
        }

        // Attach listeners
        events.forEach(event => {
            window.addEventListener(event, handleActivity)
        })

        // Initial setup
        resetTimer()

        // Cleanup on unmount
        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            events.forEach(event => {
                window.removeEventListener(event, handleActivity)
            })
        }
    }, [timeoutMinutes])

    return null
}
