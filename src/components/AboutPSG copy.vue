<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <!-- Drag Hint -->
      <div class="text-center mb-6">
        <p class="text-sm text-gray-500 flex items-center justify-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
          </svg>
          Drag to explore features
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </p>
      </div>

      <!-- Features Grid with Drag -->
      <div 
        ref="scrollContainer"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide pb-4"
        :class="{ 'cursor-grabbing': isDragging }"
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        @touchstart="startDrag"
        @touchmove="drag"
        @touchend="stopDrag"
        style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;"
      >
        
        <!-- Feature Card 1 - Left Top -->
        <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div class="flex gap-4 mb-8">
            <div class="w-12 h-12 flex items-center justify-center">
              <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <path d="M20 5L25 15L35 20L25 25L20 35L15 25L5 20L15 15L20 5Z" fill="#4ADE80"/>
              </svg>
            </div>
            <div class="w-12 h-12 flex items-center justify-center">
              <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="15" fill="#86EFAC"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2" v-html="feature1?.title || 'AI-Powered Automation'"></h3>
          <p class="text-gray-600 leading-relaxed" v-html="feature1?.content || 'boost productivity with AI'"></p>
        </div>

        <!-- Feature Card 2 - Center (Analytics Dashboard) -->
        <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col relative overflow-hidden">
          <!-- Decorative dots -->
          <div class="absolute top-4 right-4 w-32 h-32 opacity-20">
            <div class="grid grid-cols-8 gap-1">
              <div v-for="i in 64" :key="i" class="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          
          <!-- Analytics Card -->
          <div class="bg-white rounded-2xl p-6 mb-6 shadow-lg relative z-10">
            <div class="flex justify-between items-start mb-6">
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <h4 class="text-3xl font-bold text-gray-900" v-html="analyticsData?.time || '2h 20m'"></h4>
                  <span class="text-gray-400">↓</span>
                </div>
                <p class="text-sm text-gray-500" v-html="analyticsData?.subtitle || 'Average time you spent per day'"></p>
              </div>
            </div>
            
            <!-- Bar Chart -->
            <div class="flex items-end justify-between h-32 gap-2">
              <div v-for="(bar, idx) in chartBars" :key="idx" class="flex-1 flex flex-col items-center gap-2">
                <div class="w-full rounded-t-lg transition-all duration-500" 
                     :class="bar.color"
                     :style="{ height: bar.height + '%' }">
                </div>
                <span class="text-xs text-gray-500">{{ bar.label }}</span>
              </div>
            </div>
          </div>

          <!-- Mini Cards -->
          <div class="grid grid-cols-2 gap-4 relative z-10">
            <div class="bg-white rounded-xl p-4 shadow-sm">
              <div class="text-xs text-gray-500 mb-2">Monthly Increment</div>
              <svg class="w-full h-8" viewBox="0 0 100 30">
                <polyline points="0,25 25,20 50,15 75,10 100,5" fill="none" stroke="#4ADE80" stroke-width="2"/>
              </svg>
            </div>
            <div class="bg-white rounded-xl p-4 shadow-sm">
              <div class="text-xs text-gray-500 mb-2">Yearly Increment</div>
              <svg class="w-full h-8" viewBox="0 0 100 30">
                <polyline points="0,15 25,12 50,18 75,10 100,8" fill="none" stroke="#64748B" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Feature Card 3 - Right Top -->
        <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div class="w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center mb-8 text-2xl">
            💬
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2" v-html="feature3?.title || 'Customers AI-powered to'"></h3>
          <p class="text-gray-600 leading-relaxed" v-html="feature3?.content || 'chatbots — free forever.'"></p>
        </div>

        <!-- Feature Card 4 - Left Bottom -->
        <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div class="flex gap-3 mb-8 flex-wrap">
            <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">⚡</div>
            <div class="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl">◆</div>
            <div class="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white text-xl">●●</div>
            <div class="w-12 h-12 bg-blue-400 rounded-xl flex items-center justify-center text-white text-xl">○</div>
            <div class="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl">🔒</div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2" v-html="feature4?.title || 'Cutting-edge AI features'"></h3>
          <p class="text-gray-600 leading-relaxed" v-html="feature4?.content || 'for grow business'"></p>
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

        <!-- Feature Card 6 - Right Bottom -->
        <div class="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div class="mb-8">
            <div class="w-16 h-16 border-4 border-gray-900 rounded-2xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="M20 12V20L26 26" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div class="w-16 h-16 border-4 border-gray-300 rounded-2xl flex items-center justify-center relative">
              <svg class="w-8 h-8" viewBox="0 0 40 40" fill="none">
                <path d="M15 20H25M20 15V25" stroke="currentColor" stroke-width="2"/>
              </svg>
              <svg class="w-6 h-6 absolute -top-2 -right-2 text-gray-900" viewBox="0 0 24 24" fill="none">
                <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12M12 20L8 16M12 20L16 16M12 20V12" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2" v-html="feature6?.title || 'Auto backup and recovery'"></h3>
          <p class="text-gray-600 leading-relaxed" v-html="feature6?.content || 'automated backups'"></p>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* Disable text selection while dragging */
.cursor-grabbing {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Smooth momentum scrolling for touch devices */
@supports (-webkit-overflow-scrolling: touch) {
  .scrollbar-hide {
    -webkit-overflow-scrolling: touch;
  }
}
</style>

<script setup>
import { ref, watchEffect } from 'vue'

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({})
  }
})

const scrollContainer = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

// Drag functionality
const startDrag = (e) => {
  isDragging.value = true
  const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX
  startX.value = pageX - scrollContainer.value.offsetLeft
  scrollLeft.value = scrollContainer.value.scrollLeft
  
  if (scrollContainer.value) {
    scrollContainer.value.style.scrollBehavior = 'auto'
  }
}

const drag = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
  
  const pageX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX
  const x = pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX.value) * 2 // Multiply by 2 for faster scroll
  scrollContainer.value.scrollLeft = scrollLeft.value - walk
}

const stopDrag = () => {
  isDragging.value = false
  if (scrollContainer.value) {
    scrollContainer.value.style.scrollBehavior = 'smooth'
  }
}

const feature1 = ref({})
const feature3 = ref({})
const feature4 = ref({})
const feature6 = ref({})
const mainFeature = ref({})
const analyticsData = ref({})
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

function parse(data) {
  if (!data) return {}
  return typeof data === 'string' ? JSON.parse(data) : data
}

watchEffect(() => {
  const allData = props.pageData || {}

  // Parse data dari CMS
  const feature1Raw = allData.ai_feature_1
  const feature3Raw = allData.ai_feature_3
  const feature4Raw = allData.ai_feature_4
  const feature6Raw = allData.ai_feature_6
  const mainFeatureRaw = allData.ai_main_feature
  const analyticsRaw = allData.ai_analytics
  const featureListRaw = allData.ai_feature_list

  feature1.value = parse(feature1Raw)
  feature3.value = parse(feature3Raw)
  feature4.value = parse(feature4Raw)
  feature6.value = parse(feature6Raw)
  mainFeature.value = parse(mainFeatureRaw)
  analyticsData.value = parse(analyticsRaw)

  // Parse feature list jika ada
  if (featureListRaw && Array.isArray(parse(featureListRaw))) {
    featureList.value = parse(featureListRaw).map(item => item.title || item.content || item)
  }
})
</script>