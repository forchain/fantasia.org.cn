<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import PhotoCard from '$lib/components/PhotoCard.svelte';
  import { currentAlbum, currentAlbumLoading, currentAlbumError, loadAlbum } from '$lib/stores/albums.js';
  import { ChevronLeft, Calendar, Camera, MapPin } from 'lucide-svelte';

  // Get album slug from URL parameters
  $: slug = $page.params.slug;

  // Load album when component mounts or slug changes
  $: if (slug) {
    loadAlbum(slug);
  }

  /**
   * Go back to home page
   */
  function goBack() {
    goto('/');
  }

  /**
   * Format date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Format long date for display
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted long date
   */
  function formatLongDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  onMount(() => {
    console.log('Album page mounted for slug:', slug);
  });
</script>

<svelte:head>
  {#if $currentAlbum}
    <title>{$currentAlbum.title} - Fantasia Gallery</title>
    <meta name="description" content={$currentAlbum.description || `View photos from the ${$currentAlbum.title} album`} />
    
    <!-- Open Graph meta tags -->
    <meta property="og:title" content="{$currentAlbum.title} - Fantasia Gallery" />
    <meta property="og:description" content={$currentAlbum.description || `View photos from the ${$currentAlbum.title} album`} />
    <meta property="og:type" content="article" />
    {#if $currentAlbum.cover_image_url}
      <meta property="og:image" content={$currentAlbum.cover_image_url} />
    {/if}
    
    <!-- Structured data -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        "name": "{$currentAlbum.title}",
        "description": "{$currentAlbum.description || ''}",
        "dateCreated": "{$currentAlbum.created_at}",
        "author": {
          "@type": "Person",
          "name": "Fantasia"
        },
        "numberOfItems": {$currentAlbum.photos?.length || 0}
      }
    </script>
  {:else}
    <title>Album - Fantasia Gallery</title>
    <meta name="description" content="View album photos in Fantasia Gallery" />
  {/if}
</svelte:head>

<!-- Loading state -->
{#if $currentAlbumLoading}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="spinner w-12 h-12 mx-auto mb-4"></div>
      <p class="text-gallery-600">Loading album...</p>
    </div>
  </div>

<!-- Error state -->
{:else if $currentAlbumError}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center max-w-md mx-auto px-4">
      <svg class="w-16 h-16 mx-auto mb-6 text-gallery-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      
      <h1 class="text-2xl font-bold text-gallery-900 mb-4">Album Not Found</h1>
      <p class="text-gallery-600 mb-6">
        The album you're looking for doesn't exist or has been removed.
      </p>
      
      <button on:click={goBack} class="btn-primary">
        <ChevronLeft class="w-4 h-4 mr-2" />
        Back to Gallery
      </button>
    </div>
  </div>

<!-- Album content -->
{:else if $currentAlbum}
  <div class="min-h-screen">
    <!-- Album header -->
    <section class="bg-white border-b border-gallery-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb and back button -->
        <div class="flex items-center mb-6">
          <button 
            on:click={goBack}
            class="flex items-center text-gallery-600 hover:text-gallery-900 transition-colors mr-4"
            aria-label="Back to gallery"
          >
            <ChevronLeft class="w-5 h-5 mr-1" />
            <span class="text-sm font-medium">Gallery</span>
          </button>
          
          <nav class="text-sm text-gallery-500">
            <span>/</span>
            <span class="ml-2">{$currentAlbum.title}</span>
          </nav>
        </div>
        
        <!-- Album info -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <!-- Album details -->
          <div class="lg:col-span-2">
            <h1 class="text-3xl md:text-4xl font-bold text-gallery-900 mb-4">
              {$currentAlbum.title}
            </h1>
            
            {#if $currentAlbum.description}
              <p class="text-lg text-gallery-600 leading-relaxed mb-6">
                {$currentAlbum.description}
              </p>
            {/if}
            
            <!-- Album metadata -->
            <div class="flex flex-wrap items-center gap-6 text-sm text-gallery-500">
              <div class="flex items-center">
                <Calendar class="w-4 h-4 mr-2" />
                <span>{formatLongDate($currentAlbum.created_at)}</span>
              </div>
              
              <div class="flex items-center">
                <Camera class="w-4 h-4 mr-2" />
                <span>{$currentAlbum.photos?.length || 0} photos</span>
              </div>
            </div>
          </div>
          
          <!-- Album cover (if available) -->
          {#if $currentAlbum.cover_image_url}
            <div class="lg:col-span-1">
              <div class="aspect-square rounded-lg overflow-hidden bg-gallery-100 shadow-lg">
                <img
                  src={$currentAlbum.cover_image_url}
                  alt="{$currentAlbum.title} cover"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          {/if}
        </div>
      </div>
    </section>
    
    <!-- Photos grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {#if $currentAlbum.photos && $currentAlbum.photos.length > 0}
          <!-- Photos grid -->
          <div class="image-grid">
            {#each $currentAlbum.photos as photo, index (photo.id)}
              <PhotoCard 
                {photo} 
                albumPhotos={$currentAlbum.photos} 
                {index}
                lazyLoad={index > 8}
              />
            {/each}
          </div>
          
          <!-- Album footer info -->
          <div class="mt-16 pt-8 border-t border-gallery-200 text-center">
            <p class="text-gallery-600 mb-4">
              End of album • {$currentAlbum.photos.length} photos total
            </p>
            
            <button on:click={goBack} class="btn-secondary">
              <ChevronLeft class="w-4 h-4 mr-2" />
              Back to Gallery
            </button>
          </div>
          
        {:else}
          <!-- Empty album state -->
          <div class="text-center py-16">
            <svg class="w-20 h-20 mx-auto mb-6 text-gallery-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            
            <h3 class="text-2xl font-semibold text-gallery-900 mb-3">
              No Photos Yet
            </h3>
            
            <p class="text-gallery-600 mb-6 max-w-md mx-auto">
              This album is being prepared. Photos will be added soon to share new memories and moments.
            </p>
            
            <button on:click={goBack} class="btn-primary">
              <ChevronLeft class="w-4 h-4 mr-2" />
              Back to Gallery
            </button>
          </div>
        {/if}
      </div>
    </section>
  </div>

<!-- Fallback loading state -->
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="spinner w-12 h-12 mx-auto mb-4"></div>
      <p class="text-gallery-600">Loading...</p>
    </div>
  </div>
{/if}

<style>
  /* Custom styles for album page */
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  @media (min-width: 640px) {
    .image-grid {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
    }
  }
  
  @media (min-width: 1024px) {
    .image-grid {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
  }
</style> 