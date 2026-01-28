<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  title: string
}>();

const emit = defineEmits(['close', 'pass', 'fail']);

// --- CONFIGURATION ---
const TOTAL_TIME_MINUTES = 60;
const PASS_SCORE = 70; // Percent
const TOTAL_QUESTIONS = 30;

// --- STATE ---
const timeLeft = ref(TOTAL_TIME_MINUTES * 60); // Seconds
const timerActive = ref(false);
const timerInterval = ref<any>(null);
const currentQuestionIndex = ref(0);
const answers = ref<Record<number, number>>({}); // { questionIndex: optionIndex }
const isSubmitted = ref(false);
const score = ref(0);

// --- MOCK QUESTIONS (Generating 30 generic questions for demo) ---
const questions = computed(() => {
  return Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
    id: i + 1,
    text: `Question ${i + 1}: This is a sample theological question testing your understanding of the ${props.title} module. What is the correct biblical stance?`,
    options: [
      "This is the first possible answer.",
      "This is the second option which is likely correct.",
      "This is a third distractor option.",
      "This is the fourth option."
    ],
    correct: 1 // For demo, option 2 is always correct
  }));
});

// Safe access for current question to avoid "Object is possibly 'undefined'"
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);

// --- TIMER LOGIC ---
const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60);
  const s = timeLeft.value % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
});

const startTimer = () => {
  timerActive.value = true;
  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      submitExam(); // Auto-submit when time runs out
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerInterval.value);
  timerActive.value = false;
};

// --- EXAM LOGIC ---
const selectOption = (qIndex: number, oIndex: number) => {
  if (isSubmitted.value) return;
  answers.value[qIndex] = oIndex;
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < TOTAL_QUESTIONS - 1) {
    currentQuestionIndex.value++;
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const submitExam = () => {
  stopTimer();
  isSubmitted.value = true;
  
  // Calculate Score
  let correctCount = 0;
  questions.value.forEach((q, index) => {
    if (answers.value[index] === q.correct) correctCount++;
  });
  
  const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);
  score.value = percentage;
};

const finish = () => {
  if (score.value >= PASS_SCORE) {
    emit('pass', score.value);
  } else {
    emit('fail', score.value);
  }
};

// Start timer on mount
onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});
</script>

<template>
  <div class="fixed inset-0 z-[100] bg-gray-50 flex flex-col font-sans text-gray-900">
    
    <div class="bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b border-gray-200">
      <div>
        <h2 class="font-bold text-gray-500 text-xs uppercase tracking-widest">Assessment</h2>
        <h1 class="font-black text-xl">{{ title }}</h1>
      </div>
      
      <div class="flex items-center gap-6">
        <div class="flex flex-col items-end">
          <span class="text-xs font-bold text-gray-400 uppercase">Time Remaining</span>
          <span class="text-3xl font-black font-mono" :class="timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-gray-900'">
            {{ formattedTime }}
          </span>
        </div>
        <button v-if="!isSubmitted" @click="submitExam" class="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition">
          Submit Now
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-hidden flex">
      
      <div class="w-20 md:w-64 bg-gray-100 overflow-y-auto p-4 border-r border-gray-200 hidden md:block">
        <h3 class="font-bold text-gray-400 text-xs uppercase mb-4">Questions</h3>
        <div class="grid grid-cols-4 gap-2">
          <button 
            v-for="(q, idx) in questions" 
            :key="q.id"
            @click="currentQuestionIndex = idx"
            class="w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition"
            :class="[
              currentQuestionIndex === idx ? 'bg-black text-white ring-2 ring-offset-2 ring-black' : 
              answers[idx] !== undefined ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ idx + 1 }}
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-6 md:p-12 relative">
        
        <div v-if="isSubmitted" class="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center animate-fade-in">
           <div class="text-center max-w-lg">
             <div class="text-8xl mb-4">{{ score >= PASS_SCORE ? '🎉' : '😔' }}</div>
             <h2 class="text-4xl font-black mb-2">
               {{ score >= PASS_SCORE ? 'Assessment Passed' : 'Assessment Failed' }}
             </h2>
             <p class="text-gray-500 mb-8">
               You scored <span class="text-black font-black">{{ score }}%</span>. 
               {{ score >= PASS_SCORE ? 'You have unlocked the next class.' : 'You need 70% to proceed. Please review the materials.' }}
             </p>
             <button @click="finish" class="bg-black text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition">
               {{ score >= PASS_SCORE ? 'Continue Journey' : 'Try Again Later' }}
             </button>
           </div>
        </div>

        <div v-else class="max-w-3xl mx-auto">
          <div class="mb-8">
            <span class="text-gray-400 font-bold">Question {{ currentQuestionIndex + 1 }} of {{ TOTAL_QUESTIONS }}</span>
            <div class="h-2 w-full bg-gray-200 rounded-full mt-2">
              <div class="h-full bg-black rounded-full transition-all duration-300" :style="`width: ${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%`"></div>
            </div>
          </div>

          <h2 class="text-2xl md:text-3xl font-bold mb-10 leading-snug">
            {{ currentQuestion?.text }}
          </h2>

          <div class="space-y-4">
            <button 
              v-for="(option, oIdx) in currentQuestion?.options" 
              :key="oIdx"
              @click="selectOption(currentQuestionIndex, oIdx)"
              class="w-full text-left p-6 rounded-2xl border-2 transition flex items-center gap-4 group"
              :class="answers[currentQuestionIndex] === oIdx ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-300'"
            >
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0"
                   :class="answers[currentQuestionIndex] === oIdx ? 'border-black' : 'border-gray-300'">
                <div v-if="answers[currentQuestionIndex] === oIdx" class="w-3 h-3 bg-black rounded-full"></div>
              </div>
              <span class="font-medium text-lg">{{ option }}</span>
            </button>
          </div>

          <div class="flex justify-between mt-12">
            <button @click="prevQuestion" :disabled="currentQuestionIndex === 0" class="text-gray-400 font-bold hover:text-black disabled:opacity-30">
              ← Previous
            </button>
            <button v-if="currentQuestionIndex < TOTAL_QUESTIONS - 1" @click="nextQuestion" class="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800">
              Next Question
            </button>
            <button v-else @click="submitExam" class="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700">
              Submit Assessment
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>