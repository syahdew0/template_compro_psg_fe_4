<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
    <div class="max-w-7xl mx-auto">

      <!-- Header Section -->
      <div class="flex justify-between items-start mt-12 mb-12 fade-in-up">
        <div class="max-w-2xl">
          <p class="text-[#3B4E9E] font-bold mb-3 text-sm">{{ headerContent }}</p>
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 text-wide">
            {{ headerTitle }}
          </h2>
        </div>

        <!-- Button on top right -->
        <div v-if="buttonText" class="hidden md:block">
          <button
            class="relative bg-blue-600 text-white font-semibold px-7 py-4 rounded-full 
                   overflow-hidden transition-all duration-300 shadow-md hover:bg-blue-700 hover:shadow-lg group">
            <!-- Wrapper agar teks di luar area tombol tersembunyi -->
            <div class="relative h-full overflow-hidden flex items-center justify-center">
              <!-- Teks muncul dari bawah -->
              <span
                class="absolute inset-0 flex items-center justify-center transform translate-y-full 
                       group-hover:translate-y-0 transition-transform duration-300 ease-out">
                {{ buttonText }}
              </span>

              <!-- Teks awal yang bergerak ke atas -->
              <span
                class="relative flex items-center justify-center transform group-hover:-translate-y-full 
                       transition-transform duration-300 ease-out">
                {{ buttonText }}
              </span>
            </div>
          </button>
        </div>
      </div>

      <!-- Business Resources Grid -->
      <div v-if="businessComponents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
        <div v-for="(item, index) in businessComponents" :key="index"
          class="bg-transparent transition-all duration-300 overflow-hidden p-4 group hover:-translate-y-2 card-fade-in"
          :style="{ animationDelay: `${index * 0.1}s` }">
          <!-- Image -->
          <div class="relative overflow-hidden w-full h-[270px] md:h-[310px] lg:h-[350px]">
            <img v-if="item.image" :src="item.image" :alt="item.title" class="absolute inset-0 w-full h-full object-cover" />
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
              <span class="text-gray-400">No Image</span>
            </div>
          </div>

          <!-- Content -->
          <div class="py-6">
            <p class="text-blue-600 font-semibold text-sm mb-2">
              {{ item.title }}
            </p>
            <h3 class="text-xl font-bold text-gray-900 mb-4 leading-snug">
              {{ item.content }}
            </h3>
            <a :href="item.link || '#'"
              class="inline-block text-black-900 font-semibold hover:text-blue-700 transition-colors relative after:content-[''] after:block after:w-[115%] after:h-[2px] after:bg-blue-500 after:mt-1">
              {{ readArticleText }}
            </a>
          </div>
        </div>
      </div>

      <!-- Mobile Button -->
      <div v-if="buttonText" class="text-center md:hidden">
        <button
          class="bg-[#3B4E9E] text-white font-semibold px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
          {{ buttonText }}
        </button>
      </div>

      <div v-else-if="businessComponents.length === 0" class="text-center py-12 text-gray-500">
        No business resources available
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const headerContent = ref('Business resources')
const headerTitle = ref('Valuable business resources from industry leaders')
const businessComponents = ref([])
const buttonText = ref('')
const readArticleText = ref('Read Article')

// Parse function yang robust seperti di AboutPSG.vue
function parse(data) {
  if (data == null) return null;
  let out = data;

  if (typeof out === 'string') {
    try {
      out = JSON.parse(out);
    } catch (e) {
      // gagal parse → biarkan apa adanya
      out = data;
    }
  }

  if (Array.isArray(out)) {
    out = out
      .map(it => {
        if (typeof it === 'string') {
          try {
            return JSON.parse(it);
          } catch (e) {
            return null; // buang item yang invalid
          }
        }
        return it;
      })
      .filter(Boolean);
  }
  return out;
}

// Fungsi untuk memaksa HTTPS
function toHttps(url) {
  if (!url || typeof url !== 'string') return '';
  // paksa https untuk domain API kamu
  return url.startsWith('http://apicompro.phisoft.co.id')
    ? url.replace('http://', 'https://')
    : url;
}

// Load data dari localStorage seperti di AboutPSG.vue
onMounted(() => {
  const raw = localStorage.getItem('customPageData:Home')
  if (!raw) {
    console.warn('Data halaman Home tidak ditemukan di localStorage')
    return
  }

  try {
    const data = JSON.parse(raw)

    // Parse valuable_business3 untuk header
    const valuableBusiness3Raw = data.valuable_business3 ?? null
    const valuableBusiness3 = parse(valuableBusiness3Raw)

    if (Array.isArray(valuableBusiness3) && valuableBusiness3.length > 0) {
      headerTitle.value = valuableBusiness3[0]?.title || headerTitle.value
      headerContent.value = valuableBusiness3[0]?.content || headerContent.value
    } else if (valuableBusiness3) {
      headerTitle.value = valuableBusiness3?.title || headerTitle.value
      headerContent.value = valuableBusiness3?.content || headerContent.value
    }

    // Parse valuable_business_component3 untuk business items
    const componentRaw = data.valuable_business_component3 ?? null
    let componentData = parse(componentRaw)

    // Pastikan data dalam bentuk array
    if (componentData && !Array.isArray(componentData)) {
      componentData = [componentData]
    }

    if (Array.isArray(componentData) && componentData.length > 0) {
      businessComponents.value = componentData
        .filter(item => item != null) // Filter null items
        .map(item => ({
          title: item.title || '',
          content: item.content || '',
          image: toHttps(item.image || ''),
          link: item.link || '',
          icon: toHttps(item.icon || '')
        }))
    }

    // Parse valuable_button3 untuk button text
    const buttonRaw = data.valuable_button3 ?? null
    const buttonData = parse(buttonRaw)

    if (Array.isArray(buttonData) && buttonData.length > 0) {
      buttonText.value = buttonData[0]?.title || ''
    } else if (buttonData?.title) {
      buttonText.value = buttonData.title
    }

    // Parse valuable_read3 untuk "Read Article" text
    const readRaw = data.valuable_read3 ?? null
    const readData = parse(readRaw)

    if (Array.isArray(readData) && readData.length > 0) {
      readArticleText.value = readData[0]?.title || readArticleText.value
    } else if (readData?.title) {
      readArticleText.value = readData.title
    }

    console.log('Valuable Business Data Loaded:', {
      header: { title: headerTitle.value, content: headerContent.value },
      components: businessComponents.value.length,
      button: buttonText.value,
      readText: readArticleText.value
    })

  } catch (err) {
    console.error('Gagal parsing data Valuable Business:', err)
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
h1,
h2,
h3 {
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  letter-spacing: -0.02em;
}

/* Paragraph dan list items */
p,
a {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  font-weight: 400;
}

/* Button styling */
button {
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  font-weight: 600;
}
</style>