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
          <div class="bg-white p-6 -mt-14 mx-4 relative z-10 ">
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
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-sm whitespace-nowrap opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200 pointer-events-none">
                  {{ icon.title }}
                  <!-- Arrow -->
                  <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                    <div class="border-transparent"></div>
                  </div>
                </div>
                
                <img
                  v-if="icon.icon"
                  :src="icon.icon"
                  :alt="icon.title"
                  class="w-4 h-4 object-contain"
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
import { ref, watchEffect } from 'vue'

/* global defineProps */
const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({})
  }
})

const headerContent = ref('Meet our amazing team')
const headerTitle = ref('Our team is dedicated to helping your business g')
const headerDescription = ref('')
const teamMembers = ref([])
const socialIcons = ref([])

function parse(data) {
  if (!data) return {}
  return typeof data === 'string' ? JSON.parse(data) : data
}

watchEffect(() => {
  const allData = props.pageData || {}

  // Parse Our_team3 for header
  const teamHeaderRaw = allData.our_team3
  const teamHeader = parse(teamHeaderRaw)
  
  if (teamHeader?.title) {
    headerTitle.value = teamHeader.title
  }
  if (teamHeader?.content) {
    headerContent.value = teamHeader.content
  }

  // Parse Our_team_atribut3 for description (if exists)
  const teamAtributRaw = allData.our_team_atribut3
  const teamAtribut = parse(teamAtributRaw)
  if (teamAtribut?.title) {
    headerDescription.value = teamAtribut.title
  }

  // Parse Our_team_person3 for team members
  const teamPersonRaw = allData.our_team_person3
  let teamPersonData = parse(teamPersonRaw)
  
  if (teamPersonData && !Array.isArray(teamPersonData)) {
    teamPersonData = [teamPersonData]
  }
  
  if (Array.isArray(teamPersonData)) {
    teamMembers.value = teamPersonData.map(person => ({
      name: person.title || '',
      position: person.content || '',
      image: person.image || ''
    }))
  }

  // Parse Our_team_icon3 for social icons
  const teamIconRaw = allData.our_team_icon3
  let teamIconData = parse(teamIconRaw)
  
  if (teamIconData && !Array.isArray(teamIconData)) {
    teamIconData = [teamIconData]
  }
  
  if (Array.isArray(teamIconData)) {
    socialIcons.value = teamIconData.map(icon => ({
      title: icon.title || '',
      icon: icon.icon || '',
      link: icon.link || '#'
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