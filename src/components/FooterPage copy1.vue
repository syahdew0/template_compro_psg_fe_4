<template>
  <footer id="footer" class="bg-[#000020] text-white pt-12 md:pt-16 pb-6 px-4 md:px-6 relative overflow-hidden">
    <!-- Decorative Background Elements - Hexagons -->
    <div class="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 opacity-90 -translate-x-1/2 -translate-y-1/2">
      <svg viewBox="0 0 100 100" class="w-full h-full text-blue-900">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="currentColor" rx="5"/>
      </svg>
    </div>
    <div class="absolute top-1/4 right-10 w-48 h-48 md:w-64 md:h-64 opacity-90 rotate-12">
      <svg viewBox="0 0 100 100" class="w-full h-full text-blue-900">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="currentColor"/>
      </svg>
    </div>
    <div class="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 opacity-90 translate-x-1/2 translate-y-1/2 -rotate-45">
      <svg viewBox="0 0 100 100" class="w-full h-full text-blue-900">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="currentColor"/>
      </svg>
    </div>
    <div class="absolute bottom-1/3 left-10 md:left-20 w-32 h-32 md:w-48 md:h-48 opacity-90 rotate-45">
      <svg viewBox="0 0 100 100" class="w-full h-full text-blue-900">
        <polygon points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25" fill="currentColor"/>
      </svg>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8 md:mb-12 animate-slideUp">
        <!-- Left Section: Company Info & Contact Buttons -->
        <div class="lg:col-span-2 xl:col-span-1">
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
            <h2 class="font-bold text-lg leading-tight">{{ psg3?.title || 'Avada Corporation' }}</h2>
          </div>

          <!-- Contact Buttons from footer3 -->
          <div class="space-y-3" v-if="footer3.length">
            <a
              v-for="(item, index) in footer3"
              :key="index"
              :href="item.link || '#'"
              class="flex items-center gap-3 bg-blue-700 hover:bg-blue-600 transition-all duration-300 rounded-full px-4 md:px-6 py-2.5 md:py-3 group w-full md:w-auto"
            >
              <img
                v-if="item.icon"
                :src="getImage(item.icon)"
                alt="icon"
                class="w-5 h-5 filter brightness-0 invert flex-shrink-0"
              />
              <span class="text-sm font-medium truncate">{{ item.title }}</span>
            </a>
          </div>
        </div>

        <!-- Spacer for larger screens -->
        <div class="hidden xl:block xl:col-span-1"></div>

        <!-- Navigation Links - Dynamic from navlink3 -->
        <div class="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 animate-fadeInUp" style="animation-delay: 0.3s">
          <div v-for="(column, colIndex) in navColumns" :key="colIndex" class="min-w-0">
            <ul class="space-y-2 md:space-y-3">
              <li v-for="(link, linkIndex) in column" :key="linkIndex">
                <a 
                  :href="link.link || '#'" 
                  :class="[
                    'transition-colors inline-block break-words',
                    linkIndex === 0 && colIndex === 0 
                      ? 'text-white hover:text-blue-300 border-b-2 border-blue-400 pb-1' 
                      : linkIndex === 1 && colIndex === 1
                        ? 'text-gray-300 hover:text-white border-b-2 border-blue-400 pb-1'
                        : 'text-gray-300 hover:text-white'
                  ]"
                >
                  {{ link.title }}
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <!-- Divider -->
      <hr class="border-gray-700 mb-6" />

      <!-- Footer Bottom: Copyright & Social Icons -->
      <div class="flex flex-col-reverse md:flex-row justify-between items-center gap-4 md:gap-6 animate-fadeInUp" style="animation-delay: 0.5s">
        <p class="text-xs md:text-sm text-gray-400 text-center md:text-left" v-if="footerCopyright">
          {{ footerCopyright }}
        </p>

        <!-- Social Icons - Horizontal at bottom (footer_icon3) -->
        <div class="flex flex-wrap justify-center gap-3 md:gap-4 relative" v-if="footerIcons.length">
          <a
            v-for="(item, index) in footerIcons"
            :key="'bottom-' + index"
            :href="item.link || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group relative animate-fadeInScale"
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
            
            <!-- Tooltip on hover (desktop only) -->
            <div 
              v-if="hoveredIcon === index && item.title"
              class="hidden md:block absolute bottom-full mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap shadow-xl animate-fadeIn pointer-events-none"
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
        class="fixed bottom-16 md:bottom-20 right-4 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-gray-800 hover:bg-blue-500 opacity-90 rounded-lg flex items-center justify-center transition-all duration-300 z-50 shadow-lg hover:shadow-xl"
        aria-label="Scroll to top"
      >
        <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

const footer3 = ref([])
const footerIcons = ref([])
const footerCopyright = ref('')
const hoveredIcon = ref(null)
const psg3 = ref(null)
const showScrollTop = ref(false)
const navLinks = ref([])

// Computed property untuk membagi navLinks menjadi 3 kolom
const navColumns = computed(() => {
  if (!navLinks.value.length) return [[], [], []]
  
  const itemsPerColumn = Math.ceil(navLinks.value.length / 3)
  const columns = [[], [], []]
  
  navLinks.value.forEach((link, index) => {
    const columnIndex = Math.floor(index / itemsPerColumn)
    if (columnIndex < 3) {
      columns[columnIndex].push(link)
    }
  })
  
  return columns
})

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
  showScrollTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()

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
    footer3.value = parse(data.footer3)
    footerIcons.value = parse(data.footer_icon3)
    navLinks.value = parse(data.navlink3)
    
    // Copyright text dari footer_copyright3
    const copyrightData = parse(data.footer_copyright3)
    footerCopyright.value = copyrightData[0]?.title || copyrightData[0]?.content || ''

    console.log('Footer data loaded:', {
      psg3: psg3.value,
      footer3: footer3.value,
      footerIcons: footerIcons.value,
      navLinks: navLinks.value,
      copyright: footerCopyright.value
    })

  } catch (err) {
    console.error('Gagal parse footer data:', err)
  }
})

onUnmounted(() => {
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

/* Prevent text overflow */
@media (max-width: 640px) {
  h2 {
    word-break: break-word;
  }
}
</style>