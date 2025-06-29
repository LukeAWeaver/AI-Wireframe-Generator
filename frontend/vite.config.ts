import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@compound': path.resolve(__dirname, 'src/components/compound'),
      '@primitives': path.resolve(__dirname, 'src/components/primitives'),
      '@styled': path.resolve(__dirname, 'src/components/styled'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
    }
  }
}) 