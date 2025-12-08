<template>
  <div>
    <div class="relative min-h-screen w-full">
      <div class="blur-[2px] absolute bg-center inset-0 bg-cover" style="background-image: url('/sign.jpg');">
        <div class="absolute inset-0 flex justify-center pointer-events-none">
          <div class="w-full h-full bg-black/40 rounded-[16px]"></div>
        </div>
      </div>
      <div
        class="relative z-10 flex flex-col-reverse lg:flex-row min-h-screen items-center px-5 py-10 gap-[50px] lg:gap-[120px] pl-[60px]">
        <div class="flex flex-col overflow-hidden m-5 bg-[#fefefe] w-[500px] p-5 shadow-lg rounded-[20px] gap-[10px]">
          <form class="flex flex-col gap-2 w-full" @submit.prevent="handleSignUp">

            <h3 class="font-semibold text-base">sign up as :</h3>
            <div class="flex gap-2 justify-center items-center">
              <div class="options" @click="userRole = 'client'"
                :class="userRole === 'client' ? 'bg-[#C76950] text-[#fefefe]' : 'bg-transparent text-[#612B1F]'">Client
              </div>
              <div class="options" @click="userRole = 'engineer'"
                :class="userRole === 'engineer' ? 'bg-[#C76950] text-[#fefefe]' : 'bg-transparent text-[#612B1F]'">
                Engineer</div>
              <div class="options" @click="userRole = 'supplier'"
                :class="userRole === 'supplier' ? 'bg-[#C76950] text-[#fefefe]' : 'bg-transparent text-[#612B1F]'">
                Supplier</div>
            </div>

            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">Your name</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                v-model="name" placeholder="enter Your full name">
            </div>

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

            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">confirm Password</label>
              <input @input="matchPass" required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                type="password" v-model="repassword" placeholder="*****">
            </div>

            <div>
              <input required  type="checkbox"><span class="text-sm"> Agree to our <span
                  class="underline cursor-pointer">Terms and conditions</span></span>
            </div>

            <span class="text-red-400 text-sm">{{ errorMessage }}</span>

            <div class="flex items-center gap-3 my-3">
              <div class="flex-1 h-px bg-gray-300"></div>
              <span class="text-gray-400 font-medium text-xs">or continue with</span>
              <div class="flex-1 h-px bg-gray-300"></div>
            </div>

            <div @click="googleSignUp"
              class="mb-3 flex cursor-pointer border border-gray-300 rounded-[20px] h-[35px] justify-center items-center text-center gap-3">
              <div>
                <img src="/google.svg" class="w-5 h-5" alt="Google" />
              </div>
              <p class="text-xs">Sign Up With Your Google Account</p>
            </div>

            <div>
              <button type="submit" :disabled="isLoading"
                class="text-[#fefefe] w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isLoading ? 'Loading...' : 'Register' }}
              </button>
              <div class="text-center mt-3">
                <span class="text-sm text-gray-500">Already have an account? </span>
                <NuxtLink to="/signin" class="text-sm text-[#C76950] font-semibold hover:underline">
                  Sign In
                </NuxtLink>
              </div>
            </div>
          </form>
        </div>

        <div class="leading-[40px]">
          <p class="font-semibold text-[30px] text-[#fefefe] leading-30 mb-5">Welcome to Shatably</p>
          <p class="text-[#fefefe] text-base">Make Your Dream Home A Reality with Shatbly</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore'

const email = ref('')
const name = ref('')
const password = ref('')
const repassword = ref('')
const errorMessage = ref('')
const userRole = ref('')
const isLoading = ref(false)

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

definePageMeta({
  layout: 'withOutNavFoot'
})

const { $auth } = useNuxtApp()
const { $db } = useNuxtApp()

const matchPass = () => {
  if (password.value !== repassword.value) {
    errorMessage.value = "Passwords don't match"
    return
  }
  errorMessage.value = ''
}

