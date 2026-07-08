/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#080808',
        obsidian: '#0f0f0f',
        surface: '#161616',
        'surface-2': '#1e1e1e',
        border: '#2a2a2a',
        'border-light': '#363636',
        gold: '#ff5700',
        'gold-dim': '#d94a00',
        'gold-bright': '#ff7a33',
        accent: '#ff5700',
        'accent-dim': '#d94a00',
        'accent-bright': '#ff7a33',
        cream: '#f5f5f4',
        'cream-dim': '#b4b4b1',
        muted: '#6b6b6b',
        rust: '#e5533d',
        chrome: '#c8c8cc',
        'chrome-dim': '#8a8a90',
      },
      fontFamily: {
        display: ['Switzer', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Switzer', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Switzer', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.4em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'line-expand': 'lineExpand 1.2s ease forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineExpand: {
          '0%': { width: '0', opacity: '0' },
          '100%': { width: '100%', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 169, 110, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 169, 110, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}
