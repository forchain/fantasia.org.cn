<script>
  import { page } from '$app/stores';
  import { albumsCount, totalPhotosCount } from '$lib/stores/albums.js';

  // Props
  export let showStats = true;

  // Navigation items
  const navItems = [
    { href: '/', label: 'Gallery', exact: true },
    { href: '/about', label: 'About' }
  ];

  /**
   * Check if route is active
   * @param {string} href - Route href
   * @param {boolean} exact - Whether to match exactly
   * @returns {boolean} Is route active
   */
  function isActiveRoute(href, exact = false) {
    if (exact) {
      return $page.url.pathname === href;
    }
    return $page.url.pathname.startsWith(href);
  }
</script>

<nav class="bg-white shadow-sm border-b border-gallery-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo / Brand -->
      <div class="flex items-center">
        <a 
          href="/" 
          class="flex items-center space-x-3 text-gallery-900 hover:text-gallery-700 transition-colors"
          aria-label="Fantasia Gallery Home"
        >
          <!-- Logo icon -->
          <div class="w-8 h-8 bg-gradient-to-br from-gallery-600 to-gallery-800 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <!-- Brand name -->
          <div class="flex flex-col">
            <span class="font-bold text-lg leading-tight">Fantasia</span>
            <span class="text-xs text-gallery-500 leading-tight">Gallery</span>
          </div>
        </a>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center space-x-8">
        {#each navItems as item}
          <a
            href={item.href}
            class="text-sm font-medium transition-colors duration-200"
            class:text-gallery-900={isActiveRoute(item.href, item.exact)}
            class:text-gallery-600={!isActiveRoute(item.href, item.exact)}
            class:hover:text-gallery-900={!isActiveRoute(item.href, item.exact)}
            aria-current={isActiveRoute(item.href, item.exact) ? 'page' : undefined}
          >
            {item.label}
          </a>
        {/each}
      </div>

      <!-- Stats (optional) -->
      {#if showStats}
        <div class="hidden lg:flex items-center space-x-4 text-sm text-gallery-600">
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>{$albumsCount} albums</span>
          </div>
          
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{$totalPhotosCount} photos</span>
          </div>
        </div>
      {/if}

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button
          type="button"
          class="text-gallery-600 hover:text-gallery-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gallery-500 p-2"
          aria-controls="mobile-menu"
          aria-expanded="false"
          on:click={() => {
            // Toggle mobile menu
            const menu = document.getElementById('mobile-menu');
            if (menu) {
              menu.classList.toggle('hidden');
            }
          }}
        >
          <span class="sr-only">Open main menu</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="md:hidden hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 border-t border-gallery-200">
        {#each navItems as item}
          <a
            href={item.href}
            class="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
            class:text-gallery-900={isActiveRoute(item.href, item.exact)}
            class:bg-gallery-50={isActiveRoute(item.href, item.exact)}
            class:text-gallery-600={!isActiveRoute(item.href, item.exact)}
            class:hover:text-gallery-900={!isActiveRoute(item.href, item.exact)}
            class:hover:bg-gallery-50={!isActiveRoute(item.href, item.exact)}
            aria-current={isActiveRoute(item.href, item.exact) ? 'page' : undefined}
          >
            {item.label}
          </a>
        {/each}
        
        <!-- Mobile stats -->
        {#if showStats}
          <div class="px-3 py-2 border-t border-gallery-200 mt-2 pt-4">
            <div class="flex items-center justify-between text-sm text-gallery-600">
              <span>{$albumsCount} albums</span>
              <span>{$totalPhotosCount} photos</span>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav> 