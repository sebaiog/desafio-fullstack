import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: '0.0.0.0',
    port: 3000,
    cors: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8181',
        changeOrigin: true,
        secure: false
      },
    }
  },
  plugins: [react()]
});
