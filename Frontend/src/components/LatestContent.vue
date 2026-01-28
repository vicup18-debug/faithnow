<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('Sermons');
const tabs = ['Sermons', 'Events', 'Series', 'Music'];

const items = [
  {
    title: 'The Sound of Grace',
    category: 'Sunday Service',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
    date: 'Oct 24, 2025',
    tag: 'Trending'
  },
  {
    title: 'Love Concert',
    category: 'Event',
    image: '/Gods-People.jpeg',
    date: 'Nov 02, 2025',
    tag: 'Upcoming'
  },
  {
    title: 'Modern Family', 
    category: 'Teaching Series',
    // 👇 UPDATED: Now using your "Happy People" image
    image: '/Happy-people.jpeg',
    date: 'Stream Now',
    tag: 'New'
  }
];
</script>

<template>
  <section class="py-24 bg-white font-sans text-gray-900">
    <div class="max-w-7xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <p class="text-pink-500 font-bold uppercase tracking-wider text-xs mb-2">Be Inspired</p>
        <h2 class="text-4xl md:text-5xl font-black tracking-tight mb-8">
          Our Latest <span class="relative inline-block">
            Content
            <span class="absolute -right-4 top-0 text-yellow-400 text-6xl leading-[0]">.</span>
          </span>
        </h2>

        <div class="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-400">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            @click="activeTab = tab"
            class="transition hover:text-gray-900 border-b-2 pb-1"
            :class="activeTab === tab ? 'text-gray-900 border-black' : 'border-transparent'"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div v-for="(item, index) in items" :key="index" class="group cursor-pointer">
          
          <div class="relative overflow-hidden rounded-[2.5rem] bg-gray-100 mb-6 aspect-[4/5] shadow-sm group-hover:shadow-xl transition-all duration-300">
            <img 
              :src="item.image" 
              :alt="item.title" 
              class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
            />
            
            <div class="absolute bottom-6 left-6 bg-white px-4 py-2 rounded-full font-bold text-sm shadow-md">
              {{ item.date }}
            </div>

            <div class="absolute top-6 right-6 bg-[#FCD34D] text-gray-900 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wide">
              {{ item.tag }}
            </div>
          </div>

          <div class="flex justify-between items-start px-2">
            <div>
              <p class="text-gray-400 text-xs font-bold uppercase mb-1 tracking-wider">{{ item.category }}</p>
              <h3 class="text-xl font-black tracking-tight group-hover:text-purple-600 transition">{{ item.title }}</h3>
            </div>
            
            <button class="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition hover:border-black">
              ▶
            </button>
          </div>

        </div>
      </div>
      
      <div class="text-center mt-20">
        <button class="px-10 py-4 border-2 border-gray-100 hover:border-black rounded-full font-bold transition transform hover:-translate-y-1">
          View All Library
        </button>
      </div>

    </div>
  </section>
</template>