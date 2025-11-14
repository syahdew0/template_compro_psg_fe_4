<template>
  <section class="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-12 lg:py-16">
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px]">
      <div class="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-5"></div>
      <p class="text-lg text-gray-600">Memuat data pricing...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[400px] px-5">
      <p class="text-lg text-red-600 mb-5">⚠️ {{ error }}</p>
      <button 
        @click="loadPricingData" 
        class="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5"
      >
        Coba Lagi
      </button>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div 
          v-if="pricingData.badge?.title"
          ref="badgeRef"
          data-animation="fadeIn"
          class="inline-block bg-lime-400 text-black text-sm font-medium px-6 py-2 rounded-full mb-6 opacity-0"
        >
          {{ pricingData.badge.title }}
        </div>
        <h1 
          v-if="pricingData.main?.title"
          ref="headingRef"
          data-animation="fadeInUp"
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0"
        >
          {{ pricingData.main.title }}
        </h1>
        <p 
          v-if="pricingData.main?.content"
          ref="descriptionRef"
          data-animation="fadeInUp"
          class="text-gray-600 text-lg max-w-2xl mx-auto mb-8 opacity-0"
        >
          {{ pricingData.main.content }}
        </p>
        
        <!-- Toggle Button -->
        <div 
          ref="toggleRef"
          data-animation="fadeIn"
          class="inline-flex items-center bg-black rounded-full p-1 opacity-0"
        >
          <button
            class="px-6 py-2 rounded-full text-sm font-medium transition-all bg-black text-white"
          >
            Monthly
          </button>
          <button
            class="px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 bg-transparent text-white hover:text-gray-300"
          >
            Yearly
            <span class="bg-lime-400 text-black text-xs px-2 py-1 rounded">Save 23%</span>
          </button>
        </div>
      </div>

      <!-- Pricing Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <!-- Card untuk setiap item -->
        <div
          v-for="(item, idx) in pricingData.items"
          :key="idx"
          :ref="el => { if (el) cardsRef[idx] = el }"
          :data-animation="'fadeInUp'"
          :class="[
            'relative rounded-2xl p-8 transition-all duration-300 opacity-0',
            item.popular 
              ? 'bg-lime-50 border-2 border-lime-200 shadow-xl scale-105' 
              : 'bg-gray-50 border border-gray-200 hover:shadow-lg'
          ]"
        >
          <!-- Popular Badge -->
          <div
            v-if="item.popular"
            class="absolute -top-3 right-8 bg-lime-400 text-black text-xs font-bold px-4 py-1 rounded-full"
          >
            POPULAR
          </div>

          <!-- Icon -->
          <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm">
            <!-- Icon dari URL -->
            <img 
              v-if="item.icon && (item.icon.startsWith('http://') || item.icon.startsWith('https://'))"
              :src="item.icon"
              :alt="item.title"
              class="w-8 h-8 object-contain"
              @error="$event.target.style.display='none'"
            />
            <!-- Fallback icons jika bukan URL -->
            <template v-else>
              <!-- Gift Icon - Basic Package -->
              <svg v-if="!item.icon || item.icon === 'gift' || idx === 0" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
              </svg>
              <!-- Rocket Icon - Professional Package -->
              <svg v-else-if="item.icon === 'rocket' || idx === 1" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33 1.33zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83l-1.5 1.5 2.67 2.67L9.67 18.5c.5-.5 1.5-1.5 1.5-1.5zM9 13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm12 8l-4.05-4.05c.47-.47.68-1.15.55-1.81l-1.26-1.26c-.31.13-4.64 1.53-5.89 3.57L7.69 20 13 22l2.35-3.62z"/>
              </svg>
              <!-- Diamond Icon - Enterprise Package -->
              <svg v-else-if="item.icon === 'diamond' || idx === 2" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </template>
          </div>

          <!-- Title & Description -->
          <h3 class="text-2xl font-bold mb-3">{{ item.title }}</h3>
          <p class="text-gray-600 text-sm mb-6">{{ item.description }}</p>

          <!-- Price -->
          <div class="mb-6">
            <div class="flex items-baseline">
              <span class="text-5xl font-bold">${{ item.price }}</span>
              <span class="text-gray-500 ml-2">/per month cost</span>
            </div>
          </div>

          <!-- CTA Button -->
          <a
            :href="item.ctaLink || '#'"
            :class="[
              'block w-full py-3 px-6 rounded-full font-medium transition-all mb-6 cursor-pointer',
              item.popular
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-white text-black border border-gray-300 hover:border-gray-400'
            ]"
          >
            <div class="flex items-center justify-between">
              <span>{{ item.cta }}</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </div>
          </a>

          <!-- No Credit Card -->
          <div class="flex items-center text-sm text-gray-600 mb-8">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            {{ pricingData.credit?.title || 'No credit card required' }}
          </div>

          <!-- Features List -->
          <ul class="space-y-3">
            <li
              v-for="(feature, fIdx) in item.features"
              :key="fIdx"
              class="flex items-start text-sm text-gray-700"
            >
              <svg class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// State untuk data pricing
