import { defineConfig } from 'vite';

// Minimal Vite config — remove plugin import to avoid plugin/Vite-version mismatches in this environment.
export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});