<template>
  <section class="py-20 bg-white min-h-[600px]">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px]">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-5"></div>
      <p class="text-lg text-gray-600">Memuat data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[400px] px-5">
      <p class="text-lg text-red-600 mb-5">⚠️ {{ error }}</p>
      <button 
        @click="loadTestimonialData" 
        class="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Content -->
    <div v-else class="max-w-7xl mx-auto px-5">
      <div class="text-center mb-16">
        <!-- Badge -->
        <div 
          v-if="testimonialData.badge?.title" 
          ref="badge"
          data-animation="fadeInUp"
          class="inline-block px-6 py-2.5 bg-lime-50 text-gray-800 rounded-full text-sm font-medium mb-6 opacity-0"
        >
          {{ testimonialData.badge.title }}
        </div>

        <!-- Main Title -->
        <h2 
          v-if="testimonialData.main?.title" 
          ref="heading"
          data-animation="fadeInUp"
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight opacity-0"
        >
          {{ testimonialData.main.title }}
        </h2>

        <!-- Content Description -->
        <p 
          v-if="testimonialData.main?.content" 
          ref="description"
          data-animation="fadeInUp"
          class="text-medium md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed opacity-0"
        >
          {{ testimonialData.main.content }}
        </p>
      </div>

      <!-- Carousel Container -->
      <div 
        v-if="combinedTestimonials.length > 0"
        ref="carouselContainer"
        data-animation="fadeInUp"
        class="relative overflow-hidden opacity-0"
        @mouseenter="pauseAutoScroll"
        @mouseleave="resumeAutoScroll"
      >
        <!-- Testimonial Cards Slider -->
        <div 
          ref="slider"
          class="flex gap-4 md:gap-6 transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
          :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }"
          @mousedown="startDrag"
          @touchstart="startDrag"
          @mousemove="onDrag"
          @touchmove="onDrag"
          @mouseup="endDrag"
          @touchend="endDrag"
          @mouseleave="endDrag"
        >
          <div 
            v-for="(testimonial, index) in combinedTestimonials" 
            :key="index"
            class="testimonial-card flex-shrink-0 bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 select-none"
          >
            <!-- Quote -->
            <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-4 leading-snug">
              "{{ testimonial.quote }}"
            </h3>
            
            <!-- Description -->
            <p class="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
              {{ testimonial.description }}
            </p>
            
            <!-- Author Info -->
            <div class="flex items-center gap-3 md:gap-4 pt-6 border-t border-gray-100 mt-auto">
              <img 
                :src="getImage(testimonial.author.image)" 
                :alt="testimonial.author.name"
                class="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ring-2 ring-gray-100 flex-shrink-0"
              />
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-gray-900 text-sm md:text-base truncate">{{ testimonial.author.name }}</h4>
                <p class="text-xs md:text-sm text-gray-500 truncate">{{ testimonial.author.role }}</p>
                <div class="flex gap-0.5 md:gap-1 mt-1">
                  <span v-for="star in 5" :key="star" class="text-yellow-400 text-xs md:text-sm">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows - Hidden on mobile -->
        <button 
          @click="prevSlide"
          class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-100 transition-all z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          @click="nextSlide"
          class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-100 transition-all z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Pagination Dots -->
      <div 
        v-if="totalSlides > 1"
        ref="pagination"
        data-animation="fadeInUp"
        class="flex justify-center gap-2 md:gap-3 mt-8 md:mt-12 opacity-0"
      >
        <button 
          v-for="index in totalSlides" 
          :key="index"
          @click="goToSlide(index - 1)"
          :class="[
            'h-2 md:h-3 rounded-full transition-all duration-300',
            currentSlide === index - 1
              ? 'w-6 md:w-8 bg-black' 
              : 'w-2 md:w-3 bg-gray-300 hover:bg-gray-400'
          ]"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

