<template>
  <section class="relative min-h-screen bg-white py-28 px-4 lg:px-24 overflow-hidden">
    
    <!-- Animated Background Elements - Yellow Accents -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#FFD43B]/5 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 -left-40 w-80 h-80 bg-yellow-100/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 right-1/4 w-80 h-80 bg-[#FFD43B]/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-16 space-y-6" ref="headerEl">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFD43B]/15 border border-[#FFD43B]/40 backdrop-blur-sm">
          <div class="w-2 h-2 rounded-full bg-[#FFD43B] animate-pulse"></div>
          <span class="text-sm font-semibold text-gray-900">Latest Articles</span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Pasifik Sukses Gemilang
          <span class="block text-[#FFD43B]">Articles</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Artikel terbaru dan informasi seputar teknologi dan industri
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FFD43B]/10 flex items-center justify-center">
          <i class="fa-solid fa-spinner fa-spin text-4xl text-[#FFD43B]"></i>
        </div>
        <p class="text-gray-500 text-lg">Memuat artikel...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <i class="fa-solid fa-exclamation-triangle text-4xl text-red-500"></i>
        </div>
        <p class="text-red-500 text-lg">{{ error }}</p>
      </div>

      <!-- Jika tidak ada postingan -->
      <div v-else-if="posts.length === 0" class="text-center py-20">
        <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-[#FFD43B]/10 flex items-center justify-center">
          <i class="fa-solid fa-newspaper text-4xl text-[#FFD43B]/50"></i>
        </div>
        <p class="text-gray-500 text-lg">Belum ada artikel yang tersedia saat ini.</p>
      </div>

      <!-- Grid Postingan -->
      <div v-else class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="post in posts"
          :key="post.id"
          class="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-[#FFD43B]/50 hover:shadow-2xl transition-all duration-300"
          ref="postCards"
        >
          <router-link :to="`/article/${post.slug}`" class="block">
            <!-- Image Container -->
            <div class="relative overflow-hidden aspect-video bg-gray-100">
              <img
                :src="getImageUrl(post.thumbnail_url)"
                :alt="post.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                @error="handleImageError"
              />
              
              <!-- Overlay Gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 text-xs font-semibold bg-[#FFD43B] text-black rounded-full">
                  Article
                </span>
              </div>
              
              <!-- Floating Read More Button -->
              <div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <div class="w-12 h-12 rounded-full bg-[#FFD43B] flex items-center justify-center shadow-lg">
                  <i class="fa-solid fa-arrow-right text-black"></i>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-4">
              <!-- Date Badge -->
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-[#FFD43B]/20 flex items-center justify-center">
                  <i class="fa-solid fa-calendar text-[#FFD43B] text-sm"></i>
                </div>
                <p class="text-xs text-gray-500">
                  {{ formatDate(post.published_at || post.created_at) }}
                </p>
              </div>

              <!-- Title -->
              <h2 class="text-xl font-bold text-gray-900 group-hover:text-[#FFD43B] transition-colors duration-300 line-clamp-2">
                {{ post.title }}
              </h2>

              <!-- Excerpt -->
              <p 
                class="text-sm text-gray-600 line-clamp-3 leading-relaxed"
                v-html="getExcerpt(post)"
              ></p>

              <!-- Read More Link -->
              <div class="flex items-center gap-2 text-[#FFD43B] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                <span>Baca Selengkapnya</span>
                <i class="fa-solid fa-arrow-right text-xs"></i>
              </div>
            </div>

            <!-- Decorative Corner -->
            <div class="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute top-0 right-0 w-full h-full border-t-2 border-r-2 border-[#FFD43B]/30 rounded-tr-2xl"></div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Pagination (if needed later) -->
      <div v-if="posts.length > 0 && posts.length >= 9" class="mt-16 flex justify-center">
        <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-gray-200 hover:border-[#FFD43B]/50 transition-all duration-300 cursor-pointer">
          <span class="text-sm font-semibold text-gray-700">Load More</span>
          <i class="fa-solid fa-chevron-down text-[#FFD43B] text-xs"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'
import { API_ENDPOINTS } from '@/config/api'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const posts = ref([])
const loading = ref(true)
const error = ref(null)
const headerEl = ref(null)
const postCards = ref([])

function getImageUrl(path) {
  if (!path) return 'https://via.placeholder.com/600x400?text=No+Image'
  return path.startsWith('http') ? path : `${API_ENDPOINTS.media}${path}`
}

function handleImageError(event) {
  event.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found'
}

function formatDate(dateStr) {
  if (!dateStr) return 'Tanggal tidak tersedia'
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getExcerpt(post) {
  if (post.excerpt) {
    return post.excerpt
  }
  if (post.content) {
    // Remove HTML tags and get first 150 characters
    const text = post.content.replace(/<[^>]*>/g, '')
    return text.slice(0, 150) + (text.length > 150 ? '...' : '')
  }
  return 'Tidak ada deskripsi tersedia'
}

// Animations
const animateCards = () => {
  // Header animation
  if (headerEl.value) {
    gsap.fromTo(
      headerEl.value.children,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }
    )
  }

  // Post cards stagger animation
  if (postCards.value.length > 0) {
    gsap.fromTo(
      postCards.value,
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: postCards.value[0],
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )
  }
}

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    
    const res = await axios.get(`${API_ENDPOINTS.posts}?type=post`)
    console.log('Full API Response:', res.data)
    
    // Filter posts dengan kategori 'article'
    posts.value = res.data.data.filter(post => {
      // Pastikan post published
      const isPublished = post.status === 'published'
      
      // Check if post has categories
      const hasCategories = Array.isArray(post.categories) && post.categories.length > 0
      
      if (!hasCategories) {
        console.log('Post tanpa kategori:', post.title)
        return false
      }
      
      // Check if any category has slug 'article'
      const hasArticleCategory = post.categories.some(cat => {
        console.log('Checking category:', cat.slug)
        return cat.slug === 'article'
      })
      
      if (isPublished && hasArticleCategory) {
        console.log('✓ Post matched:', post.title, 'Categories:', post.categories.map(c => c.slug))
      }
      
      return isPublished && hasArticleCategory
    })
    
    console.log(`Total posts filtered: ${posts.value.length}`)
    console.log('Filtered posts:', posts.value.map(p => ({ title: p.title, categories: p.categories.map(c => c.slug) })))

    loading.value = false

    // Trigger animations after DOM update
    await nextTick()
    setTimeout(() => {
      animateCards()
    }, 100)
  } catch (err) {
    console.error('Gagal memuat postingan:', err)
    console.error('Error details:', err.response?.data || err.message)
    error.value = 'Gagal memuat artikel. Silakan coba lagi nanti.'
    loading.value = false
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fa-spin {
  animation: spin 1s linear infinite;
}
</style>