<template>
  <section class="relative bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- LEFT: Title + contact info -->
        <div>
          <!-- Badge pill - dari contact_main4 -->
          <div 
            ref="badge"
            class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-lime-200/60 text-gray-900 font-medium mb-6 scroll-animate"
            data-animation="fade-slide-right"
          >
            <span class="inline-block w-2 h-2 rounded-full bg-lime-500"></span>
            {{ contactBlocks.main?.title || 'Doing Something Great?' }}
          </div>

          <!-- Big heading - dari contact_main4 -->
          <h2 
            ref="heading"
            class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-normal text-gray-900 leading-[1.05] scroll-animate"
            data-animation="fade-slide-up"
          >
            {{ contactBlocks.main?.content || "Let's Make Something Awesome Together" }}
          </h2>

          <!-- Divider -->
          <div 
            ref="divider"
            class="mt-10 h-px w-full bg-gray-200 scroll-animate"
            data-animation="scale-x"
          ></div>

          <!-- Info blocks - dari contact_about4 -->
          <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <!-- Need Helps -->
            <div 
              v-if="contactBlocks.needHelps"
              ref="needHelps"
              class="space-y-4 scroll-animate"
              data-animation="fade-rotate-left"
            >
              <div class="flex items-center gap-3">
                <!-- headset icon -->
                <span class="inline-flex w-12 h-12 rounded-full  items-center justify-center">
                  <img v-if="contactBlocks.needHelps.icon" :src="getImage(contactBlocks.needHelps.icon)" :alt="contactBlocks.needHelps.title" class="w-8 h-8" />
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M4 12a8 8 0 1 1 16 0v4a2 2 0 0 1-2 2h-2m-8 0H6a2 2 0 0 1-2-2v-4m4 6v-3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
                  </svg>
                </span>
                <p class="text-gray-500 font-semibold">{{ contactBlocks.needHelps.title }}</p>
              </div>

              <div class="text-gray-900 font-semibold tracking-normal text-lg whitespace-pre-line" v-html="contactBlocks.needHelps.content"></div>
            </div>

            <!-- Main Address -->
            <div 
              v-if="contactBlocks.mainAddress"
              ref="mainAddress"
              class="space-y-4 scroll-animate"
              data-animation="fade-rotate-right"
            >
              <div class="flex items-center gap-3">
                <!-- map-pin icon -->
                <span class="inline-flex w-12 h-12 rounded-full items-center justify-center">
                  <img v-if="contactBlocks.mainAddress.icon" :src="getImage(contactBlocks.mainAddress.icon)" :alt="contactBlocks.mainAddress.title" class="w-8 h-8" />
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <p class="text-gray-500 font-semibold">{{ contactBlocks.mainAddress.title }}</p>
              </div>

              <div class="text-gray-900 font-semibold tracking-normal text-lg whitespace-pre-line" v-html="contactBlocks.mainAddress.content"></div>
            </div>
          </div>
        </div>

        <!-- RIGHT: Form card -->
        <div
          ref="formCard"
          class="scroll-animate"
          data-animation="fade-scale-in"
        >
          <div class="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <!-- Heading dari contact_info4 -->
            <h3 
              ref="formHeading"
              class="text-xl font-semibold text-gray-900 mb-6 scroll-animate"
              data-animation="fade-slide-down"
            >
              {{ contactBlocks.formInfo?.title || 'Need Any Helps? Say Hello' }}
            </h3>

            <div class="space-y-6">
              <!-- name + phone -->
              <div 
                ref="namePhone"
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 scroll-animate"
                data-animation="fade-slide-left"
              >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Your Name"
                  class="h-12 w-full rounded-xl border border-gray-200 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                  required
                />
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="Phone number"
                  class="h-12 w-full rounded-xl border border-gray-200 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
                />
              </div>

              <!-- email -->
              <input
                ref="email"
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
                class="h-12 w-full rounded-xl border border-gray-200 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent scroll-animate"
                data-animation="fade-slide-right"
                required
              />

              <!-- message -->
              <textarea
                ref="message"
                v-model="form.message"
                rows="6"
                placeholder="Write message"
                class="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent resize-none scroll-animate"
                data-animation="fade-zoom-in"
                required
              ></textarea>

              <!-- submit button - dari send_message4 -->
              <div>
                <button
                  ref="submitBtn"
                  @click="handleSubmit"
                  type="button"
                  :disabled="isSubmitting"
                  class="inline-flex items-center gap-3 h-12 px-5 rounded-full bg-lime-300 hover:bg-lime-400 transition-colors text-gray-900 font-semibold scroll-animate disabled:opacity-60 disabled:cursor-not-allowed"
                  data-animation="bounce-in"
                >
                  <span>{{ contactBlocks.sendButton?.title || 'Send Message Us' }}</span>
                  
                  <!-- Loading spinner -->
                  <span v-if="isSubmitting" class="inline-flex w-8 h-8 rounded-full bg-black items-center justify-center">
                    <svg class="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  
                  <!-- Arrow icon (default) -->
                  <span v-else class="inline-flex w-8 h-8 rounded-full bg-black text-white items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 12h14m0 0-6-6m6 6-6 6"/>
                    </svg>
                  </span>
                </button>
                
                <!-- Validation errors -->
                <div v-if="validationErrors.length > 0" class="mt-4 p-4 rounded-xl bg-red-50 border border-red-200">
                  <p class="text-sm text-red-600 font-medium mb-2">Please check and try again:</p>
                  <ul class="text-sm text-red-600 space-y-1">
                    <li v-for="(error, index) in validationErrors" :key="index" class="flex items-start gap-2">
                      <span class="mt-0.5">•</span>
                      <span>{{ error }}</span>
                    </li>
                  </ul>
                </div>
                
                <!-- Success message -->
                <div v-if="showSuccess" class="mt-4 p-4 rounded-xl bg-lime-50 border border-lime-200">
                  <p class="text-sm text-lime-700 font-medium flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /RIGHT -->
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

