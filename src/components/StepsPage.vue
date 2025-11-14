<template>
  <section class="bg-white py-16 px-4 relative flex items-center justify-center">
    <!-- Lime background with grid pattern - Container untuk semua content -->
    <div class="w-[92%] max-w-[1400px] bg-gradient-to-br from-lime-50 via-lime-100 to-lime-50 rounded-3xl relative py-16 px-8">
      <!-- Grid pattern -->
      <div 
        class="absolute inset-0 opacity-30 rounded-3xl"
        :style="gridStyle"
      />
      
      <!-- All content inside lime background -->

      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px] relative z-10">
        <div class="w-12 h-12 border-4 border-lime-200 border-t-lime-600 rounded-full animate-spin mb-5"></div>
        <p class="text-lg text-gray-600">Memuat data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[400px] px-5 relative z-10">
        <p class="text-lg text-red-600 mb-5">⚠️ {{ error }}</p>
        <button 
          @click="loadStepsData" 
          class="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Content -->
      <div v-else class="max-w-7xl mx-auto relative z-10">
        <!-- Header -->
        <div class="text-center mb-12">
          <!-- Badge -->
          <div 
            v-if="mainData.content" 
            ref="badge"
            data-animation="fadeInUp"
            class="inline-block mb-5 opacity-0"
          >
            <span class="bg-lime-300 text-lime-900 px-6 py-2 rounded-full text-sm font-medium">
              {{ mainData.content }}
            </span>
          </div>

          <!-- Main Title -->
          <h2 
            v-if="mainData.title" 
            ref="heading"
            data-animation="fadeInUp"
            class="text-4xl md:text-5xl font-bold text-gray-900 opacity-0 px-4"
          >
            {{ mainData.title }}
          </h2>
        </div>

        <!-- Cards Grid -->
        <div 
          ref="cardsGrid"
          data-animation="fadeInUp"
          class="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto opacity-0 px-4"
        >
          <div
            v-for="(step, index) in stepsData"
            :key="step.id || index"
            :class="[
              'rounded-3xl p-7 transition-all duration-300 cursor-pointer h-fit text-center flex flex-col items-center',
              hoveredCard === index ? 'bg-gray-900' : 'bg-white'
            ]"
            @mouseenter="hoveredCard = index"
            @mouseleave="hoveredCard = null"
          >
            <!-- Icon -->
            <div 
              :class="[
                'flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-colors duration-300',
                hoveredCard === index ? 'bg-lime-300 text-gray-900' : 'bg-gradient-to-b from-lime-400 to-white text-gray-900'
              ]"
            >
              <img 
                v-if="step.icon" 
                :src="getImage(step.icon)" 
                :alt="step.title"
                class="w-7 h-7 object-contain"
              />
            </div>

            <!-- Title -->
            <h3 
              :class="[
                'text-2xl font-bold mb-4 transition-colors duration-300',
                hoveredCard === index ? 'text-white' : 'text-gray-900'
              ]"
            >
              {{ step.title }}
            </h3>

            <!-- Content -->
            <p 
              :class="[
                'text-base leading-relaxed transition-colors duration-300',
                hoveredCard === index ? 'text-white' : 'text-gray-600'
              ]"
            >
              {{ step.content }}
            </p>
          </div>
        </div>

        <!-- No Data State -->
        <div v-if="stepsData.length === 0" class="text-center py-12 text-gray-500 relative z-10">
          Tidak ada data steps tersedia
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

// State untuk data
const mainData = ref({
  title: '',
  content: ''
})
const stepsData = ref([])
const hoveredCard = ref(null)
const loading = ref(true)
const error = ref(null)

// Refs untuk elemen yang akan di-animate
const badge = ref(null)
const heading = ref(null)
const cardsGrid = ref(null)

// Intersection Observer
let observer = null

// Computed style untuk grid background
const gridStyle = computed(() => ({
  backgroundImage: `linear-gradient(rgba(209, 213, 219, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(209, 213, 219, 0.3) 1px, transparent 1px)`,
  backgroundSize: '32px 32px'
}))

