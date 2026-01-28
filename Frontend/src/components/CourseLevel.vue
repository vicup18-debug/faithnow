<script setup lang="ts">
import { ref, computed } from 'vue';
import FinalExam from './FinalExam.vue';

const props = defineProps<{
  courseId: number
}>();

const emit = defineEmits(['back', 'play-lesson']);

// --- STATE ---
const examMode = ref(false); 
const examScore = ref(0);
const examTaken = ref(false);

// --- THE CURRICULUM DATABASE (Basic 1 - Basic 5) ---
const coursesData: Record<number, any> = {
  // === BASIC 1: FOUNDATION ===
  1: {
    id: 1,
    title: "Basic 1: Foundation",
    progress: 12, 
    description: "The spiritual bricks that hold up your life. Understanding your new identity in Christ.",
    gradient: "from-gray-900 via-yellow-900 to-black",
    accentColor: "text-yellow-400",
    modules: [
      { id: 1, title: "1. The Great Exchange", desc: "Understanding Sin and Salvation", duration: "12 min", status: "completed", videoUrl: "https://youtu.be/Xc4Ik55D1AA?si=fEODjRgtTHE7Q2DP" },
      { id: 2, title: "2. New Creation Realities", desc: "What actually happened?", duration: "18 min", status: "current", videoUrl: "https://youtu.be/qJbZlrAQuNs?si=_GjINfQPVclzaKol" },
      { id: 3, title: "3. Water Baptism", desc: "Why we do it.", duration: "15 min", status: "locked", videoUrl: "https://youtu.be/RoH-GKkMC0Y?si=SWvUdI7SilYIO_eq" },
      { id: 4, title: "4. Who is the Holy Spirit?", desc: "The third person.", duration: "20 min", status: "locked", videoUrl: "https://youtu.be/lL4OsIq1lA8?si=F45y3WKF_SzhKGd_" },
      { id: 5, title: "5. Tongues: The Doorway", desc: "Evidence of the Spirit.", duration: "25 min", status: "locked", videoUrl: "https://www.youtube.com/live/-Oa_UDy5IuE?si=dng6VU7c87Ze92AG" },
      { id: 6, title: "6. The Word of God", desc: "Reading the Bible.", duration: "22 min", status: "locked", videoUrl: "" },
      { id: 7, title: "7. Prayer 101", desc: "Communication.", duration: "15 min", status: "locked", videoUrl: "" },
      { id: 8, title: "8. The Local Church", desc: "Survival in community.", duration: "18 min", status: "locked", videoUrl: "" },
    ]
  },

  // === BASIC 2: MATURITY ===
  2: {
    id: 2,
    title: "Basic 2: Maturity",
    progress: 0, 
    description: "Moving from milk to meat. Developing the habits of a strong believer.",
    gradient: "from-gray-900 via-purple-900 to-black",
    accentColor: "text-purple-400",
    modules: [
      { id: 1, title: "1. The Quiet Time", desc: "Mastering daily devotion.", duration: "15 min", status: "current", videoUrl: "" }, // Paste Link Here
      { id: 2, title: "2. Types of Prayer", desc: "Intercession vs Petition.", duration: "20 min", status: "locked", videoUrl: "" },
      { id: 3, title: "3. Bible Study Methods", desc: "Exegesis basics.", duration: "25 min", status: "locked", videoUrl: "" },
      { id: 4, title: "4. Fasting Secrets", desc: "Power through denial.", duration: "18 min", status: "locked", videoUrl: "" },
      { id: 5, title: "5. Overcoming Temptation", desc: "Winning the war within.", duration: "30 min", status: "locked", videoUrl: "" },
      { id: 6, title: "6. Fruit of the Spirit", desc: "Character development.", duration: "22 min", status: "locked", videoUrl: "" },
      { id: 7, title: "7. Understanding Faith", desc: "The currency of the Kingdom.", duration: "15 min", status: "locked", videoUrl: "" },
      { id: 8, title: "8. Divine Guidance", desc: "Hearing God's voice.", duration: "40 min", status: "locked", videoUrl: "" },
    ]
  },

  // === BASIC 3: MINISTRY ===
  3: {
    id: 3,
    title: "Basic 3: Ministry",
    progress: 0,
    description: "Discovering your gifts and finding your place of service in the House.",
    gradient: "from-blue-900 via-blue-700 to-black",
    accentColor: "text-blue-400",
    modules: [
      { id: 1, title: "1. Soul Winning", desc: "The heartbeat of God.", duration: "20 min", status: "locked", videoUrl: "" },
      { id: 2, title: "2. Spiritual Gifts", desc: "Discerning your grace.", duration: "25 min", status: "locked", videoUrl: "" },
      { id: 3, title: "3. Believer's Authority", desc: "Walking in dominion.", duration: "30 min", status: "locked", videoUrl: "" },
      { id: 4, title: "4. Stewardship & Giving", desc: "Financial kingdom principles.", duration: "18 min", status: "locked", videoUrl: "" },
      { id: 5, title: "5. Excellence in Ministry", desc: "Doing it well.", duration: "22 min", status: "locked", videoUrl: "" },
      { id: 6, title: "6. The Anointing", desc: "The yoke destroying power.", duration: "25 min", status: "locked", videoUrl: "" },
      { id: 7, title: "7. Christian Character", desc: "Integrity in service.", duration: "20 min", status: "locked", videoUrl: "" },
      { id: 8, title: "8. Honour", desc: "The key to access.", duration: "15 min", status: "locked", videoUrl: "" },
    ]
  },

  // === BASIC 4: LEADERSHIP ===
  4: {
    id: 4,
    title: "Basic 4: Leadership",
    progress: 0,
    description: "Equipping you to lead others and manage the affairs of the Kingdom.",
    gradient: "from-gray-900 via-gray-700 to-black",
    accentColor: "text-gray-200",
    modules: [
      { id: 1, title: "1. The Vision", desc: "Understanding the house vision.", duration: "25 min", status: "locked", videoUrl: "" },
      { id: 2, title: "2. People Management", desc: "Leading volunteers.", duration: "30 min", status: "locked", videoUrl: "" },
      { id: 3, title: "3. Homiletics", desc: "The art of preaching.", duration: "40 min", status: "locked", videoUrl: "" },
      { id: 4, title: "4. Counseling Basics", desc: "Helping the hurting.", duration: "35 min", status: "locked", videoUrl: "" },
      { id: 5, title: "5. Discipleship", desc: "Making men.", duration: "25 min", status: "locked", videoUrl: "" },
      { id: 6, title: "6. Loyalty & Disloyalty", desc: "Protecting the unity.", duration: "20 min", status: "locked", videoUrl: "" },
      { id: 7, title: "7. Church Admin", desc: "Structure and order.", duration: "30 min", status: "locked", videoUrl: "" },
      { id: 8, title: "8. Conflict Resolution", desc: "Peacemaking.", duration: "25 min", status: "locked", videoUrl: "" },
    ]
  },

  // === BASIC 5: COMMISSION ===
  5: {
    id: 5,
    title: "Basic 5: Commission",
    progress: 0,
    description: "Sending you out to plant, disciple nations, and impact the marketplace.",
    gradient: "from-red-900 via-red-800 to-black",
    accentColor: "text-red-400",
    modules: [
      { id: 1, title: "1. Global Missions", desc: "The Macedonian call.", duration: "30 min", status: "locked", videoUrl: "" },
      { id: 2, title: "2. Church Planting", desc: "Starting from scratch.", duration: "45 min", status: "locked", videoUrl: "" },
      { id: 3, title: "3. Apologetics", desc: "Defending the faith.", duration: "40 min", status: "locked", videoUrl: "" },
      { id: 4, title: "4. Marketplace Ministry", desc: "Kings and Priests.", duration: "25 min", status: "locked", videoUrl: "" },
      { id: 5, title: "5. The Prophetic", desc: "Hearing for the nations.", duration: "30 min", status: "locked", videoUrl: "" },
      { id: 6, title: "6. Signs & Wonders", desc: "Power evangelism.", duration: "35 min", status: "locked", videoUrl: "" },
      { id: 7, title: "7. Revival History", desc: "Learning from the fathers.", duration: "50 min", status: "locked", videoUrl: "" },
      { id: 8, title: "8. Finishing Strong", desc: "Endurance to the end.", duration: "20 min", status: "locked", videoUrl: "" },
    ]
  }
};

