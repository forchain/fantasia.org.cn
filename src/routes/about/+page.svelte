<script>
  import { onMount } from 'svelte';

  onMount(() => {
    console.log('About page mounted');
  });
</script>

<svelte:head>
  <title>About - Fantasia Gallery</title>
  <meta name="description" content="Learn more about Fantasia Gallery and the photographer behind the lens. Discover the story and inspiration behind this personal photography collection." />
  
  <!-- Open Graph meta tags -->
  <meta property="og:title" content="About - Fantasia Gallery" />
  <meta property="og:description" content="Learn more about Fantasia Gallery and the photographer behind the lens." />
  <meta property="og:type" content="website" />
</svelte:head>

<!-- About Page Content -->
<div class="min-h-screen bg-gradient-to-br from-gallery-50 to-gallery-100">
  <!-- Hero Section -->
  <section class="pt-16 pb-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Profile Image Placeholder -->
      <div class="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gallery-400 to-gallery-600 rounded-full flex items-center justify-center">
        <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      
      <h1 class="text-4xl md:text-5xl font-bold text-gallery-900 mb-6">
        About Fantasia Gallery
      </h1>
      
      <p class="text-xl text-gallery-600 max-w-3xl mx-auto leading-relaxed">
        Welcome to my personal photography gallery, where every image tells a story 
        and every album preserves a precious moment in time.
      </p>
    </div>
  </section>

  <!-- Main Content -->
  <section class="pb-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="p-8 md:p-12">
          <!-- Story Section -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gallery-900 mb-6">My Story</h2>
            <div class="prose prose-lg text-gallery-600 max-w-none">
              <p>
                Photography has always been my way of capturing the beauty in everyday moments. 
                What started as a hobby has evolved into a passion for documenting life's 
                fleeting experiences – from quiet morning sunrises to bustling city streets, 
                from intimate family gatherings to grand adventures around the world.
              </p>
              
              <p>
                This gallery represents a curated collection of my favorite photographs, 
                organized into albums that tell different stories from my journey. Each image 
                is carefully selected not just for its visual appeal, but for the memory 
                and emotion it represents.
              </p>
              
              <p>
                I believe that photography is more than just capturing what we see – it's about 
                preserving how we felt in that moment, creating a visual diary that we can 
                revisit and share with others.
              </p>
            </div>
          </div>

          <!-- Photography Style -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gallery-900 mb-6">Photography Style</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 class="text-xl font-semibold text-gallery-900 mb-3">Approach</h3>
                <p class="text-gallery-600">
                  I prefer natural, unposed moments that capture genuine emotions and 
                  authentic experiences. My style focuses on storytelling through imagery, 
                  using natural light whenever possible to create warm, inviting photographs.
                </p>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold text-gallery-900 mb-3">Subjects</h3>
                <p class="text-gallery-600">
                  From landscape photography that showcases the natural world's beauty 
                  to candid portraits that reveal personality and character, I enjoy 
                  exploring different genres while maintaining a consistent aesthetic.
                </p>
              </div>
            </div>
          </div>

          <!-- Technical Details -->
          <div class="mb-12">
            <h2 class="text-3xl font-bold text-gallery-900 mb-6">About This Website</h2>
            <div class="bg-gallery-50 rounded-lg p-6">
              <p class="text-gallery-600 mb-4">
                This gallery website was built with modern web technologies to provide 
                the best possible viewing experience for my photographs. It features:
              </p>
              
              <ul class="space-y-2 text-gallery-600">
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-gallery-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Responsive design that works on all devices
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-gallery-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Fast loading with optimized image delivery
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-gallery-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Full-screen lightbox for immersive viewing
                </li>
                <li class="flex items-center">
                  <svg class="w-5 h-5 text-gallery-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Keyboard navigation and accessibility features
                </li>
              </ul>
            </div>
          </div>

          <!-- Contact -->
          <div class="text-center">
            <h2 class="text-3xl font-bold text-gallery-900 mb-6">Get In Touch</h2>
            <p class="text-gallery-600 mb-8 max-w-2xl mx-auto">
              I'd love to hear from you! Whether you have questions about my photography, 
              want to collaborate, or simply want to share your thoughts about the gallery, 
              feel free to reach out.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="mailto:hello@fantasia.org.cn" 
                class="btn-primary px-6 py-3"
              >
                Send Email
              </a>
              
              <a 
                href="/" 
                class="btn-secondary px-6 py-3"
              >
                Back to Gallery
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .prose p {
    @apply mb-4;
  }
</style> 