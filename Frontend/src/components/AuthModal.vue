<script setup lang="ts">
import { ref } from 'vue';

// Define the events this component can emit to the parent
const emit = defineEmits(['close', 'login-success']); // <--- Add this

// State to toggle between Login and Signup
const isLogin = ref(true);

// Mock function for Google Login (We will connect this to Firebase/Supabase later)
const handleGoogleLogin = () => {
  console.log("Initiating Google Login...");
  alert("This will connect to Google OAuth in the next step!");
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <div class="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in">
      
      <div class="hidden md:flex w-1/2 bg-purple-600 relative items-center justify-center p-12 overflow-hidden">
        <div class="absolute top-[-50px] left-[-50px] w-40 h-40 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div class="relative z-10 text-center text-white">
          <h2 class="text-4xl font-black tracking-tight mb-4">
            {{ isLogin ? 'Welcome Back!' : 'Join the Family' }}
          </h2>
          <p class="text-purple-100 text-lg leading-relaxed">
            {{ isLogin 
              ? 'We missed you! Sign in to access your personalized sermons and community groups.' 
              : 'Create a profile to save your favorite messages, join events, and connect with believers.' 
            }}
          </p>
        </div>
      </div>

      <div class="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center relative">
        
        <button @click="$emit('close')" class="absolute top-6 right-6 text-gray-400 hover:text-black transition text-2xl">
          &times;
        </button>

        <div class="md:hidden text-center mb-8">
          <h2 class="text-3xl font-black text-gray-900">{{ isLogin ? 'Sign In' : 'Register' }}</h2>
          <p class="text-gray-500 text-sm mt-2">To continue your journey with FaithNow</p>
        </div>

        <button 
          @click="handleGoogleLogin"
          class="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl transition-all duration-200 group"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div class="relative my-8 text-center">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
          <span class="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or with email</span>
        </div>

        <form @submit.prevent="$emit('login-success')" class="space-y-5">
          <div v-if="!isLogin" class="animate-fade-in">
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
            <input type="text" placeholder="John Doe" class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl px-4 py-3 outline-none transition font-medium" />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
            <input type="email" placeholder="you@example.com" class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl px-4 py-3 outline-none transition font-medium" />
          </div>

          <div>
            <label class="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
            <input type="password" placeholder="••••••••" class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl px-4 py-3 outline-none transition font-medium" />
          </div>

          <button class="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all">
            {{ isLogin ? 'Sign In Account' : 'Create Free Account' }}
          </button>
        </form>

        <p class="text-center mt-8 text-gray-500 text-sm">
          {{ isLogin ? "Don't have an account?" : "Already a member?" }}
          <button @click="isLogin = !isLogin" class="text-purple-600 font-bold hover:underline ml-1">
            {{ isLogin ? 'Sign up' : 'Log in' }}
          </button>
        </p>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animation for the modal appearing */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scaleIn 0.2s ease-out forwards;
}

/* Background blob animation */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 { animation-delay: 2s; }
</style>