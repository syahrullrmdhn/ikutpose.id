import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c8',
          300: '#ffa0a1',
          400: '#ff696b',
          500: '#ff4d50',
          600: '#ed1c1f',
          700: '#c81416',
          800: '#a51315',
          900: '#881618',
          950: '#4a0708',
        },
      },
      fontFamily: {
        'heading': ['"Instrument Serif"', ...defaultTheme.fontFamily.serif],
        'body': ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        'accent': ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
        'mono': ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        'xs': '6px',
        'sm': '10px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(196, 145, 155, 0.08)',
        'card-hover': '0 4px 20px rgba(196, 145, 155, 0.14)',
        'btn': '0 1px 3px rgba(196, 145, 155, 0.15)',
        'modal': '0 16px 48px rgba(45, 34, 38, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'countdown': 'countdownPulse 1s ease-in-out',
        'flash': 'flash 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        countdownPulse: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(0.8)', opacity: '0' },
        },
        flash: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
