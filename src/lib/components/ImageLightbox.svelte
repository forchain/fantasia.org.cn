<script>
  import { onMount, onDestroy } from 'svelte';
  import { 
    lightboxOpen, 
    currentPhoto, 
    navigationInfo, 
    photoLoading,
    closeLightbox, 
    nextPhoto, 
    previousPhoto,
    handleKeyNavigation,
    setPhotoLoading
  } from '$lib/stores/lightbox.js';
  import { getFullImageUrl } from '$lib/utils/supabase.js';
  import { preloadImage } from '$lib/utils/imageHelpers.js';
  import { ChevronLeft, ChevronRight, X, Download, ZoomIn, ZoomOut } from 'lucide-svelte';

  // Local state
  let modalElement;
  let imageElement;
  let imageLoaded = false;
  let imageError = false;
  let zoomLevel = 1;
  let isPanning = false;
  let panPosition = { x: 0, y: 0 };
  let lastPanPosition = { x: 0, y: 0 };

  // Reactive statements
  $: fullImageUrl = $currentPhoto ? getFullImageUrl($currentPhoto.image_url) : '';
  $: canZoom = imageLoaded && !imageError;

  /**
   * Handle image load success
   */
  function handleImageLoad() {
    imageLoaded = true;
    imageError = false;
    setPhotoLoading(false);
    resetZoom();
  }

  /**
   * Handle image load error
   */
  function handleImageError() {
    imageError = true;
    imageLoaded = false;
    setPhotoLoading(false);
  }

  /**
   * Handle modal backdrop click
   */
  function handleBackdropClick(event) {
    if (event.target === modalElement) {
      closeLightbox();
    }
  }

  /**
   * Reset zoom and pan
   */
  function resetZoom() {
    zoomLevel = 1;
    panPosition = { x: 0, y: 0 };
  }

  /**
   * Zoom in
   */
  function zoomIn() {
    if (canZoom && zoomLevel < 3) {
      zoomLevel = Math.min(zoomLevel + 0.5, 3);
    }
  }

  /**
   * Zoom out
   */
  function zoomOut() {
    if (canZoom && zoomLevel > 1) {
      zoomLevel = Math.max(zoomLevel - 0.5, 1);
      if (zoomLevel === 1) {
        panPosition = { x: 0, y: 0 };
      }
    }
  }

  /**
   * Handle mouse wheel for zooming
   */
  function handleWheel(event) {
    if (!canZoom) return;
    
    event.preventDefault();
    
    if (event.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  }

  /**
   * Handle mouse down for panning
   */
  function handleMouseDown(event) {
    if (zoomLevel > 1) {
      isPanning = true;
      lastPanPosition = { x: event.clientX, y: event.clientY };
    }
  }

  /**
   * Handle mouse move for panning
   */
  function handleMouseMove(event) {
    if (isPanning && zoomLevel > 1) {
      const deltaX = event.clientX - lastPanPosition.x;
      const deltaY = event.clientY - lastPanPosition.y;
      
      panPosition.x += deltaX;
      panPosition.y += deltaY;
      
      lastPanPosition = { x: event.clientX, y: event.clientY };
    }
  }

  /**
   * Handle mouse up for panning
   */
  function handleMouseUp() {
    isPanning = false;
  }

  /**
   * Download current image
   */
  async function downloadImage() {
    if (!$currentPhoto || !fullImageUrl) return;
    
    try {
      const response = await fetch(fullImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = $currentPhoto.title || 'photo.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  }

  /**
   * Preload next and previous images
   */
  function preloadAdjacentImages() {
    // Implementation for preloading adjacent images
    // This would improve user experience when navigating
  }

  // Watch for photo changes to reset state
  $: if ($currentPhoto) {
    imageLoaded = false;
    imageError = false;
    setPhotoLoading(true);
    resetZoom();
    
    // Preload the image
    if (fullImageUrl) {
      preloadImage(fullImageUrl)
        .then(() => {
          if (imageElement) {
            imageElement.src = fullImageUrl;
          }
        })
        .catch(handleImageError);
    }
  }

  onMount(() => {
    // Add global event listeners
    document.addEventListener('keydown', handleKeyNavigation);
    
    return () => {
      document.removeEventListener('keydown', handleKeyNavigation);
    };
  });

  onDestroy(() => {
    // Clean up any remaining event listeners
    document.removeEventListener('keydown', handleKeyNavigation);
  });
</script>

{#if $lightboxOpen && $currentPhoto}
  <!-- Modal backdrop -->
  <div 
    bind:this={modalElement}
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 animate-fade-in"
    on:click={handleBackdropClick}
    on:mousemove={handleMouseMove}
    on:mouseup={handleMouseUp}
    role="dialog"
    aria-modal="true"
    aria-labelledby="lightbox-title"
  >
    <!-- Close button -->
    <button
      class="absolute top-4 right-4 z-10 p-2 text-white hover:text-gallery-300 transition-colors"
      on:click={closeLightbox}
      aria-label="Close lightbox"
    >
      <X size={24} />
    </button>

    <!-- Navigation buttons -->
    {#if $navigationInfo.hasPrevious}
      <button
        class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gallery-300 transition-colors"
        on:click={previousPhoto}
        aria-label="Previous image"
      >
        <ChevronLeft size={32} />
      </button>
    {/if}

    {#if $navigationInfo.hasNext}
      <button
        class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gallery-300 transition-colors"
        on:click={nextPhoto}
        aria-label="Next image"
      >
        <ChevronRight size={32} />
      </button>
    {/if}

    <!-- Image container -->
    <div class="relative max-w-full max-h-full flex items-center justify-center p-4">
      {#if $photoLoading}
        <!-- Loading indicator -->
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      {:else if imageError}
        <!-- Error state -->
        <div class="text-center text-white">
          <svg class="w-16 h-16 mx-auto mb-4 text-gallery-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg">Failed to load image</p>
        </div>
      {:else}
        <!-- Main image -->
        <img
          bind:this={imageElement}
          src={fullImageUrl}
          alt={$currentPhoto.title || $currentPhoto.description || 'Photo'}
          class="max-w-full max-h-full object-contain transition-all duration-300 cursor-move"
          class:cursor-zoom-in={!canZoom || zoomLevel === 1}
          class:cursor-move={zoomLevel > 1}
          style="transform: scale({zoomLevel}) translate({panPosition.x / zoomLevel}px, {panPosition.y / zoomLevel}px)"
          on:load={handleImageLoad}
          on:error={handleImageError}
          on:wheel={handleWheel}
          on:mousedown={handleMouseDown}
          draggable="false"
        />
      {/if}
    </div>

    <!-- Control bar -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 rounded-lg px-4 py-2 flex items-center space-x-4">
      <!-- Photo info -->
      <div class="text-white text-sm">
        <span id="lightbox-title" class="font-medium">
          {$currentPhoto.title || 'Untitled'}
        </span>
        <span class="text-gallery-300 ml-2">
          {$navigationInfo.current} of {$navigationInfo.total}
        </span>
      </div>

      <!-- Zoom controls -->
      {#if canZoom}
        <div class="flex items-center space-x-2">
          <button
            class="p-1 text-white hover:text-gallery-300 transition-colors"
            on:click={zoomOut}
            disabled={zoomLevel <= 1}
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          
          <span class="text-white text-sm min-w-[3rem] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          
          <button
            class="p-1 text-white hover:text-gallery-300 transition-colors"
            on:click={zoomIn}
            disabled={zoomLevel >= 3}
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      {/if}

      <!-- Download button -->
      <button
        class="p-1 text-white hover:text-gallery-300 transition-colors"
        on:click={downloadImage}
        aria-label="Download image"
      >
        <Download size={16} />
      </button>
    </div>

    <!-- Photo description -->
    {#if $currentPhoto.description}
      <div class="absolute bottom-20 left-4 right-4 text-center text-white text-sm bg-black bg-opacity-50 rounded-lg p-3 max-w-lg mx-auto">
        {$currentPhoto.description}
      </div>
    {/if}
  </div>
{/if}

<style>
  :global(body.lightbox-open) {
    overflow: hidden;
  }
</style> 