/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.ts',
  },
  server: {
    port:3000,
    strictPort: true,
    hmr:{
      clientPort: 3000,
    },
    proxy: {
      "/api": "http://localhost:8080"
      },
    }
});
