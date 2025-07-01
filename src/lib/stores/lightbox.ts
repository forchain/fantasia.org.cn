import { writable, derived, type Writable, type Readable } from 'svelte/store';
import type { Photo, NavigationInfo } from '$lib/types/database';

// Lightbox visibility state
export const lightboxOpen: Writable<boolean> = writable(false);

// Current photo being displayed in lightbox
export const currentPhoto: Writable<Photo | null> = writable(null);

// Array of all photos in current album
export const currentAlbumPhotos: Writable<Photo[]> = writable([]);

// Current photo index in the album
export const currentPhotoIndex: Writable<number> = writable(0);

// Loading state for photo in lightbox
export const photoLoading: Writable<boolean> = writable(false);

// Derived store for navigation information
export const navigationInfo: Readable<NavigationInfo> = derived(
  [currentPhotoIndex, currentAlbumPhotos],
  ([$currentPhotoIndex, $currentAlbumPhotos]) => ({
    current: $currentPhotoIndex + 1,
    total: $currentAlbumPhotos.length,
    hasNext: $currentPhotoIndex < $currentAlbumPhotos.length - 1,
    hasPrevious: $currentPhotoIndex > 0,
    isFirst: $currentPhotoIndex === 0,
    isLast: $currentPhotoIndex === $currentAlbumPhotos.length - 1
  })
);

/**
 * Open lightbox with specific photo
 * @param photo - Photo object to display
 * @param albumPhotos - Array of all photos in the album
 * @param index - Index of the photo in the album
 */
export function openLightbox(photo: Photo, albumPhotos: Photo[] = [], index: number = 0): void {
  currentPhoto.set(photo);
  currentAlbumPhotos.set(albumPhotos);
  currentPhotoIndex.set(index);
  lightboxOpen.set(true);
  
  // Prevent body scroll when lightbox is open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close lightbox
 */
export function closeLightbox(): void {
  lightboxOpen.set(false);
  currentPhoto.set(null);
  currentAlbumPhotos.set([]);
  currentPhotoIndex.set(0);
  
  // Restore body scroll
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
}

/**
 * Navigate to next photo
 */
export function nextPhoto(): void {
  let $currentPhotoIndex: number = 0;
  let $currentAlbumPhotos: Photo[] = [];
  
  currentPhotoIndex.subscribe(value => $currentPhotoIndex = value)();
  currentAlbumPhotos.subscribe(value => $currentAlbumPhotos = value)();
  
  if ($currentPhotoIndex < $currentAlbumPhotos.length - 1) {
    const newIndex = $currentPhotoIndex + 1;
    currentPhotoIndex.set(newIndex);
    currentPhoto.set($currentAlbumPhotos[newIndex]);
  }
}

/**
 * Navigate to previous photo
 */
export function previousPhoto(): void {
  let $currentPhotoIndex: number = 0;
  let $currentAlbumPhotos: Photo[] = [];
  
  currentPhotoIndex.subscribe(value => $currentPhotoIndex = value)();
  currentAlbumPhotos.subscribe(value => $currentAlbumPhotos = value)();
  
  if ($currentPhotoIndex > 0) {
    const newIndex = $currentPhotoIndex - 1;
    currentPhotoIndex.set(newIndex);
    currentPhoto.set($currentAlbumPhotos[newIndex]);
  }
}

/**
 * Navigate to specific photo by index
 * @param index - Photo index
 */
export function goToPhoto(index: number): void {
  let $currentAlbumPhotos: Photo[] = [];
  currentAlbumPhotos.subscribe(value => $currentAlbumPhotos = value)();
  
  if (index >= 0 && index < $currentAlbumPhotos.length) {
    currentPhotoIndex.set(index);
    currentPhoto.set($currentAlbumPhotos[index]);
  }
}

/**
 * Handle keyboard navigation
 * @param event - Keyboard event
 */
export function handleKeyNavigation(event: KeyboardEvent): void {
  let $lightboxOpen: boolean = false;
  lightboxOpen.subscribe(value => $lightboxOpen = value)();
  
  if (!$lightboxOpen) return;
  
  switch (event.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      previousPhoto();
      break;
    case 'ArrowRight':
      nextPhoto();
      break;
    default:
      break;
  }
}

/**
 * Set photo loading state
 * @param loading - Loading state
 */
export function setPhotoLoading(loading: boolean): void {
  photoLoading.set(loading);
} 