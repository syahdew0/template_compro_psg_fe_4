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
        @click="loadIntegrationData" 
        class="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Content -->
    <div v-else class="max-w-6xl mx-auto px-5 text-center">
      <!-- Badge -->
      <div 
        v-if="integrationData.badge?.title" 
        ref="badge"
        data-animation="fadeInUp"
        class="inline-block px-6 py-2.5 bg-lime-100 text-gray-700 rounded-full text-sm font-medium mb-6 opacity-0"
      >
        {{ integrationData.badge.title }}
      </div>

      <!-- Main Title -->
      <h2 
        v-if="integrationData.main?.title" 
        ref="heading"
        data-animation="fadeInUp"
        class="text-5xl font-bold text-gray-900 mb-6 leading-tight opacity-0"
      >
        {{ integrationData.main.title }}
      </h2>

      <!-- Content Description -->
      <p 
        v-if="integrationData.main?.content" 
        ref="description"
        data-animation="fadeInUp"
        class="text-lg text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed opacity-0"
      >
        {{ integrationData.main.content }}
      </p>

      <!-- CTA Button -->
      <a 
        v-if="integrationData.button?.title" 
        :href="integrationData.button.link || '#'"
        ref="ctaButton"
        data-animation="fadeInUp"
        class="group inline-flex items-center gap-2 pl-6 pr-1.5 py-1.5 bg-black text-white rounded-full text-base font-semibold transition-all hover:bg-lime-300 hover:text-black hover:-translate-y-0.5 hover:shadow-xl mb-12 opacity-0 sm:gap-3 sm:pl-8 sm:pr-2 sm:py-2 sm:text-lg"
      >
        <span class="whitespace-nowrap">{{ integrationData.button.title }}</span>
        <div class="flex items-center justify-center w-8 h-8 bg-white rounded-full transition-all group-hover:bg-black flex-shrink-0 sm:w-8 sm:h-8">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2.5" 
            stroke-linecap="round" 
            stroke-linejoin="round"
            class="text-black transition-all group-hover:text-white group-hover:translate-x-1 sm:w-6 sm:h-6"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </a>

      <!-- Integration Icons -->
      <div 
        v-if="integrationData.main?.image" 
        ref="integrationIcons"
        data-animation="fadeInUp"
        class="mt-10 opacity-0"
      >
        <img 
          :src="getImage(integrationData.main.image)" 
          alt="Integration Tools" 
          class="max-w-full h-auto mx-auto" 
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

// State untuk data
const integrationData = ref({
  badge: {},
  main: {},
  button: {}
})

const loading = ref(true)
const error = ref(null)

// Refs untuk elemen yang akan di-animate
const badge = ref(null)
const heading = ref(null)
const description = ref(null)
const ctaButton = ref(null)
const integrationIcons = ref(null)

// Intersection Observer
let observer = null

// Fungsi untuk menghandle image path
function getImage(src) {
  if (!src) return ''
  return src.startsWith('http') ? src : `${API_ENDPOINTS.baseURL}${src}`
}

// Fungsi untuk parse data JSON
function parse(data) {
  if (!data) return {}
  return typeof data === 'string' ? JSON.parse(data) : data
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
    ctaButton.value,
    integrationIcons.value
  ]

  elementsToAnimate.forEach(el => {
    if (el) {
      observer.observe(el)
    }
  })
}

// Load data dari localStorage
const loadIntegrationData = () => {
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
    integrationData.value = {
      badge: parse(data.integration_badge4),      // Badge "Integration & Tools"
      main: parse(data.integration_main4),        // Title + Content + Image
      button: parse(data.integration_button4)     // Button "Explore All Integration"
    }
    
    console.log('✅ Integration data loaded:', integrationData.value)

    // Setup scroll animations setelah data loaded
    setTimeout(() => {
      setupScrollAnimations()
    }, 100)

  } catch (err) {
    error.value = 'Gagal memuat data integration'
    console.error('❌ Gagal parsing integration data:', err)
  } finally {
    loading.value = false
  }
}

// Load data saat component mounted
onMounted(() => {
  loadIntegrationData()
})

// Cleanup observer saat component unmounted
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
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

/* Responsive adjustments */
@media (max-width: 640px) {
  h2 {
    font-size: 1.875rem; /* 30px */
    line-height: 2.25rem;
  }
  
  p {
    font-size: 0.9375rem; /* 15px */
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  h2 {
    font-size: 2.25rem; /* 36px */
  }
  
  p {
    font-size: 1rem;
  }
}
</style>