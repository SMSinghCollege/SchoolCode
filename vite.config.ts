import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  assetsInclude: ['**/assets/Gallery/**'],

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
});