const pricingData = ref({
  badge: {},
  main: {},
  items: [],
  credit: {}
})

const loading = ref(true)
const error = ref(null)

// Refs untuk scroll animations
const badgeRef = ref(null)
const headingRef = ref(null)
const descriptionRef = ref(null)
const toggleRef = ref(null)
const cardsRef = ref([])

let observer = null

// Fungsi untuk parse data JSON - handle double-encoded JSON
function parse(data) {
  if (!data) return {}
  
  // Jika sudah object, return langsung
  if (typeof data === 'object' && !Array.isArray(data)) {
    return data
  }
  
  // Jika array, parse setiap item
  if (Array.isArray(data)) {
    return data.map(item => {
      if (typeof item === 'string') {
        try {
          return JSON.parse(item)
        } catch {
          return item
        }
      }
      return item
    })
  }
  
  // Jika string, parse (bisa double-encoded)
  if (typeof data === 'string') {
    try {
      const firstParse = JSON.parse(data)
      // Cek apakah hasil parse masih string (double-encoded)
      if (typeof firstParse === 'string') {
        return JSON.parse(firstParse)
      }
      return firstParse
    } catch {
      return data
    }
  }
  
  return data
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
    badgeRef.value,
    headingRef.value,
    descriptionRef.value,
    toggleRef.value,
    ...cardsRef.value
  ]

  elementsToAnimate.forEach(el => {
    if (el) {
      observer.observe(el)
    }
  })
}

// Default data jika backend belum siap
const defaultItems = [
  {
    title: 'Basic Package',
    description: 'Perfect for individuals, freelancers, small teams starting the Starter plan.',
    price: 30,
    cta: 'Start 14 Days Free Trial',
    ctaLink: '#',
    popular: false,
    icon: 'gift',
    features: [
      'Maximum 1 User Services',
      'Basic Dashboard Access',
      'Limited Integrations',
      'Community Support',
      'Simple Collaboration'
    ]
  },
  {
    title: 'Professional Package',
    description: 'Best for growing businesses that need more power and flexibility.',
    price: 49,
    cta: 'Start 10 Days Free Trial',
    ctaLink: '#',
    popular: true,
    icon: 'rocket',
    features: [
      'Maximum 3 User Services',
      'Basic Dashboard Access',
      'Limited Integrations',
      'Community Support',
      'Simple Collaboration'
    ]
  },
  {
    title: 'Enterprise Package',
    description: 'Tailored for large teams and complex needs for SaaS services.',
    price: 98,
    cta: 'Get Started This Package',
    ctaLink: '#',
    popular: false,
    icon: 'diamond',
    features: [
      'Maximum 7 User Services',
      'Basic Dashboard Access',
      'Limited Integrations',
      'Community Support',
      'Simple Collaboration'
    ]
  }
]

// Helper functions untuk data processing
const extractFeatures = (featuresArray) => {
  if (!Array.isArray(featuresArray)) return []
  
  return featuresArray.map(item => {
    // Parse jika masih string
    if (typeof item === 'string') {
      try {
        const parsed = JSON.parse(item)
        return parsed.title || parsed.content || parsed
      } catch {
        return item
      }
    }
    // Jika sudah object, ambil title
    return item.title || item.content || item
  }).filter(Boolean)
}

const extractPrice = (priceData) => {
  if (!priceData) return 0
  
  // Parse jika masih string
  let data = priceData
  if (typeof priceData === 'string') {
    try {
      data = JSON.parse(priceData)
    } catch {
      data = priceData
    }
  }
  
  const priceStr = data.title || data.content || data.toString()
  // Remove $ symbol and any non-numeric characters except digits
  const numericPrice = priceStr.replace(/[^0-9]/g, '')
  return parseInt(numericPrice) || 0
}

const extractButtonData = (buttonItem) => {
  if (!buttonItem) return { title: '', link: '' }
  
  // Parse jika masih string
  let data = buttonItem
  if (typeof buttonItem === 'string') {
    try {
      data = JSON.parse(buttonItem)
    } catch {
      return { title: '', link: '' }
    }
  }
  
  return {
    title: data.title || '',
    link: data.link || '#'
  }
}

const extractItemData = (item) => {
  if (!item) return null
  
  // Parse jika masih string
  let data = item
  if (typeof item === 'string') {
    try {
      data = JSON.parse(item)
    } catch {
      return null
    }
  }
  
  return {
    title: data.title || '',
    content: data.content || '',
    icon: data.icon || ''
  }
}

