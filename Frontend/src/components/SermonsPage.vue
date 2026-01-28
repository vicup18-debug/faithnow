<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const activeCategory = ref('All');
const categories = ['All', 'Sunday Service', 'Youth', 'Worship', 'Conferences'];

const sermons = [
  { title: "The Power of Silence", date: "Oct 24", author: "Pastor Victor", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop" },
  { title: "Walking on Water", date: "Oct 17", author: "Pastor Sarah", img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2069&auto=format&fit=crop" },
  { title: "Kingdom Finance", date: "Oct 10", author: "Pastor Victor", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop" },
  { title: "Family Matters", date: "Oct 03", author: "Pastor John", img: "/happy-people.jpg" }, // Using your local image
  { title: "Night of Bliss", date: "Sep 29", author: "Worship Team", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" },
  { title: "Foundations", date: "Sep 22", author: "Pastor Victor", img: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=2070&auto=format&fit=crop" },
];
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 pt-10 pb-20">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="text-center mb-12">
        <h1 class="text-5xl md:text-6xl font-black tracking-tight mb-6">
          The <span class="text-purple-600">Archive</span>
        </h1>
        <p class="text-gray-500 max-w-2xl mx-auto text-lg">
          Dive deep into our library of teachings, worship sessions, and special events.
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
        <div class="relative w-full md:w-1/2">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search titles, preachers..." 
            class="w-full bg-gray-50 border-2 border-transparent focus:border-purple-500 focus:bg-white rounded-2xl px-6 py-4 outline-none font-bold text-gray-700 transition"
          />
          <span class="absolute right-6 top-4 text-gray-400">🔍</span>
        </div>

        <div class="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="activeCategory = cat"
            class="px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition"
            :class="activeCategory === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(sermon, index) in sermons" :key="index" class="group cursor-pointer">
          
          <div class="relative aspect-video rounded-3xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition duration-500">
            <img :src="sermon.img" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
            
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition flex items-center justify-center">
              <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">▶</div>
            </div>
            
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-black uppercase">
              {{ sermon.date }}
            </div>
          </div>

          <div>
            <h3 class="text-xl font-black leading-tight group-hover:text-purple-600 transition">{{ sermon.title }}</h3>
            <p class="text-gray-400 font-medium text-sm mt-1">{{ sermon.author }}</p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>