// Parse function yang robust seperti di file kedua
function parse(data) {
  if (data == null) return null;
  let out = data;

  if (typeof out === 'string') {
    try {
      out = JSON.parse(out);
    } catch (e) {
      // gagal parse → biarkan apa adanya
      out = data;
    }
  }

  if (Array.isArray(out)) {
    out = out
      .map(it => {
        if (typeof it === 'string') {
          try {
            return JSON.parse(it);
          } catch (e) {
            return null; // buang item yang invalid
          }
        }
        return it;
      })
      .filter(Boolean);
  }
  return out;
}

// Fungsi untuk memaksa HTTPS
function toHttps(url) {
  if (!url || typeof url !== 'string') return '';
  // paksa https untuk domain API kamu
  return url.startsWith('http://apicompro.phisoft.co.id')
    ? url.replace('http://', 'https://')
    : url;
}

// Fungsi untuk menghandle image path
function getImage(src) {
  if (!src) return ''
  const httpsUrl = toHttps(src)
  return httpsUrl.startsWith('http') ? httpsUrl : `${API_ENDPOINTS.baseURL}${httpsUrl}`
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
          }, index * 150)
          
          observer.unobserve(entry.target)
        }
      }
    })
  }, options)

  const elementsToAnimate = [
    badge.value,
    heading.value,
    cardsGrid.value
  ]

  elementsToAnimate.forEach(el => {
    if (el) {
      observer.observe(el)
    }
  })
}

// Load data dari localStorage
const loadStepsData = () => {
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
    
    // Parse steps_main4 untuk header
    const mainRaw = data.steps_main4 ?? null
    const mainParsed = parse(mainRaw)

    // Handle berbagai struktur data untuk main
    if (Array.isArray(mainParsed) && mainParsed.length > 0) {
      mainData.value = {
        title: mainParsed[0]?.title || 'Easy Steps to Get Started',
        content: mainParsed[0]?.content || 'How It Works'
      }
    } else if (mainParsed) {
      mainData.value = {
        title: mainParsed?.title || 'Easy Steps to Get Started',
        content: mainParsed?.content || 'How It Works'
      }
    } else {
      // Fallback values
      mainData.value = {
        title: 'Easy Steps to Get Started',
        content: 'How It Works'
      }
    }

    // Parse steps_item4 untuk card items
    const itemsRaw = data.steps_item4 ?? null
    let itemsParsed = parse(itemsRaw)

    // Pastikan data dalam bentuk array
    if (itemsParsed && !Array.isArray(itemsParsed)) {
      itemsParsed = [itemsParsed]
    }

    if (Array.isArray(itemsParsed) && itemsParsed.length > 0) {
      stepsData.value = itemsParsed
        .filter(item => item != null) // Filter null items
        .map(item => ({
          id: item.id || null,
          title: item.title || '',
          content: item.content || '',
          icon: toHttps(item.icon || '')
        }))
    } else {
      // Fallback jika tidak ada data
      stepsData.value = []
      console.warn('⚠️ steps_item4 tidak dalam format array yang diharapkan atau kosong')
    }
    
    console.log('✅ Steps data loaded:', {
      main: mainData.value,
      steps: stepsData.value.length,
      stepsDetail: stepsData.value
    })

    // Setup scroll animations setelah data loaded
    setTimeout(() => {
      setupScrollAnimations()
    }, 100)

  } catch (err) {
    error.value = 'Gagal memuat data steps'
    console.error('❌ Gagal parsing steps data:', err)
  } finally {
    loading.value = false
  }
}

// Load data saat component mounted
onMounted(() => {
  loadStepsData()
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
@media (max-width: 768px) {
  h2 {
    font-size: 2.5rem; /* 40px */
    line-height: 1.2;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  h2 {
    font-size: 3rem; /* 48px */
  }
  
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>