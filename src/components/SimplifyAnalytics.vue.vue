<template>
  <section class="py-20 bg-white to-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px]">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-5"></div>
      <p class="text-lg text-gray-600">Memuat data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[400px] px-5">
      <p class="text-lg text-red-600 mb-5">⚠️ {{ error }}</p>
      <button 
        @click="loadData" 
        class="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Content -->
    <div v-else class="max-w-7xl mx-auto px-5">
      <!-- Simplify Workflow Section -->
      <div 
        ref="simplifySection"
        data-animation="fadeInUp"
        class="grid lg:grid-cols-2 gap-12 items-center mb-32 opacity-0"
      >
        <!-- Left Content -->
        <div class="space-y-6">
          <!-- Badge -->
          <div 
            v-if="simplifyData.badge?.title"
            class="inline-block px-4 py-2 bg-lime-100 text-gray-800 rounded-full text-sm font-medium"
          >
            {{ simplifyData.badge.title }}
          </div>

          <!-- Title -->
          <h2 
            v-if="simplifyData.main?.title"
            class="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            {{ simplifyData.main.title }}
          </h2>

          <!-- Description -->
          <p 
            v-if="simplifyData.main?.content"
            class="text-sm text-gray-500 leading-relaxed "
          >
            {{ simplifyData.main.content }}
          </p>

          <!-- CTA Button -->
          <a 
            v-if="simplifyData.button?.title"
            :href="simplifyData.button.link || '#'"
            class="group inline-flex items-center gap-3 pl-8 pr-1 py-1 bg-lime-300 text-black rounded-full text-base font-medium transition-all hover:bg-gray-900 hover:text-white"
          >
            <span>{{ simplifyData.button.title }}</span>
            <div class="flex items-center justify-center w-10 h-10 bg-black rounded-full transition-all group-hover:bg-white flex-shrink-0">
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
                class="text-white group-hover:text-black transition-colors"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </div>

        <!-- Right Image -->
        <div 
          v-if="simplifyData.main?.image"
          class="relative"
        >
          <img 
            :src="getImage(simplifyData.main.image)" 
            alt="Performance Dashboard" 
            class="w-full h-auto rounded-xl "
          />
        </div>
      </div>

      <!-- Analytics Section -->
      <div 
        ref="analyticsSection"
        data-animation="fadeInUp"
        class="grid lg:grid-cols-2 gap-12 items-center opacity-0"
      >
        <!-- Left Image -->
        <div 
          v-if="analyticData.main?.image"
          class="order-2 lg:order-1 relative"
        >
          <img 
            :src="getImage(analyticData.main.image)" 
            alt="Analytics Dashboard" 
            class="w-full h-auto rounded-xl "
          />
        </div>

        <!-- Right Content -->
        <div class="order-1 lg:order-2 space-y-6">
          <!-- Badge -->
          <div 
            v-if="analyticData.badge?.title"
            class="inline-block px-4 py-2 bg-lime-100 text-gray-800 rounded-full text-sm font-medium"
          >
            {{ analyticData.badge.title }}
          </div>

          <!-- Title -->
          <h2 
            v-if="analyticData.main?.title"
            class="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            {{ analyticData.main.title }}
          </h2>

          <!-- Description -->
          <p 
            v-if="analyticData.main?.content"
            class="text-lg text-gray-600 leading-relaxed"
          >
            {{ analyticData.main.content }}
          </p>

          <!-- Feature List -->
          <ul 
            v-if="analyticItems.length > 0"
            class="space-y-3"
          >
            <li 
              v-for="(item, index) in analyticItems" 
              :key="index"
              class="flex items-start gap-3"
            >
              <svg 
                class="w-6 h-6 text-gray-500 flex-shrink-0 mt-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700 font-medium">{{ item.title }}</span>
            </li>
          </ul>

          <!-- CTA Button -->
          <a 
            v-if="analyticData.button?.title"
            :href="analyticData.button.link || '#'"
            class="group inline-flex items-center gap-3 pl-8 pr-1 py-1 bg-lime-300 text-black rounded-full text-lg font-semibold transition-all duration-300 delay-200 hover:bg-gray-900 hover:text-white"
          >
            <span>{{ analyticData.button.title }}</span>
            <div class="flex items-center justify-center w-10 h-10 bg-black rounded-full transition-all group-hover:bg-white flex-shrink-0">
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
                class="text-white group-hover:text-black transition-colors"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

// State untuk data
const simplifyData = ref({
  badge: {},
  main: {},
  button: {}
})

const analyticData = ref({
  badge: {},
  main: {},
  button: {}
})

const analyticItems = ref([])

const loading = ref(true)
const error = ref(null)

// Refs untuk elemen yang akan di-animate
const simplifySection = ref(null)
const analyticsSection = ref(null)

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
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animation = entry.target.getAttribute('data-animation')
        
        if (animation) {
          entry.target.classList.add(`animate-${animation}`)
          observer.unobserve(entry.target)
        }
      }
    })
  }, options)

  const elementsToAnimate = [
    simplifySection.value,
    analyticsSection.value
  ]

  elementsToAnimate.forEach(el => {
    if (el) {
      observer.observe(el)
    }
  })
}

// Load data dari localStorage
const loadData = () => {
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
    
    // Mapping data Simplify
    simplifyData.value = {
      badge: parse(data.simplify_badge4),
      main: parse(data.simplify_main4),
      button: parse(data.simplify_button4)
    }

    // Mapping data Analytics
    analyticData.value = {
      badge: parse(data.analytic_badge4),
      main: parse(data.analytic_main4),
      button: parse(data.analytic_button4)
    }

    // Parse analytic items dengan double parsing untuk nested JSON
    try {
      let itemsData = data.analytic_item4
      
      // First parse jika masih string
      if (typeof itemsData === 'string') {
        itemsData = JSON.parse(itemsData)
      }
      
      // Second parse untuk nested JSON strings dalam array
      if (Array.isArray(itemsData)) {
        analyticItems.value = itemsData.map(item => {
          // Jika item masih string JSON, parse lagi
          if (typeof item === 'string') {
            try {
              return JSON.parse(item)
            } catch {
              return item
            }
          }
          return item
        })
      } else if (itemsData && typeof itemsData === 'object') {
        // Jika format object, convert ke array
        analyticItems.value = Object.values(itemsData).map(item => {
          if (typeof item === 'string') {
            try {
              return JSON.parse(item)
            } catch {
              return item
            }
          }
          return item
        })
      } else {
        analyticItems.value = []
      }
      
      console.log('✅ Analytic items loaded:', analyticItems.value)
      
    } catch (itemErr) {
      console.error('❌ Error parsing analytic_item4:', itemErr)
      analyticItems.value = []
    }
    
    console.log('✅ Data loaded successfully:', {
      simplify: simplifyData.value,
      analytic: analyticData.value,
      items: analyticItems.value
    })

    // Setup scroll animations setelah data loaded
    setTimeout(() => {
      setupScrollAnimations()
    }, 100)

  } catch (err) {
    error.value = 'Gagal memuat data'
    console.error('❌ Gagal parsing data:', err)
  } finally {
    loading.value = false
  }
}

// Load data saat component mounted
onMounted(() => {
  loadData()
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
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Custom scrollbar untuk smooth experience */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
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

@media (min-width: 641px) and (max-width: 1023px) {
  h2 {
    font-size: 2.25rem; /* 36px */
  }
}
</style>