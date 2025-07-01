import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // Adapter for deployment
    adapter: adapter({
      runtime: 'nodejs18.x',
      regions: ['sin1'], // Singapore region for better performance in Asia
      images: {
        sizes: [640, 828, 1200, 1920, 3840],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 300,
        domains: []
      }
    }),
    
    // App configuration
    serviceWorker: {
      register: false
    },
    
    // Environment variables
    env: {
      publicPrefix: 'PUBLIC_'
    },

    // TypeScript configuration
    typescript: {
      config: (config) => {
        config.compilerOptions.allowJs = true;
        config.compilerOptions.checkJs = true;
        config.compilerOptions.strict = true;
        return config;
      }
    }
  }
};

export default config; 