<script setup>
import { ref } from 'vue';

const testimonies = ref([
    { id: 1, text: "The Holy Ghost moved in the bus today. The driver parked to receive Christ!", author: "Sis. Mary", amenCount: 24, claimed: false },
    { id: 2, text: "Healed of migraine instantly after prayer.", author: "Bro. David", amenCount: 12, claimed: false },
    { id: 3, text: "My entire department at work is shifting. Two salvations this week.", author: "Evan. John", amenCount: 56, claimed: true },
]);

const toggleAmen = (id) => {
    const t = testimonies.value.find(t => t.id === id);
    if(t.claimed) { t.amenCount--; t.claimed = false; }
    else { t.amenCount++; t.claimed = true; }
};
</script>

<template>
  <div class="p-6 pb-24 max-w-md mx-auto pt-12">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-kingdom-dark">Testimonies</h1>
      <p class="text-slate-500">Fuel for your faith.</p>
    </header>

    <div class="columns-1 gap-6 space-y-6">
        <div v-for="item in testimonies" :key="item.id" class="break-inside-avoid bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-holy transition-shadow duration-300">
            <p class="text-slate-600 leading-relaxed mb-4">"{{ item.text }}"</p>
            
            <div class="flex items-center justify-between border-t border-slate-50 pt-4">
                <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-slate-100"></div>
                    <span class="text-xs font-semibold text-slate-400">{{ item.author }}</span>
                </div>
                
                <button @click="toggleAmen(item.id)" 
                    :class="item.claimed ? 'text-kingdom-gold bg-kingdom-gold/10' : 'text-slate-400 hover:text-kingdom-gold'"
                    class="flex items-center gap-1 px-3 py-1 rounded-full transition-all">
                    <span class="text-lg">★</span>
                    <span class="text-xs font-bold">{{ item.amenCount }}</span>
                    <span class="text-xs">{{ item.claimed ? 'Amen!' : 'Amen' }}</span>
                </button>
            </div>
        </div>
    </div>
  </div>
</template>