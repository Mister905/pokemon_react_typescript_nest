import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': './src',
      '@/components': './src/components',
      '@/features': './src/features',
      '@/hooks': './src/hooks',
      '@/store': './src/store',
      '@/types': './src/types',
      '@/utils': './src/utils',
    },
  },
})