// State untuk data
const testimonialData = ref({
  badge: {},
  main: {},
  items: [],
  authors: []
})

const loading = ref(true)
const error = ref(null)
const currentSlide = ref(0)
const slideWidth = ref(0)
const cardsPerView = ref(5) // Will be updated based on screen size
const autoScrollInterval = ref(null)
const isPaused = ref(false)

// Drag state
const isDragging = ref(false)
const startX = ref(0)
const currentTranslate = ref(0)
const prevTranslate = ref(0)

// Refs untuk elemen yang akan di-animate
const badge = ref(null)
const heading = ref(null)
const description = ref(null)
const carouselContainer = ref(null)
const pagination = ref(null)
const slider = ref(null)

// Intersection Observer
let observer = null

// Fungsi untuk menghandle image path
function getImage(src) {
  if (!src) return 'https://via.placeholder.com/60'
  return src.startsWith('http') ? src : `${API_ENDPOINTS.baseURL}${src}`
}

// Fungsi untuk parse data JSON
function parse(data) {
  if (!data) return {}
  return typeof data === 'string' ? JSON.parse(data) : data
}

// Kombinasi data testimonial dengan author
const combinedTestimonials = computed(() => {
  const items = testimonialData.value.items || []
  const authors = testimonialData.value.authors || []
  
  return items.map((item, index) => {
    const author = authors[index] || {}
    
    // Parse item jika masih string
    const parsedItem = typeof item === 'string' ? JSON.parse(item) : item
    const parsedAuthor = typeof author === 'string' ? JSON.parse(author) : author
    
    return {
      quote: parsedItem.title || parsedItem.Title || '',
      description: parsedItem.content || parsedItem.Content || '',
      author: {
        name: parsedAuthor.title || parsedAuthor.Title || 'Anonymous',
        role: parsedAuthor.content || parsedAuthor.Content || 'Customer',
        image: parsedAuthor.image || parsedAuthor.Image || ''
      }
    }
  })
})

// Update cards per view based on screen size
const updateCardsPerView = () => {
  const width = window.innerWidth
  if (width < 640) {
    cardsPerView.value = 1 // Mobile
  } else if (width < 768) {
    cardsPerView.value = 2 // Small tablet
  } else if (width < 1024) {
    cardsPerView.value = 3 // Tablet
  } else if (width < 1280) {
    cardsPerView.value = 4 // Small desktop
  } else {
    cardsPerView.value = 5 // Large desktop
  }
}

// Total slides
const totalSlides = computed(() => {
  return Math.max(0, combinedTestimonials.value.length - cardsPerView.value + 1)
})

// Calculate slide width
const calculateSlideWidth = () => {
  if (slider.value) {
    const card = slider.value.querySelector('.testimonial-card')
    if (card) {
      const gap = window.innerWidth < 768 ? 16 : 24 // 16px (gap-4) for mobile, 24px (gap-6) for desktop
      slideWidth.value = card.offsetWidth + gap
    }
  }
}

// Navigation functions
const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = totalSlides.value - 1
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// Auto scroll
const startAutoScroll = () => {
  autoScrollInterval.value = setInterval(() => {
    if (!isPaused.value && !isDragging.value) {
      nextSlide()
    }
  }, 3000) // Scroll every 3 seconds
}

const pauseAutoScroll = () => {
  isPaused.value = true
}

const resumeAutoScroll = () => {
  isPaused.value = false
}

// Drag functions
const startDrag = (e) => {
  isDragging.value = true
  startX.value = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
  prevTranslate.value = currentSlide.value * slideWidth.value
  slider.value.style.transition = 'none'
}

const onDrag = (e) => {
  if (!isDragging.value) return
  
  e.preventDefault()
  const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
  const diff = currentX - startX.value
  currentTranslate.value = prevTranslate.value - diff
}

