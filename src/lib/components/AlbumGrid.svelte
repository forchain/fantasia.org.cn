<script lang="ts">
  import { onMount } from 'svelte';
  import { albums, albumsLoading, albumsError, loadAlbums } from '$lib/stores/albums';
  import { getThumbnailUrl } from '$lib/utils/supabase';
  import { getAspectRatio } from '$lib/utils/imageHelpers';

  // Load albums when component mounts
  onMount(() => {
    loadAlbums();
  });

  /**
   * Handle album card click navigation
   * @param slug - Album slug
   */
  function handleAlbumClick(slug: string): void {
    window.location.href = `/album/${slug}`;
  }

  /**
   * Format date for display
   * @param dateString - ISO date string
   * @returns Formatted date
   */
  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="album-grid-container">
  {#if $albumsLoading}
    <!-- Loading skeleton -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each Array(8) as _}
        <div class="album-card-skeleton">
          <div class="aspect-square bg-gallery-200 rounded-lg animate-pulse"></div>
          <div class="mt-4 space-y-2">
            <div class="h-4 bg-gallery-200 rounded animate-pulse"></div>
            <div class="h-3 bg-gallery-200 rounded w-2/3 animate-pulse"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else if $albumsError}
    <!-- Error state -->
    <div class="text-center py-12">
      <div class="text-gallery-500 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gallery-900 mb-2">Failed to load albums</h3>
      <p class="text-gallery-600 mb-4">{$albumsError}</p>
      <button 
        on:click={loadAlbums}
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gallery-600 hover:bg-gallery-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gallery-500"
      >
        Try Again
      </button>
    </div>
  {:else if $albums.length === 0}
    <!-- Empty state -->
    <div class="text-center py-12">
      <div class="text-gallery-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gallery-900 mb-2">No albums found</h3>
      <p class="text-gallery-600">Albums will appear here once they are published.</p>
    </div>
  {:else}
    <!-- Albums grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each $albums as album (album.id)}
        <article class="album-card group">
          <button
            class="w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-gallery-500 focus:ring-offset-2 rounded-lg"
            on:click={() => handleAlbumClick(album.slug)}
            aria-label="View album {album.title}"
          >
          <!-- Album cover image -->
          <div class="relative aspect-square overflow-hidden rounded-lg bg-gallery-100">
            {#if album.cover_image_url}
              <img
                src={getThumbnailUrl(album.cover_image_url)}
                alt={album.title}
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                style="aspect-ratio: {getAspectRatio(1, 1)}"
              />
            {:else}
              <!-- Placeholder for albums without cover image -->
              <div class="w-full h-full flex items-center justify-center bg-gallery-100">
                <svg class="w-12 h-12 text-gallery-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            {/if}
            
            <!-- Photo count overlay -->
            <div class="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-full">
              {album.photo_count || 0} photos
            </div>
          </div>

          <!-- Album info -->
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-gallery-900 group-hover:text-gallery-700 transition-colors">
              {album.title}
            </h3>
            
            {#if album.description}
              <p class="text-gallery-600 text-sm mt-1 line-clamp-2">
                {album.description}
              </p>
            {/if}
            
            <div class="flex items-center justify-between mt-2 text-xs text-gallery-500">
              <span>{formatDate(album.created_at)}</span>
              <span>{album.photo_count || 0} photos</span>
            </div>
          </div>
          </button>
        </article>
      {/each}
    </div>
  {/if}
</div>

<style>
  .album-card {
    @apply transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg;
  }
  
  .album-card:focus {
    @apply outline-none ring-2 ring-gallery-500 ring-offset-2;
  }
  
  .album-card-skeleton {
    @apply animate-pulse;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style> 