// State untuk data dari localStorage
const contactBlocks = ref({
  main: {},
  sendButton: {},
  formInfo: {},
  needHelps: {},
  mainAddress: {}
})

// Form state
const form = ref({
  name: '',
  phone: '',
  email: '',
  message: ''
})

// Loading dan validation state
const isSubmitting = ref(false)
const validationErrors = ref([])
const showSuccess = ref(false)

// Refs untuk elemen yang akan di-animate
const badge = ref(null)
const heading = ref(null)
const divider = ref(null)
const needHelps = ref(null)
const mainAddress = ref(null)
const formCard = ref(null)
const formHeading = ref(null)
const namePhone = ref(null)
const email = ref(null)
const message = ref(null)
const submitBtn = ref(null)

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

// Fungsi handle submit
async function handleSubmit() {
  // Reset errors dan success message
  validationErrors.value = []
  showSuccess.value = false
  
  // Validasi
  if (!form.value.name) {
    validationErrors.value.push('Name is required')
  }
  if (!form.value.email) {
    validationErrors.value.push('Email is required')
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    validationErrors.value.push('Email format is invalid')
  }
  if (!form.value.message) {
    validationErrors.value.push('Message is required')
  }
  
  // Jika ada error, hentikan submit
  if (validationErrors.value.length > 0) {
    return
  }
  
  // Mulai loading
  isSubmitting.value = true
  
  try {
    // Simulasi API call - ganti dengan API Anda
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submit:', { ...form.value })
    
    // Reset form
    form.value = { name: '', phone: '', email: '', message: '' }
    
    // Tampilkan success message
    showSuccess.value = true
    
    // Hide success message setelah 3 detik
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Submit error:', error)
    validationErrors.value.push('Failed to send message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

// Setup Intersection Observer untuk scroll-triggered animations
const setupScrollAnimations = () => {
  const options = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger saat elemen 100px dari bawah viewport
    threshold: 0.1
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const animation = entry.target.getAttribute('data-animation')
        
        if (animation) {
          // Add animation class dengan delay berdasarkan urutan
          setTimeout(() => {
            entry.target.classList.add(`animate-${animation}`)
          }, index * 50) // Stagger effect 50ms per elemen
          
          // Unobserve setelah animasi berjalan
          observer.unobserve(entry.target)
        }
      }
    })
  }, options)

  // Observe semua elemen dengan class scroll-animate
  const elementsToAnimate = [
    badge.value,
    heading.value,
    divider.value,
    needHelps.value,
    mainAddress.value,
    formCard.value,
    formHeading.value,
    namePhone.value,
    email.value,
    message.value,
    submitBtn.value
  ]

  elementsToAnimate.forEach(el => {
    if (el) {
      observer.observe(el)
    }
  })
}

