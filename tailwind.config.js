/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0A0A0F',
          darker: '#060609',
          card: '#0F172A',
          cardBorder: '#1E293B',
          hoverBorder: '#3B82F6',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          neon: '#10B981',
          purple: '#8B5CF6',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'cyber-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'cyber-neon': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'cyber-glow': '0 0 35px -5px rgba(59, 130, 246, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}
