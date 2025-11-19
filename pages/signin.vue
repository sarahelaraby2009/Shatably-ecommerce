<template>
  <div>
    <div class="relative min-h-screen w-full">
      <div class="blur-[2px] absolute bg-center inset-0 bg-cover" style="background-image: url('/sign.jpg');">
        <div class="absolute inset-0 flex justify-center pointer-events-none">
          <div class="w-full h-full bg-black/40 rounded-[16px]"></div>
        </div>
      </div>
      <div class="relative z-10 flex min-h-screen items-center gap-[120px] pl-[60px]">
        <div class="flex flex-col overflow-hidden m-5 bg-[#fefefe] w-[420px] p-5 shadow-lg rounded-[20px] gap-[5px]">
          <form class="flex flex-col gap-2 w-full" @submit.prevent="handleSignIn">
            <h2 class="font-bold text-xl mb-2">Welcome back to Shatably</h2>


            <div class="flex flex-col gap-2">
              <label class="font-semibold text-sm">Email</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                type="email" v-model="email" placeholder="user@example.com"></input>
            </div>
            <div class="flex flex-col gap-1">
              <label class="font-semibold text-sm">Password</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                type="password" v-model="password" placeholder="*****"></input>
            </div>

            <div class="flex justify-between">
              <div>
                <input required class="mt-3" type="checkbox"><span class="text-sm"> Remember me</span></input>

              </div>
              <p class="text-gray-500 text-xs cursor-pointer" @click="showModal=true">Forget your password?</p>
            </div>
           <!-- OVERLAY -->
<div
  v-if="showModal"
  class="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
>

  <!-- MODAL BOX -->
  <div class="bg-white p-6 rounded-[20px] shadow-lg w-[450px] flex flex-col gap-3">

    <h2 class="text-lg font-semibold text-center">Reset Password</h2>

    <label class="text-sm font-medium">Email</label>
    <input
      v-model="resetEmail"
      type="email"
      placeholder="Enter Your Email"
      class="border p-2 rounded-[16px] w-full outline-none focus:border-[#C76950]"
    />

    <span class="text-red-500 text-sm">{{ resetError }}</span>

    <button
      @click="handleReset"
      type="button"
      class="text-white w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center"
    >
      Reset Password
    </button>

    <button @click="showModal = false" class="text-gray-500 text-sm hover:underline">
      Cancel
    </button>

  </div>

</div>


            <!-- 
            ///////////////////////////////////////////////////// -->
            <span class="text-red-400 text-sm">{{ errorMessage }}</span>
            <div>
              <div class="flex items-center gap-3 my-3">
                <div class="flex-1 h-px bg-gray-300"></div>
                <span class="text-gray-500 font-medium text-xs">OR continue with</span>
                <div class="flex-1 h-px bg-gray-300"></div>
              </div>
              <div @click="googleSignIn"
                class="mb-3 flex cursor-pointer border border-gray-300 rounded-[20px] h-[42px] justify-center items-center text-center gap-3">
                <div>
                  <img src="/google.svg" class="w-5 h-5" alt="Google" />
                </div>
                <p class="text-sm">Sign In With Your Google Account</p>
              </div>
              <button type="submit"
                class="text-[#fefefe] w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center">Sign
                In</button>
            </div>
            <p class="text-slate-400 text-xs text-center mt-2">Don't have an account yet? <span
                @click="router.push('/register')" class="font-bold text-[#262626] cursor-pointer">sign Up</span></p>
          </form>

        </div>
        <div class="leading-[40px]">
          <p class="font-semibold text-[50px] text-[#fefefe] leading-30 mb-5">Shatably</p>
          <p class="text-[#fefefe] text-[20px]">Make Your Dream Home A Reality with Shatbly</p>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
const { $auth } = useNuxtApp()
const { $db } = useNuxtApp()
const errorMessage = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const resetEmail = ref('')
const resetError = ref('')
const showModal=ref(false)

const googleSignIn = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup($auth, provider)
    const user = result.user

    const userDoc = await getDoc(doc($db, 'users', user.uid))
    if (!userDoc.exists()) {
      errorMessage.value = "Account not found. Please sign up first."
      return
    }
    const role = userDoc.data().role
    if (role === "client") { navigateTo('/') }
    if (role === "engineer") { navigateTo('/engineer/complete-profile') }
    if (role === "supplier") { navigateTo('/supplier') }
  }
  catch (googleError) {
    console.log(googleError)
    errorMessage.value = "Invalid email or password."
  }
}

const handleSignIn = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword($auth, email.value, password.value)
    const user = userCredential.user
    const userDoc = await getDoc(doc($db, 'users', user.uid))
    if (!userDoc.exists()) {
      errorMessage.value = "Account not found. Please sign up first."
      return
    }
    const role = userDoc.data().role
    if (role === "client") { navigateTo('/') }
    if (role === "engineer") { navigateTo('/engineer/complete-profile') }
    if (role === "supplier") { navigateTo('/supplier') }
  }
  catch (err) { console.log(err) }
}

const handleReset = async () => {
  if (!resetEmail.value) {
    resetError.value = 'Please enter your email'
  }

  try {
    await sendPasswordResetEmail($auth, resetEmail.value)
        resetError.value = "Reset link sent! Check your email."

  }
  catch (resErr) { console.log(resErr) }
}

</script>