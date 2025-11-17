<template>
  <div>
    <div class="relative min-h-screen w-full">
      <div class="blur-[2px] absolute bg-center inset-0 bg-cover" style="background-image: url('/sign.jpg');">

      </div>
      <div class=" relative z-10 flex min-h-screen items-center gap-[200px] pl-[80px] ">
        <div class="flex flex-col overflow-hidden m-5 bg-[#fefefe]  w-[500px] p-6 shadow-lg rounded-[24px] gap-[6px]">
          <form class="flex flex-col gap-2 w-full " @submit.prevent="handleSignIn">
            <h2 class="font-bold text-2xl">Welcome back to Shatably</h2>


            <div class="flex flex-col gap-6 ">
              <label class="font-semibold   text-md">Email</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[24px] w-full h-12 px-4"
                type="email" v-model="email" placeholder="user@example.com"></input>
            </div>
            <div class="flex flex-col gap-6">
              <label class="font-semibold   text-md">Password</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[24px] w-full h-12 px-4"
                type="password" v-model="password" placeholder="*****"></input>
            </div>

            <div>
              <input required class=" mt-5" type="checkbox">Remember me </input>
            </div>
            <span class="text-red-400">{{ errorMessage }}</span>
            <div>
              <div class="flex items-center gap-4 my-6">
                <div class="flex-1 h-px bg-gray-300"></div>
                <span class="text-gray-500 font-medium text-sm">OR continue with</span>
                <div class="flex-1 h-px bg-gray-300"></div>
              </div>
              <div @click="googleSignIn"
                class="mb-5 flex cursor-pointer border border-gray-300 rounded-[24px] h-[50px] justify-center items-center text-center gap-5">
                <div>
                  <img src="/google.svg" class="w-6 h-6 " alt="Google" />
                </div>
                <p>Sign In With Your Google Account</p>
              </div>
              <button type="submit"
                class="text-[#fefefe] w-full h-12 text-center p-5 bg-[#C76950] rounded-[24px] flex justify-center items-center">Sign
                In</button>
            </div>
            <p class="text-slate-400 text-xs text-center">Don't have an account yet?<span @click="router.push('/register')" class="font-bold text-[#262626] cursor-pointer">sign Up</span></p>
          </form>

        </div>
        <div class="leading-[50px]">
          <p class="font-semibold text-3xl text-[#fefefe]">Shatably</p>
          <p class="text-[#fefefe]">Make Your Dream Home A Reality with Shatbly</p>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue'
import { signInWithEmailAndPassword,signInWithPopup ,GoogleAuthProvider } from 'firebase/auth';
import { getDoc,doc } from 'firebase/firestore';
const{$auth}=useNuxtApp()
const {$db}=useNuxtApp()
const errorMessage=ref('')
const email=ref('')
const password=ref('')
const router = useRouter()

const googleSignIn=async()=>{
  try{
    const provider=new GoogleAuthProvider()
    const result=await signInWithPopup($auth,provider)
    const user=result.user
    
    const userDoc= await getDoc(doc($db,'users',user.uid))
    if(!userDoc.exists()){
      errorMessage.value="Account not found. Please sign up first."
      return
    }
     const role = userDoc.data().role
     if(role==="client"){navigateTo('/')}
    if(role==="engineer"){navigateTo('/engineer/complete-profile')}
    if(role==="supplier"){navigateTo('/supplier')}
  }
  catch(googleError){console.log(googleError)
     errorMessage.value = "Invalid email or password."
  }
}

const handleSignIn=async()=>{
  try{
    const userCredential= await signInWithEmailAndPassword($auth,email.value,password.value)
    const user=userCredential.user
        const userDoc = await getDoc(doc($db, 'users', user.uid))
        if(!userDoc.exists()){
          errorMessage.value="Account not found. Please sign up first."
          return
        }
         const role = userDoc.data().role
    if(role==="client"){navigateTo('/')}
    if(role==="engineer"){navigateTo('/engineer/complete-profile')}
    if(role==="supplier"){navigateTo('/supplier')}
  }
  catch(err){console.log(err)}
}

</script>