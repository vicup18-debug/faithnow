<script setup>
import { ref } from 'vue';

const soulsWon = ref(12);
const streak = ref(5);
const recentSouls = ref([
    { name: 'Sarah J.', status: 'Saved', time: '2 hours ago' },
    { name: 'Michael B.', status: 'Baptized', time: 'Yesterday' }
]);
</script>

<template>
  <div class="p-6 pb-24 max-w-md mx-auto pt-12">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-kingdom-dark tracking-tight">Kingdom Impact</h1>
      <p class="text-slate-500 mt-1">Good afternoon, Evangelist.</p>
    </header>

    <div class="grid grid-cols-2 gap-4 mb-8">
        <div class="col-span-2 bg-white/60 backdrop-blur-lg border border-white/50 p-6 rounded-3xl shadow-glass relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-24 h-24 bg-kingdom-blue/10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
            <p class="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Souls</p>
            <h2 class="text-5xl font-bold text-kingdom-blue mt-2">{{ soulsWon }}</h2>
        </div>

        <div class="bg-white/60 backdrop-blur-lg border border-white/50 p-5 rounded-3xl shadow-glass">
            <p class="text-slate-500 text-xs uppercase">Streak</p>
            <div class="flex items-baseline gap-1 mt-1">
                <span class="text-3xl font-bold text-kingdom-dark">{{ streak }}</span>
                <span class="text-sm text-kingdom-gold font-semibold">Days 🔥</span>
            </div>
        </div>

        <div class="bg-white/60 backdrop-blur-lg border border-white/50 p-5 rounded-3xl shadow-glass">
            <p class="text-slate-500 text-xs uppercase">Retention</p>
             <div class="flex items-baseline gap-1 mt-1">
                <span class="text-3xl font-bold text-kingdom-dark">85</span>
                <span class="text-sm text-slate-400">%</span>
            </div>
        </div>
    </div>

    <h3 class="text-lg font-semibold text-kingdom-dark mb-4 px-1">Recent Harvest</h3>
    <div class="space-y-3">
        <div v-for="soul in recentSouls" :key="soul.name" class="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-kingdom-blue/10 flex items-center justify-center text-kingdom-blue font-bold">
                    {{ soul.name.charAt(0) }}
                </div>
                <div>
                    <p class="font-semibold text-slate-800">{{ soul.name }}</p>
                    <p class="text-xs text-slate-500">{{ soul.status }}</p>
                </div>
            </div>
            <span class="text-xs text-slate-400">{{ soul.time }}</span>
        </div>
    </div>

    <button class="fixed bottom-24 right-6 bg-kingdom-blue text-white w-16 h-16 rounded-full shadow-holy flex items-center justify-center text-3xl transition-transform hover:scale-110 hover:rotate-90 active:scale-95 z-40">
        +
    </button>
  </div>
</template>