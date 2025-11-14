<template>
  <section class="container mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-12 lg:py-16">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <div class="inline-block bg-lime-400 text-black text-sm font-medium px-6 py-2 rounded-full mb-6">
        Choose a plan
      </div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        Flexible Pricing for Every Stage
      </h1>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
        Whether you're just getting started or scaling fast, we've got a pricing plan that
        fits your needs. Our transparent and flexible packages are designed
      </p>
      
      <!-- Toggle Button -->
      <div class="inline-flex items-center bg-black rounded-full p-1">
        <button
          @click="billingType = 'monthly'"
          :class="[
            'px-6 py-2 rounded-full text-sm font-medium transition-all',
            billingType === 'monthly' ? 'bg-black text-white' : 'bg-transparent text-white hover:text-gray-300'
          ]"
        >
          Monthly
        </button>
        <button
          @click="billingType = 'yearly'"
          :class="[
            'px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
            billingType === 'yearly' ? 'bg-black text-white' : 'bg-transparent text-white hover:text-gray-300'
          ]"
        >
          Yearly
          <span class="bg-lime-400 text-black text-xs px-2 py-1 rounded">Save 23%</span>
        </button>
      </div>
    </div>

    <!-- Pricing Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      <!-- Card untuk setiap item -->
      <div
        v-for="(item, idx) in visibleItems"
        :key="idx"
        :class="[
          'relative rounded-2xl p-8 transition-all duration-300',
          item.popular 
            ? 'bg-lime-50 border-2 border-lime-200 shadow-xl scale-105' 
            : 'bg-gray-50 border border-gray-200 hover:shadow-lg'
        ]"
      >
        <!-- Popular Badge -->
        <div
          v-if="item.popular"
          class="absolute -top-3 right-8 bg-lime-400 text-black text-xs font-bold px-4 py-1 rounded-full"
        >
          POPULAR
        </div>

        <!-- Icon -->
        <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm">
          <!-- Gift Icon - Basic Package -->
          <svg v-if="item.icon === 'gift' || idx === 0" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
          </svg>
          <!-- Rocket Icon - Professional Package -->
          <svg v-if="item.icon === 'rocket' || idx === 1" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55l1.33 1.33zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83l-1.5 1.5 2.67 2.67L9.67 18.5c.5-.5 1.5-1.5 1.5-1.5zM9 13c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm12 8l-4.05-4.05c.47-.47.68-1.15.55-1.81l-1.26-1.26c-.31.13-4.64 1.53-5.89 3.57L7.69 20 13 22l2.35-3.62z"/>
          </svg>
          <!-- Diamond Icon - Enterprise Package -->
          <svg v-if="item.icon === 'diamond' || idx === 2" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>

        <!-- Title & Description -->
        <h3 class="text-2xl font-bold mb-3">{{ item.title }}</h3>
        <p class="text-gray-600 text-sm mb-6">{{ item.description }}</p>

        <!-- Price -->
        <div class="mb-6">
          <div class="flex items-baseline">
            <span class="text-5xl font-bold">${{ item.price }}</span>
            <span class="text-gray-500 ml-2">/per month cost</span>
          </div>
        </div>

        <!-- CTA Button -->
        <button
          :class="[
            'w-full py-3 px-6 rounded-full font-medium flex items-center justify-between transition-all mb-6',
            item.popular
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-white text-black border border-gray-300 hover:border-gray-400'
          ]"
        >
          <span>{{ item.cta }}</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>

        <!-- No Credit Card -->
        <div class="flex items-center text-sm text-gray-600 mb-8">
          <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
          </svg>
          No credit card required
        </div>

        <!-- Features List -->
        <ul class="space-y-3">
          <li
            v-for="(feature, fIdx) in item.features"
            :key="fIdx"
            class="flex items-start text-sm text-gray-700"
          >
            <svg class="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

/* global defineProps */
const props = defineProps({
  pageData: { type: Object, default: () => ({}) },
  maxItems: { type: Number, default: 3 } // <-- Nilai default adalah 3
})



console.log('maxItems:', props.maxItems)
const billingType = ref('monthly')
const items = ref([])

function safeParse(maybeJson) {
  if (typeof maybeJson !== 'string') return maybeJson ?? {}
  try { return JSON.parse(maybeJson) } catch { return maybeJson }
}

function extractOne(raw, index) {
  const src = safeParse(raw?.value ?? raw ?? {})
  
  // Default data jika backend belum siap - sesuai gambar
  const defaults = [
    {
      title: 'Basic Package',
      description: 'Perfect for individuals, freelancers, small teams starting the Starter plan.',
      price: 30,
      cta: 'Start 14th Days Free Trial',
      popular: false,
      icon: 'gift',
      features: [
        'Maximum 1 User Services',
        'Basic Dashboard Access',
        'Limited Integrations',
        'Community Support',
        'Simple Collaboration'
      ]
    },
    {
      title: 'Professional Package',
      description: 'Best for growing businesses that need more power and flexibility.',
      price: 49,
      cta: 'Start 10th Days Free Trial',
      popular: true,
      icon: 'rocket',
      features: [
        'Maximum 3 User Services',
        'Basic Dashboard Access',
        'Limited Integrations',
        'Community Support',
        'Simple Collaboration'
      ]
    },
    {
      title: 'Enterprise Package',
      description: 'Tailored for large teams and complex needs for SaaS services.',
      price: 98,
      cta: 'Get Started This Package',
      popular: false,
      icon: 'diamond',
      features: [
        'Maximum 7 User Services',
        'Basic Dashboard Access',
        'Limited Integrations',
        'Community Support',
        'Simple Collaboration'
      ]
    }
  ]

  return {
    title: src.title ?? defaults[index]?.title ?? '',
    description: src.description ?? defaults[index]?.description ?? '',
    price: src.price ?? defaults[index]?.price ?? 0,
    cta: src.cta ?? defaults[index]?.cta ?? 'Get Started',
    popular: src.popular ?? defaults[index]?.popular ?? false,
    icon: src.icon ?? defaults[index]?.icon ?? 'gift',
    features: src.features ?? defaults[index]?.features ?? []
  }
}

function pickSource(data) {
  return (
    data?.pricing_packages ??
    data?.strategy_consultant3 ??
    data?.strategy_consultant ??
    data?.packages ??
    data
  )
}

function rebuildItems(data) {
  const raw = pickSource(data)
  let candidate = raw?.value ?? raw

  if (typeof candidate === 'string') candidate = safeParse(candidate)

  if (Array.isArray(candidate)) {
    items.value = candidate.map((item, idx) => extractOne(item, idx))
  } else {
    // Jika data dari backend belum ready, gunakan default
    items.value = [
      extractOne({}, 0),
      extractOne({}, 1),
      extractOne({}, 2)
    ]
  }
}

const visibleItems = computed(() => items.value.slice(0, props.maxItems))

watch(() => props.pageData, (val) => rebuildItems(val || {}), { immediate: true })
</script>

<style scoped>
/* Tambahan styling jika diperlukan */
</style>