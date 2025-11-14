<template>
  <div class="px-6 py-28 max-w-4xl mx-auto">
    <router-link
      to="/careers"
      class="inline-block mb-6 text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
    >
      ← Kembali ke Daftar Karir
    </router-link>
    <!-- Loading -->
    <div v-if="loading" class="text-center text-gray-500">
      Memuat detail lowongan...
    </div>
    <!-- Data ditemukan -->
    <div v-else-if="job">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">{{ job.title }}</h1>
      <img
        :src="job.thumbnail_url"
        :alt="job.title"
        class="w-full h-auto object-cover rounded mb-6 shadow"
      />
      <div v-html="job.content" class="prose max-w-none text-gray-700"></div>
    </div>

    <!-- Tidak ditemukan -->
    <div v-else class="text-center text-red-500">
      Lowongan tidak ditemukan.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { API_ENDPOINTS } from '@/config/api.js'

const route = useRoute()
const slug = route.params.slug
const job = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch(API_ENDPOINTS.allPosts())
    const json = await res.json()
    const posts = Array.isArray(json.data) ? json.data : []

    job.value = posts.find(post =>
      post.slug === slug &&
      Array.isArray(post.post_categories) &&
      post.post_categories.some(pc =>
        pc.category?.slug?.toLowerCase() === 'karir'
      )
    )
  } catch (err) {
    console.error('Gagal memuat detail lowongan:', err)
  } finally {
    loading.value = false
  }
})
</script>
