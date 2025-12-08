<template>
     <form @submit.prevent="handelsignIn" class="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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

 <div class="flex items-center justify-between">
   <button
     class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
     type="submit"
   >
     Sign In
   </button>
   <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
 </div>
<!-- <p v-show=""></p> -->
</form>
</template>

<script setup>
import {ref} from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth';
const email=ref("");
const password=ref("")
const errorMessage=ref("")
const {$auth}=useNuxtApp()
const handelsignIn=async()=>{
    try{
            const userCredential= await signInWithEmailAndPassword($auth,email.value,password.value)
            const user=userCredential.user
            navigateTo('/')

    }catch(error){
        errorMessage.value="Invalid email or password"
    }
}
</script>