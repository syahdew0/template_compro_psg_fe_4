<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-7xl mx-auto">
      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        
        <!-- Feature Card 1 - Left Top (Image Card) -->
        <div class="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden">
          <div class="w-full h-full flex items-center justify-center p-4">
            <img 
              v-if="imageRight4[0]?.image"
              :src="imageRight4[0].image" 
              :alt="imageRight4[0]?.title || 'Feature Image 1'"
              class="w-full h-full object-cover rounded-2xl"
              @error="handleImageError"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
              <span class="text-gray-400 text-sm">No Image</span>
            </div>
          </div>
        </div>

        <!-- Feature Card 2 - Center (Analytics Dashboard) with Draggable Images -->
        <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col relative overflow-hidden">
          <!-- Decorative dots -->
          <div class="absolute top-4 right-4 w-32 h-32 opacity-20 pointer-events-none">
            <div class="grid grid-cols-8 gap-1">
              <div v-for="i in 64" :key="i" class="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          
          <!-- Draggable Image Carousel -->
          <div class="relative z-10 flex-1 flex flex-col">
            <div class="text-center mb-3">
              <p class="text-xs text-gray-500 flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
                </svg>
                Swipe
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </p>
            </div>

            <div 
              ref="imageCarousel"
              class="flex gap-4 overflow-x-scroll scrollbar-hide flex-1"
              :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
              @mousedown.prevent="startDrag"
              @touchstart.prevent="startDrag"
              style="scroll-snap-type: x mandatory;"
            >
              <div 
                v-for="(image, idx) in carouselImages" 
                :key="idx"
                class="flex-shrink-0 w-full flex items-center justify-center"
                style="scroll-snap-align: start;"
              >
                <div class="bg-white rounded-2xl p-4 shadow-lg w-full h-full flex items-center justify-center">
                  <img 
                    v-if="image"
                    :src="image" 
                    :alt="`Analytics ${idx + 1}`"
                    class="max-w-full max-h-full object-contain pointer-events-none select-none"
                    draggable="false"
                    @error="handleImageError"
                  />
                  <!-- Fallback Chart jika tidak ada gambar -->
                  <div v-else class="w-full">
                    <div class="flex justify-between items-start mb-6">
                      <div>
                        <div class="flex items-center gap-2 mb-2">
                          <h4 class="text-3xl font-bold text-gray-900">2h 20m</h4>
                          <span class="text-gray-400">→</span>
                        </div>
                        <p class="text-sm text-gray-500">Average time you spent per day</p>
                      </div>
                    </div>
                    
                    <!-- Bar Chart -->
                    <div class="flex items-end justify-between h-32 gap-2">
                      <div v-for="(bar, bidx) in chartBars" :key="bidx" class="flex-1 flex flex-col items-center gap-2">
                        <div class="w-full rounded-t-lg transition-all duration-500" 
                             :class="bar.color"
                             :style="{ height: bar.height + '%' }">
                        </div>
                        <span class="text-xs text-gray-500">{{ bar.label }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Carousel Indicators -->
            <div class="flex justify-center gap-2 mt-4">
              <button
                v-for="(image, index) in carouselImages"
                :key="index"
                @click="scrollToImage(index)"
                class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                :class="currentImageIndex === index ? 'bg-gray-900 w-4' : 'bg-gray-400 hover:bg-gray-600'"
              ></button>
            </div>
          </div>
        </div>

        <!-- Feature Card 3 - Right Top (Image Card) -->
        <div class="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden">
          <div class="w-full h-full flex items-center justify-center p-4">
            <img 
              v-if="imageLeft4[0]?.image"
              :src="imageLeft4[0].image" 
              :alt="imageLeft4[0]?.title || 'Feature Image 1'"
              class="w-full h-full object-cover rounded-2xl"
              @error="handleImageError"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
              <span class="text-gray-400 text-sm">No Image</span>
            </div>
          </div>
        </div>

        <!-- Feature Card 4 - Left Bottom (Image Card) -->
        <div class="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden">
          <div class="w-full h-full flex items-center justify-center p-4">
            <img 
              v-if="imageLeft4[1]?.image"
              :src="imageLeft4[1].image" 
              :alt="imageLeft4[1]?.title || 'Feature Image 2'"
              class="w-full h-full object-cover rounded-2xl"
              @error="handleImageError"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
              <span class="text-gray-400 text-sm">No Image</span>
            </div>
          </div>
        </div>

        <!-- Feature Card 5 - Center Bottom (Main Feature) -->
        <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
          <h2 class="text-3xl font-bold text-gray-900 mb-6" v-html="mainFeature?.title || 'AI-Powered Conversations'"></h2>
          <p class="text-gray-600 leading-relaxed mb-8" v-html="mainFeature?.description || 'Deliver human-like, intelligent responses using advanced natural language processing. Engage users 24/7 with personalized support.'"></p>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-6" v-html="mainFeature?.subtitle || 'Real-Time Analytics'"></h3>
          <p class="text-gray-600 leading-relaxed mb-6" v-html="mainFeature?.analytics || 'Track performance, user interactions, and engagement insights to continuously improve your chatbot strategy.'"></p>
          
          <div class="space-y-3">
            <div v-for="(item, idx) in featureList" :key="idx" class="flex items-center gap-3">
              <svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700" v-html="item"></span>
            </div>
          </div>
        </div>

        <!-- Feature Card 6 - Right Bottom (Image Card) -->
        <div class="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden">
          <div class="w-full h-full flex items-center justify-center p-4">
            <img 
              v-if="imageRight4[1]?.image"
              :src="imageRight4[1].image" 
              :alt="imageRight4[1]?.title || 'Feature Image 2'"
              class="w-full h-full object-cover rounded-2xl"
              @error="handleImageError"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
              <span class="text-gray-400 text-sm">No Image</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'

/* eslint-disable no-undef */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({})
  }
})
/* eslint-enable no-undef */

