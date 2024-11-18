/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: 'src/shared/lib/test/setup.ts',
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '~app': path.resolve('src/app'),
      '~entities': path.resolve('src/entities'),
      '~features': path.resolve('src/features'),
      '~pages': path.resolve('src/pages'),
      '~shared': path.resolve('src/shared'),
      '~widgets': path.resolve('src/widgets'),
    },
  },
  optimizeDeps: {
    exclude: [
      'node_modules/@ant-design/*'
    ]
    // esbuildOptions: { loader: { '.js': 'ts', '.ts': 'ts', '.jsx': 'tsx', '.tsx': 'tsx' }, define: { global: 'globalThis', }, },
  }
})
