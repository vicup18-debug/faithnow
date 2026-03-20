<script setup lang="ts">
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

// UPDATED: Added 'nav-admin' to the list of events
const emit = defineEmits(['open-login', 'nav-sermons', 'nav-visit', 'nav-events', 'nav-admin']);

const navigateAndClose = (event: 'nav-sermons' | 'nav-visit' | 'nav-events' | 'open-login' | 'nav-admin') => {
  isMobileMenuOpen.value = false;
  emit(event);
};
</script>

<template>
  <div class="relative w-full min-h-screen bg-white overflow-x-hidden font-sans text-gray-900">
    
    <nav class="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
      <div class="flex items-center gap-2 cursor-pointer" @click="$emit('nav-visit')"> 
        <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">F</div>
        <span class="text-xl font-bold tracking-tight">Faith<span class="text-purple-600">Now</span></span>
      </div>
      
      <div class="hidden md:flex items-center space-x-8 font-medium text-sm">
        <a href="#" @click.prevent="$emit('nav-sermons')" class="hover:text-purple-600 transition">Library</a>
        <a href="#" class="hover:text-purple-600 transition">About</a>
        <a href="#" @click.prevent="$emit('nav-visit')" class="hover:text-purple-600 transition">Academy</a>
        <a href="#" @click.prevent="$emit('nav-events')" class="hover:text-purple-600 transition">Events</a>
      </div>

      <div class="hidden md:flex items-center space-x-4">
        <button @click="$emit('nav-admin')" class="w-8 h-8 rounded-full bg-black text-white font-bold text-xs flex items-center justify-center hover:bg-purple-600 transition shadow-lg" title="Admin Panel">
          A
        </button>
        
        <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">🔍</button>
        <div @click="$emit('open-login')" class="w-8 h-8 rounded-full bg-orange-100 overflow-hidden border border-orange-200 cursor-pointer hover:ring-2 ring-purple-500 transition shadow-sm">
          <img src="/Victor.jpg" alt="User" class="object-cover object-top h-full w-full" />
        </div>
      </div>
      
      <button @click="isMobileMenuOpen = true" class="md:hidden text-2xl p-2">☰</button>
    </nav>

    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-[60] flex justify-end">
        <div @click="isMobileMenuOpen = false" class="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div class="relative w-3/4 max-w-sm h-full bg-white shadow-2xl p-8 flex flex-col justify-between">
          <div class="flex justify-end"><button @click="isMobileMenuOpen = false" class="text-3xl text-gray-400 hover:text-black">&times;</button></div>
          <div class="flex flex-col space-y-8 mt-10">
            <button @click="navigateAndClose('nav-admin')" class="text-left text-2xl font-black tracking-tight text-red-600 hover:text-red-800 transition">Admin Panel</button>
            <button @click="navigateAndClose('nav-sermons')" class="text-left text-2xl font-black tracking-tight hover:text-purple-600 transition">Library</button>
            <button class="text-left text-2xl font-black tracking-tight hover:text-purple-600 transition">About</button>
            <button @click="navigateAndClose('nav-visit')" class="text-left text-2xl font-black tracking-tight hover:text-purple-600 transition">Academy</button>
            <button @click="navigateAndClose('nav-events')" class="text-left text-2xl font-black tracking-tight hover:text-purple-600 transition">Events</button>
          </div>
          <div class="mb-10">
             <button @click="navigateAndClose('open-login')" class="w-full py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg shadow-purple-200 active:scale-95 transition">Sign In</button>
          </div>
        </div>
      </div>
    </transition>

    <div class="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20 md:pt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[85vh]">
      <div class="relative z-20 order-2 md:order-1 text-center md:text-left">
        <h1 class="text-6xl md:text-7xl font-black tracking-tight leading-none mb-6 text-gray-900">
          Faith for <br />
          <span class="relative inline-block">
            a new
            <svg class="absolute -bottom-2 left-0 w-full h-3 text-yellow-400" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
            </svg>
          </span> <br />
          generation
        </h1>
        <div class="flex flex-col gap-4 mb-8">
          <p class="font-bold text-sm uppercase tracking-wider text-purple-600">More than a website. It's a movement.</p>
          <p class="text-gray-500 text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
            Access structured biblical training, connect with a global community, and find the resources you need to grow—anytime, anywhere.
          </p>
        </div>
        <div class="relative flex flex-col md:flex-row items-center gap-6 mt-8">
          <button @click="$emit('nav-visit')" class="px-10 py-4 bg-[#FCD34D] hover:bg-yellow-400 text-gray-900 font-bold rounded-2xl shadow-lg shadow-yellow-200 transition transform hover:-translate-y-1">Start Learning</button>
          <button @click="$emit('nav-sermons')" class="flex items-center gap-2 font-bold text-gray-700 hover:text-purple-600 transition">Explore Library <span>⤵</span></button>
        </div>
      </div>
      <div class="relative z-10 order-1 md:order-2 h-[500px] flex items-center justify-center">
        <div class="absolute top-10 right-0 w-[400px] h-[400px] bg-[#8B5CF6] rounded-[4rem] transform rotate-6 mix-blend-multiply opacity-90 animate-blob"></div>
        <div class="absolute top-0 left-10 w-32 h-32 bg-[#FCD34D] rounded-full mix-blend-multiply opacity-90 animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-10 right-10 w-24 h-24 bg-pink-300 rounded-[2rem] mix-blend-multiply opacity-90 animate-blob animation-delay-4000"></div>
        <div class="relative w-[380px] h-[480px] overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition duration-500">
          <img src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop" alt="Happy Believer" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <div class="bg-gray-50 py-24 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-black mb-4">Why FaithNow?</h2>
          <p class="text-gray-500 max-w-2xl mx-auto">We are reimagining evangelism for the digital age. No walls, just access.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition duration-300">
            <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🎓</div>
            <h3 class="text-xl font-black mb-2">Structured Learning</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Stop guessing. Follow our Basic 1-4 curriculum to build a solid theological foundation.</p>
          </div>
          <div class="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition duration-300">
            <div class="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl mb-6">🌍</div>
            <h3 class="text-xl font-black mb-2">Global Reach</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Designed for Africa and the world. Content that relates to your context and culture.</p>
          </div>
          <div class="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition duration-300">
            <div class="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-3xl mb-6">📱</div>
            <h3 class="text-xl font-black mb-2">Digital First</h3>
            <p class="text-gray-500 text-sm leading-relaxed">Optimized for your phone. Watch sermons, read notes, and track progress on the go.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white py-24 relative">
       <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
         <div class="relative">
           <img src="/africa-map.jpeg" class="w-full object-contain rounded-3xl opacity-80" />
           <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
         </div>
         <div>
           <p class="text-purple-600 font-bold uppercase tracking-widest text-xs mb-2">Our Vision</p>
           <h2 class="text-4xl md:text-6xl font-black leading-tight mb-6">To Equip the <br/> Saints for Work.</h2>
           <p class="text-gray-500 text-lg mb-8">
             We believe that every believer is a minister. Our goal is not just to preach to you, but to train you to reach others. This platform is your armory.
           </p>
           <button @click="$emit('nav-visit')" class="border-b-2 border-black font-bold hover:text-purple-600 hover:border-purple-600 transition pb-1">See the Curriculum &rarr;</button>
         </div>
       </div>
    </div>

    <div class="bg-black text-white py-12 px-6 text-center">
      <h2 class="text-2xl font-black mb-4">Ready to go deeper?</h2>
      <button @click="$emit('open-login')" class="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">Create Free Account</button>
      <div class="mt-8 text-gray-600 text-xs">
        &copy; 2025 FaithNow Global. All rights reserved.
      </div>
    </div>

  </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease-in-out; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1) rotate(6deg); }
  33% { transform: translate(30px, -50px) scale(1.1) rotate(10deg); }
  66% { transform: translate(-20px, 20px) scale(0.9) rotate(2deg); }
  100% { transform: translate(0px, 0px) scale(1) rotate(6deg); }
}
.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
</style>