<template>
  <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-7xl mx-auto">

      <!-- Header Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
        <!-- Left: Title & Content -->
        <div class="text-left">
          <p class="text-[#3B4E9E] font-medium mb-2">{{ headerContent }}</p>
          <h2 class="text-2xl md:text-3xl lg:text-4xl text-gray-900">
            {{ headerTitle }}
          </h2>
        </div>
        
        <!-- Right: Description -->
        <div class="text-left pt-8 lg:pt-2">
          <p class="text-gray-600 leading-relaxed" v-html="headerDescription"></p>
        </div>
      </div>

      <!-- Team Grid -->
      <div v-if="teamMembers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
        <div
          v-for="(person, index) in teamMembers"
          :key="index"
          class="group"
        >
          <!-- Image Container -->
          <div class="relative overflow-hidden mb-0 bg-gray-200 h-[385px]">
            <img
              v-if="person.image"
              :src="person.image"
              :alt="person.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          </div>

          <!-- White Card with Social Icons -->
          <div class="bg-white p-6 -mt-14 mx-4 relative z-10 shadow-lg">
            <!-- Social Icons -->
            <div v-if="socialIcons.length > 0" class="flex justify-center gap-4 mb-4">
              <a
                v-for="(icon, iconIndex) in socialIcons"
                :key="iconIndex"
                :href="icon.link || '#'"
                target="_blank"
                rel="noopener noreferrer"
                class="relative group/icon text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                <!-- Tooltip -->
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-sm whitespace-nowrap opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 pointer-events-none rounded">
                  {{ icon.title }}
                  <!-- Arrow -->
                  <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div class="border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
                
                <img
                  v-if="icon.icon"
                  :src="icon.icon"
                  :alt="icon.title"
                  class="w-5 h-5 object-contain"
                />
                <span v-else class="text-base">{{ icon.title }}</span>
              </a>
            </div>

            <!-- Person Info -->
            <div class="text-center">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ person.name }}</h3>
              <p class="text-[#3B4E9E] font-bold text-xs">{{ person.position }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        No team members data available
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({})
  }
})

const headerContent = ref('Meet our amazing team')
const headerTitle = ref('Our team is dedicated to helping your business grow')
const headerDescription = ref('')
const teamMembers = ref([])
const socialIcons = ref([])

// Fungsi parse yang robust seperti di AboutPSG.vue
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

// Fungsi untuk convert http ke https
function toHttps(url) {
  if (!url || typeof url !== 'string') return '';
  return url.startsWith('http://apicompro.phisoft.co.id')
    ? url.replace('http://', 'https://')
    : url;
}

// Load data dari localStorage seperti AboutPSG.vue
onMounted(() => {
  // Coba ambil dari localStorage dulu
  const raw = localStorage.getItem('customPageData:Home')
  
  if (raw) {
    try {
      const data = JSON.parse(raw)
      
      // Parse Our_team3 untuk header
      const teamHeaderRaw = data.our_team3 ?? data.Our_team3 ?? null
      const teamHeader = parse(teamHeaderRaw)
      
      if (Array.isArray(teamHeader) && teamHeader.length > 0) {
        if (teamHeader[0]?.title) headerTitle.value = teamHeader[0].title
        if (teamHeader[0]?.content) headerContent.value = teamHeader[0].content
      } else if (teamHeader) {
        if (teamHeader?.title) headerTitle.value = teamHeader.title
        if (teamHeader?.content) headerContent.value = teamHeader.content
      }

      // Parse Our_team_atribut3 untuk description
      const teamAtributRaw = data.our_team_atribut3 ?? data.Our_team_atribut3 ?? null
      const teamAtribut = parse(teamAtributRaw)
      
      if (Array.isArray(teamAtribut) && teamAtribut.length > 0) {
        if (teamAtribut[0]?.title) headerDescription.value = teamAtribut[0].title
      } else if (teamAtribut) {
        if (teamAtribut?.title) headerDescription.value = teamAtribut.title
      }

      // Parse Our_team_person3 untuk team members
      const teamPersonRaw = data.our_team_person3 ?? data.Our_team_person3 ?? null
      const teamPersonParsed = parse(teamPersonRaw)
      
      // Pastikan array
      const teamPersonArr = Array.isArray(teamPersonParsed) 
        ? teamPersonParsed 
        : (teamPersonParsed ? [teamPersonParsed] : [])
      
      teamMembers.value = teamPersonArr.map(person => ({
        name: person?.title || '',
        position: person?.content || '',
        image: toHttps(person?.image || '')
      }))

      // Parse Our_team_icon3 untuk social icons
      const teamIconRaw = data.our_team_icon3 ?? data.Our_team_icon3 ?? null
      const teamIconParsed = parse(teamIconRaw)
      
      // Pastikan array
      const teamIconArr = Array.isArray(teamIconParsed) 
        ? teamIconParsed 
        : (teamIconParsed ? [teamIconParsed] : [])
      
      socialIcons.value = teamIconArr.map(icon => ({
        title: icon?.title || '',
        icon: toHttps(icon?.icon || ''),
        link: icon?.link || '#'
      }))

      console.log('Team Members loaded:', teamMembers.value)
      console.log('Social Icons loaded:', socialIcons.value)
      
    } catch (err) {
      console.error('Gagal parsing data Our Team:', err)
    }
  } else {
    console.warn('Data halaman Home tidak ditemukan di localStorage')
  }

  // Fallback ke props jika localStorage kosong
  if (teamMembers.value.length === 0 && props.pageData) {
    const allData = props.pageData || {}

    const teamHeaderRaw = allData.our_team3 ?? allData.Our_team3
    const teamHeader = parse(teamHeaderRaw)
    
    if (Array.isArray(teamHeader) && teamHeader.length > 0) {
      if (teamHeader[0]?.title) headerTitle.value = teamHeader[0].title
      if (teamHeader[0]?.content) headerContent.value = teamHeader[0].content
    } else if (teamHeader) {
      if (teamHeader?.title) headerTitle.value = teamHeader.title
      if (teamHeader?.content) headerContent.value = teamHeader.content
    }

    const teamAtributRaw = allData.our_team_atribut3 ?? allData.Our_team_atribut3
    const teamAtribut = parse(teamAtributRaw)
    if (Array.isArray(teamAtribut) && teamAtribut.length > 0) {
      if (teamAtribut[0]?.title) headerDescription.value = teamAtribut[0].title
    } else if (teamAtribut?.title) {
      headerDescription.value = teamAtribut.title
    }

    const teamPersonRaw = allData.our_team_person3 ?? allData.Our_team_person3
    const teamPersonParsed = parse(teamPersonRaw)
    const teamPersonArr = Array.isArray(teamPersonParsed) 
      ? teamPersonParsed 
      : (teamPersonParsed ? [teamPersonParsed] : [])
    
    teamMembers.value = teamPersonArr.map(person => ({
      name: person?.title || '',
      position: person?.content || '',
      image: toHttps(person?.image || '')
    }))

    const teamIconRaw = allData.our_team_icon3 ?? allData.Our_team_icon3
    const teamIconParsed = parse(teamIconRaw)
    const teamIconArr = Array.isArray(teamIconParsed) 
      ? teamIconParsed 
      : (teamIconParsed ? [teamIconParsed] : [])
    
    socialIcons.value = teamIconArr.map(icon => ({
      title: icon?.title || '',
      icon: toHttps(icon?.icon || ''),
      link: icon?.link || '#'
    }))
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