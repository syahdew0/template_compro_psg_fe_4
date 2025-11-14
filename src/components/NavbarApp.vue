<template>
  <nav 
    class="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300"
    :class="isScrolled ? 'drop-shadow-md drop-shadow-gray-100 bg-white rounded-lg' : 'bg-transparent'"
  >
    <div class="flex items-center px-6 md:px-10 py-4 lg:px-16">
      <!-- Logo & Title -->
      <a href="/" class="flex items-center space-x-3 lg:flex-1 cursor-pointer">
        <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="h-10 w-auto" />
        <div>
          <p class="text-semibold sm:text-lg md:text-xl lg:text-xl font-semibold text-wide"
             :class="isScrolled ? 'text-gray-900' : 'text-gray-900'">
            {{ title }}
          </p>
          <!-- <p class="text-xs md:text-sm text-[#00B1D6] font-regular">
            {{ siteDescription }}
          </p> -->
        </div>
      </a>

      <!-- Desktop Menu (Centered with Rounded Container) -->
      <div class="hidden lg:flex items-center justify-center lg:flex-1">
        <div class="flex items-center space-x-1 bg-white rounded-full px-2 py-1.5 border-2 border-gray-100">
          <button
            v-for="menu in navItems"
            :key="menu.id || menu.label"
            @click="menu.action"
            class="relative text-gray-700 text-sm font-medium tracking-wide px-5 py-2.5 transition-all duration-300 rounded-full hover:bg-gray-400/30"
          >
            {{ menu.label }}
          </button>
        </div>
      </div>
      
      <!-- Empty Space (Right) to balance the layout -->
      <div class="hidden lg:flex lg:flex-1"></div>

      <!-- Hamburger Button -->
      <button
        class="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none ml-auto"
        @click.stop="toggleMenu"
        aria-label="Toggle menu"
      >
        <span
          class="block h-0.5 w-6 rounded transition-all duration-300 absolute"
          :class="[
            menuOpen ? 'rotate-45' : '-translate-y-2',
            isScrolled ? 'bg-gray-900' : 'bg-gray-900'
          ]"
        ></span>
        <span
          class="block h-0.5 w-6 rounded transition-all duration-300"
          :class="[
            menuOpen ? 'opacity-0' : '',
            isScrolled ? 'bg-gray-900' : 'bg-gray-900'
          ]"
        ></span>
        <span
          class="block h-0.5 w-6 rounded transition-all duration-300 absolute"
          :class="[
            menuOpen ? '-rotate-45' : 'translate-y-2',
            isScrolled ? 'bg-gray-900' : 'bg-gray-900'
          ]"
        ></span>
      </button>
    </div>

    <!-- Mobile Overlay -->
    <transition name="fade">
      <div
        v-if="menuOpen"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        @click="closeMenu"
      ></div>
    </transition>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div
        v-if="menuOpen"
        class="fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto"
      >
        <!-- Close Button -->
        <div class="flex justify-end p-6">
          <button
            @click="closeMenu"
            class="text-gray-900 hover:text-gray-600 transition-colors"
            aria-label="Close menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-col px-6 space-y-2 pb-6">
          <button
            v-for="menu in navItems"
            :key="menu.id || menu.label"
            @click="handleMobileClick(menu)"
            class="text-left text-gray-900 text-lg font-normal py-4 px-4 border-b border-gray-200 transition-all"
          >
            {{ menu.label }}
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { API_ENDPOINTS, API_URL } from '@/config/api'

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({})
  },
  settings: {
    type: Object,
    default: () => ({})
  }
})

const router = useRouter()
const route = useRoute()
const menuOpen = ref(false)
const menus = ref([])
const logoUrl = ref('')
const title = ref('Pasifik Sukses Gemilang')
const siteDescription = ref('Mitra Sukses Bersama')
const contactButton = ref({
  text: 'Contact Us',
  link: '#valuableBusiness',
  icon: ''
})
const websiteId = 1
const isScrolled = ref(false)

// Static fallback menu items
const staticNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '#PilarPSG' },
  { label: 'Pricing', path: '#strategyConsultant' },
  { label: 'Contact', path: '#realLife' },
  { label: 'Testimonials', path: '#testimonials' }
]

// Computed property untuk merge dynamic menu dengan actions
const navItems = computed(() => {
  if (menus.value.length > 0) {
    return menus.value.map(menu => ({
      id: menu.id,
      label: menu.title,
      path: menu.path,
      action: () => navigateOrScroll(menu)
    }))
  }
  
  // Fallback ke static menu
  return staticNavItems.map(item => ({
    label: item.label,
    path: item.path,
    action: () => navigateOrScroll(item)
  }))
})

// Handle scroll event
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Fungsi parse yang lebih robust
function parse(data) {
  if (!data) return {}
  if (typeof data === 'object') return data
  
  try {
    return JSON.parse(data)
  } catch (e) {
    console.warn('Failed to parse data:', e)
    return {}
  }
}

