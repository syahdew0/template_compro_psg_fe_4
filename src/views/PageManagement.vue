<template>
  <div class="w-full overflow-hidden">
    <template v-if="isReady">
      <!-- Fade In dari atas -->
      <section 
        ref="section1"
        class="mb-16 animate-on-scroll" 
        data-animation="fade-in-down"
        id="home"
      >
        <KeunggulanPage :pageData="PageManagementData" />
      </section>

      <section v-if="true" id="OurClients">
          <OurClients :pageData="PageManagementData" />
      </section>

      <section 
        ref="section2"
        id="AboutPSG" 
        class="mb-16 animate-on-scroll" 
        data-animation="fade-in-up"
      >
        <AboutPSG :pageData="PageManagementData" />
      </section>

      <!-- Slide dari kiri -->
      <section 
        ref="section3"
        id="PilarPSG" 
        class="mb-10 animate-on-scroll" 
        data-animation="slide-in-left"
      >
        <PilarPSG :pageData="PageManagementData" />
      </section>

      <section 
        ref="section4"
        id="IntegrationPage" 
        class="mb-10 animate-on-scroll" 
        data-animation="slide-in-left"
      >
        <IntegrationPage :pageData="PageManagementData" />
      </section>

      <section 
        ref="section5"
        id="StepsPage" 
        class="mb-10 animate-on-scroll" 
        data-animation="slide-in-left"
      >
        <StepsPage :pageData="PageManagementData" />
      </section>
      
      <section 
        ref="section6"
        id="SimplifyAnalytics" 
        class="mb-10 animate-on-scroll" 
        data-animation="slide-in-left"
      >
        <SimplifyAnalytics :pageData="PageManagementData" />
      </section>
      <!-- Zoom In -->
      <section 
        ref="section7"    
        id="strategyConsultant" 
        class="mb-16 animate-on-scroll" 
        data-animation="zoom-in"
      >
        <StrategyConsultant :pageData="PageManagementData"/>
      </section>

      <section 
        ref="section8"    
        id="testimonials" 
        class="mb-16 animate-on-scroll" 
        data-animation="zoom-in"
      >
        <TestimonialsPage :pageData="PageManagementData"  />
      </section>

      

      <!-- Slide dari kanan -->
      <section 
        ref="section9"
        id="realLife" 
        class="mb-16  animate-on-scroll" 
        data-animation="slide-in-right"
      >
        <RealLife :pageData="PageManagementData" />
      </section>

       <section 
        ref="section10"    
        id="launchPage" 
        class="mb-16 animate-on-scroll" 
        data-animation="zoom-in"
      >
        <LaunchPage :pageData="PageManagementData"/>
      </section>
      
     

    </template>

    <template v-else>
      <div class="py-20 text-center text-gray-500">Loading...</div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import axios from 'axios'
import { API_ENDPOINTS } from '@/config/api'

// Import komponen halaman
import KeunggulanPage from '@/components/SliderHome.vue'
import AboutPSG from '@/components/AboutPSG.vue'
import PilarPSG from '@/components/PilarPSG.vue'
import StrategyConsultant from '@/components/StrategyConsultant.vue'
import RealLife from '@/components/RealLife.vue'
import OurClients from '@/components/OurClients.vue'
import IntegrationPage from '@/components/IntegrationPage.vue'
import SimplifyAnalytics from '@/components/SimplifyAnalytics.vue'
import StepsPage from '@/components/StepsPage.vue'
import TestimonialsPage from '@/components/TestimonialsPage.vue'
import LaunchPage from '@/components/LaunchPage.vue'


// State utama
const PageManagementData = ref({})
const isReady = ref(false)

// Refs untuk sections
const section1 = ref(null)
const section2 = ref(null)
const section3 = ref(null)
const section4 = ref(null)
const section5 = ref(null)
const section6 = ref(null)
const section7 = ref(null)
const section8 = ref(null)
const section9 = ref(null)
const section10 = ref(null)

// Intersection Observer
let observer = null

const setupIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: '100px',
    threshold: 0.05
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animation = entry.target.getAttribute('data-animation')
        const sectionId = entry.target.id || 'unknown'
        
        console.log(`🎬 Animating section: ${sectionId} with ${animation}`)
        
        if (animation) {
          // Pastikan element visible dulu
          entry.target.style.opacity = '0'
          
          // Trigger reflow
          void entry.target.offsetWidth
          
          // Add animation class
          entry.target.classList.add(`animate-${animation}`)

          // Cleanup after animation complete
          setTimeout(() => {
            entry.target.style.opacity = '1'
            observer.unobserve(entry.target)
          }, 1100) // Lebih lama dari durasi animasi terpanjang
        }
      }
    })
  }, options)

  // Observe semua sections
  const sections = [
    section1.value,
    section2.value,
    section3.value,
    section4.value,
    section5.value,
    section6.value,
    section7.value,
    section8.value,
    section9.value,
    section10.value,
    section10.value,
  ]

  sections.forEach(section => {
    if (section) {
      observer.observe(section)
    }
  })
}

onMounted(async () => {
  // Ambil dari localStorage dulu
  const localData = localStorage.getItem('customPageData:Home')
  if (localData) {
    PageManagementData.value = JSON.parse(localData)
  }

  try {
    // Coba fetch terbaru dari API
    const res = await axios.get(`${API_ENDPOINTS.customPages}?isFrontend=true&page=Home`)
    const dataByTag = res.data?.data || {}
    PageManagementData.value = dataByTag
    localStorage.setItem('customPageData:Home', JSON.stringify(dataByTag))
  } catch (err) {
    console.error('Gagal fetch data halaman:', err.response?.data || err.message)
  } finally {
    isReady.value = true

    // Setup Intersection Observer setelah DOM ready
    nextTick(() => {
      setupIntersectionObserver()

      // Scroll ke target jika ada
      const target = localStorage.getItem('scrollTarget')
      if (target) {
        const el = document.getElementById(target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          localStorage.removeItem('scrollTarget')
        } else {
          // Retry sekali lagi jika belum muncul
          setTimeout(() => {
            const retryEl = document.getElementById(target)
            if (retryEl) {
              retryEl.scrollIntoView({ behavior: 'smooth' })
              localStorage.removeItem('scrollTarget')
            }
          }, 300)
        }
      }
    })
  }

  console.log(' DATA PageManagementData:', PageManagementData.value)
})

onUnmounted(() => {
  // Cleanup observer
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* Default state - hidden */
.animate-on-scroll {
  opacity: 0;
  will-change: transform, opacity;
  min-height: 10px; /* Prevent collapse */
}

/* Fade In Down */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
}

/* Slide In Left */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out forwards;
}

/* Zoom In */
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-zoom-in {
  animation: zoomIn 0.8s ease-out forwards;
}

/* Slide In Right */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

/* Fade In Up */
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Rotate In */
@keyframes rotateIn {
  from {
    opacity: 0;
    transform: rotate(-10deg) scale(0.9);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
}

.animate-rotate-in {
  animation: rotateIn 0.8s ease-out forwards;
}

/* Bounce In */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) translateY(-5px);
  }
  70% {
    transform: scale(0.95) translateY(0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-bounce-in {
  animation: bounceIn 1s ease-out forwards;
  opacity: 1 !important; /* Force visibility after animation */
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
  opacity: 1 !important; /* Force visibility after animation */
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn 0.8s ease-out forwards;
}
</style>