<template>
  <footer class="bg-gray-50 pt-16 pb-6 px-6 relative overflow-hidden">
    <!-- Large "SASICO" watermark background -->
    <div class="absolute bottom-0 left-0 right-0 pointer-events-none">
      <div class="max-w-7xl mx-auto relative">
        <div class="text-[15rem] md:text-[20rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-green-200 opacity-30 select-none leading-none pb-8">
          SASICO
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid md:grid-cols-12 gap-8 mb-12">
        <!-- Left Section: Company Info & Social Icons -->
        <div class="md:col-span-3">
          <!-- Company Logo & Description -->
          <div class="mb-6 animate-fadeInLeft" style="animation-delay: 0.1s">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <img 
                  v-if="psg3?.icon" 
                  :src="getImage(psg3.icon)" 
                  alt="company icon" 
                  class="w-full h-full object-contain"
                />
                <svg v-else viewBox="0 0 40 40" fill="none" class="w-full h-full">
                  <circle cx="13" cy="20" r="13" fill="black"/>
                  <circle cx="27" cy="20" r="13" fill="black"/>
                </svg>
              </div>
              <h2 class="font-bold text-xl text-gray-900">{{ psg3?.title || 'Sasico' }}</h2>
            </div>
            <p class="text-gray-600 text-sm mb-6">
              {{ psg3?.content || 'SaaS platform is built to simplify your workflow, automate everyday tasks help team' }}
            </p>
          </div>

          <!-- Social Media Icons -->
          <div class="flex gap-3" v-if="footerIcons.length">
            <a
              v-for="(item, index) in footerIcons"
              :key="'social-' + index"
              :href="item.link || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-all duration-300 group animate-fadeInScale"
              :style="`animation-delay: ${0.2 + index * 0.1}s`"
            >
              <img
                v-if="item.icon"
                :src="getImage(item.icon)"
                :alt="item.title"
                class="w-5 h-5 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </a>
          </div>
        </div>

        <!-- Navigation Links Columns (from navlink4) -->
        <div class="md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fadeInUp" style="animation-delay: 0.3s">
          <!-- Dynamically generate columns from navlink4 -->
          <div 
            v-for="(column, colIndex) in groupedNavlinks" 
            :key="'col-' + colIndex"
            class="animate-fadeInUp"
            :style="`animation-delay: ${0.3 + colIndex * 0.1}s`"
          >
            <h3 class="font-semibold text-gray-900 mb-4">{{ column.title }}</h3>
            <ul class="space-y-3">
              <li v-for="(item, itemIndex) in column.items" :key="'item-' + itemIndex">
                <a 
                  v-if="isExternal(item.link)"
                  :href="item.link || '#'" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-600 hover:text-gray-900 transition-colors text-sm block"
                >
                  {{ item.title }}
                </a>
                <router-link
                  v-else
                  :to="item.link || '#'"
                  class="text-gray-600 hover:text-gray-900 transition-colors text-sm block"
                >
                  {{ item.title }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr class="border-gray-300 mb-6" />

      <!-- Footer Bottom: Copyright & Back to Top -->
      <div class="flex flex-col md:flex-row justify-between items-center gap-4 animate-fadeInUp" style="animation-delay: 0.5s">
        <p class="text-sm text-gray-600" v-if="footerCopyright">
          {{ footerCopyright }}
        </p>

        <!-- Back to Top Button -->
        <button
          @click="scrollToTop"
          class="flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors group"
        >
          <span class="text-sm font-medium">Back to top</span>
          <div class="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-gray-800 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

const navlink4 = ref([])
const footerIcons = ref([])
const footerCopyright = ref('')
const psg3 = ref(null)
const showScrollTop = ref(false)

// Kelompokkan navlink berdasarkan kolom (seperti pada gambar: Product, Company, Features, Links)
const groupedNavlinks = computed(() => {
  if (!navlink4.value.length) return []
  
  // Mengelompokkan item berdasarkan kategori atau membagi secara merata
  const columns = []
  const columnTitles = ['Product', 'Company', 'Features', 'Links'] // Sesuaikan dengan kebutuhan
  
  // Jika ada field untuk grouping (misal: category), gunakan itu
  // Jika tidak, bagi rata menjadi 4 kolom
  const itemsPerColumn = Math.ceil(navlink4.value.length / 4)
  
  for (let i = 0; i < 4; i++) {
    const startIdx = i * itemsPerColumn
    const endIdx = startIdx + itemsPerColumn
    const items = navlink4.value.slice(startIdx, endIdx)
    
    if (items.length > 0) {
      columns.push({
        title: columnTitles[i] || `Column ${i + 1}`,
        items: items
      })
    }
  }
  
  return columns
})

// Fungsi helper
function getImage(src) {
  if (!src) return '/no-image.jpg'
  return src.startsWith('http') ? src : `${API_ENDPOINTS.baseURL}${src}`
}

function isExternal(link) {
  return /^https?:\/\//.test(link)
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

    // Ambil data company info
    const psg3Data = parse(data.psg3)
    psg3.value = psg3Data[0] || null

    // Ambil data navlink4 untuk navigation links
    navlink4.value = parse(data.navlink4)
    
    // Ambil data social media icons
    footerIcons.value = parse(data.footer_icon3)
    
    // Ambil copyright text
    const copyrightData = parse(data.footer_copyright3)
    footerCopyright.value = copyrightData[0]?.title || copyrightData[0]?.content || 'Sasico,2025 © All rights reserved'

    console.log('Footer data loaded:', {
      psg3: psg3.value,
      navlink4: navlink4.value,
      footerIcons: footerIcons.value,
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

footer {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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