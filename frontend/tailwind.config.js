import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dusty-pink': {
          50: '#FDF5F6',
          100: '#F5E6E8',
          200: '#E8CDD0',
          300: '#D4A8AE',
          400: '#C4919B',
          500: '#B47A85',
          600: '#A66B76',
          700: '#8C5562',
          800: '#73414F',
          900: '#5A303D',
          950: '#2D2226',
        },
        'warm-gray': {
          50: '#F7F3F4',
          100: '#EEEBEC',
          200: '#D4CBCC',
          300: '#B8ACAE',
          400: '#9A8B8E',
          500: '#6B5B5F',
          600: '#564A4D',
          700: '#41383A',
          800: '#2D2226',
          900: '#1A1416',
        },
        'mauve-gold': '#C4A882',
        'sage-soft': '#A8B5A0',
        'terra-blush': '#D4A59A',
        'muted-red': '#C97070',
        'dusty-blue': '#8FA6B5',
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
