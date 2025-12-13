<template>
  <div>
    <div class="relative min-h-screen w-full">
      <div class="blur-[2px] absolute bg-center inset-0 bg-cover" style="background-image: url('/sign.jpg');">
        <div class="absolute inset-0 flex justify-center pointer-events-none">
          <div class="w-full h-full bg-black/40 rounded-[16px]"></div>
        </div>
      </div>
      <div
        class="relative z-10 flex flex-col-reverse lg:flex-row min-h-screen items-center gap-[50px] lg:gap-[120px] px-5 py-10 pl-[60px] lg:pl-[160px]">
        <div class="flex flex-col overflow-hidden m-5 bg-[#fefefe] lg:w-[450px] w-[350px] lg:p-6 p-5 shadow-lg rounded-[20px] gap-[5px]">
          <form class="flex flex-col gap-2 w-full" @submit.prevent="handleSignIn">

            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">Email</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                type="email" v-model="email" placeholder="user@example.com">
            </div>

            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">Password</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                type="password" v-model="password" placeholder="*****">
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  v-model="rememberMe"
                  class="cursor-pointer w-4 h-4"
                >
                <label for="rememberMe" class="text-sm cursor-pointer">
                  Remember me
                </label>
              </div>
              <p class="text-[#C76950] text-sm cursor-pointer hover:underline" @click="showModal = true">
                Forgot password?
              </p>
            </div>

            <!-- Error Message -->
            <span class="text-red-400 text-sm min-h-[20px]">{{ errorMessage }}</span>

            <!-- Sign In Button -->
            <button type="submit" :disabled="isLoading"
              class="text-[#fefefe] w-full h-[42px] text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a85740] transition-colors mb-2">
              {{ isLoading ? 'Loading...' : 'Sign In' }}
            </button>

            <!-- Sign Up Link -->
            <div class="text-center mb-3">
              <span class="text-sm text-gray-600">Don't have an account yet? </span>
              <NuxtLink to="/register" class="text-sm text-[#C76950] font-semibold hover:underline">
                Sign up
              </NuxtLink>
            </div>

            <!-- Divider -->
            <div class="flex items-center gap-3 my-3">
              <div class="flex-1 h-px bg-gray-300"></div>
              <span class="text-gray-500 font-medium text-xs">OR</span>
              <div class="flex-1 h-px bg-gray-300"></div>
            </div>

            <!-- Google Sign In -->
            <div @click="googleSignIn"
              class="flex cursor-pointer border border-gray-300 rounded-[20px] h-[42px] justify-center items-center text-center gap-3 hover:bg-gray-50 transition-colors">
              <div>
                <img src="/google.svg" class="w-5 h-5" alt="Google" />
              </div>
              <p class="text-sm">Sign In With Google</p>
            </div>

          </form>
        </div>

        <div class="leading-[40px]">
          <p class="font-semibold text-[40px] text-[#fefefe] leading-tight mb-5">Welcome Back to Shatably</p>
          <p class="text-[#fefefe] text-[20px]">Make Your Dream Home A Reality with Shatbly</p>
        </div>
      </div>

      <!-- Reset Password Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex justify-center items-center z-50" @click.self="showModal = false">
        <div class="bg-white p-6 rounded-[20px] shadow-lg w-[90%] max-w-[450px] flex flex-col gap-3">
          <h2 class="text-lg font-semibold text-center">Reset Password</h2>

          <label class="text-sm font-medium">Email</label>
          <input v-model="resetEmail" type="email" placeholder="Enter Your Email"
            class="border p-2 rounded-[16px] w-full outline-none focus:border-[#C76950]">

          <span :class="resetError.includes('✓') ? 'text-green-600' : 'text-red-500'" class="text-sm min-h-[20px]">
            {{ resetError }}
          </span>

          <button @click="handleReset" type="button" :disabled="isResetting"
            class="text-white w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center hover:bg-[#a85740] transition-colors disabled:opacity-50">
            {{ isResetting ? 'Sending...' : 'Reset Password' }}
          </button>

          <button @click="showModal = false" class="text-gray-500 text-sm hover:underline">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  sendPasswordResetEmail, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence 
} from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'

const { $auth, $db } = useNuxtApp()

const errorMessage = ref('')
const email = ref('')
const password = ref('')
const resetEmail = ref('')
const resetError = ref('')
const showModal = ref(false)
const isLoading = ref(false)
const isResetting = ref(false)
const rememberMe = ref(false)

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

const handleSignIn = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    // Set persistence BEFORE sign in
    if (rememberMe.value) {
      await setPersistence($auth, browserLocalPersistence)
    } else {
      await setPersistence($auth, browserSessionPersistence)
    }

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
    } else if (err.code === "auth/too-many-requests") {
      errorMessage.value = "Too many failed attempts. Please try again later."
    } else {
      errorMessage.value = "Sign in failed. Please try again."
    }
  } finally {
    isLoading.value = false
  }
}

const googleSignIn = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    // Set persistence BEFORE Google sign in
    if (rememberMe.value) {
      await setPersistence($auth, browserLocalPersistence)
    } else {
      await setPersistence($auth, browserSessionPersistence)
    }

    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup($auth, provider)
    const user = result.user

    const userDoc = await getDoc(doc($db, 'users', user.uid))
    if (!userDoc.exists()) {
      errorMessage.value = "Account not found. Please sign up first."
      await $auth.signOut()
      return
    }

    const role = userDoc.data().role
    await navigateUser(user.uid, role)

  } catch (googleError) {
    console.error('Google sign in error:', googleError)
    if (googleError.code === 'auth/popup-closed-by-user') {
      errorMessage.value = "Sign in cancelled"
    } else {
      errorMessage.value = "Google sign in failed. Please try again."
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

  isResetting.value = true

  try {
    await sendPasswordResetEmail($auth, resetEmail.value)
    resetError.value = " Reset link sent! Check your email."
    setTimeout(() => {
      showModal.value = false
      resetEmail.value = ''
      resetError.value = ''
    }, 2000)
  } catch (resErr) {
    console.error('Reset error:', resErr)
    if (resErr.code === 'auth/user-not-found') {
      resetError.value = 'No account found with this email'
    } else if (resErr.code === 'auth/invalid-email') {
      resetError.value = 'Invalid email address'
    } else {
      resetError.value = 'Failed to send reset link. Try again.'
    }
  } finally {
    isResetting.value = false
  }
}
</script>