// Carousel refs
const imageCarousel = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const currentImageIndex = ref(0)

// Data refs
const feature1 = ref({})
const feature3 = ref({})
const feature4 = ref({})
const feature6 = ref({})
const mainFeature = ref({})
const imageLeft4 = ref([])
const imageRight4 = ref([])
const carouselImages = ref([])
const chartBars = ref([
  { label: 'M', height: 60, color: 'bg-green-300' },
  { label: 'T', height: 100, color: 'bg-gray-900' },
  { label: 'W', height: 65, color: 'bg-green-300' },
  { label: 'T', height: 95, color: 'bg-gray-900' },
  { label: 'F', height: 85, color: 'bg-gray-900' },
  { label: 'S', height: 70, color: 'bg-green-300' },
  { label: 'Today', height: 75, color: 'bg-green-300' }
])
const featureList = ref([
  'Easy Drag-and-Drop Builder',
  'Multi-Channel Support'
])

// Handle image load errors
const handleImageError = (e) => {
  console.error('Failed to load image:', e.target.src)
  e.target.style.display = 'none'
}

// Drag functionality
const startDrag = (e) => {
  if (!imageCarousel.value) return
  
  isDragging.value = true
  
  // Get initial position
  const pageX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX
  startX.value = pageX
  scrollLeft.value = imageCarousel.value.scrollLeft
  
  // Add event listeners to document for better tracking
  if (e.type.includes('mouse')) {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', stopDrag)
  } else {
    document.addEventListener('touchmove', onTouchMove, { passive: false })
    document.addEventListener('touchend', stopDrag)
  }
  
  // Disable smooth scroll during drag
  imageCarousel.value.style.scrollBehavior = 'auto'
}

const onMouseMove = (e) => {
  if (!isDragging.value || !imageCarousel.value) return
  e.preventDefault()
  
  const x = e.clientX
  const walk = (startX.value - x) * 1.5
  imageCarousel.value.scrollLeft = scrollLeft.value + walk
}

const onTouchMove = (e) => {
  if (!isDragging.value || !imageCarousel.value) return
  e.preventDefault()
  
  const x = e.touches[0].clientX
  const walk = (startX.value - x) * 1.5
  imageCarousel.value.scrollLeft = scrollLeft.value + walk
}

const stopDrag = () => {
  isDragging.value = false
  
  // Remove event listeners
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('touchend', stopDrag)
  
  // Re-enable smooth scroll
  if (imageCarousel.value) {
    imageCarousel.value.style.scrollBehavior = 'smooth'
  }
  
  updateCurrentIndex()
}

// Update current image index
const updateCurrentIndex = () => {
  if (!imageCarousel.value || carouselImages.value.length === 0) return
  const scrollPosition = imageCarousel.value.scrollLeft
  const itemWidth = imageCarousel.value.scrollWidth / carouselImages.value.length
  currentImageIndex.value = Math.round(scrollPosition / itemWidth)
}

// Scroll to specific image
const scrollToImage = (index) => {
  if (!imageCarousel.value) return
  const itemWidth = imageCarousel.value.scrollWidth / carouselImages.value.length
  imageCarousel.value.scrollTo({
    left: itemWidth * index,
    behavior: 'smooth'
  })
  currentImageIndex.value = index
}

const handleScroll = () => {
  updateCurrentIndex()
}

