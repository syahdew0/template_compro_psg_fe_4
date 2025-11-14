<template>
  <section class="relative mt-16 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">

    <!-- Animated Loading Circles (Top Right) -->
    <div class="absolute top-10 right-5 md:top-20 md:right-20 pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 md:w-28 md:h-28" viewBox="-5 0 920 920"> 
        <g class="rotating-reserve">
          <circle cx="57" cy="57" r="50" fill="none" stroke="#0E0E0E" stroke-opacity="0.1" stroke-width="0.5"></circle>
          <circle cx="57" cy="0" r="2.5" fill="black"></circle>
          <circle cx="86.6" cy="17.4" r="2.5" fill="black"></circle>
          <circle cx="106.6" cy="57" r="2.5" fill="black"></circle>
          <circle cx="86.6" cy="96.6" r="2.5" fill="black"></circle>
          <circle cx="57" cy="114" r="2.5" fill="black"></circle>
          <circle cx="27.4" cy="96.6" r="2.5" fill="black"></circle>
          <circle cx="7.4" cy="57" r="2.5" fill="black"></circle>
          <circle cx="27.4" cy="17.4" r="2.5" fill="black"></circle>
          <circle cx="57" cy="57" r="40.75" fill="none" stroke="#0E0E0E" stroke-opacity="0.1" stroke-width="0.5"></circle>
          <circle cx="99.03" cy="69.28" r="2.5" fill="black"></circle>
          <circle cx="69.28" cy="99.03" r="2.5" fill="black"></circle>
          <circle cx="44.72" cy="14.97" r="2.5" fill="black"></circle>
          <circle cx="14.97" cy="44.72" r="2.5" fill="black"></circle>
        </g>
      </svg>
    </div>

    <!-- Animated Loading Circles (Bottom Left) -->
    <div class="absolute bottom-20 left-5 md:bottom-32 md:left-20 pointer-events-none">
      <svg class="w-16 h-16 md:w-24 md:h-24" viewBox="-5 0 100 100" transform="rotate(180)">
        <circle cx="47" cy="47" r="42" fill="none" stroke="#0E0E0E" stroke-opacity="0.08" stroke-width="0.5"></circle>
        <circle cx="47" cy="5" r="2" fill="black" opacity="0.6"></circle>
        <circle cx="71.6" cy="17.4" r="2" fill="black" opacity="0.6"></circle>
        <circle cx="86.6" cy="47" r="2" fill="black" opacity="0.6"></circle>
        <circle cx="71.6" cy="76.6" r="2" fill="black" opacity="0.6"></circle>
        <circle cx="47" cy="89" r="2" fill="black" opacity="0.6"></circle>
        <circle cx="22.4" cy="76.6" r="2" fill="black" opacity="0.6"></circle>
        <circle cx="7.4" cy="47" r="2" fill="black" opacity="0.6"></circle>
        <circle cx="22.4" cy="17.4" r="2" fill="black" opacity="0.6"></circle>
      </svg>
    </div>

    <div class="text-center py-8 sm:py-12 md:py-16 mt-8 sm:mt-12 md:mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <!-- Badge with Animation - DYNAMIC FROM home_badge4 -->
      <div v-if="badge.title" class="inline-flex items-center justify-center mb-4 sm:mb-6 animate-fade-in-down">
        <span class="px-3 py-1.5 sm:px-4 sm:py-2 bg-lime-100 text-gray-800 text-sm sm:text-base md:text-lg font-medium rounded-full">
          {{ badge.title }}
        </span>
      </div>

      <!-- Main Title with Stagger Animation - DYNAMIC FROM home_page4 -->
      <h2 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl max-w-5xl mx-auto font-bold text-gray-900 leading-tight px-2">
        <span 
          v-for="(word, index) in titleWords" 
          :key="index"
          class="inline-block animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          {{ word }}&nbsp;
        </span>
      </h2>

      <!-- Subtitle with Fade In - DYNAMIC FROM home_page4 -->
      <p class="mt-4 sm:mt-6 text-base sm:lg md:text-lg text-gray-500 max-w-3xl mx-auto animate-fade-in px-2" 
         style="animation-delay: 0.5s"
         v-html="homePage.content">
      </p>

      <!-- Email Input & CTA Button - Responsive Design -->
      <div class="mt-8 sm:mt-10 max-w-4xl mx-auto animate-fade-in-up px-2"
           style="animation-delay: 0.7s">
        
        <!-- Desktop View (md and up) -->
        <div class="hidden md:block relative">
          <div class="flex items-center bg-white rounded-full border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-sm">
            <input 
              v-model="email"
              type="email" 
              placeholder="Your email address"
              @blur="validateEmail"
              @input="emailTouched && validateEmail()"
              class="flex-1 px-8 py-5 rounded-full bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400"
              :class="emailError ? 'text-red-500' : ''"
            />
            
            <!-- CTA Button Desktop -->
            <component
              :is="requestDemo.link && isExternal(requestDemo.link) ? 'a' : 'router-link'"
              :href="requestDemo.link && isExternal(requestDemo.link) ? requestDemo.link : null"
              :to="requestDemo.link && !isExternal(requestDemo.link) ? requestDemo.link : null"
              @click="!requestDemo.link && handleDemoClick($event)"
              class="group relative px-8 py-4 m-1 
              bg-[#C1FF5F] 
              hover:bg-black 
              text-gray-900 hover:text-white 
              font-semibold rounded-full 
              transition-all duration-500 
              whitespace-nowrap flex items-center gap-2 cursor-pointer"
              :target="requestDemo.link && isExternal(requestDemo.link) ? '_blank' : null"
              rel="noopener noreferrer"
            >
              <span class="relative z-10 text-base">
                {{ requestDemo.title || 'Request a Demo' }}
              </span>
              <div class="relative z-10 w-10 h-10 bg-black group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-500">
                <svg class="w-5 h-5 text-white group-hover:text-black transform group-hover:translate-x-0.5 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </component>
          </div>

          <!-- Error Message Desktop -->
          <div 
            v-if="emailError" 
            class="absolute left-0 top-full mt-2 flex items-start gap-2 bg-white border-2 border-red-400 rounded-xl px-4 py-3 shadow-lg animate-fade-in z-20"
          >
            <div class="flex-shrink-0 w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
              <span class="text-white font-bold text-sm">!</span>
            </div>
            <p class="text-sm text-gray-800">
              {{ emailError }}
            </p>
          </div>
        </div>

        <!-- Mobile & Tablet View (below md) -->
        <div class="md:hidden relative">
          <div class="flex flex-col gap-3">
            <!-- Input Mobile -->
            <div class="w-full bg-white rounded-full border-2 border-gray-100 px-5 py-3.5 sm:px-6 sm:py-4 shadow-sm">
              <input 
                v-model="email"
                type="email" 
                placeholder="Your email address"
                @blur="validateEmail"
                @input="emailTouched && validateEmail()"
                class="w-full bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                :class="emailError ? 'text-red-500' : ''"
              />
            </div>

            <!-- CTA Button Mobile -->
            <component
              :is="requestDemo.link && isExternal(requestDemo.link) ? 'a' : 'router-link'"
              :href="requestDemo.link && isExternal(requestDemo.link) ? requestDemo.link : null"
              :to="requestDemo.link && !isExternal(requestDemo.link) ? requestDemo.link : null"
              @click="!requestDemo.link && handleDemoClick($event)"
              class="group relative w-full
              bg-[#C1FF5F] 
              hover:bg-black 
              text-gray-900 hover:text-white 
              font-semibold rounded-full 
              transition-all duration-500 
              flex items-center justify-center gap-2 cursor-pointer
              px-3 py-3.5 sm:px-3 sm:py-4 shadow-sm"
              :target="requestDemo.link && isExternal(requestDemo.link) ? '_blank' : null"
              rel="noopener noreferrer"
            >
              <span class="relative z-10 text-sm sm:text-base">
                {{ requestDemo.title || 'Request a Demos' }}
              </span>
              <div class="relative z-10 w-8 h-8 sm:w-9 sm:h-9 bg-black group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-500">
                <svg class="w-4 h-4 text-white group-hover:text-black transform group-hover:translate-x-0.5 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
            </component>
          </div>

          <!-- Error Message Mobile -->
          <div 
            v-if="emailError" 
            class="mt-2 flex items-start gap-2 bg-white border-2 border-red-400 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg animate-fade-in"
          >
            <div class="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded flex items-center justify-center">
              <span class="text-white font-bold text-xs sm:text-sm">!</span>
            </div>
            <p class="text-xs sm:text-sm text-gray-800">
              {{ emailError }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Images Section - DYNAMIC FROM home_page4 image -->
    <div v-if="homePage.image" class="relative flex justify-center items-end overflow-hidden mt-8 sm:mt-12 px-4 animate-fade-in-up" style="animation-delay: 1s">
      <div class="relative max-w-6xl w-full">
        <img
          :src="getImage(homePage.image)"
          class="w-full h-auto rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl hover:shadow-3xl transition-shadow duration-500 animate-float"
          :alt="homePage.title || 'Company preview'"
        />
        <!-- Glow Effect -->
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-r from-blue-400 via-green-300 to-blue-400 rounded-full blur-3xl opacity-20 sm:opacity-30 animate-pulse-slow"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { API_ENDPOINTS } from '@/config/api'

/* global defineProps*/
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({})
  }
})

