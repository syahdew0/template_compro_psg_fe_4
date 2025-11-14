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
        @click="loadLaunchData" 
        class="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Content -->
    <div v-else class="max-w-7xl mx-auto px-5">
      <!-- Main Card with Gradient Background -->
      <div 
        ref="mainCard"
        data-animation="fadeInUp"
        class="relative overflow-hidden rounded-xl bg-gradient-to-br from-lime-300 via-lime-200 to-lime-100 px-8 py-16 text-center opacity-0 sm:px-16 sm:py-20"
      >
        <!-- World Map Pattern with Dots and Lines - ENHANCED VISIBILITY -->
        <div class="absolute inset-0 opacity-40">
          <svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 600">
            <defs>
              <!-- Dotted grid pattern -->
              <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="2" fill="#16a34a" opacity="0.6" />
              </pattern>
            </defs>
            
            <!-- Base dotted grid -->
            <rect width="100%" height="100%" fill="url(#dotGrid)" />
            
            <!-- Curved lines representing latitude/longitude -->
            <g stroke="#15803d" opacity="0.5">
              <!-- Horizontal curved lines -->
              <path d="M 0 100 Q 400 90, 800 100 T 1600 100" stroke-width="2" fill="none" />
              <path d="M 0 200 Q 400 210, 800 200 T 1600 200" stroke-width="2" fill="none" />
              <path d="M 0 300 Q 400 290, 800 300 T 1600 300" stroke-width="2" fill="none" />
              <path d="M 0 400 Q 400 410, 800 400 T 1600 400" stroke-width="2" fill="none" />
              <path d="M 0 500 Q 400 490, 800 500 T 1600 500" stroke-width="2" fill="none" />
              
              <!-- Vertical curved lines -->
              <path d="M 150 0 Q 160 300, 150 600" stroke-width="2" fill="none" />
              <path d="M 300 0 Q 290 300, 300 600" stroke-width="2" fill="none" />
              <path d="M 450 0 Q 460 300, 450 600" stroke-width="2" fill="none" />
              <path d="M 600 0 Q 590 300, 600 600" stroke-width="2" fill="none" />
              <path d="M 750 0 Q 760 300, 750 600" stroke-width="2" fill="none" />
              <path d="M 900 0 Q 890 300, 900 600" stroke-width="2" fill="none" />
              <path d="M 1050 0 Q 1060 300, 1050 600" stroke-width="2" fill="none" />
              <path d="M 1200 0 Q 1190 300, 1200 600" stroke-width="2" fill="none" />
              <path d="M 1350 0 Q 1360 300, 1350 600" stroke-width="2" fill="none" />
              <path d="M 1500 0 Q 1490 300, 1500 600" stroke-width="2" fill="none" />
            </g>
            
            <!-- Connection lines between dots -->
            <g stroke="#16a34a" opacity="0.6">
              <line x1="250" y1="180" x2="450" y2="230" stroke-width="2" />
              <line x1="450" y1="230" x2="650" y2="200" stroke-width="2" />
              <line x1="650" y1="200" x2="850" y2="260" stroke-width="2" />
              <line x1="850" y1="260" x2="1050" y2="240" stroke-width="2" />
              <line x1="1050" y1="240" x2="1250" y2="280" stroke-width="2" />
              
              <line x1="200" y1="330" x2="400" y2="360" stroke-width="2" />
              <line x1="400" y1="360" x2="600" y2="340" stroke-width="2" />
              <line x1="600" y1="340" x2="800" y2="380" stroke-width="2" />
              <line x1="800" y1="380" x2="1000" y2="360" stroke-width="2" />
              <line x1="1000" y1="360" x2="1200" y2="400" stroke-width="2" />
              
              <line x1="350" y1="150" x2="550" y2="180" stroke-width="2" />
              <line x1="550" y1="180" x2="750" y2="160" stroke-width="2" />
              <line x1="900" y1="380" x2="1100" y2="420" stroke-width="2" />
            </g>
            
            <!-- Highlighted dots (nodes) with glow -->
            <g fill="#16a34a">
              <circle cx="250" cy="180" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="450" cy="230" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="650" cy="200" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="850" cy="260" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="1050" cy="240" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.3s" repeatCount="indefinite" />
              </circle>
              <circle cx="1250" cy="280" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.6s" repeatCount="indefinite" />
              </circle>
              
              <circle cx="200" cy="330" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="360" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.7s" repeatCount="indefinite" />
              </circle>
              <circle cx="600" cy="340" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="800" cy="380" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.9s" repeatCount="indefinite" />
              </circle>
              <circle cx="1000" cy="360" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="1200" cy="400" r="5" opacity="0.8">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </g>
            
            <!-- Pulsing circles for emphasis -->
            <g fill="none" stroke="#16a34a" opacity="0.5">
              <circle cx="450" cy="230" r="12" stroke-width="2">
                <animate attributeName="r" values="12;18;12" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="650" cy="200" r="12" stroke-width="2">
                <animate attributeName="r" values="12;18;12" dur="3.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="400" cy="360" r="12" stroke-width="2">
                <animate attributeName="r" values="12;18;12" dur="3.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="1000" cy="360" r="12" stroke-width="2">
                <animate attributeName="r" values="12;18;12" dur="3.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="3.8s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
        </div>

        <!-- Decorative Glow Blobs -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-green-600/50 blur-3xl"></div>
          <div class="absolute right-20 top-10 h-56 w-56 rounded-full bg-green-700/50 blur-3xl"></div>
          <div class="absolute bottom-20 right-10 h-52 w-52 rounded-full bg-lime-500/50 blur-3xl"></div>
          <div class="absolute left-1/3 top-1/3 h-40 w-40 rounded-full bg-green-500/40 blur-3xl"></div>
        </div>

        <!-- Content Container -->
        <div class="relative z-10 mx-auto max-w-3xl">
          <!-- Badge -->
          <div 
            v-if="launchData.badge?.title"
            ref="badge"
            data-animation="fadeInUp"
            class="mb-6 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-800 opacity-0"
          >
            {{ launchData.badge.title }}
          </div>

          <!-- Main Title -->
          <h2 
            v-if="launchData.main?.title"
            ref="heading"
            data-animation="fadeInUp"
            class="mb-6 text-3xl font-bold leading-tight text-gray-900 opacity-0 sm:text-4xl lg:text-5xl"
          >
            {{ launchData.main.title }}
          </h2>

          <!-- Description -->
          <p 
            v-if="launchData.main?.content"
            ref="description"
            data-animation="fadeInUp"
            class="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-gray-800 opacity-0 sm:text-base"
          >
            {{ launchData.main.content }}
          </p>

          <!-- CTA Button -->
          <a 
            v-if="launchData.button?.title"
            :href="launchData.button.link || '#'"
            ref="ctaButton"
            data-animation="fadeInUp"
            class="group inline-flex items-center gap-2 rounded-full bg-black py-2 pl-8 pr-1 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-black  opacity-0 sm:gap-3 sm:py-1 sm:text-base"
          >
            <span class="whitespace-nowrap transition-colors duration-300">{{ launchData.button.title }}</span>
            <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white transition-all duration-300 group-hover:bg-black sm:h-10 sm:w-10">
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
                class="text-black transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:h-5 sm:w-5"
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

