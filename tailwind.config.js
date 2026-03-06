/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['Playfair Display', 'Georgia', 'serif'],
                inter: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                'elf': {
                    'cream': '#F9F5F0',
                    'warm': '#F0E8DC',
                    'gold': '#C9A96E',
                    'gold-light': '#E8C97E',
                    'charcoal': '#1A1A1A',
                    'dark': '#0F0F0F',
                    'muted': '#6B6560',
                    'border': '#E5DDD5',
                }
            },
            animation: {
                'fade-up': 'fadeUp 0.6s ease-out forwards',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'shimmer': 'shimmer 2s infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                }
            }
        },
    },
    plugins: [],
}
