import type { Photo, ImageDimensions } from '$lib/types/database';

/**
 * Calculate aspect ratio from width and height
 * @param width - Image width
 * @param height - Image height
 * @returns CSS aspect ratio value
 */
export function getAspectRatio(width: number, height: number): string {
  if (!width || !height) return '1 / 1';
  return `${width} / ${height}`;
}

/**
 * Generate responsive image sizes for different breakpoints
 * @param baseWidth - Base image width
 * @returns Sizes attribute for responsive images
 */
export function getResponsiveSizes(baseWidth: number = 400): string {
  return `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${baseWidth}px`;
}

/**
 * Create intersection observer for lazy loading images
 * @param callback - Callback function when element intersects
 * @param options - Observer options
 * @returns IntersectionObserver instance
 */
export function createImageObserver(
  callback: IntersectionObserverCallback, 
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Preload an image
 * @param src - Image source URL
 * @returns Promise that resolves when image loads
 */
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Format file size for display
 * @param bytes - File size in bytes
 * @returns Formatted file size
 */
export function formatFileSize(bytes: number): string {
  if (!bytes) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Get image dimensions from URL (when available in metadata)
 * @param photo - Photo object with width/height
 * @returns Dimensions object
 */
export function getImageDimensions(photo: Photo): ImageDimensions {
  return {
    width: photo.width || 800,
    height: photo.height || 600,
    aspectRatio: getAspectRatio(photo.width || 800, photo.height || 600)
  };
}

/**
 * Generate blur placeholder data URL
 * @param width - Placeholder width
 * @param height - Placeholder height
 * @returns Data URL for blur placeholder
 */
export function generateBlurPlaceholder(width: number = 10, height: number = 10): string {
  if (typeof document === 'undefined') {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjFmNWY5Ii8+Cjwvc3ZnPgo=';
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjFmNWY5Ii8+Cjwvc3ZnPgo=';
  }
  
  canvas.width = width;
  canvas.height = height;
  
  // Create gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f1f5f9');
  gradient.addColorStop(1, '#e2e8f0');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}

/**
 * Check if device supports WebP format
 * @returns Promise<boolean> Whether WebP is supported
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Debounce function for scroll events
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
} 