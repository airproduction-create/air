import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          content: [
            resolve(__dirname, 'index.html'),
            resolve(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
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
                // Arqos orange accent — mapped onto the legacy `gold*` names so
                // every existing text-gold/border-gold usage recolors for free.
                gold: '#ff5700',
                'gold-dim': '#d94a00',
                'gold-bright': '#ff7a33',
                accent: '#ff5700',
                'accent-dim': '#d94a00',
                'accent-bright': '#ff7a33',
                // Neutral near-white B&W scale (cooler than the old warm cream).
                cream: '#f5f5f4',
                'cream-dim': '#b4b4b1',
                muted: '#8f8f8f',
                rust: '#e5533d',
                chrome: '#c8c8cc',
                'chrome-dim': '#8a8a90',
              },
              fontFamily: {
                // Switzer grotesque for both display (font-serif slot) and body —
                // matches the Arqos template. Mono kept for numbered labels.
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
                float: 'float 6s ease-in-out infinite',
                glow: 'glow 2s ease-in-out infinite alternate',
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
                  '0%': { boxShadow: '0 0 20px rgba(255, 87, 0, 0.12)' },
                  '100%': { boxShadow: '0 0 44px rgba(255, 87, 0, 0.34)' },
                },
              },
            },
          },
          plugins: [],
        }),
        autoprefixer(),
      ],
    },
  },
})