// Separate dynamic data
const badge = ref({
  title: '',
  content: '',
  icon: '',
  link: ''
})

const homePage = ref({
  title: '',
  content: '',
  image: '',
  icon: '',
  link: ''
})

const requestDemo = ref({
  title: '',
  content: '',
  icon: '',
  link: ''
})


const email = ref('')
const emailError = ref('')
const emailTouched = ref(false)

const titleWords = computed(() => {
  return homePage.value.title ? homePage.value.title.split(' ') : []
})

function validateEmail() {
  emailTouched.value = true
  
  if (!email.value) {
    emailError.value = ''
    return false
  }
  
  if (!email.value.includes('@')) {
    emailError.value = `Please include an '@' in the email address. '${email.value}' is missing an '@'.`
    return false
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address.'
    return false
  }
  
  emailError.value = ''
  return true
}

function parse(data) {
  if (!data) return {}
  return typeof data === 'string' ? JSON.parse(data) : data
}

function getImage(src) {
  if (!src) return '/no-image.jpg'
  return src.startsWith('http') ? src : `${API_ENDPOINTS.baseURL}${src}`
}

function getItemByTag(tag, allData) {
  const section = allData[tag]
  if (!section) return null
  const parseItem = (item) => {
    const parsed = parse(item)
    if (parsed.items) {
      return parse(parsed.items)
    }
    return parsed
  }
  return Array.isArray(section) ? section.map(parseItem) : [parseItem(section)]
}