// State untuk data
const launchData = ref({
  badge: {},
  main: {},
  button: {}
})

const loading = ref(true)
const error = ref(null)

// Refs untuk elemen yang akan di-animate
const mainCard = ref(null)
const badge = ref(null)
const heading = ref(null)
const description = ref(null)
const ctaButton = ref(null)

// Intersection Observer
let observer = null

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
    mainCard.value,
    badge.value,
    heading.value,
    description.value,
    ctaButton.value
  ]

  elementsToAnimate.forEach(el => {
    if (el) {
      observer.observe(el)
    }
  })
}

// Load data dari localStorage
const loadLaunchData = () => {
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
    launchData.value = {
      badge: parse(data.launch_badge4),      // Badge "Launch with ease"
      main: parse(data.launch_main4),        // Title + Content
      button: parse(data.launch_button4)     // Button "Start Your 14-Day Free Trial"
    }
    
    console.log('✅ Launch data loaded:', launchData.value)

    // Setup scroll animations setelah data loaded
    setTimeout(() => {
      setupScrollAnimations()
    }, 100)

  } catch (err) {
    error.value = 'Gagal memuat data launch section'
    console.error('❌ Gagal parsing launch data:', err)
  } finally {
    loading.value = false
  }
}

// Load data saat component mounted
onMounted(() => {
  loadLaunchData()
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
    font-size: 2rem; /* 32px */
    line-height: 2.5rem;
  }
  
  p {
    font-size: 0.9375rem; /* 15px */
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  h2 {
    font-size: 2.5rem; /* 40px */
  }
  
  p {
    font-size: 1rem;
  }
}
</style>