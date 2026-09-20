/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#18140F',
        obsidian: '#211B14',
        surface: '#211B14',
        'surface-2': '#2A2318',
        border: 'rgba(237,230,214,.14)',
        'border-light': 'rgba(237,230,214,.28)',
        gold: '#C1703F',
        'gold-dim': '#8C4B29',
        'gold-bright': '#D68A5C',
        accent: '#C1703F',
        'accent-dim': '#8C4B29',
        'accent-bright': '#D68A5C',
        cream: '#EDE4D3',
        'cream-dim': '#B7AB96',
        muted: '#7C7361',
        rust: '#8C4B29',
        chrome: '#c8c8cc',
        'chrome-dim': '#8a8a90',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Archivo Expanded"', 'Arial', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Archivo', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        hero: ['Anton', 'Impact', '"Archivo Expanded"', 'sans-serif'],
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