// Load data dari localStorage saat component mounted
onMounted(() => {
  const raw = localStorage.getItem('customPageData:Home')
  if (!raw) {
    console.warn('⚠️ Data halaman Home tidak ditemukan di localStorage')
    return
  }

  try {
    const data = JSON.parse(raw)
    
    // Parse contact_about4 - PERHATIKAN: parse setiap item dalam array
    let aboutArray = parse(data.contact_about4)
    
    // Jika aboutArray adalah array of strings, parse setiap item
    if (Array.isArray(aboutArray)) {
      aboutArray = aboutArray.map(item => {
        // Jika item masih string, parse lagi
        return typeof item === 'string' ? JSON.parse(item) : item
      })
    }
    
    console.log('📦 Parsed aboutArray:', aboutArray)
    
    // Mapping data sesuai dengan tag yang ada di CMS
    contactBlocks.value = {
      main: parse(data.contact_main4),
      sendButton: parse(data.send_message4),
      formInfo: parse(data.contact_info4),
      needHelps: Array.isArray(aboutArray) 
        ? aboutArray.find(item => item.title === 'Need Helps')
        : {},
      mainAddress: Array.isArray(aboutArray) 
        ? aboutArray.find(item => item.title === 'Main Address')
        : {}
    }
    
    console.log('✅ Contact blocks loaded:', contactBlocks.value)
  } catch (err) {
    console.error('❌ Gagal parsing contact blocks:', err)
  }

  // Setup scroll animations
  setTimeout(() => {
    setupScrollAnimations()
  }, 100)
})

// Cleanup observer saat component unmounted
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* Default state - hidden dan siap untuk animasi */
.scroll-animate {
  opacity: 0;
  will-change: transform, opacity;
}

/* 1. Fade Slide Right - untuk badge */
@keyframes fadeSlideRight {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-slide-right {
  animation: fadeSlideRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 2. Fade Slide Up - untuk heading */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-slide-up {
  animation: fadeSlideUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 3. Scale X - untuk divider */
@keyframes scaleX {
  from {
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left;
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

.animate-scale-x {
  animation: scaleX 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 4. Fade Rotate Left - untuk Need Helps */
@keyframes fadeRotateLeft {
  from {
    opacity: 0;
    transform: translateX(-40px) rotate(-8deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0);
  }
}

.animate-fade-rotate-left {
  animation: fadeRotateLeft 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 5. Fade Rotate Right - untuk Main Address */
@keyframes fadeRotateRight {
  from {
    opacity: 0;
    transform: translateX(40px) rotate(8deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0);
  }
}

.animate-fade-rotate-right {
  animation: fadeRotateRight 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 6. Fade Scale In - untuk form card */
@keyframes fadeScaleIn {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-fade-scale-in {
  animation: fadeScaleIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 7. Fade Slide Down - untuk form heading */
@keyframes fadeSlideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-slide-down {
  animation: fadeSlideDown 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 8. Fade Slide Left - untuk name & phone */
@keyframes fadeSlideLeft {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-slide-left {
  animation: fadeSlideLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 9. Fade Zoom In - untuk textarea message */
@keyframes fadeZoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-zoom-in {
  animation: fadeZoomIn 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 10. Bounce In - untuk submit button */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(30px);
  }
  50% {
    opacity: 1;
    transform: scale(1.08) translateY(-8px);
  }
  65% {
    transform: scale(0.95) translateY(4px);
  }
  80% {
    transform: scale(1.02) translateY(-2px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-bounce-in {
  animation: bounceIn 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>