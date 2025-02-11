import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/json_prettier/',
  server: {
    port: 8080,
    allowedHosts: ["sireagle.ru", "www.sireagle.ru"],
  }
})
