import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    host : '0.0.0.0',  //For run project on multiple devices like http:192.168.1.43:3000
    port : 3000,
  }
})
