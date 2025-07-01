import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  
  // Image optimization
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp', '**/*.avif'],
  
  // Development server configuration
  server: {
    port: 5173,
    host: true
  },
  
  // Build optimization
  build: {
    target: 'es2020',
    sourcemap: true
  },
  
  // CSS configuration
  css: {
    postcss: './postcss.config.js'
  }
}); 