# Fantasia Personal Gallery

An Instagram-inspired personal website for sharing life moments through photos and videos with accompanying text stories.

## 🎯 Project Overview

A modern, responsive personal gallery website that allows you to showcase your photography and videos in an elegant, Instagram-like interface. Visitors can browse through your photo albums and view enlarged images in an immersive lightbox experience.

## 🛠 Tech Stack

- **Frontend**: Svelte + SvelteKit
- **Language**: TypeScript
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel
- **Domain**: fantasia.org.cn
- **Styling**: Tailwind CSS
- **Image Optimization**: Svelte/enhanced + Supabase image transformations

## ✨ Core Features

### 📱 User Interface
- **Homepage Album Grid**: Clean, responsive grid layout showcasing photo albums
- **Lightbox Modal**: Click any image to view in full-screen modal with navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Instagram-style UI**: Clean, modern aesthetic with focus on visual content

### 🖼 Content Management
- **Photo Albums**: Organized photo collections with titles and descriptions
- **Mixed Media**: Support for both images and videos
- **Text Stories**: Rich text descriptions accompanying visual content
- **Image Optimization**: Automatic compression and multiple size variants

### 🔧 Technical Features
- **SEO Optimized**: Meta tags, OpenGraph, structured data
- **Performance**: Lazy loading, image optimization, efficient caching
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Accessibility**: WCAG compliant, keyboard navigation, screen reader support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### 1. Installation

```bash
# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PUBLIC_SITE_URL=https://fantasia.org.cn
PUBLIC_SITE_NAME="Fantasia Gallery"
PUBLIC_SITE_DESCRIPTION="Personal gallery showcasing life moments through photography"
```

### 3. Supabase Setup

1. **Create Project**: Create a new project at [supabase.com](https://supabase.com)

2. **Get Credentials**: Go to Settings > API to get your URL and anon key

3. **Database Schema**: 
   - Go to SQL Editor in Supabase dashboard
   - Copy and paste the contents of `database/schema.sql`
   - Execute the script

4. **Storage Buckets**:
   - Go to Storage in Supabase dashboard
   - Create bucket named `album-images` (public)
   - Create bucket named `thumbnails` (public)

### 4. Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173

# Type checking
npm run check

# Type checking in watch mode
npm run check:watch

# Run TypeScript compiler check
npm run type-check
```

### 5. Deployment

#### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### GitHub + Vercel (Recommended)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

#### Custom Domain Setup

1. In Vercel dashboard, go to your project settings
2. Add custom domain: `fantasia.org.cn`
3. Configure DNS records as instructed by Vercel
4. SSL certificate will be automatically provisioned

## 🏗 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── AlbumGrid.svelte      # Homepage album grid
│   │   ├── ImageLightbox.svelte  # Full-screen image viewer
│   │   ├── PhotoCard.svelte      # Individual photo cards
│   │   └── Navigation.svelte     # Site navigation
│   ├── stores/
│   │   ├── albums.ts             # Album data management
│   │   └── lightbox.ts           # Lightbox state management
│   ├── types/
│   │   └── database.ts           # TypeScript type definitions
│   └── utils/
│       ├── supabase.ts           # Supabase client & helpers
│       └── imageHelpers.ts       # Image optimization utilities
├── routes/
│   ├── +layout.svelte            # App layout wrapper
│   ├── +page.svelte              # Homepage
│   └── album/[slug]/+page.svelte # Album detail page
├── app.d.ts                      # Global type definitions
├── app.html                      # HTML template
└── app.css                       # Global styles
```

## 📸 Content Management

### Adding Albums

Use Supabase dashboard or create an admin interface:

```sql
INSERT INTO albums (title, description, slug, is_published, sort_order) 
VALUES ('My Trip', 'Photos from my recent vacation', 'my-trip', true, 1);
```

### Adding Photos

1. Upload images to `album-images` bucket in Supabase Storage
2. Add photo records to database:

```sql
INSERT INTO photos (album_id, title, description, image_url, sort_order)
VALUES (
  'album-uuid-here',
  'Beautiful Sunset',
  'Captured during golden hour',
  'path/to/image.jpg',
  1
);
```

## 🎨 Customization

### Colors & Styling

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  gallery: {
    50: '#f8fafc',   // Light backgrounds
    500: '#64748b',  // Text colors
    900: '#0f172a',  // Dark text
  }
}
```

### Branding

Update navigation and metadata in:
- `src/lib/components/Navigation.svelte`
- `src/app.html`
- `src/routes/+layout.svelte`

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO)
- **Image Optimization**: WebP format, multiple sizes, lazy loading
- **Caching**: Static assets cached for 1 year
- **Bundle Size**: ~50KB gzipped

## 🛡 Security

- Row Level Security (RLS) enabled on all database tables
- Public read access only for published content
- Security headers configured in `vercel.json`
- HTTPS enforced

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Run Svelte checks
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

### Code Style

- Comments and logs in English only
- Follow ESLint and Prettier configurations
- Use semantic HTML and ARIA labels for accessibility
- Prefer hyphens over underscores in URLs

## 📝 License

Personal project - All rights reserved

## 🤝 Contributing

This is a personal gallery project. If you're building your own version:

1. Fork the repository
2. Create your feature branch
3. Customize for your needs
4. Deploy to your own domain

## 📞 Support

For questions about the codebase or setup:
- Review the documentation above
- Check Supabase docs for database/storage issues
- Check SvelteKit docs for framework questions
- Check Vercel docs for deployment issues

---

Built with ❤️ using Svelte, Supabase, and Vercel