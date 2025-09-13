import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4114,
    https: {
      key: fs.readFileSync('certs/server.key'),
      cert: fs.readFileSync('certs/server.crt'),
    }
  }
})