// IMPROVED: Deep parse function yang handle double-encoded JSON
function deepParse(data) {
  if (!data) return null
  
  // Jika sudah object/array, return langsung
  if (typeof data === 'object') return data
  
  // Jika string, coba parse berulang sampai dapat object
  if (typeof data === 'string') {
    try {
      let parsed = data
      // Loop parsing sampai dapat object/array atau error
      while (typeof parsed === 'string') {
        const temp = JSON.parse(parsed)
        // Jika hasil parsing sama dengan input, break untuk avoid infinite loop
        if (temp === parsed) break
        parsed = temp
      }
      return parsed
    } catch (e) {
      console.warn('Failed to parse JSON:', e.message, data)
      return null
    }
  }
  
  return data
}

// IMPROVED: Extract image URL dari berbagai format data
function extractImageUrl(item) {
  if (!item) return null
  
  // Jika string langsung (URL)
  if (typeof item === 'string' && (item.startsWith('http') || item.startsWith('/'))) {
    return item
  }
  
  // Jika object dengan property image
  if (typeof item === 'object') {
    return item.image || item.url || item.src || null
  }
  
  return null
}

// IMPROVED: Process array data dengan lebih robust
function processArrayData(data) {
  if (!data) return []
  
  const parsed = deepParse(data)
  
  if (!parsed) return []
  
  // Jika array
  if (Array.isArray(parsed)) {
    return parsed.map(item => {
      // Deep parse setiap item
      const parsedItem = deepParse(item)
      
      // Jika item adalah string JSON, parse lagi
      if (typeof parsedItem === 'string') {
        try {
          return JSON.parse(parsedItem)
        } catch {
          return { content: parsedItem }
        }
      }
      
      return parsedItem
    })
  }
  
  // Jika single object, wrap dalam array
  if (typeof parsed === 'object') {
    return [parsed]
  }
  
  return []
}

watchEffect(() => {
  const allData = props.pageData || {}
  
  console.log('🔍 Raw pageData:', allData)

  // Process about_powered4 data
  const poweredData = processArrayData(allData.about_powered4)
  console.log('✅ Processed about_powered4:', poweredData)
  
  if (poweredData.length > 0) {
    // Extract images dengan handling berbagai format
    carouselImages.value = poweredData
      .map(item => extractImageUrl(item))
      .filter(img => img && img.length > 0)
    
    console.log('🖼️ Carousel images:', carouselImages.value)
    
    // Set feature data
    if (poweredData[0]) {
      feature1.value = {
        title: poweredData[0].title || '',
        content: poweredData[0].content || ''
      }
    }
    if (poweredData[1]) {
      feature3.value = {
        title: poweredData[1].title || '',
        content: poweredData[1].content || ''
      }
    }
    if (poweredData[2]) {
      feature4.value = {
        title: poweredData[2].title || '',
        content: poweredData[2].content || ''
      }
    }
    if (poweredData[3]) {
      feature6.value = {
        title: poweredData[3].title || '',
        content: poweredData[3].content || ''
      }
    }
    if (poweredData[4]) {
      mainFeature.value = {
        title: poweredData[4].title || 'AI-Powered Conversations',
        description: poweredData[4].content || '',
        subtitle: poweredData[4].subtitle || 'Real-Time Analytics',
        analytics: poweredData[4].analytics || ''
      }
    }
  }

  // Jika tidak ada gambar, tampilkan fallback chart
  if (carouselImages.value.length === 0) {
    carouselImages.value = [null]
  }

  // Process about_image_left4 data
  const imageLeft4Data = processArrayData(allData.about_image_left4)
  console.log('✅ Processed about_image_left4:', imageLeft4Data)
  imageLeft4.value = imageLeft4Data

  // Process about_image_right4 data
  const imageRight4Data = processArrayData(allData.about_image_right4)
  console.log('✅ Processed about_image_right4:', imageRight4Data)
  imageRight4.value = imageRight4Data

  // Process feature list
  const featuresData = processArrayData(allData.about_powered_features)
  if (featuresData.length > 0) {
    featureList.value = featuresData.map(f => f.title || f.content || f)
  }
})

onMounted(() => {
  if (imageCarousel.value) {
    imageCarousel.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (imageCarousel.value) {
    imageCarousel.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cursor-grabbing,
.cursor-grabbing * {
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  cursor: grabbing !important;
}

.cursor-grab {
  cursor: grab;
}

img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  pointer-events: none;
}

@supports (-webkit-overflow-scrolling: touch) {
  .scrollbar-hide {
    -webkit-overflow-scrolling: touch;
  }
}
</style>