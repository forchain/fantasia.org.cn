import { writable, derived, type Writable, type Readable } from 'svelte/store';
import { getAlbums, getAlbumBySlug } from '$lib/utils/supabase.js';
import type { Album } from '$lib/types/database';

// Albums store - holds all albums data
export const albums: Writable<Album[]> = writable([]);

// Loading state for albums
export const albumsLoading: Writable<boolean> = writable(false);

// Error state for albums
export const albumsError: Writable<string | null> = writable(null);

// Current album being viewed
export const currentAlbum: Writable<Album | null> = writable(null);

// Current album loading state
export const currentAlbumLoading: Writable<boolean> = writable(false);

// Current album error state
export const currentAlbumError: Writable<string | null> = writable(null);

// Derived store for published albums count
export const albumsCount: Readable<number> = derived(albums, ($albums) => $albums.length);

// Derived store for total photos count across all albums
export const totalPhotosCount: Readable<number> = derived(albums, ($albums) => 
  $albums.reduce((total, album) => total + (album.photo_count || 0), 0)
);

/**
 * Load all albums from Supabase
 */
export async function loadAlbums(): Promise<void> {
  albumsLoading.set(true);
  albumsError.set(null);
  
  try {
    const data = await getAlbums();
    albums.set(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error loading albums:', error);
    albumsError.set(errorMessage);
    albums.set([]);
  } finally {
    albumsLoading.set(false);
  }
}

/**
 * Load specific album by slug
 * @param slug - Album slug
 */
export async function loadAlbum(slug: string): Promise<void> {
  currentAlbumLoading.set(true);
  currentAlbumError.set(null);
  
  try {
    const album = await getAlbumBySlug(slug);
    if (album) {
      currentAlbum.set(album);
    } else {
      currentAlbumError.set('Album not found');
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error loading album:', error);
    currentAlbumError.set(errorMessage);
    currentAlbum.set(null);
  } finally {
    currentAlbumLoading.set(false);
  }
}

/**
 * Clear current album data
 */
export function clearCurrentAlbum(): void {
  currentAlbum.set(null);
  currentAlbumError.set(null);
}

/**
 * Get album by slug from loaded albums
 * @param slug - Album slug
 * @returns Album object or null
 */
export function getAlbumFromStore(slug: string): Album | null {
  let albumsData: Album[] = [];
  albums.subscribe(value => albumsData = value)();
  return albumsData.find(album => album.slug === slug) || null;
}

/**
 * Refresh albums data
 */
export async function refreshAlbums(): Promise<void> {
  await loadAlbums();
} 