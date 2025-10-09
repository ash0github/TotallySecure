import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'


const keyPath = path.resolve(__dirname, 'certs/server.key')
const certPath = path.resolve(__dirname, 'certs/server.crt')

export default defineConfig(({ command }) => ({
  plugins: [react()],
  

  base: command === 'build' ? '/TotallySecure/' : '/',
  
  server: {
    port: 4114,
    https: fs.existsSync(keyPath) && fs.existsSync(certPath)
      ? {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        }
      : false,
  },
}))
