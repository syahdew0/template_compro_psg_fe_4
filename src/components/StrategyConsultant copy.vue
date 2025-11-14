<template>
  <section class="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-12 lg:py-16">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block w-8 h-8 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
      <p class="mt-4 text-gray-600">Loading pricing data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="inline-block bg-red-50 text-red-600 px-6 py-3 rounded-lg">
        <svg class="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {{ error }}
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div 
          ref="badgeRef"
          data-animation="fadeIn"
          class="inline-block bg-lime-400 text-black text-sm font-medium px-6 py-2 rounded-full mb-6"
        >
          {{ pricingData.badge.text || 'Choose a plan' }}
        </div>
        <h1 
          ref="headingRef"
          data-animation="fadeInUp"
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          {{ pricingData.main.title || 'Flexible Pricing for Every Stage' }}
        </h1>
        <p 
          ref="descriptionRef"
          data-animation="fadeInUp"
          class="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
        >
          {{ pricingData.main.content || "Whether you're just getting started or scaling fast, we've got a pricing plan that fits your needs. Our transparent and flexible packages are designed" }}
        </p>
        
        <!-- Toggle Button -->
        <div 
          ref="toggleRef"
          data-animation="fadeIn"
          class="inline-flex items-center bg-black rounded-full p-1"
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
          v-for="(item, idx) in pricingData.items.slice(0, maxItems)"
          :key="idx"
          :ref="el => { if (el) cardsRef[idx] = el }"
          :data-animation="'fadeInUp'"
          :class="[
            'relative rounded-2xl p-8 transition-all duration-300',
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
            <!-- Check if icon is an image URL -->
            <img 
              v-if="typeof item.icon === 'string' && item.icon.startsWith('http')"
              :src="item.icon"
              :alt="item.title"
              class="w-6 h-6"
            />
            <!-- Gift Icon - Basic Package -->
            <svg v-else-if="item.icon === 'gift' || idx === 0" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
          <button
            :class="[
              'w-full py-3 px-6 rounded-full font-medium flex items-center justify-between transition-all mb-6',
              item.popular
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-white text-black border border-gray-300 hover:border-gray-400'
            ]"
          >
            <span>{{ item.cta }}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>

          <!-- No Credit Card -->
          <div class="flex items-center text-sm text-gray-600 mb-8">
            <!-- Check if credit icon is an image URL -->
            <img 
              v-if="pricingData.credit.icon && typeof pricingData.credit.icon === 'string' && pricingData.credit.icon.startsWith('http')"
              :src="pricingData.credit.icon"
              :alt="pricingData.credit.text || 'No credit card required'"
              class="w-4 h-4 mr-2"
            />
            <svg v-else class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            {{ pricingData.credit.text || 'No credit card required' }}
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
import { API_ENDPOINTS } from '@/config/api'



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
    cta: 'Start 14th Days Free Trial',
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
    title: 'Profe Package',
    description: 'Best for growing businesses that need more power and flexibility.',
    price: 49,
    cta: 'Start 10th Days Free Trial',
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

// Load data dari localStorage
const loadPricingData = () => {
  try {
    loading.value = true
    error.value = null

    const raw = localStorage.getItem('customPageData:Home')
    
    if (!raw) {
      error.value = 'Data halaman Home tidak ditemukan di localStorage'
      console.warn('⚠️ Data halaman Home tidak ditemukan di localStorage')
      // Gunakan default data
      pricingData.value.items = defaultItems
      loading.value = false
      return
    }

    const data = JSON.parse(raw)
    
    // Mapping data sesuai dengan tag yang ada di CMS
    pricingData.value = {
      badge: parse(data.pricing_badge4),          // Badge "Choose a plan"
      main: parse(data.pricing_main4),            // Title + Description
      credit: parse(data.pricing_credit4),        // "No credit card required"
      items: []
    }

    // Load pricing items dari pricing_item4
    const pricingItem = parse(data.pricing_item4)
    const monthData = parse(data.pricing_month4)
    const buttonData = parse(data.pricing_item_button4)
    
    // Load features dari pricing_part4_1, pricing_part4_2, pricing_part4_3
    const features1 = parse(data.pricing_part4_1)
    const features2 = parse(data.pricing_part4_2)
    const features3 = parse(data.pricing_part4_3)

    // Build items array
    if (pricingItem.title) {
      pricingData.value.items = [
        {
          title: pricingItem.title || defaultItems[0].title,
          description: pricingItem.description || defaultItems[0].description,
          price: monthData.price || defaultItems[0].price,
          cta: buttonData.text || defaultItems[0].cta,
          popular: pricingItem.popular || false,
          icon: getImage(pricingItem.icon) || 'gift',
          features: Array.isArray(features1) ? features1 : defaultItems[0].features
        },
        {
          title: pricingItem.title || defaultItems[1].title,
          description: pricingItem.description || defaultItems[1].description,
          price: monthData.price || defaultItems[1].price,
          cta: buttonData.text || defaultItems[1].cta,
          popular: true,
          icon: getImage(pricingItem.icon) || 'rocket',
          features: Array.isArray(features2) ? features2 : defaultItems[1].features
        },
        {
          title: pricingItem.title || defaultItems[2].title,
          description: pricingItem.description || defaultItems[2].description,
          price: monthData.price || defaultItems[2].price,
          cta: buttonData.text || defaultItems[2].cta,
          popular: false,
          icon: getImage(pricingItem.icon) || 'diamond',
          features: Array.isArray(features3) ? features3 : defaultItems[2].features
        }
      ]
    } else {
      // Fallback ke default data
      pricingData.value.items = defaultItems
    }
    
    console.log('✅ Pricing data loaded:', pricingData.value)

    // Setup scroll animations setelah data loaded
    setTimeout(() => {
      setupScrollAnimations()
    }, 100)

  } catch (err) {
    error.value = 'Gagal memuat data pricing'
    console.error('❌ Gagal parsing pricing data:', err)
    // Fallback ke default data
    pricingData.value.items = defaultItems
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

/* Initial state before animation */
[data-animation] {
  opacity: 0;
}

[data-animation="fadeInUp"] {
  transform: translateY(30px);
}

/* Loading state */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>