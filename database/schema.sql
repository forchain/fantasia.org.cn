-- Fantasia Gallery Database Schema
-- Run this script in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Albums table
CREATE TABLE albums (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- Photos table
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  album_id UUID REFERENCES albums(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  file_size INTEGER,
  width INTEGER,
  height INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_albums_published ON albums(is_published);
CREATE INDEX idx_albums_sort_order ON albums(sort_order);
CREATE INDEX idx_albums_slug ON albums(slug);
CREATE INDEX idx_photos_album_id ON photos(album_id);
CREATE INDEX idx_photos_sort_order ON photos(sort_order);

-- Row Level Security (RLS) policies
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Public read access for published albums
CREATE POLICY "Public albums are viewable by everyone" ON albums
FOR SELECT USING (is_published = true);

-- Public read access for photos in published albums
CREATE POLICY "Public photos are viewable by everyone" ON photos
FOR SELECT USING (
  album_id IN (SELECT id FROM albums WHERE is_published = true)
);

-- Storage buckets (run these in Supabase Storage)
-- You'll need to create these buckets manually in the Supabase dashboard:
-- 1. album-images (for original images)
-- 2. thumbnails (for thumbnail images)

-- Sample data (optional - remove in production)
INSERT INTO albums (title, description, slug, is_published, sort_order) VALUES
('Sample Album', 'This is a sample album to demonstrate the gallery functionality.', 'sample-album', true, 1),
('Demo Collection', 'A demo collection showing various types of photos.', 'demo-collection', true, 2);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_albums_updated_at 
  BEFORE UPDATE ON albums 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Comments
COMMENT ON TABLE albums IS 'Photo albums containing collections of images';
COMMENT ON TABLE photos IS 'Individual photos belonging to albums';
COMMENT ON COLUMN albums.slug IS 'URL-friendly identifier for the album';
COMMENT ON COLUMN albums.is_published IS 'Whether the album is visible to public';
COMMENT ON COLUMN albums.sort_order IS 'Display order of albums (lower numbers first)';
COMMENT ON COLUMN photos.sort_order IS 'Display order of photos within an album'; 