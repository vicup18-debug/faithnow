<script setup lang="ts">
// 👇 Accept the URL prop
defineProps<{
  url?: string
}>();

defineEmits(['close']);
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
    
    <div class="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 mx-4">
      <button @click="$emit('close')" class="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition backdrop-blur-sm">
        &times;
      </button>

      <iframe 
        class="w-full h-full"
        :src="url || 'https://www.youtube.com/embed/b44NjrilgQ8'" 
        title="Video Player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    </div>

  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>