// Fungsi untuk mendapatkan item berdasarkan tag
function getItemByTag(tag, allData) {
  if (!allData) return null
  
  // Cari key yang cocok (case-insensitive)
  const foundKey = Object.keys(allData).find(k => 
    k.toLowerCase() === String(tag).toLowerCase()
  )
  
  if (!foundKey) {
    console.log(`Tag "${tag}" not found in pageData`)
    return null
  }
  
  const section = allData[foundKey]
  
  if (!section) return null

  const parseItem = (item) => {
    const parsed = parse(item)
    // Jika ada nested items, parse juga
    if (parsed.items) {
      return parse(parsed.items)
    }
    return parsed
  }
  
  return Array.isArray(section) 
    ? section.map(parseItem) 
    : [parseItem(section)]
}

// Toggle menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

// Close menu
const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}

// Scroll to element helper
const scrollToElement = (id) => {
  nextTick(() => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

// Navigate or scroll
const navigateOrScroll = (item) => {
  if (!item?.path) return

  if (item.path.startsWith('#')) {
    const targetId = item.path.slice(1)

    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (route.path !== '/') {
      localStorage.setItem('scrollTarget', targetId)
      router.push('/')
    } else {
      scrollToElement(targetId)
    }
  } else {
    router.push(item.path)
  }
}

// Mobile click handler
const handleMobileClick = (menu) => {
  closeMenu()
  setTimeout(() => menu.action(), 150)
}

// Helper untuk join URL
const joinUrl = (base, path) => {
  if (!path) return base
  return base.replace(/\/+$/, '') + '/' + String(path).replace(/^\/+/, '')
}

// Fetch logo dengan fallback ke props.settings
const fetchLogo = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.settingLogo)
    const raw = res?.data || {}
    
    const candidate =
      raw.logo ||
      raw.icon ||
      raw.value ||
      raw?.data?.logo ||
      raw?.data?.icon ||
      raw?.data?.value ||
      ''

    if (candidate) {
      logoUrl.value = String(candidate).startsWith('http')
        ? candidate
        : joinUrl(API_URL, candidate)
    } else {
      // Fallback ke props.settings
      const fallback = props.settings?.logo || props.settings?.icon || ''
      logoUrl.value = fallback 
        ? (String(fallback).startsWith('http') ? fallback : joinUrl(API_URL, fallback)) 
        : ''
    }
  } catch (err) {
    console.error('Error fetch logo:', err)
    // Fallback ke props.settings jika error
    const fallback = props.settings?.logo || props.settings?.icon || ''
    if (fallback) {
      logoUrl.value = String(fallback).startsWith('http') 
        ? fallback 
        : joinUrl(API_URL, fallback)
    }
  }
}

// Fetch site settings
const fetchSiteSettings = async () => {
  try {
    const res = await axios.get(API_ENDPOINTS.siteSettingsPublic(websiteId))
    const settings = res.data?.settings || res.data?.data || res.data
    
    if (settings) {
      title.value = settings.title || settings.site_title || title.value
      siteDescription.value = settings.site_description || settings.description || siteDescription.value
    }
  } catch (err) {
    console.error('Error fetch site settings:', err)
  }
}

// Fetch menu dari API
const fetchMenu = async () => {
  try {
    const groupSlug = window.MENU_GROUP_SLUG || 'main'
    console.log('Fetching menu for group:', groupSlug)
    
    const res = await axios.get(API_ENDPOINTS.menuListByGroup(groupSlug))
    console.log('Menu API response:', res.data)

    menus.value = (res.data?.data || res.data || [])
      .sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order
        return a.id - b.id
      })
      .map((m) => ({
        ...m,
        path: m.path || m.link || '/',
        title: m.title || 'Tanpa Judul',
        target: m.open_in_new_tab ? '_blank' : '_self',
      }))
    
    console.log('Menu berhasil dimuat:', menus.value)
  } catch (err) {
    console.error('Error fetch menu:', err)
  }
}

// Watch untuk pageData changes - untuk contact_us2
watchEffect(() => {
  const allData = props.pageData || {}
  
  // Ambil data dari contact_us2
  const contactUs2Data = getItemByTag('contact_us2', allData)
  
  if (contactUs2Data && contactUs2Data.length > 0) {
    const data = contactUs2Data[0]
    
    // Extract data dengan berbagai kemungkinan field names
    const extracted = {
      text: data.title || data.text || data.name || 'Contact Us',
      link: data.link || data.content || data.url || '#valuableBusiness',
      icon: data.icon || data.image || ''
    }
    
    // Pastikan icon adalah full URL jika bukan http
    if (extracted.icon && !extracted.icon.startsWith('http')) {
      extracted.icon = joinUrl(API_URL, extracted.icon)
    }
    
    // Update contactButton
    contactButton.value = {
      text: extracted.text,
      link: extracted.link,
      icon: extracted.icon
    }
    
    console.log('Contact button updated:', contactButton.value)
  }
})

onMounted(async () => {
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll)

  // Fetch semua data secara berurutan
  await fetchLogo()
  await fetchSiteSettings()
  await fetchMenu()

  // Handle scroll target dari localStorage atau query
  if (route.path === '/' && route.query.scrollTo) {
    scrollToElement(route.query.scrollTo)
  }
  
  const scrollTarget = localStorage.getItem('scrollTarget')
  if (scrollTarget) {
    nextTick(() => {
      scrollToElement(scrollTarget)
      localStorage.removeItem('scrollTarget')
    })
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
nav {
  font-family: 'Inter', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>