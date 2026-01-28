<script setup lang="ts">
const events = [
  { 
    id: 1,
    title: "Global Evangelism Summit", 
    date: "NOV 05", 
    time: "6:00 PM GMT+1", 
    location: "Main Auditorium & Online",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop",
    color: "bg-purple-100 text-purple-700",
    status: "Open"
  },
  { 
    id: 2, 
    title: "Basic 1: Graduation Ceremony", 
    date: "NOV 12", 
    time: "12:00 PM GMT+1", 
    location: "FaithNow HQ",
    image: "/happy-people.jpg", // Using your local image
    color: "bg-yellow-100 text-yellow-800",
    status: "Upcoming"
  },
  { 
    id: 3, 
    title: "Leadership Masterclass", 
    date: "NOV 20", 
    time: "9:00 AM GMT+1", 
    location: "Zoom (Link sent upon registration)",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    color: "bg-blue-100 text-blue-700",
    status: "Waitlist"
  }
];
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 pt-10 pb-20">
    <div class="max-w-5xl mx-auto px-6">
      
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-black tracking-tight mb-6">
          Life at <span class="text-purple-600">FaithNow</span>
        </h1>
        <p class="text-gray-500 max-w-2xl mx-auto text-lg">
          Connect with the community. Join us for upcoming gatherings, workshops, and outreaches.
        </p>
      </div>

      <div class="space-y-8">
        <div v-for="event in events" :key="event.id" class="group relative bg-gray-50 hover:bg-white rounded-[2.5rem] p-4 md:p-6 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-gray-100 flex flex-col md:flex-row gap-6 items-center">
          
          <div class="hidden md:flex flex-col items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-sm border border-gray-100 shrink-0">
            <span class="text-xs font-black text-gray-400 uppercase tracking-wider">{{ event.date.split(' ')[0] }}</span>
            <span class="text-3xl font-black text-gray-900">{{ event.date.split(' ')[1] }}</span>
          </div>

          <div class="w-full md:w-48 h-48 md:h-32 rounded-3xl overflow-hidden shrink-0 relative">
            <img :src="event.image" class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            <div class="absolute top-2 right-2 bg-white px-3 py-1 rounded-lg text-xs font-black md:hidden">
               {{ event.date }}
            </div>
          </div>

          <div class="flex-1 text-center md:text-left">
            <div class="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-2" :class="event.color">
              {{ event.status }}
            </div>
            <h3 class="text-2xl font-black mb-1 group-hover:text-purple-600 transition">{{ event.title }}</h3>
            <div class="text-gray-500 font-medium text-sm flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4">
              <span>🕒 {{ event.time }}</span>
              <span>📍 {{ event.location }}</span>
            </div>
          </div>

          <button class="w-full md:w-auto px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-purple-600 transition transform group-hover:-translate-y-1 shadow-lg group-hover:shadow-purple-200">
            Register
          </button>

        </div>
      </div>

    </div>
  </div>
</template>