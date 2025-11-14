<template>
  <footer class="bg-[#000020] text-white pt-16 pb-6 px-6 relative overflow-hidden">
    <!-- Decorative Background Elements - Hexagons -->
    <div class="absolute top-0 left-0 w-96 h-96 opacity-90 -translate-x-1/2 -translate-y-1/2">
      <svg viewBox="0 0 100 100" class="w-full h-full text-blue-900">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="currentColor" rx="5"/>
      </svg>
    </div>
    <div class="absolute top-1/4 right-10 w-64 h-64 opacity-90 rotate-12">
      <svg viewBox="0 0 100 100" class="w-full h-full text-blue-900">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="currentColor"/>
      </svg>
    </div>
    <div class="absolute bottom-0 right-0 w-96 h-96 opacity-90 translate-x-1/2 translate-y-1/2 -rotate-45">
      <svg viewBox="0 0 100 100" class="w-full h-full text-blue-900">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="currentColor"/>
      </svg>
    </div>
    <div class="absolute bottom-1/3 left-20 w-48 h-48 opacity-90 rotate-45">
      <svg viewBox="0 0 100 100" class="w-full h-full text-blue-900">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="currentColor"/>
      </svg>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid md:grid-cols-5 gap-8 mb-12 ml-0 md:ml-12 animate-slideUp">
        <!-- Left Section: Company Info & Contact Buttons -->
        <div class="md:col-span-1">
          <div class="flex items-center gap-3 mb-6 animate-fadeInLeft" style="animation-delay: 0.1s">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
              <img 
                v-if="psg3?.icon" 
                :src="getImage(psg3.icon)" 
                alt="company icon" 
                class="w-full h-full object-contain"
              />
              <svg v-else viewBox="0 0 24 24" fill="none" class="w-6 h-6 text-blue-900">
                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <h2 class="font-bold text-lg leading-tight whitespace-nowrap">{{ psg3?.title || 'Avada Corporation' }}</h2>
          </div>

          <!-- Contact Buttons from footer3 -->
          <div class="space-y-3" v-if="footer3.length">
            <a
              v-for="(item, index) in footer3"
              :key="index"
              :href="item.link || '#'"
              class="flex items-center gap-3 bg-blue-700 hover:bg-blue-600 transition-all duration-300 rounded-full px-6 py-3 group"
            >
              <img
                v-if="item.icon"
                :src="getImage(item.icon)"
                alt="icon"
                class="w-5 h-5 filter brightness-0 invert"
              />
              <span class="text-sm font-medium">{{ item.title }}</span>
            </a>
          </div>
        </div>

        <!-- Spacer -->
        <div class="hidden md:block md:col-span-1"></div>

        <!-- Navigation Links -->
        <div class="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 animate-fadeInUp" style="animation-delay: 0.3s">
          <!-- Column 1 -->
          <div>
            <ul class="space-y-3">
              <li><a href="#" class="text-white hover:text-blue-300 transition-colors border-b-2 border-blue-400 pb-1 inline-block">Home</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Resources</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <!-- Column 2 -->
          <div>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Who we are</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors border-b-2 border-blue-400 pb-1 inline-block">Our team</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <!-- Column 3 -->
          <div>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" class="text-gray-300 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
        </div>

      </div>

      <!-- Divider -->
      <hr class="border-gray-700 mb-6" />

      <!-- Footer Bottom: Copyright & Social Icons -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-6 ml-0 md:ml-12 animate-fadeInUp" style="animation-delay: 0.5s">
        <p class="text-sm text-gray-400" v-if="footerCopyright">
          {{ footerCopyright }}
        </p>

        <!-- Social Icons - Horizontal at bottom (footer_icon3) -->
        <div class="flex gap-4 relative" v-if="footerIcons.length">
          <a
            v-for="(item, index) in footerIcons"
            :key="'bottom-' + index"
            :href="item.link || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300  group relative animate-fadeInScale"
            :style="`animation-delay: ${0.6 + index * 0.1}s`"
            @mouseenter="hoveredIcon = index"
            @mouseleave="hoveredIcon = null"
          >
            <img
              v-if="item.icon"
              :src="item.icon"
              :alt="item.title"
              class="w-5 h-5 object-contain filter brightness-0 invert"
            />
            
            <!-- Tooltip on hover -->
            <div 
              v-if="hoveredIcon === index && item.title"
              class="absolute bottom-full mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-xl animate-fadeIn"
            >
              {{ item.title }}
              <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </a>
        </div>
      </div>

      <!-- Scroll to Top Button -->
      <button
        v-show="showScrollTop"
        @click="scrollToTop"
        class="fixed bottom-20 right-8 w-12 h-12 bg-gray-800 hover:bg-blue-500 opacity-90 rounded-lg flex items-center justify-center transition-all duration-300 z-50"
      >
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

const footer3 = ref([])
const footerIcons = ref([])
const footerCopyright = ref('')
const hoveredIcon = ref(null)
const psg3 = ref(null) // Data untuk company info
const showScrollTop = ref(false) // Visibility scroll to top button

function getImage(src) {
  if (!src) return '/no-image.jpg'
  return src.startsWith('http') ? src : `${API_ENDPOINTS.baseURL}${src}`
}

function parse(data) {
  if (!data) return []
  const raw = typeof data === 'string' ? JSON.parse(data) : data
  return Array.isArray(raw)
    ? raw.map(item => (typeof item === 'string' ? JSON.parse(item) : item))
    : [raw]
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleScroll() {
  // Tampilkan tombol jika scroll lebih dari 300px
  showScrollTop.value = window.scrollY > 300
}

onMounted(() => {
  // Setup scroll listener
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial scroll position

  try {
    const raw = localStorage.getItem('customPageData:Home')
    if (!raw) {
      console.warn('customPageData:Home tidak ditemukan')
      return
    }

    const data = JSON.parse(raw)

    // Ambil data psg3 untuk company info
    const psg3Data = parse(data.psg3)
    psg3.value = psg3Data[0] || null

    // Ambil data dari tag yang sesuai
    footer3.value = parse(data.footer3) // Button phone dan email
    footerIcons.value = parse(data.footer_icon3) // Icon sosial media
    
    // Copyright text dari footer_copyright3
    const copyrightData = parse(data.footer_copyright3)
    footerCopyright.value = copyrightData[0]?.title || copyrightData[0]?.content || ''

    console.log('Footer data loaded:', {
      psg3: psg3.value,
      footer3: footer3.value,
      footerIcons: footerIcons.value,
      copyright: footerCopyright.value
    })

  } catch (err) {
    console.error('Gagal parse footer data:', err)
  }
})

onUnmounted(() => {
  // Cleanup scroll listener
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Smooth animations */
a, button {
  transition: all 0.3s ease;
}

/* Ensure proper text rendering */
footer {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Fade in animation for tooltip */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}

/* Slide up animation */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideUp {
  animation: slideUp 0.6s ease-out;
  animation-fill-mode: both;
}

/* Fade in from left */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeInLeft {
  animation: fadeInLeft 0.6s ease-out;
  animation-fill-mode: both;
}

/* Fade in up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

/* Fade in with scale */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeInScale {
  animation: fadeInScale 0.5s ease-out;
  animation-fill-mode: both;
}
</style>