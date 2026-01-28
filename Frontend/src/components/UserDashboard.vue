<script setup lang="ts">
import { ref } from 'vue';

// Define the event to tell App.vue to play the video
const emit = defineEmits(['play-video']);

// --- PRAYER MODAL LOGIC ---
const isPrayerModalOpen = ref(false);
const prayerText = ref('');
const submitStatus = ref<'idle' | 'sending' | 'success'>('idle');

const handlePrayerSubmit = () => {
  if (!prayerText.value) return;

  // 1. Set status to sending
  submitStatus.value = 'sending';

  // 2. Simulate API call
  setTimeout(() => {
    submitStatus.value = 'success';
    prayerText.value = ''; 

    // 3. Close modal after showing success message
    setTimeout(() => {
      isPrayerModalOpen.value = false;
      submitStatus.value = 'idle'; 
    }, 2000);
  }, 1500);
};

// --- USER DATA ---
const user = {
  name: "Victor", // Updated Name
  avatar: "/Victor.jpg", // Updated Image (Must be in your 'public' folder)
  streak: 12, // bumped up the streak for Victor!
};

const myList = [
  { title: "The Power of Silence", author: "Pastor John", progress: 75, img: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop" },
  { title: "Walking on Water", author: "Pastor Sarah", progress: 30, img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2069&auto=format&fit=crop" },
];

const recommended = [
  { title: "Kingdom Finance", date: "New Series", color: "bg-yellow-100 text-yellow-800" },
  { title: "Relationship Goals", date: "Trending", color: "bg-purple-100 text-purple-800" },
  { title: "Healing School", date: "Live Now", color: "bg-red-100 text-red-800" },
];
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 pb-20 relative">
    
    <div class="bg-gray-50 px-6 pt-12 pb-16 rounded-b-[3rem] relative overflow-hidden">
      <div class="absolute top-[-50px] right-[-50px] w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
        
        <div class="flex items-center gap-6">
          <div class="w-24 h-24 rounded-full bg-white p-1 shadow-lg shrink-0">
            <img :src="user.avatar" alt="User" class="w-full h-full rounded-full bg-gray-200 object-cover object-top" />
          </div>
          <div>
            <h1 class="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
              Good Morning, <span class="text-purple-600">{{ user.name }}</span>
            </h1>
            <p class="text-gray-500 font-medium">Ready to grow your faith today?</p>
          </div>
        </div>

        <div class="bg-white px-8 py-4 rounded-2xl shadow-sm flex items-center gap-4 border border-gray-100">
          <div class="text-center">
            <div class="text-3xl font-black text-orange-500">🔥 {{ user.streak }}</div>
            <div class="text-xs font-bold uppercase text-gray-400 tracking-wider">Day Streak</div>
          </div>
          <div class="h-10 w-px bg-gray-200"></div>
          <div class="text-center">
            <div class="text-3xl font-black text-blue-500">289</div>
            <div class="text-xs font-bold uppercase text-gray-400 tracking-wider">Sermons</div>
          </div>
        </div>

      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
      
      <div class="lg:col-span-2 space-y-8">
        <h2 class="text-2xl font-black flex items-center gap-2">
          <span>▶</span> Continue Watching
        </h2>

        <div v-for="(item, index) in myList" :key="index" class="group flex items-center gap-6 bg-white p-4 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-purple-100 transition duration-300 cursor-pointer">
          <div 
            @click="$emit('play-video')" 
            class="w-32 h-24 rounded-2xl overflow-hidden relative shadow-md cursor-pointer shrink-0"
          >
            <img :src="item.img" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition">▶</div>
            </div>
          </div>

          <div class="flex-1 pr-4">
            <h3 class="text-lg font-bold group-hover:text-purple-600 transition">{{ item.title }}</h3>
            <p class="text-sm text-gray-500 mb-3">{{ item.author }}</p>
            
            <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div class="bg-purple-500 h-full rounded-full" :style="{ width: item.progress + '%' }"></div>
            </div>
            <p class="text-xs text-right mt-1 font-bold text-gray-400">{{ item.progress }}% Complete</p>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        
        <div>
          <h2 class="text-xl font-bold mb-4">Recommended</h2>
          <div class="flex flex-col gap-3">
            <div v-for="rec in recommended" :key="rec.title" class="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md transition border border-transparent hover:border-gray-100 cursor-pointer">
              <span class="font-bold text-gray-700">{{ rec.title }}</span>
              <span :class="rec.color" class="px-3 py-1 rounded-full text-xs font-black uppercase">{{ rec.date }}</span>
            </div>
          </div>
        </div>

        <div 
          @click="isPrayerModalOpen = true"
          class="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition"
        >
          <div class="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
          
          <h3 class="text-2xl font-black mb-2 relative z-10">Need Prayer?</h3>
          <p class="text-yellow-100 text-sm mb-6 relative z-10 font-medium">
            Our team is ready to stand in faith with you. Send a request now.
          </p>
          <button class="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-sm shadow-md group-hover:bg-gray-50 transition pointer-events-none">
            Write Request ➝
          </button>
        </div>

      </div>

    </div>

    <div v-if="isPrayerModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <div @click="isPrayerModalOpen = false" class="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"></div>

      <div class="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl animate-scale-in flex flex-col items-center text-center">
        
        <button @click="isPrayerModalOpen = false" class="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl">&times;</button>

        <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mb-6 text-orange-500">
          🙏
        </div>

        <div v-if="submitStatus === 'success'" class="animate-fade-in">
          <h3 class="text-2xl font-black text-gray-900 mb-2">Request Received</h3>
          <p class="text-gray-500 mb-6">We are standing in faith with you. A pastor will review this shortly.</p>
          <div class="text-green-500 font-bold text-lg">✓ Sent Successfully</div>
        </div>

        <div v-else class="w-full">
          <h3 class="text-2xl font-black text-gray-900 mb-2">How can we pray?</h3>
          <p class="text-gray-500 mb-6 text-sm">Share your burden. You are not alone.</p>

          <textarea 
            v-model="prayerText"
            placeholder="Type your prayer request here..." 
            class="w-full h-32 bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-6 focus:ring-2 focus:ring-orange-400 focus:bg-white transition outline-none resize-none"
          ></textarea>

          <button 
            @click="handlePrayerSubmit"
            :disabled="submitStatus === 'sending' || !prayerText"
            class="w-full py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="submitStatus === 'sending'">Sending...</span>
            <span v-else>Send Request</span>
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* Modal Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>