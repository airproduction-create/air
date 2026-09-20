import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  css: {
    // No inline theme here — tailwindcss() reads tailwind.config.js so there is
    // exactly one source of truth for the theme (colors, fonts, etc).
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
})
