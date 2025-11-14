<template>
  <nav class="absolute top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-transparent">
    <div class="flex items-center justify-between px-6 md:px-10 py-4 lg:px-16">
      <!-- Logo & Title -->
      <div class="flex items-center space-x-3">
        <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="h-10 w-auto" />
        <div class="text-white">
          <p class="text-xl font-semibold">{{ title }}</p>
          <p class="text-xs font-light tracking-wide opacity-90">{{ siteDescription }}</p>
        </div>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden lg:flex space-x-1 items-center">
        <button
          v-for="menu in menus"
          :key="menu.id"
          @click="navigateOrScroll(menu)"
          class="relative text-white text-sm font-medium tracking-wide px-4 py-2 hover:bg-white/10 transition-all duration-300 rounded"
          :class="isActiveMenu(menu) ? 'bg-white/20' : ''"
        >
          {{ menu.title }}
        </button>
        
        <!-- Contact Button -->
        <button
          class="ml-4 flex items-center space-x-2 border-2 border-white text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-[#1e3a8a] transition-all duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Contact us today</span>
        </button>
      </div>

      <!-- Hamburger Button -->
      <button
        class="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none space-y-1.5"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="block h-0.5 w-6 bg-white rounded transition-all duration-300"
          :class="menuOpen ? 'translate-y-2 rotate-45' : ''"
        ></span>
        <span
          class="block h-0.5 w-6 bg-white rounded transition-all duration-300"
          :class="menuOpen ? 'opacity-0' : ''"
        ></span>
        <span
          class="block h-0.5 w-6 bg-white rounded transition-all duration-300"
          :class="menuOpen ? '-translate-y-2 -rotate-45' : ''"
        ></span>
      </button>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="menuOpen"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="menuOpen = false"
    ></div>

    <!-- Mobile Menu -->
    <div
      class="fixed top-0 right-0 h-screen w-80 bg-[#1e3a8a] shadow-2xl transform transition-transform duration-300 z-50 lg:hidden"
      :class="menuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Close Button -->
      <div class="flex justify-end p-6">
        <button
          @click="menuOpen = false"
          class="text-white hover:text-gray-300 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex flex-col px-6 space-y-4">
        <button
          v-for="menu in menus"
          :key="menu.id"
          @click="handleMobileClick(menu)"
          class="text-left text-white text-base font-medium py-3 px-4 hover:bg-white/10 rounded transition-all"
          :class="isActiveMenu(menu) ? 'bg-white/20' : ''"
        >
          {{ menu.title }}
        </button>

        <!-- Mobile Contact Button -->
        <button
          class="flex items-center justify-center space-x-2 border-2 border-white text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-[#1e3a8a] transition-all duration-300 mt-4"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Contact us today</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { API_ENDPOINTS } from '@/config/api'

const router = useRouter()
const route = useRoute()
const menuOpen = ref(false)
const menus = ref([])
const logoUrl = ref('')
const title = ref('Pasifik Sukses Gemilang')
const siteDescription = ref('Mitra Sukses Bersama')

// Check if menu is active
const isActiveMenu = (menu) => {
  if (!menu?.path) return false
  
  if (menu.path === '#' && route.path === '/') return true
  if (menu.path.startsWith('#')) return false
  
  return route.path === menu.path
}

// Navigate or scroll
const navigateOrScroll = (menu) => {
  if (!menu?.path) return

  if (menu.path.startsWith('#')) {
    const targetId = menu.path.slice(1)

    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (route.path !== '/') {
      localStorage.setItem('scrollTarget', targetId)
      router.push('/')
    } else {
      nextTick(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  } else {
    router.push(menu.path)
  }
}

// Mobile click handler
const handleMobileClick = (menu) => {
  menuOpen.value = false
  navigateOrScroll(menu)
}

// Fetch settings
const fetchSettings = async () => {
  try {
    const logoRes = await axios.get(API_ENDPOINTS.settingLogo)
    logoUrl.value = logoRes.data?.value || ''
  } catch (err) {
    console.error('Error fetch logo:', err)
  }

  try {
    const siteRes = await axios.get(API_ENDPOINTS.siteSettingsPublic(1))
    const s = siteRes.data.settings || {}
    title.value = s.title || title.value
    siteDescription.value = s.site_description || siteDescription.value
  } catch (err) {
    console.error('Error fetch site settings:', err)
  }
}

// Fetch menu
const fetchMenu = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.menuListByGroup('main'))
    menus.value = res.data || []
  } catch (err) {
    console.error('Error fetch menu:', err)
  }
}

onMounted(() => {
  fetchSettings()
  fetchMenu()

  const scrollTarget = localStorage.getItem('scrollTarget')
  if (scrollTarget) {
    nextTick(() => {
      const el = document.getElementById(scrollTarget)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      localStorage.removeItem('scrollTarget')
    })
  }
})
</script>

<style scoped>
nav {
  font-family: 'Inter', sans-serif;
}
</style>