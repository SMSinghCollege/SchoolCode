import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  server: {
    host: true,
    allowedHosts: true,
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        admissionEnquiry: resolve(__dirname, 'admission-enquiry.html'),
      },
    },
  },
})