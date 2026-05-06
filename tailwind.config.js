/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Paleta Tecnova: Verde Lima (#83C120) e Cinza Escuro (#282828)
                primary: {
                    50: '#f4faea',
                    100: '#e7f4d2',
                    200: '#cfe9a5',
                    300: '#b2db71',
                    400: '#99cd46',
                    500: '#83C120', // Verde Tecnova principal
                    600: '#679b18',
                    700: '#4e7616',
                    800: '#405e16',
                    900: '#374f17',
                    950: '#1b2c08',
                },
                neutral: {
                    50: '#f6f6f6',
                    100: '#e7e7e7',
                    200: '#d1d1d1',
                    300: '#b0b0b0',
                    400: '#888888',
                    500: '#6d6d6d',
                    600: '#5d5d5d',
                    700: '#4f4f4f',
                    800: '#282828', // Cinza Escuro Tecnova principal
                    900: '#1a1a1a',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
