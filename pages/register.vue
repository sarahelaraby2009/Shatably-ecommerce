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
          <form class="flex flex-col gap-2 w-full" @submit.prevent="handleSignUp">
            <h2 class="font-bold text-xl">Welcome to Shatably</h2>
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
                v-model="name" placeholder="enter Your full name"></input>
            </div>

            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">Email</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                type="email" v-model="email" placeholder="user@example.com"></input>
            </div>
            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">Password</label>
              <input required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                type="password" v-model="password" placeholder="*****"></input>
            </div>
            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">confirm Password</label>
              <input @input="matchPass" required
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                type="password" v-model="repassword" placeholder="*****"></input>
            </div>
            <div>
              <input required class="mb-3" type="checkbox"><span class="text-sm"> Agree to our <span class="underline cursor-pointer">Terms and
                conditions</span></span></input>
            </div>
            <span class="text-red-400 text-sm">{{ errorMessage }}</span>
            <div class="flex items-center gap-3 my-3">
              <div class="flex-1 h-px bg-gray-300"></div>
              <span class="text-gray-500 font-medium text-xs">OR</span>
              <div class="flex-1 h-px bg-gray-300"></div>
            </div>
            <div @click="googleSignUp"
              class="mb-3 flex cursor-pointer border border-gray-300 rounded-[20px] h-[42px] justify-center items-center text-center gap-3">
              <div>
                <img src="/google.svg" class="w-5 h-5" alt="Google" />
              </div>
              <p class="text-sm">Sign Up With Your Google Account</p>
            </div>

            <div>
              <button type="submit"
                class="text-[#fefefe] w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center">Register</button>
            </div>
          </form>

        </div>
        <div class="leading-[40px]">
          <p class="font-semibold text-2xl text-[#fefefe]">Shatably</p>
          <p class="text-[#fefefe] text-base">Make Your Dream Home A Reality with Shatbly</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
const email = ref('')
const name = ref('')
const password = ref('')
const repassword = ref('')
const errorMessage = ref('')
const userRole = ref('')
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
definePageMeta({
  layout:'withOutNavFoot'
})
const { $auth } = useNuxtApp()
const { $db } = useNuxtApp()
const matchPass = () => {
  if (password.value !== repassword.value) {
    errorMessage.value = "unmatched password"
    return
  }
  else { errorMessage.value = '' }
}
const googleSignUp = async () => {
  errorMessage.value = ''

  
  if (!userRole.value) {
    errorMessage.value = "please pick your account type"
    return
  }
  let user = null

  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup($auth, provider)
    const user = result.user

    const userDoc = await getDoc(doc($db, 'users', user.uid))

    if (!userDoc.exists()) {
      await setDoc(doc($db, 'users', user.uid), {
        email: user.email,
        name: user.displayName,
        role: userRole.value,
        cart: []
      })
    }

  } catch (err) {
    console.log(err)
    errorMessage.value = "Google sign up failed"
    return
  }


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
      reviews: [],
      specialization: '',
      yearsOfExperience: 0,
      bio: '',
      image: user.photoURL || ''
    })
    navigateTo('/engineer/complete-profile')
  }

  else if (userRole.value === 'supplier') {
    await setDoc(doc($db, 'suppliers', user.uid), {
      name: user.displayName,
      email: user.email,
      rating: 0,
      products: [],
      createdAt: serverTimestamp()
    })
    navigateTo('/supplier')
  }

  else if (userRole.value === 'client') {
    await setDoc(doc($db, 'clients', user.uid), {
      name: user.displayName,
      email: user.email,
      orders: [],
      favorites: [],
      createdAt: serverTimestamp()
    })
    navigateTo('/')
  }
}

const handleSignUp = async () => {
  if (!emailRegex.test(email.value)) {
    errorMessage.value = "Invalid email"
    return
  }

  if (!userRole.value) {
    errorMessage.value = "please pick your account type"
    return
  }


  try {
    const userCredential = await createUserWithEmailAndPassword($auth, email.value, password.value)
    const user = userCredential.user
    await setDoc(doc($db, 'users', user.uid), {
      email: email.value,
      name: name.value,
      role: userRole.value,
      cart: []

    })
    if (userRole.value === 'engineer') {
      console.log('Creating engineer document...')
      try {
        await setDoc(doc($db, 'engineers', user.uid), {
          name: name.value,
          email: email.value,
          portfolio: [],
          position: '',
          rating: 0,
          createdAt: serverTimestamp(),
          profileComplete: false,
          canUploadWork: false,
          reviews: [],
          specialization: '',
          yearsOfExperience: 0,
          bio: '',
          image: ''
        })
        console.log("successfully registered")

      }
      catch (engineerError) {
        console.log(engineerError)
        throw new Error('فشل في إنشاء حساب المهندس')

      }

    }
    else if (userRole.value === 'supplier') {
      try {
        await setDoc(doc($db, 'suppliers', user.uid), {
          name: name.value,
          email: email.value,
          rating: 0,
          products: [],
          createdAt: serverTimestamp()
        })

      }
      catch (error) { throw new Error('faild to create new supplier') }
    }
    else if (userRole.value === 'client') {
      try {
        await setDoc(doc($db, 'clients', user.uid), {
          name: name.value,
          email: email.value,
          orders: [],
          favorites: [],
          createdAt: serverTimestamp()
        })
      }
      catch (error) { throw new Error('faild to create new client') }
    }
    if (userRole.value === 'client') {
      navigateTo('/')
    }
    else if (userRole.value === 'engineer') {
      navigateTo('/engineer/complete-profile')
    }
    else if (userRole.value === 'supplier') {
      navigateTo('/supplier')
    }

  }
  catch (err) {
  if (err.code === 'auth/email-already-in-use') {
    errorMessage.value = "This email is already registered. Please sign in instead."
    return
  }
  errorMessage.value = "Something went wrong. Try again."
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
  padding: 12px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
}
</style>