function isExternal(link) {
  return /^https?:\/\//.test(link)
}

function handleDemoClick(event) {
  if (!requestDemo.value.link) {
    event.preventDefault()
    console.warn('⚠️ No link configured for Request Demo button')
  }
}

watchEffect(() => {
  const allData = props.pageData || {}
  
  console.log('🔍 Debug PageData:', allData)
  
  // Get home_badge4 data
  const badgeItems = getItemByTag('home_badge4', allData) || []
  const badgeData = badgeItems[0] || {}
  console.log('📛 Badge Data:', badgeData)
  
  // Get home_page4 data
  const homePageItems = getItemByTag('home_page4', allData) || []
  const homePageData = homePageItems[0] || {}
  console.log('📄 HomePage Data:', homePageData)
  
  // Get request_demo4 data
  const requestDemoItems = getItemByTag('request_demo4', allData) || []
  const requestDemoData = requestDemoItems[0] || {}
  console.log('🎯 RequestDemo Data:', requestDemoData)
  

  // Assign to refs
  badge.value = {
    title: badgeData.title || badgeData.Title || '',
    content: badgeData.content || badgeData.Content || '',
    icon: badgeData.icon || badgeData.Icon || '',
    link: badgeData.link || badgeData.Link || ''
  }

  homePage.value = {
    title: homePageData.title || homePageData.Title || '',
    content: homePageData.content || homePageData.Content || '',
    image: homePageData.image || homePageData.Image || '',
    icon: homePageData.icon || homePageData.Icon || '',
    link: homePageData.link || homePageData.Link || ''
  }

  requestDemo.value = {
    title: requestDemoData.title || requestDemoData.Title || 'Request a Demo',
    content: requestDemoData.content || requestDemoData.Content || '',
    icon: requestDemoData.icon || requestDemoData.Icon || '',
    link: requestDemoData.link || requestDemoData.Link || '/'
  }
  
  console.log('✅ Final RequestDemo:', requestDemo.value)
})
</script>

<style scoped>
/* Rotating Loading Circles - Dots Animation */
.rotating-reserve {
  transform-origin: center;
  animation: rotating-animation 25s linear infinite;
}

.rotating-reverse {
  transform-origin: center;
  animation: rotating-animation 30s linear infinite reverse;
}

@keyframes rotating-animation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Pause animation on hover (optional) */
svg:hover .rotating-reserve,
svg:hover .rotating-reverse {
  animation-play-state: paused;
}

/* Fade In Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes floatImage {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

.animate-float {
  animation: floatImage 6s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

/* Input Focus Effect */
input:focus {
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>