// Load data dari localStorage
const loadPricingData = () => {
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
    
    console.log('📦 Raw data from localStorage:', data)
    
    // Mapping data sesuai dengan tag yang ada di CMS
    const badgeData = parse(data.pricing_badge4)
    const mainData = parse(data.pricing_main4)
    const creditData = parse(data.pricing_credit4)
    
    console.log('🏷️ Badge data:', badgeData)
    console.log('📝 Main data:', mainData)
    console.log('💳 Credit data:', creditData)
    
    // Set data badge dan main dengan fallback
    pricingData.value.badge = badgeData || {}
    pricingData.value.main = mainData || {}
    pricingData.value.credit = creditData || {}
    
    // Load pricing items dari pricing_item4
    const pricingItems = parse(data.pricing_item4)
    const monthData = parse(data.pricing_month4)
    const buttonData = parse(data.pricing_item_button4)
    
    // Load features dari pricing_part4_1, pricing_part4_2, pricing_part4_3
    const features1 = parse(data.pricing_part4_1)
    const features2 = parse(data.pricing_part4_2)
    const features3 = parse(data.pricing_part4_3)

    console.log('🎯 Pricing Items:', pricingItems)
    console.log('💰 Month Data:', monthData)
    console.log('📘 Button Data:', buttonData)
    console.log('📋 Features 1:', features1)
    console.log('📋 Features 2:', features2)
    console.log('📋 Features 3:', features3)

    // Build items array dari data CMS
    if (Array.isArray(pricingItems) && pricingItems.length >= 3) {
      // Parse setiap item dengan helper function
      const item1 = extractItemData(pricingItems[0])
      const item2 = extractItemData(pricingItems[1])
      const item3 = extractItemData(pricingItems[2])
      
      const price1 = Array.isArray(monthData) && monthData[0] ? extractPrice(monthData[0]) : defaultItems[0].price
      const price2 = Array.isArray(monthData) && monthData[1] ? extractPrice(monthData[1]) : defaultItems[1].price
      const price3 = Array.isArray(monthData) && monthData[2] ? extractPrice(monthData[2]) : defaultItems[2].price
      
      const button1 = extractButtonData(buttonData[0])
      const button2 = extractButtonData(buttonData[1])
      const button3 = extractButtonData(buttonData[2])
      
      const features1List = extractFeatures(features1)
      const features2List = extractFeatures(features2)
      const features3List = extractFeatures(features3)
      
      console.log('📊 Parsed item 1:', item1)
      console.log('📊 Parsed item 2:', item2)
      console.log('📊 Parsed item 3:', item3)
      console.log('💰 Parsed prices:', { price1, price2, price3 })
      console.log('🔘 Parsed buttons:', { button1, button2, button3 })
      console.log('📋 Parsed features:', { features1List, features2List, features3List })
      
      pricingData.value.items = [
        {
          title: item1?.title || defaultItems[0].title,
          description: item1?.content || defaultItems[0].description,
          price: price1,
          cta: button1.title || defaultItems[0].cta,
          ctaLink: button1.link,
          popular: false,
          icon: item1?.icon || 'gift',
          features: features1List.length > 0 ? features1List : defaultItems[0].features
        },
        {
          title: item2?.title || defaultItems[1].title,
          description: item2?.content || defaultItems[1].description,
          price: price2,
          cta: button2.title || defaultItems[1].cta,
          ctaLink: button2.link,
          popular: true,
          icon: item2?.icon || 'rocket',
          features: features2List.length > 0 ? features2List : defaultItems[1].features
        },
        {
          title: item3?.title || defaultItems[2].title,
          description: item3?.content || defaultItems[2].description,
          price: price3,
          cta: button3.title || defaultItems[2].cta,
          ctaLink: button3.link,
          popular: false,
          icon: item3?.icon || 'diamond',
          features: features3List.length > 0 ? features3List : defaultItems[2].features
        }
      ]
      
      console.log('✅ Final pricing items:', pricingData.value.items)
      console.log('🔗 Button links:', {
        button1: button1.link,
        button2: button2.link,
        button3: button3.link
      })
    } else {
      // Fallback ke default data jika struktur tidak sesuai
      console.warn('⚠️ Struktur data pricing tidak sesuai, menggunakan default data')
      pricingData.value.items = defaultItems
    }
    
    console.log('✅ Final pricing data:', pricingData.value)

    // Setup scroll animations setelah data loaded
    setTimeout(() => {
      setupScrollAnimations()
    }, 100)

  } catch (err) {
    error.value = 'Gagal memuat data pricing'
    console.error('❌ Gagal parsing pricing data:', err)
  } finally {
    loading.value = false
  }
}

// Load data saat component mounted
onMounted(() => {
  loadPricingData()
})

// Cleanup observer saat component unmounted
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* Animation Classes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

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

/* Apply animations when triggered */
.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Ensure links are clickable */
a {
  pointer-events: auto;
  text-decoration: none;
  position: relative;
  z-index: 10;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
    line-height: 2.5rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
}
</style>