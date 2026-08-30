/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
          400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
          800: '#075985', 900: '#0c4a6e',
        },
        sun: {
          50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
          400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
        },
        mint: {
          50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
          400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
        },
        berry: {
          50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4',
          400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d',
        },
        tangerine: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
        },
        grape: {
          50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
          400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
        },
      },
      fontFamily: {
        display: ['Baloo 2', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0,0,0,0.08)',
        'pop': '0 8px 30px -4px rgba(0,0,0,0.12)',
        'glow': '0 0 30px -5px rgba(56, 189, 248, 0.4)',
        'inner-soft': 'inset 0 2px 8px rgba(0,0,0,0.06)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'bounce-soft': 'bounceSoft 0.6s ease',
        'pop-in': 'popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'spin-slow': 'spin 20s linear infinite',
        'drift': 'drift 30s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shake': 'shake 0.4s ease',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px) scale(1.05)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.7)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
      },
    },
  },
  plugins: [],
};