const course = computed(() => coursesData[props.courseId] || coursesData[1]);

// --- EXAM HANDLERS ---
const handleStartExam = () => {
  examMode.value = true;
};

const handleExamPass = (score: number) => {
  examScore.value = score;
  examTaken.value = true;
  examMode.value = false;
  // In real app: Unlocks next level here
};

const handleExamFail = (score: number) => {
  examScore.value = score;
  examTaken.value = true;
  examMode.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 pb-20 relative">
    
    <FinalExam 
      v-if="examMode" 
      :title="course.title" 
      @close="examMode = false"
      @pass="handleExamPass"
      @fail="handleExamFail"
    />

    <div 
      class="pt-10 pb-16 px-6 rounded-b-[3rem] relative overflow-hidden bg-gradient-to-br bg-[length:200%_200%] animate-gradient shadow-2xl transition-all duration-1000"
      :class="course.gradient"
    >
       <div class="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
       
       <button @click="$emit('back')" class="absolute top-8 left-6 flex items-center gap-2 font-bold text-gray-400 hover:text-white transition z-20">
         ← Back to Academy
       </button>

       <div class="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-end justify-between gap-6">
         <div>
           <span class="bg-white text-black px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block shadow-md">Curriculum</span>
           <h1 class="text-4xl md:text-6xl font-black tracking-tight mb-2 text-white">{{ course.title }}</h1>
           <p class="font-bold opacity-90 max-w-xl text-gray-300">{{ course.description }}</p>
         </div>
         
         <div class="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-lg text-white">
           <div class="text-right">
             <div class="text-3xl font-black">{{ course.progress }}%</div>
             <div class="text-xs font-bold uppercase text-gray-400">Completed</div>
           </div>
           
           <div class="w-12 h-12 rounded-full bg-white/10 relative">
              <svg viewBox="0 0 36 36" class="w-full h-full transform -rotate-90">
                <path class="text-white/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" />
                <path :class="course.accentColor" class="drop-shadow-lg" :stroke-dasharray="`${course.progress}, 100`" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
              </svg>
           </div>
         </div>
       </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 -mt-8 relative z-20 space-y-4">
      
      <div v-for="mod in course.modules" :key="mod.id" 
           class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:shadow-lg hover:border-gray-300 group"
           :class="mod.status === 'locked' ? 'opacity-60 grayscale' : ''"
      >
        <div class="flex items-center gap-4 cursor-pointer flex-1" @click="mod.status !== 'locked' ? $emit('play-lesson', mod.videoUrl) : null">
          <div v-if="mod.status === 'completed'" class="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-xl shrink-0 shadow-sm">✓</div>
          <div v-else-if="mod.status === 'current'" class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl shrink-0 shadow-sm animate-pulse">▶</div>
          <div v-else class="w-12 h-12 rounded-2xl bg-gray-50 text-gray-300 flex items-center justify-center text-xl shrink-0 border border-gray-100">🔒</div>
          
          <div>
            <h3 class="text-lg font-bold leading-tight mb-1 group-hover:text-purple-600 transition">{{ mod.title }}</h3>
            <p class="text-sm text-gray-500 font-medium">{{ mod.desc}}</p>
            <p class="text-xs font-bold text-gray-300 uppercase mt-1 tracking-wide">{{ mod.duration }} • Video Lesson</p>
          </div>
        </div>

        <div v-if="mod.status !== 'locked'" class="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
           <button @click="$emit('play-lesson', mod.videoUrl)" class="flex-1 md:flex-none px-6 py-2 bg-black text-white rounded-xl font-bold text-sm shadow-md hover:bg-gray-800 transition transform active:scale-95">
             Watch
           </button>
        </div>
      </div>

      <div class="mt-16 mb-12 bg-black rounded-[2.5rem] p-10 text-white text-center relative overflow-hidden shadow-2xl">
        <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-gray-700 rounded-full blur-3xl opacity-50"></div>
        
        <h2 class="text-3xl font-black mb-2 relative z-10">{{ course.title }} Final Assessment</h2>
        <p class="text-gray-400 mb-8 relative z-10 max-w-md mx-auto">
          30 Questions • 60 Minutes<br>
          Pass with 70% to unlock the next level.
        </p>

        <div v-if="!examTaken" class="relative z-10">
          <button @click="handleStartExam" class="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition transform hover:-translate-y-1 border border-white/20">
            Start Final Exam
          </button>
        </div>

        <div v-else class="animate-fade-in relative z-10">
          <div class="text-7xl font-black mb-4 tracking-tighter" :class="examScore >= 70 ? 'text-green-400' : 'text-red-400'">
            {{ examScore }}%
          </div>
          
          <div v-if="examScore >= 70">
            <div class="text-white font-bold text-2xl mb-2">You Passed! 🎉</div>
            <button @click="$emit('back')" class="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition">
              Return to Academy
            </button>
          </div>
          
          <div v-else>
            <div class="text-white font-bold text-2xl mb-2">Try Again</div>
            <button @click="examTaken = false" class="bg-white/10 px-6 py-2 rounded-lg font-bold text-sm hover:bg-white/20">
              Reset
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient {
  animation: gradient 8s ease infinite;
}
</style>