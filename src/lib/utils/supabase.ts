import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Album, Photo, ImageOptimizationOptions } from '$lib/types/database';

// Initialize Supabase client
export const supabase: SupabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

/**
 * Get all published albums with their cover images
 * @returns Promise<Album[]> Array of album objects
 */
export async function getAlbums(): Promise<Album[]> {
  try {
    const { data, error } = await supabase
      .from('albums')
      .select(`
        id,
        title,
        description,
        slug,
        cover_image_url,
        created_at,
        sort_order,
        photos!inner(id)
      `)
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching albums:', error);
      return [];
    }

    // Add photo count to each album
    return data.map((album: any) => ({
      ...album,
      photo_count: album.photos?.length || 0
    })) as Album[];
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
}

/**
 * Get album details with all photos
 * @param slug - Album slug
 * @returns Promise<Album | null> Album object with photos
 */
export async function getAlbumBySlug(slug: string): Promise<Album | null> {
  try {
    const { data: album, error: albumError } = await supabase
      .from('albums')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (albumError || !album) {
      console.error('Error fetching album:', albumError);
      return null;
    }

    const { data: photos, error: photosError } = await supabase
      .from('photos')
      .select('*')
      .eq('album_id', album.id)
      .order('sort_order', { ascending: true });

    if (photosError) {
      console.error('Error fetching photos:', photosError);
      return { ...album, photos: [] } as Album;
    }

    return { ...album, photos: photos || [] } as Album;
  } catch (error) {
    console.error('Error fetching album:', error);
    return null;
  }
}

/**
 * Get optimized image URL from Supabase storage
 * @param path - Image path in storage
 * @param options - Transformation options
 * @returns string Optimized image URL
 */
export function getOptimizedImageUrl(path: string, options: ImageOptimizationOptions = {}): string {
  if (!path) return '';

  const {
    width = 800,
    height = null,
    quality = 80,
    format = 'webp'
  } = options;

  try {
    const { data } = supabase.storage
      .from('album-images')
      .getPublicUrl(path, {
        transform: {
          width,
          height,
          quality,
          format
        }
      });

    return data.publicUrl;
  } catch (error) {
    console.error('Error generating optimized image URL:', error);
    return '';
  }
}

/**
 * Get thumbnail URL for an image
 * @param path - Image path in storage
 * @returns string Thumbnail URL
 */
export function getThumbnailUrl(path: string): string {
  return getOptimizedImageUrl(path, {
    width: 400,
    height: 400,
    quality: 70
  });
}

/**
 * Get full-size image URL
 * @param path - Image path in storage
 * @returns string Full-size image URL
 */
export function getFullImageUrl(path: string): string {
  return getOptimizedImageUrl(path, {
    width: 1920,
    quality: 90
  });
} 