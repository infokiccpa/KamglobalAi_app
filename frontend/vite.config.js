import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_TARGET = process.env.API_PROXY_TARGET || 'http://localhost:5001'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Pre-render build (scripts/prerender.mjs): bundle CommonJS-only packages so Node can import them.
  ssr: {
    noExternal: ['react-helmet-async', 'react-countup', 'countup.js', 'react-visibility-sensor'],
  },
  server: {
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: API_TARGET,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
