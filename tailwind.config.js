/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        transparent: 'transparent',
        current: 'currentColor',
        extend: {
            colors: {
                primary: {
                    50: '#f0f4f8',
                    100: '#d9e2ec',
                    200: '#bcccdc',
                    300: '#9fb3c8',
                    400: '#829ab1',
                    500: '#627d98',
                    600: '#486581',
                    700: '#334e68',
                    800: '#243b53',
                    900: '#102a43', // Azul Marinho principal
                    950: '#0a1929',
                },
                tremor: {
                    brand: {
                        faint: '#eff6ff',
                        muted: '#bfdbfe',
                        subtle: '#60a5fa',
                        DEFAULT: '#3b82f6',
                        emphasis: '#1d4ed8',
                        inverted: '#ffffff',
                    },
                    background: {
                        muted: '#f9fafb',
                        subtle: '#f3f4f6',
                        DEFAULT: '#ffffff',
                        emphasis: '#374151',
                    },
                    border: {
                        DEFAULT: '#e5e7eb',
                    },
                    ring: {
                        DEFAULT: '#e5e7eb',
                    },
                    content: {
                        subtle: '#9ca3af',
                        DEFAULT: '#6b7280',
                        emphasis: '#374151',
                        strong: '#111827',
                        inverted: '#ffffff',
                    },
                },
            },
            boxShadow: {
                'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            },
            borderRadius: {
                'tremor-small': '0.375rem',
                'tremor-default': '0.5rem',
                'tremor-full': '9999px',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
