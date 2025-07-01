<script>
  import { onMount } from 'svelte';
  import AlbumGrid from '$lib/components/AlbumGrid.svelte';
  import { albums, albumsCount, totalPhotosCount } from '$lib/stores/albums.js';

  // Hero section state
  let heroVisible = true;

  onMount(() => {
    // Add any page-specific initialization
    console.log('Homepage mounted');
  });
</script>

<svelte:head>
  <title>Fantasia Gallery - Personal Photography Collection</title>
  <meta name="description" content="Welcome to Fantasia Gallery, a personal collection of life moments captured through photography. Explore albums filled with memories, stories, and visual narratives." />
  
  <!-- Structured data for homepage -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Website",
      "name": "Fantasia Gallery",
      "description": "Personal photography gallery showcasing life moments through visual storytelling",
      "url": "https://fantasia.org.cn",
      "author": {
        "@type": "Person",
        "name": "Fantasia"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://fantasia.org.cn/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  </script>
</svelte:head>

<!-- Hero Section -->
{#if heroVisible}
  <section class="relative bg-gradient-to-br from-gallery-50 to-gallery-100 py-16 lg:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <!-- Main heading -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gallery-900 mb-6">
          <span class="block">Welcome to</span>
          <span class="block bg-gradient-to-r from-gallery-600 to-gallery-800 bg-clip-text text-transparent">
            Fantasia Gallery
          </span>
        </h1>
        
        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-gallery-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          A personal collection of life moments captured through the lens. 
          Each photograph tells a story, each album preserves a memory.
        </p>
        
        <!-- Stats -->
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
          <div class="flex items-center space-x-2 text-gallery-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span class="font-semibold">{$albumsCount}</span>
            <span>albums</span>
          </div>
          
          <div class="flex items-center space-x-2 text-gallery-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="font-semibold">{$totalPhotosCount}</span>
            <span>photos</span>
          </div>
        </div>
        
        <!-- Call to action -->
        <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="#albums" 
            class="btn-primary px-8 py-3 text-base"
            on:click={() => {
              document.getElementById('albums')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Albums
          </a>
          
          <a href="/about" class="btn-secondary px-8 py-3 text-base">
            About Me
          </a>
        </div>
      </div>
    </div>
    
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-gallery-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div class="absolute top-3/4 right-1/4 w-72 h-72 bg-gallery-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style="animation-delay: 2s"></div>
    </div>
  </section>
{/if}

<!-- Albums Section -->
<section id="albums" class="py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gallery-900 mb-4">
        Photo Albums
      </h2>
      <p class="text-lg text-gallery-600 max-w-2xl mx-auto">
        Browse through collections of memories, each album capturing a unique moment or journey in time.
      </p>
    </div>
    
    <!-- Albums grid component -->
    <AlbumGrid />
    
    <!-- Empty state message when no albums -->
    {#if $albums.length === 0}
      <div class="text-center py-16">
        <div class="max-w-md mx-auto">
          <div class="mb-6">
            <svg class="w-20 h-20 mx-auto text-gallery-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h3 class="text-2xl font-semibold text-gallery-900 mb-3">
            Coming Soon
          </h3>
          
          <p class="text-gallery-600 mb-6">
            New albums and photos are being prepared. Check back soon for fresh content and new memories to explore.
          </p>
          
          <a href="/about" class="btn-primary">
            Learn More About This Gallery
          </a>
        </div>
      </div>
    {/if}
  </div>
</section>

<!-- Features Section -->
{#if $albums.length > 0}
  <section class="bg-white py-16 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gallery-900 mb-4">
          Gallery Features
        </h2>
        <p class="text-lg text-gallery-600 max-w-2xl mx-auto">
          Designed for the best photo viewing experience with modern web technologies.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Feature 1: Lightbox -->
        <div class="text-center">
          <div class="w-16 h-16 bg-gallery-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gallery-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gallery-900 mb-2">Full-Screen Viewing</h3>
          <p class="text-gallery-600">
            Click any photo to view it in full-screen lightbox with zoom and navigation controls.
          </p>
        </div>
        
        <!-- Feature 2: Responsive -->
        <div class="text-center">
          <div class="w-16 h-16 bg-gallery-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gallery-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gallery-900 mb-2">Mobile Optimized</h3>
          <p class="text-gallery-600">
            Fully responsive design that works beautifully on desktop, tablet, and mobile devices.
          </p>
        </div>
        
        <!-- Feature 3: Fast -->
        <div class="text-center">
          <div class="w-16 h-16 bg-gallery-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gallery-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gallery-900 mb-2">Lightning Fast</h3>
          <p class="text-gallery-600">
            Optimized images and lazy loading ensure fast page loads and smooth browsing experience.
          </p>
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  /* Custom animations for hero elements */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
</style> 