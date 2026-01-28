<script setup lang="ts">
import { ref } from 'vue';
import HeroSection from './components/herosection.vue'
import ImpactSection from './components/ImpactSection.vue'
import LatestContent from './components/LatestContent.vue'
import AuthModal from './components/AuthModal.vue'
import UserDashboard from './components/UserDashboard.vue'
import VideoPlayer from './components/VideoPlayer.vue'
import AdminDashboard from './components/AdminDashboard.vue'

// Pages
import SermonsPage from './components/SermonsPage.vue'
import VisitPage from './components/VisitPage.vue'
import EventsPage from './components/EventsPage.vue'
import CourseLevel from './components/CourseLevel.vue'

// State
const currentView = ref('home'); 
const isAuthOpen = ref(false);
const isVideoOpen = ref(false);
const currentVideoUrl = ref('');
// 👇 NEW: Track which course is active
const currentCourseId = ref(1); 

// Actions
const handleLoginSuccess = () => {
  isAuthOpen.value = false;
  currentView.value = 'dashboard';
  window.scrollTo(0,0);
}

const navigateTo = (page: string) => {
  currentView.value = page;
  window.scrollTo(0,0);
}

// 👇 UPDATED: Handle opening a specific course
const handleOpenCourse = (id: number) => {
  currentCourseId.value = id;
  currentView.value = 'course';
  window.scrollTo(0,0);
}

const openPlayer = (url?: string) => {
  if (url) {
    currentVideoUrl.value = url;
  } else {
    currentVideoUrl.value = 'https://www.youtube.com/embed/b44NjrilgQ8'; 
  }
  isVideoOpen.value = true;
}
</script>

<template>
  <div class="w-full overflow-x-hidden relative">
    
    <VideoPlayer v-if="isVideoOpen" :url="currentVideoUrl" @close="isVideoOpen = false" />
    <AuthModal v-if="isAuthOpen" @close="isAuthOpen = false" @login-success="handleLoginSuccess" />

    <nav v-if="currentView !== 'home'" class="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full bg-white">
      <div class="flex items-center gap-2 cursor-pointer" @click="navigateTo('home')">
        <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">F</div>
        <span class="text-xl font-bold tracking-tight">Faith<span class="text-purple-600">Now</span></span>
      </div>
      <div class="hidden md:flex items-center space-x-8 font-medium text-sm">
        <button @click="navigateTo('sermons')" class="hover:text-purple-600 transition">Library</button>
        <button @click="navigateTo('home')" class="hover:text-purple-600 transition">About</button>
        <button @click="navigateTo('visit')" class="hover:text-purple-600 transition">Academy</button>
        <button @click="navigateTo('events')" class="hover:text-purple-600 transition">Events</button>
      </div>
      <div class="hidden md:flex items-center space-x-4">
        <div @click="isAuthOpen = true" class="w-8 h-8 rounded-full bg-orange-100 overflow-hidden border border-orange-200 cursor-pointer hover:ring-2 ring-purple-500 transition">
          <img src="/Victor.jpg" alt="User" class="object-cover object-top h-full w-full" />
        </div>
      </div>
    </nav>

    <div v-if="currentView === 'home'">
      <HeroSection 
        @open-logic="isAuthOpen = true" 
        @nav-sermons="navigateTo('sermons')"
        @nav-visit="navigateTo('visit')"
        @nav-events="navigateTo('events')" 
        @nav-admin="navigateTo('admin')"
      />

      <ImpactSection />
      <LatestContent />
    </div>

    <div v-else-if="currentView === 'dashboard'">
       <UserDashboard @play-video="openPlayer" />
    </div>

    <div v-else-if="currentView === 'sermons'">
      <SermonsPage />
    </div>

    <div v-else-if="currentView === 'visit'">
      <VisitPage @open-course="handleOpenCourse" />
    </div>

    <div v-else-if="currentView === 'events'">
      <EventsPage />
    </div>

    <div v-else-if="currentView === 'course'">
      <CourseLevel 
        :course-id="currentCourseId"
        @back="navigateTo('visit')" 
        @play-lesson="openPlayer" 
      />
    </div>

    <div v-else-if="currentView === 'admin'">
      <AdminDashboard @close="currentView = 'home'" />
    </div>

  </div>
</template>