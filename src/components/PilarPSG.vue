<template>
  <section class="py-20 px-4 sm:px-6 lg:px-20 bg-gradient-to-b from-lime-200 to-lime-50">
    <!-- Header Section -->
    <div class="text-center mb-16 max-w-4xl mx-auto">
      <div class="mt-16 inline-block mb-4">
        <span class="px-5 py-3 bg-lime-300 text-gray-900 font-semibold rounded-full text-base font-normal">
          {{ content || 'Best' }}
        </span>
      </div>
      <h2 class="text-4xl md:text-5xl mt-8 font-bold text-gray-900 mb-6 leading-tight">
        {{ title || 'Intellige' }}
      </h2>
      <p class="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
        {{ description || 'Sree tools that automate tasks, reveal insights, and boost business outcomes — effortlessly and efficiently.' }}
      </p>
    </div>

    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      <div
        v-for="(item, index) in displayItems"
        :key="index"
        class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 group"
      >
        <!-- Icon Container -->
        <div class="mb-6">
          <div class="w-16 h-16 rounded-2xl bg-lime-300 flex items-center justify-center transition-all duration-300 group-hover:bg-lime-400 overflow-hidden">
            <!-- Tampilkan icon dari database jika ada -->
            <img 
              v-if="item.icon" 
              :src="item.icon" 
              :alt="item.title"
              class="w-10 h-10 object-contain"
              @error="handleImageError"
            />
            <!-- Fallback ke SVG icon jika tidak ada -->
            <svg 
              v-else
              class="w-8 h-8 text-gray-900" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <component :is="getIconPath(index)" />
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {{ item.title }}
          </h3>
          <p class="text-gray-600 text-base leading-relaxed">
            {{ item.content }}
          </p>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="displayItems.length === 0" 
        class="col-span-full text-center py-16"
      >
        <p class="text-gray-400 text-lg">Belum ada features ditambahkan.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, h } from 'vue'

const title = ref('')
const content = ref('')
const description = ref('')
const items = ref([])

// Default items jika localStorage kosong
const defaultItems = [
  {
    title: 'AI-Powered Automation',
    content: ' repetitive tasks with smart automation that adapts to your workflow and scales with business.',
    icon: null
  },
  {
    title: 'Intuitive User Interface',
    content: 'Enjoy a clean, modern dashboard designed for speed, clarity, effortless navigation — no training.',
    icon: null
  },
  {
    title: 'Seamless Integrations',
    content: 'Connect with your favorite tools like Slack, Zapier, HubSpot, and more to keep your ecosystem in sync.',
    icon: null
  },
  {
    title: 'Real-Time Analytics',
    content: 'Track performance and gain insights to make smarter decisions faster without writing a single line of code.',
    icon: null
  },
  {
    title: 'Multi-Platform Access',
    content: 'Access your data anytime anywhere fully optimized for web, tablet, and mobile built to grow with business.',
    icon: null
  },
  {
    title: 'Drag-and-Drop Builderrr',
    content: 'Easily create stunning, responsive layouts by dragging and dropping elements—no coding skills required.',
    icon: null
  }
]

// Computed property untuk menampilkan items
const displayItems = computed(() => {
  return items.value.length > 0 ? items.value : defaultItems
})

// Handle image error
const handleImageError = (e) => {
  console.warn('Failed to load icon image:', e.target.src)
}

// Icon components - fallback SVG
const getIconPath = (index) => {
  const icons = [
    // Icon 1: Atom/AI
    () => h('g', [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      })
    ]),
    // Icon 2: Monitor/Interface
    () => h('g', [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      })
    ]),
    // Icon 3: Layers/Integration
    () => h('g', [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
      })
    ]),
    // Icon 4: Chart/Analytics
    () => h('g', [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      })
    ]),
    // Icon 5: Devices/Multi-platform
    () => h('g', [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
      })
    ]),
    // Icon 6: Cursor/Builder
    () => h('g', [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
      })
    ])
  ]
  
  return icons[index % icons.length]
}

onMounted(() => {
  const raw = localStorage.getItem('customPageData:Home')
  if (!raw) {
    console.warn('Data customPage Home tidak ditemukan, menggunakan default items.')
    return
  }

  try {
    const data = JSON.parse(raw)

    // Ambil features_badge4 untuk title dan content (badge)
    try {
      const parsedBadge = typeof data.features_badge4 === 'string'
        ? JSON.parse(data.features_badge4)
        : data.features_badge4
      title.value = parsedBadge?.title || ''
      content.value = parsedBadge?.content || ''
    } catch (e) {
      console.warn('Gagal parse features_badge4:', e.message)
    }

    // Ambil features_main4 untuk description
    try {
      const parsedMain = typeof data.features_main4 === 'string'
        ? JSON.parse(data.features_main4)
        : data.features_main4
      description.value = parsedMain?.title || ''
    } catch (e) {
      console.warn('Gagal parse features_main4:', e.message)
    }

    // Ambil dan parsing features_item4
    const parsedItems = []
    const itemsRaw = data.features_item4

    if (Array.isArray(itemsRaw)) {
      for (const entry of itemsRaw) {
        try {
          const item = typeof entry === 'string' ? JSON.parse(entry) : entry
          if (item && typeof item === 'object') parsedItems.push(item)
        } catch (e) {
          console.warn('Gagal parse item features_item4:', e.message)
        }
      }
    } else if (typeof itemsRaw === 'string') {
      try {
        const parsed = JSON.parse(itemsRaw)
        if (Array.isArray(parsed)) {
          parsedItems.push(...parsed)
        } else if (typeof parsed === 'object') {
          parsedItems.push(parsed)
        }
      } catch (e) {
        console.warn('Gagal parse string features_item4:', e.message)
      }
    } else if (typeof itemsRaw === 'object' && itemsRaw !== null) {
      parsedItems.push(itemsRaw)
    }

    // Assign final items dengan icon
    if (parsedItems.length > 0) {
      items.value = parsedItems.map((item, i) => ({
        title: item?.title || `Item ${i + 1}`,
        content: item?.content || '',
        icon: item?.icon || null // Ambil icon URL dari database
      }))
    }

  } catch (err) {
    console.error('Error parsing localStorage customPageData:', err)
  }
})
</script>