const endDrag = () => {
  if (!isDragging.value) return
  
  isDragging.value = false
  slider.value.style.transition = 'transform 0.5s ease-out'
  
  const movedBy = currentTranslate.value - prevTranslate.value
  
  if (movedBy > slideWidth.value / 3 && currentSlide.value < totalSlides.value - 1) {
    nextSlide()
  } else if (movedBy < -slideWidth.value / 3 && currentSlide.value > 0) {
    prevSlide()
  }
}

// Setup Intersection Observer untuk scroll-triggered animations
const setupScrollAnimations = () => {
  const options = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const animation = entry.target.getAttribute('data-animation')
        
        if (animation) {
          setTimeout(() => {
            entry.target.classList.add(`animate-${animation}`)
          }, index * 100)
          
          observer.unobserve(entry.target)
        }
      }
    })
  }, options)

  const elementsToAnimate = [
    badge.value,
    heading.value,
    description.value,
    carouselContainer.value,
    pagination.value
  ]

  elementsToAnimate.forEach(el => {
    if (el) {
      observer.observe(el)
    }
  })
}

// Load data dari localStorage
const loadTestimonialData = () => {
  try {
    loading.value = true
    error.value = null

    const raw = localStorage.getItem('customPageData:Home')
    
    if (!raw) {
      error.value = 'Data halaman Home tidak ditemukan di localStorage'
      console.warn('⚠️ Data halaman Home tidak ditemukan di localStorage')
      loading.value = false
      return
    }

    const data = JSON.parse(raw)
    
    // Mapping data sesuai dengan tag yang ada di CMS
    const badge = parse(data.testimonials_badge4)
    const main = parse(data.testimonials_main4)
    
    // Parse items - bisa berupa array of objects atau array of strings
    let items = data.testimonials_item4 || []
    if (!Array.isArray(items)) {
      items = []
    }
    
    // Parse authors - bisa berupa array of objects atau array of strings
    let authors = data.testimonials_item_our4 || []
    if (!Array.isArray(authors)) {
      authors = []
    }
    
    testimonialData.value = {
      badge: badge,
      main: main,
      items: items,
      authors: authors
    }
    
    console.log('✅ Testimonial data loaded')

    // Setup scroll animations dan carousel setelah data loaded
    setTimeout(() => {
      updateCardsPerView()
      calculateSlideWidth()
      setupScrollAnimations()
      startAutoScroll()
    }, 100)

  } catch (err) {
    error.value = 'Gagal memuat data testimonial'
    console.error('❌ Gagal parsing testimonial data:', err)
  } finally {
    loading.value = false
  }
}

// Handle window resize
const handleResize = () => {
  updateCardsPerView()
  calculateSlideWidth()
  // Reset to first slide if current slide is out of bounds
  if (currentSlide.value >= totalSlides.value) {
    currentSlide.value = Math.max(0, totalSlides.value - 1)
  }
}

// Load data saat component mounted
onMounted(() => {
  loadTestimonialData()
  window.addEventListener('resize', handleResize)
})

// Cleanup observer saat component unmounted
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Animation classes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Prevent text selection while dragging */
.cursor-grabbing * {
  user-select: none;
}

/* Testimonial card sizing */
.testimonial-card {
  width: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: column;
}

/* Responsive card widths */
@media (min-width: 640px) {
  .testimonial-card {
    width: calc(50% - 8px); /* 2 cards, accounting for gap-4 */
  }
}

@media (min-width: 768px) {
  .testimonial-card {
    width: calc(33.333% - 16px); /* 3 cards, accounting for gap-6 */
  }
}

@media (min-width: 1024px) {
  .testimonial-card {
    width: calc(25% - 18px); /* 4 cards */
  }
}

@media (min-width: 1280px) {
  .testimonial-card {
    width: calc(20% - 19.2px); /* 5 cards */
  }
}

/* Mobile adjustments */
@media (max-width: 639px) {
  .testimonial-card {
    min-height: 280px;
  }
}
</style>