const googleSignUp = async () => {
  errorMessage.value = ''

  if (!userRole.value) {
    errorMessage.value = "Please select your account type"
    return
  }

  isLoading.value = true

  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup($auth, provider)
    const user = result.user


    // Check if user already exists
    const userDoc = await getDoc(doc($db, 'users', user.uid))

    if (userDoc.exists()) {
      const existingRole = userDoc.data().role
      if (existingRole === 'client') {
        navigateTo('/')
      } else if (existingRole === 'engineer') {
        navigateTo('/userEngineer/complete-profile')
      } else if (existingRole === 'supplier') {
        navigateTo('/supplier')
      }
      return
    }

    // Create main user document
    await setDoc(doc($db, 'users', user.uid), {
      email: user.email,
      name: user.displayName,
      role: userRole.value,
      cart: [],
      createdAt: serverTimestamp()
    })

    // Create role-specific documents
    if (userRole.value === 'engineer') {
      await setDoc(doc($db, 'engineers', user.uid), {
        name: user.displayName,
        email: user.email,
        portfolio: [],
        position: '',
        rating: 0,
        createdAt: serverTimestamp(),
        profileComplete: false,
        canUploadWork: false,
        hasMembership: false,
        membershipType: null,
        membershipExpiry: null,
        reviews: [],
        specialization: '',
        yearsOfExperience: 0,
        bio: '',
        image: user.image || '',
        certificateName:''
      })
      navigateTo('/userEngineer/complete-profile')

    } else if (userRole.value === 'supplier') {
      await setDoc(doc($db, 'suppliers', user.uid), {
        name: user.displayName,
        email: user.email,
        rating: 0,
        products: [],
        createdAt: serverTimestamp()
      })
      navigateTo('/supplier')

    } else if (userRole.value === 'client') {
      await setDoc(doc($db, 'clients', user.uid), {
        name: user.displayName,
        email: user.email,
        orders: [],
        favorites: [],
        createdAt: serverTimestamp()
      })
      navigateTo('/')
    }

  } catch (err) {
    console.error('Google sign up error:', err)
    errorMessage.value = "Google sign up failed. Please try again."
  } finally {
    isLoading.value = false
  }
}

const handleSignUp = async () => {
  errorMessage.value = ''

  // Validation
  if (!emailRegex.test(email.value)) {
    errorMessage.value = "Invalid email format"
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = "Password must be at least 6 characters"
    return
  }

  if (password.value !== repassword.value) {
    errorMessage.value = "Passwords don't match"
    return
  }

  if (!userRole.value) {
    errorMessage.value = "Please select your account type"
    return
  }

  isLoading.value = true

  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword($auth, email.value, password.value)
    const user = userCredential.user

    // Create main user document
    await setDoc(doc($db, 'users', user.uid), {
      email: email.value,
      name: name.value,
      role: userRole.value,
      cart: [],
      createdAt: serverTimestamp()
    })

    // Create role-specific documents
    if (userRole.value === 'engineer') {
      await setDoc(doc($db, 'engineers', user.uid), {
        name: name.value,
        email: email.value,
        portfolio: [],
        position: '',
        rating: 0,
        createdAt: serverTimestamp(),
        profileComplete: false,
        canUploadWork: false,
        hasMembership: false,
        membershipType: null,
        membershipExpiry: null,
        reviews: [],
        specialization: '',
        yearsOfExperience: 0,
        bio: '',
        image: '',
        services: [],
        mobile: ''
      })
      console.log('Engineer account created successfully')
      // navigateTo('/userEngineer/complete-profile')

    } else if (userRole.value === 'supplier') {
      console.log("set suppliers");

      await setDoc(doc($db, 'suppliers', user.uid), {
        name: name.value,
        email: email.value,
        rating: 0,
        products: [],
        createdAt: serverTimestamp(),
        profileComplete: false,
      })
      console.log('Supplier account created successfully')
      // navigateTo('/supplier/compelete-profile')

    } else if (userRole.value === 'client') {
      await setDoc(doc($db, 'clients', user.uid), {
        name: name.value,
        email: email.value,
        orders: [],
        favorites: [],
        createdAt: serverTimestamp()
      })
      console.log('Client account created successfully')
      // navigateTo('/')
    }
    navigateTo('/signin')

  } catch (err) {
    console.error('Sign up error:', err)

    if (err.code === 'auth/email-already-in-use') {
      errorMessage.value = "This email is already registered. Please sign in instead."
    } else if (err.code === 'auth/weak-password') {
      errorMessage.value = "Password is too weak. Use at least 6 characters."
    } else if (err.code === 'auth/invalid-email') {
      errorMessage.value = "Invalid email address."
    } else {
      errorMessage.value = "Registration failed. Please try again."
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.options {
  border-radius: 20px;
  border: 1px solid #612B1F;
  cursor: pointer;
  text-align: center;
  height: 34px;
  padding: 12px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.options:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>