<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-7xl mx-auto">

      <!-- Header Section -->
      <div class="text-center mb-16">
        <p class="text-[#3B4E9E] font-medium mb-3">{{ headerContent }}</p>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
          {{ headerTitle }}
        </h2>
      </div>

      <!-- Results Grid -->
      <div v-if="results.length > 0" class="space-y-12">
        <div
          v-for="(result, index) in results"
          :key="index"
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center pb-12 border-b border-gray-200 last:border-b-0"
        >
          <!-- Left Side: Metric -->
          <div class="text-center lg:text-left">
            <div class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
              {{ result.metric }}
            </div>
            <p class="text-blue-500 font-bold text-lg md:text-xl">
              {{ result.metricLabel }}
            </p>
          </div>

          <!-- Right Side: Testimonial -->
          <div class="text-left">
            <p class="text-gray-900 text-base md:text-lg leading-relaxed mb-6">
              "{{ result.testimonial }}"
            </p>
            
            <!-- Person Info -->
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  v-if="result.personImage"
                  :src="result.personImage"
                  :alt="result.personName"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  N/A
                </div>
              </div>
              <div>
                <p class="font-bold text-gray-900">{{ result.personName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        No results data available
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({})
  }
})

const headerContent = ref('Guaranteed Accountability')
const headerTitle = ref('We deliver results')
const results = ref([])

// Parse function yang robust (sama seperti di AboutPSG.vue)
function parse(data) {
  if (data == null) return null
  let out = data

  if (typeof out === 'string') {
    try {
      out = JSON.parse(out)
    } catch (e) {
      // gagal parse → biarkan apa adanya
      out = data
    }
  }

  if (Array.isArray(out)) {
    out = out
      .map(it => {
        if (typeof it === 'string') {
          try {
            return JSON.parse(it)
          } catch (e) {
            return null // buang item yang invalid
          }
        }
        return it
      })
      .filter(Boolean)
  }
  return out
}

// toHttps function untuk ensure HTTPS
function toHttps(url) {
  if (!url || typeof url !== 'string') return ''
  return url.startsWith('http://apicompro.phisoft.co.id')
    ? url.replace('http://', 'https://')
    : url
}

// Load data dari localStorage (penting untuk production!)
onMounted(() => {
  const raw = localStorage.getItem('customPageData:Home')
  if (!raw) {
    console.warn('Data halaman Home tidak ditemukan di localStorage')
    return
  }

  try {
    const data = JSON.parse(raw)

    // === guaranteed3 (header) ===
    const guaranteed3Raw = data.guaranteed3 ?? data.Guaranteed3 ?? null
    const guaranteed3 = parse(guaranteed3Raw)
    
    if (Array.isArray(guaranteed3) && guaranteed3.length) {
      headerTitle.value = guaranteed3[0]?.title || headerTitle.value
      headerContent.value = guaranteed3[0]?.content || headerContent.value
    } else if (guaranteed3) {
      headerTitle.value = guaranteed3.title || headerTitle.value
      headerContent.value = guaranteed3.content || headerContent.value
    }

    // === guaranteed_persen3 (metrics) ===
    const persenRaw = data.guaranteed_persen3 ?? data.Guaranteed_persen3 ?? null
    const persenParsed = parse(persenRaw)
    const persenArr = Array.isArray(persenParsed) ? persenParsed : (persenParsed ? [persenParsed] : [])

    // === guaranteed_descript3 (testimonials) ===
    const descriptRaw = data.guaranteed_descript3 ?? data.Guaranteed_descript3 ?? null
    const descriptParsed = parse(descriptRaw)
    const descriptArr = Array.isArray(descriptParsed) ? descriptParsed : (descriptParsed ? [descriptParsed] : [])

    // Combine data
    results.value = persenArr.map((persen, index) => {
      const descript = descriptArr[index] || {}
      
      return {
        metric: persen.content || persen.title || '',
        metricLabel: persen.title || persen.content || '',
        testimonial: descript.content || '',
        personName: descript.title || '',
        personImage: toHttps(descript.image || '')
      }
    })

    console.log('Guaranteed data loaded:', {
      header: { headerTitle: headerTitle.value, headerContent: headerContent.value },
      resultsCount: results.value.length,
      results: results.value
    })
  } catch (err) {
    console.error('Gagal parsing data Guaranteed Account:', err)
  }
})

// watchEffect sebagai fallback (jika data di-pass via props)
watchEffect(() => {
  const allData = props.pageData || {}
  
  // Hanya jalankan jika results masih kosong dan ada data di props
  if (results.value.length === 0 && Object.keys(allData).length > 0) {
    const guaranteed3Raw = allData.guaranteed3
    const guaranteed3 = parse(guaranteed3Raw)
    
    if (Array.isArray(guaranteed3) && guaranteed3.length) {
      headerTitle.value = guaranteed3[0]?.title || headerTitle.value
      headerContent.value = guaranteed3[0]?.content || headerContent.value
    } else if (guaranteed3) {
      headerTitle.value = guaranteed3.title || headerTitle.value
      headerContent.value = guaranteed3.content || headerContent.value
    }

    const persenRaw = allData.guaranteed_persen3
    const persenParsed = parse(persenRaw)
    const persenArr = Array.isArray(persenParsed) ? persenParsed : (persenParsed ? [persenParsed] : [])

    const descriptRaw = allData.guaranteed_descript3
    const descriptParsed = parse(descriptRaw)
    const descriptArr = Array.isArray(descriptParsed) ? descriptParsed : (descriptParsed ? [descriptParsed] : [])

    results.value = persenArr.map((persen, index) => {
      const descript = descriptArr[index] || {}
      
      return {
        metric: persen.content || persen.title || '',
        metricLabel: persen.title || persen.content || '',
        testimonial: descript.content || '',
        personName: descript.title || '',
        personImage: toHttps(descript.image || '')
      }
    })
  }
})
</script>

<style scoped>
/* Import Google Fonts - Plus Jakarta Sans untuk body dan Inter untuk heading */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');

/* Body/section copy → Plus Jakarta Sans */
section {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif;
}

/* Heading utama → Inter (bold, modern, clean) */
h1, h2 {
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  letter-spacing: -0.02em;
}

/* Paragraph dan list items */
p {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  font-weight: 400;
}
</style>