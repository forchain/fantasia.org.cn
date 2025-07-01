export interface Album {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  sort_order: number;
  photo_count?: number;
  photos?: Photo[];
}

export interface Photo {
  id: string;
  album_id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  thumbnail_url: string | null;
  file_size: number | null;
  width: number | null;
  height: number | null;
  sort_order: number;
  created_at: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: string;
}

export interface ImageOptimizationOptions {
  width?: number;
  height?: number | null;
  quality?: number;
}

export interface NavigationInfo {
  current: number;
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
}

// Supabase response types
export interface SupabaseResponse<T> {
  data: T | null;
  error: Error | null;
}

export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

// Component props interfaces
export interface AlbumGridProps {
  albums?: Album[];
  loading?: boolean;
}

export interface PhotoCardProps {
  photo: Photo;
  albumPhotos?: Photo[];
  index?: number;
  lazyLoad?: boolean;
}

export interface LightboxProps {
  open?: boolean;
  photo?: Photo | null;
  photos?: Photo[];
  currentIndex?: number;
}

export interface NavigationProps {
  showStats?: boolean;
} 