<template>
    <form @submit.prevent="handleSignUp" class="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
 <div class="mb-4">
   <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
     Username
   </label>
   <input
     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
     v-model="email"
     type="email"
     placeholder="Enter your email"
   />
 </div>
 <div class="mb-6">
   <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
     Password
   </label>
   <input
     class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
     v-model="password"
     type="password"
     placeholder="********"
   />
   <p class="text-red-500 text-xs italic">Please enter a valid password.</p>
 </div>
 <div class="mb-6">
   <label class="block text-gray-700 text-sm font-bold mb-2" for="re-password">
     Password
   </label>
   <input
     class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
     v-model="repassword"
     type="password"
     placeholder="********"
   />
   <!-- <p v-if="repassword===password" class="text-green-500 text-xs italic">paswword matched succesfully.</p>
   <p v-else-if="repassword!==password" class="text-red-500 text-xs italic">enter matched password</p> -->
 </div>
 <div class="flex items-center justify-between">
   <button
     class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
     type="submit"
   >
     Sign up
   </button>
 </div>
 <p v-if="errorMessage">{{ errorMessage }}</p>
</form>

</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const repassword = ref('')
const errorMessage = ref('')

const { $auth } = useNuxtApp() // ✅ نجيب الـ auth من الـ plugin

const handleSignUp = async () => {
  if (password.value !== repassword.value) {
    errorMessage.value = "Passwords do not match!"
    return
  };
  const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
  if(!regex.test(email.value)){
    errorMessage.value="Please enter a valid email"
    return
  }

  try {
    await createUserWithEmailAndPassword($auth, email.value, password.value)
    navigateTo("/signin")
  } catch (error) {
    errorMessage.value = error.message
    console.log(error)
  }
}
</script>

