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
                type="email" v-model="email" placeholder="user@example.com">
            </div>
            
            <div class="flex flex-col gap-1">
              <label class="font-semibold text-sm">Password</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                type="password" v-model="password" placeholder="*****">
            </div>

            <div class="flex justify-between">
              <div>
                <input class="mt-3" type="checkbox"><span class="text-sm"> Remember me</span>
              </div>
              <p class="text-gray-500 text-xs cursor-pointer" @click="showModal = true">Forget your password?</p>
            </div>

            <!-- OVERLAY -->
            <div v-if="showModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <!-- MODAL BOX -->
              <div class="bg-white p-6 rounded-[20px] shadow-lg w-[450px] flex flex-col gap-3">
                <h2 class="text-lg font-semibold text-center">Reset Password</h2>

                <label class="text-sm font-medium">Email</label>
                <input v-model="resetEmail" type="email" placeholder="Enter Your Email"
                  class="border p-2 rounded-[16px] w-full outline-none focus:border-[#C76950]">

                <span class="text-red-500 text-sm">{{ resetError }}</span>

                <button @click="handleReset" type="button"
                  class="text-white w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center">
                  Reset Password
                </button>

                <button @click="showModal = false" class="text-gray-500 text-sm hover:underline">
                  Cancel
                </button>
              </div>
            </div>

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
              
              <button type="submit" :disabled="isLoading"
                class="text-[#fefefe] w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center disabled:opacity-50">
                {{ isLoading ? 'Loading...' : 'Sign In' }}
              </button>
            </div>
            
            <p class="text-slate-400 text-xs text-center mt-2">
              Don't have an account yet? 
              <span @click="router.push('/register')" class="font-bold text-[#262626] cursor-pointer">sign Up</span>
            </p>
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
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'

const { $auth } = useNuxtApp()
const { $db } = useNuxtApp()

const errorMessage = ref('')
const email = ref('')
const password = ref('')
const resetEmail = ref('')
const resetError = ref('')
const showModal = ref(false)
const isLoading = ref(false)
const router = useRouter()

definePageMeta({
  layout: 'withOutNavFoot'
})

// Navigate based on user role and profile status
const navigateUser = async (userId, role) => {
  if (role === 'client') {
    navigateTo('/')
    return
  }

  if (role === 'supplier') {
    navigateTo('/supplier')
    return
  }

  if (role === 'engineer') {
    // Check if engineer profile is complete
    const engineerDoc = await getDoc(doc($db, 'engineers', userId))
    if (engineerDoc.exists()) {
      const engineerData = engineerDoc.data()
      
      // If profile not complete, go to complete-profile
      if (!engineerData.profileComplete) {
        navigateTo('/userEngineer/complete-profile')
        return
      }
      
      // If profile complete but no membership, go to membership
      if (!engineerData.hasMembership) {
        navigateTo('/userEngineer/membership')
        return
      }
      
      // If everything is complete, go to dashboard
      navigateTo('/userEngineer/dashboard')
      return
    }
    
    // If engineer doc doesn't exist, go to complete profile
    navigateTo('/userEngineer/complete-profile')
  }
}

const googleSignIn = async () => {
  errorMessage.value = ''
  isLoading.value = true

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
    console.log("ROLE:", role)

    await navigateUser(user.uid, role)

  } catch (googleError) {
    console.error('Google sign in error:', googleError)
    errorMessage.value = "Sign in failed. Please try again."
  } finally {
    isLoading.value = false
  }
}

const handleSignIn = async () => {
  errorMessage.value = ''
  isLoading.value = true
  

  try {
    const userCredential = await signInWithEmailAndPassword($auth, email.value, password.value)
    const user = userCredential.user

    const userDoc = await getDoc(doc($db, 'users', user.uid))
    if (!userDoc.exists()) {
      errorMessage.value = "Account not found. Please sign up first."
      return
    }

    const role = userDoc.data().role
    await navigateUser(user.uid, role)

  } catch (err) {
    console.error('Sign in error:', err)
    
    if (err.code === "auth/invalid-credential") {
      errorMessage.value = "Wrong email or password"
    } else if (err.code === "auth/user-not-found") {
      errorMessage.value = "No account found with this email"
    } else if (err.code === "auth/wrong-password") {
      errorMessage.value = "Wrong password"
    } else {
      errorMessage.value = "Sign in failed. Please try again."
    }
  } finally {
    isLoading.value = false
  }
}

const handleReset = async () => {
  resetError.value = ''

  if (!resetEmail.value) {
    resetError.value = 'Please enter your email'
    return
  }

  try {
    await sendPasswordResetEmail($auth, resetEmail.value)
    resetError.value = "✓ Reset link sent! Check your email."
    setTimeout(() => {
      showModal.value = false
      resetEmail.value = ''
      resetError.value = ''
    }, 2000)
  } catch (resErr) {
    console.error('Reset error:', resErr)
    if (resErr.code === 'auth/user-not-found') {
      resetError.value = 'No account found with this email'
    } else {
      resetError.value = 'Failed to send reset link. Try again.'
    }
  }
}
</script>