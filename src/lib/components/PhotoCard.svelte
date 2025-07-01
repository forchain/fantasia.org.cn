<script lang="ts">
  import { onMount } from 'svelte';
  import { getThumbnailUrl } from '$lib/utils/supabase';
  import { getImageDimensions, createImageObserver } from '$lib/utils/imageHelpers';
  import { openLightbox } from '$lib/stores/lightbox';
  import type { Photo } from '$lib/types/database';

  // Props
  export let photo: Photo;
  export let albumPhotos: Photo[] = [];
  export let index: number = 0;
  export let lazyLoad: boolean = true;

  // Local state
  let imageElement: HTMLDivElement;
  let loaded: boolean = false;
  let error: boolean = false;
  let intersected: boolean = false;

  // Calculate image dimensions
  $: dimensions = getImageDimensions(photo);

  // Determine if image should be loaded
  $: shouldLoad = !lazyLoad || intersected;

  // Image URLs
  $: thumbnailUrl = getThumbnailUrl(photo.image_url);

  /**
   * Handle photo click to open lightbox
   */
  function handlePhotoClick(): void {
    openLightbox(photo, albumPhotos, index);
  }

  /**
   * Handle image load success
   */
  function handleImageLoad(): void {
    loaded = true;
    error = false;
  }

  /**
   * Handle image load error
   */
  function handleImageError(): void {
    error = true;
    loaded = false;
    console.error('Failed to load image:', photo.image_url);
  }

  /**
   * Handle intersection observer callback
   */
  function handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        intersected = true;
      }
    });
  }

  onMount(() => {
    // Set up intersection observer for lazy loading
    if (lazyLoad && imageElement) {
      const observer = createImageObserver(handleIntersection, {
        rootMargin: '100px'
      });
      observer.observe(imageElement);

      return () => {
        observer.disconnect();
      };
    }
    return undefined;
  });
</script>

<article 
  class="photo-card group cursor-pointer"
  on:click={handlePhotoClick}
  on:keydown={(e) => e.key === 'Enter' && handlePhotoClick()}
  tabindex="0"
  role="button"
  aria-label="View photo: {photo.title || 'Untitled'}"
>
  <div 
    bind:this={imageElement}
    class="relative overflow-hidden rounded-lg bg-gallery-100"
    style="aspect-ratio: {dimensions.aspectRatio}"
  >
    {#if shouldLoad}
      <img
        src={thumbnailUrl}
        alt={photo.title || photo.description || 'Photo'}
        class="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        class:opacity-0={!loaded}
        class:opacity-100={loaded}
        loading={lazyLoad ? 'lazy' : 'eager'}
        on:load={handleImageLoad}
        on:error={handleImageError}
      />
    {/if}

    <!-- Loading placeholder -->
    {#if !loaded && !error}
      <div class="absolute inset-0 flex items-center justify-center bg-gallery-100">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gallery-600"></div>
      </div>
    {/if}

    <!-- Error state -->
    {#if error}
      <div class="absolute inset-0 flex items-center justify-center bg-gallery-100">
        <div class="text-center text-gallery-500">
          <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
          <span class="text-xs">Failed to load</span>
        </div>
      </div>
    {/if}

    <!-- Hover overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="bg-white bg-opacity-90 rounded-full p-2">
          <svg class="w-6 h-6 text-gallery-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  </div>

  <!-- Photo info (optional) -->
  {#if photo.title || photo.description}
    <div class="mt-3">
      {#if photo.title}
        <h4 class="text-sm font-medium text-gallery-900 truncate">
          {photo.title}
        </h4>
      {/if}
      
      {#if photo.description}
        <p class="text-xs text-gallery-600 mt-1 line-clamp-2">
          {photo.description}
        </p>
      {/if}
    </div>
  {/if}
</article>

<style>
  .photo-card {
    @apply transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md;
  }
  
  .photo-card:focus {
    @apply outline-none ring-2 ring-gallery-500 ring-offset-2 rounded-lg;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 