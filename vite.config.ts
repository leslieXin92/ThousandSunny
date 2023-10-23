import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'http://192.168.1.113:8000', // dev
        target: 'http://120.25.247.55:8000', // prod
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
