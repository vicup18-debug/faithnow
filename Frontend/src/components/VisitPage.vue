<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['open-course']);

// This would normally come from a database. 
// For now, we simulate that the user has passed Basic 1 (score 85%) but not the rest.
const userProgress = ref({
  completedLevels: [1], // IDs of levels passed
  currentLevel: 2,      // The level they are currently working on
});

const levels = [
  { 
    id: 1, 
    title: "Basic 1: Foundation", 
    desc: "Understanding Salvation, the Holy Spirit, and the new birth.",
    color: "bg-yellow-400",
    icon: "🌱",
    modulesCount: 8
  },
  { 
    id: 2, 
    title: "Basic 2: Maturity", 
    desc: "Learning how to pray, study the Word, and overcome temptation.",
    color: "bg-purple-500 text-white",
    icon: "🌿",
    modulesCount: 8
  },
  { 
    id: 3, 
    title: "Basic 3: Ministry", 
    desc: "Discovering your spiritual gifts and learning how to serve.",
    color: "bg-blue-500 text-white",
    icon: "🔥",
    modulesCount: 8
  },
  { 
    id: 4, 
    title: "Basic 4: Leadership", 
    desc: "How to lead others to Christ and disciple men.",
    color: "bg-black text-white",
    icon: "👑",
    modulesCount: 8
  },
  { 
    id: 5, 
    title: "Basic 5: Commission", 
    desc: "Church planting, global evangelism, and apostolic work.",
    color: "bg-red-600 text-white",
    icon: "🌎", // New Icon
    modulesCount: 8
  }
];

const isLocked = (levelId: number) => {
  // Level 1 is always open. 
  // Others are open only if the PREVIOUS level is in the 'completedLevels' array.
  if (levelId === 1) return false;
  return !userProgress.value.completedLevels.includes(levelId - 1);
};

const handleLevelClick = (levelId: number) => {
  if (isLocked(levelId)) {
    alert("Please pass the assessment for the previous level with at least 70% to unlock this class.");
    return;
  }
  emit('open-course', levelId);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans text-gray-900">
    
    <div class="bg-white pb-16 pt-10 rounded-b-[3rem] shadow-sm relative overflow-hidden">
      <img src="/africa-map.jpeg" class="absolute top-0 right-0 w-1/2 opacity-10 rotate-12 pointer-events-none" />

      <div class="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
        <p class="text-purple-600 font-bold uppercase tracking-widest text-xs mb-4">The Discipleship Pathway</p>
        <h1 class="text-5xl md:text-7xl font-black tracking-tight mb-6">
          The 5 Pillars <br />
          <span class="relative inline-block">
            of Faith
            <svg class="absolute -bottom-2 left-0 w-full h-3 text-yellow-400" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
            </svg>
          </span>
        </h1>
        <p class="text-gray-500 text-xl max-w-2xl">
          Complete the 8 modules and pass the assessment (70%+) to unlock the next pillar.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div v-for="level in levels" :key="level.id" 
             @click="handleLevelClick(level.id)"
             class="group relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer"
             :class="isLocked(level.id) ? 'opacity-70 grayscale hover:opacity-100' : 'hover:shadow-2xl'"
        >
          
          <div class="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition"></div>
          
          <div class="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div class="flex justify-between items-start mb-6">
                <div :class="level.color" class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  {{ isLocked(level.id) ? '🔒' : level.icon }}
                </div>
                <div class="px-4 py-1 rounded-full text-xs font-black uppercase tracking-wide"
                     :class="isLocked(level.id) ? 'bg-gray-200 text-gray-500' : 'bg-green-100 text-green-700'">
                  {{ isLocked(level.id) ? 'Locked' : 'Open' }}
                </div>
              </div>
              
              <h3 class="text-3xl font-black mb-4 group-hover:text-purple-600 transition">{{ level.title }}</h3>
              <p class="text-gray-500 font-medium leading-relaxed">{{ level.desc }}</p>
            </div>

            <div class="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
              <span class="font-bold text-sm text-gray-400">{{ level.modulesCount }} Modules + Exam</span>
              <button class="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition">
                ➝
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>