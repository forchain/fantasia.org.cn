<script>
  import '../app.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import ImageLightbox from '$lib/components/ImageLightbox.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // Page metadata
  $: pageTitle = getPageTitle($page.route.id);
  $: pageDescription = getPageDescription($page.route.id);

  /**
   * Get page title based on route
   * @param {string} routeId - Route identifier
   * @returns {string} Page title
   */
  function getPageTitle(routeId) {
    switch (routeId) {
      case '/':
        return 'Fantasia Gallery - Personal Photography Collection';
      case '/album/[slug]':
        return 'Album - Fantasia Gallery';
      case '/about':
        return 'About - Fantasia Gallery';
      default:
        return 'Fantasia Gallery';
    }
  }

  /**
   * Get page description based on route
   * @param {string} routeId - Route identifier
   * @returns {string} Page description
   */
  function getPageDescription(routeId) {
    switch (routeId) {
      case '/':
        return 'Personal gallery showcasing life moments through photography and visual storytelling';
      case '/album/[slug]':
        return 'Explore photos and memories from this album';
      case '/about':
        return 'Learn more about Fantasia Gallery and the photographer behind the lens';
      default:
        return 'Personal gallery showcasing life moments through photography';
    }
  }

  onMount(() => {
    // Add any global initialization here
    console.log('Fantasia Gallery initialized');
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={pageDescription} />
  
  <!-- Dynamic meta tags based on current page -->
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:url" content="{$page.url.origin}{$page.url.pathname}" />
  
  <meta property="twitter:title" content={pageTitle} />
  <meta property="twitter:description" content={pageDescription} />
</svelte:head>

<!-- Global layout structure -->
<div class="min-h-screen bg-gallery-50 flex flex-col">
  <!-- Navigation -->
  <Navigation />
  
  <!-- Main content area -->
  <main class="flex-1">
    <slot />
  </main>
  
  <!-- Footer -->
  <footer class="bg-white border-t border-gallery-200 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Footer content -->
        <div class="text-center md:text-left mb-4 md:mb-0">
          <h3 class="text-lg font-semibold text-gallery-900 mb-2">Fantasia Gallery</h3>
          <p class="text-gallery-600 text-sm max-w-md">
            A personal collection of life moments captured through the lens. 
            Each photo tells a story, each album preserves a memory.
          </p>
        </div>
        
        <!-- Social links or contact info -->
        <div class="flex items-center space-x-6">
          <div class="text-sm text-gallery-500">
            <p>&copy; {new Date().getFullYear()} Fantasia Gallery</p>
            <p class="mt-1">Built with ❤️ using Svelte</p>
          </div>
        </div>
      </div>
      
      <!-- Additional footer links -->
      <div class="mt-6 pt-6 border-t border-gallery-200">
        <div class="flex flex-col sm:flex-row justify-between items-center text-sm text-gallery-500">
          <div class="flex space-x-6 mb-2 sm:mb-0">
            <a href="/about" class="hover:text-gallery-700 transition-colors">About</a>
            <a href="mailto:hello@fantasia.org.cn" class="hover:text-gallery-700 transition-colors">Contact</a>
          </div>
          
          <div class="flex items-center space-x-4">
            <span>Powered by</span>
            <a 
              href="https://kit.svelte.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hover:text-gallery-700 transition-colors"
            >
              SvelteKit
            </a>
            <span>•</span>
            <a 
              href="https://supabase.com" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hover:text-gallery-700 transition-colors"
            >
              Supabase
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

<!-- Global lightbox component -->
<ImageLightbox />

<!-- Global styles for body classes -->
<style>
  :global(body) {
    @apply text-gallery-900 bg-gallery-50;
  }
  
  :global(.page-transition) {
    @apply transition-all duration-300 ease-in-out;
  }
</style> 