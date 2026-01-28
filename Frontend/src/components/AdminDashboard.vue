<script setup lang="ts">
import { ref, computed } from 'vue';

const emit = defineEmits(['close']);

// --- MOCK DATA: Students ---
// In a real app, this comes from your database
const students = ref([
  { id: 1, name: "Noah Adebayo", email: "noah@example.com", basicLevel: "Basic 4", avgScore: 92, soulsWon: 15, status: "Active", image: "/Victor.jpg" },
  { id: 2, name: "Grace Olamide", email: "grace@example.com", basicLevel: "Basic 2", avgScore: 88, soulsWon: 8, status: "Active", image: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Samuel Kalu", email: "sam@example.com", basicLevel: "Basic 1", avgScore: 45, soulsWon: 0, status: "Struggling", image: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Esther Okon", email: "esther@example.com", basicLevel: "Basic 3", avgScore: 78, soulsWon: 5, status: "Active", image: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "David West", email: "david@example.com", basicLevel: "Basic 5", avgScore: 95, soulsWon: 42, status: "Top Leader", image: "https://i.pravatar.cc/150?u=5" },
]);

// --- METRICS ---
const totalStudents = computed(() => students.value.length);
const topPerformers = computed(() => students.value.filter(s => s.avgScore >= 90).length);
const totalSouls = computed(() => students.value.reduce((acc, s) => acc + s.soulsWon, 0));

// --- STATE ---
const searchQuery = ref("");
const selectedStudent = ref<any>(null);

// Filter Logic
const filteredStudents = computed(() => {
  return students.value
    .filter(s => s.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .sort((a, b) => b.avgScore - a.avgScore); // Sort by highest score
});

// Actions
const assignSouls = (student: any) => {
  alert(`Assigning new converts to ${student.name} for follow-up.`);
};

const viewDetails = (student: any) => {
  selectedStudent.value = student;
};
</script>

<template>
  <div class="fixed inset-0 z-[100] bg-gray-100 font-sans flex text-gray-900">
    
    <div class="w-64 bg-gray-900 text-white flex-col justify-between hidden md:flex">
      <div>
        <div class="p-8">
          <h1 class="font-black text-2xl tracking-tight">Faith<span class="text-purple-500">Admin</span></h1>
          <p class="text-xs text-gray-500 uppercase tracking-widest mt-2">Overseer Panel</p>
        </div>
        
        <nav class="mt-8 px-4 space-y-2">
          <a href="#" class="block px-4 py-3 bg-purple-600 rounded-xl font-bold text-white shadow-lg shadow-purple-900/50">Dashboard</a>
          <a href="#" class="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition">Students</a>
          <a href="#" class="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition">Curriculum</a>
          <a href="#" class="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition">Settings</a>
        </nav>
      </div>
      
      <div class="p-8">
        <button @click="$emit('close')" class="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm font-bold">
          ← Exit to Site
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto">
      
      <div class="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20">
        <h2 class="text-xl font-bold">Performance Overview</h2>
        <div class="flex items-center gap-4">
          <input v-model="searchQuery" type="text" placeholder="Search member..." class="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 w-64" />
          <div class="w-10 h-10 rounded-full bg-orange-100 overflow-hidden border border-orange-200">
            <img src="/Victor.jpg" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div class="p-8 max-w-7xl mx-auto">
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">👥</div>
            <div>
              <p class="text-gray-500 text-xs font-bold uppercase">Total Students</p>
              <h3 class="text-3xl font-black">{{ totalStudents }}</h3>
            </div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">🔥</div>
            <div>
              <p class="text-gray-500 text-xs font-bold uppercase">Top Leaders (90%+)</p>
              <h3 class="text-3xl font-black">{{ topPerformers }}</h3>
            </div>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl">❤️</div>
            <div>
              <p class="text-gray-500 text-xs font-bold uppercase">Total Souls Won</p>
              <h3 class="text-3xl font-black">{{ totalSouls }}</h3>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <h3 class="font-bold text-lg">Student Rankings</h3>
            <button class="text-purple-600 text-sm font-bold hover:underline">Export CSV</button>
          </div>
          
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th class="px-8 py-4 font-bold">Member</th>
                <th class="px-8 py-4 font-bold">Current Level</th>
                <th class="px-8 py-4 font-bold">Avg Score</th>
                <th class="px-8 py-4 font-bold">Souls Won</th>
                <th class="px-8 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-gray-50 transition group">
                <td class="px-8 py-4">
                  <div class="flex items-center gap-3">
                    <img :src="student.image" class="w-10 h-10 rounded-full object-cover bg-gray-200" />
                    <div>
                      <p class="font-bold text-sm text-gray-900">{{ student.name }}</p>
                      <p class="text-xs text-gray-400">{{ student.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-4">
                  <span class="px-3 py-1 rounded-full text-xs font-bold"
                    :class="{
                      'bg-yellow-100 text-yellow-800': student.basicLevel === 'Basic 1',
                      'bg-purple-100 text-purple-800': student.basicLevel === 'Basic 2',
                      'bg-blue-100 text-blue-800': student.basicLevel === 'Basic 3',
                      'bg-gray-800 text-white': student.basicLevel === 'Basic 4',
                      'bg-red-100 text-red-800': student.basicLevel === 'Basic 5',
                    }">
                    {{ student.basicLevel }}
                  </span>
                </td>
                <td class="px-8 py-4 font-bold" :class="student.avgScore >= 90 ? 'text-green-600' : student.avgScore < 50 ? 'text-red-500' : 'text-gray-900'">
                  {{ student.avgScore }}%
                </td>
                <td class="px-8 py-4 font-medium text-gray-600">
                  {{ student.soulsWon }}
                </td>
                <td class="px-8 py-4 text-right">
                  <button @click="viewDetails(student)" class="text-gray-400 hover:text-black font-bold text-xs mr-4">Details</button>
                  <button v-if="student.avgScore > 80" @click="assignSouls(student)" class="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-purple-600 transition shadow-md">
                    Assign Souls
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

    <div v-if="selectedStudent" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
      <div class="w-full md:w-[400px] bg-white h-full shadow-2xl p-8 overflow-y-auto animate-slide-in">
        <button @click="selectedStudent = null" class="mb-8 text-gray-400 hover:text-black">Close ✕</button>
        
        <div class="text-center mb-8">
          <img :src="selectedStudent.image" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-purple-100" />
          <h2 class="text-2xl font-black">{{ selectedStudent.name }}</h2>
          <p class="text-gray-500">{{ selectedStudent.email }}</p>
          <div class="mt-4 flex justify-center gap-2">
            <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{{ selectedStudent.status }}</span>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-xs font-bold text-gray-400 uppercase mb-2">Academic Performance</h3>
            <div class="bg-gray-50 p-4 rounded-xl">
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium">Exam Average</span>
                <span class="font-bold">{{ selectedStudent.avgScore }}%</span>
              </div>
              <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div class="bg-purple-600 h-full" :style="`width: ${selectedStudent.avgScore}%`"></div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xs font-bold text-gray-400 uppercase mb-2">Ministry Impact</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-xl text-center">
                <div class="text-2xl font-black text-gray-900">{{ selectedStudent.soulsWon }}</div>
                <div class="text-xs text-gray-500">Souls Won</div>
              </div>
              <div class="bg-gray-50 p-4 rounded-xl text-center">
                <div class="text-2xl font-black text-gray-900">4</div>
                <div class="text-xs text-gray-500">Events Attended</div>
              </div>
            </div>
          </div>

          <button @click="assignSouls(selectedStudent)" class="w-full py-4 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition">
            Assign Follow-Up Task
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}
</style>