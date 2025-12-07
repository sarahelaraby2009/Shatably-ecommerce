<script setup>
import { ref, onMounted } from 'vue'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import { onAuthStateChanged } from 'firebase/auth'

// ----------------------------
const { $auth, $db } = useNuxtApp();

const data = {
  feild1: "Profile",
  feild2: "Product uploads",
  feild3: "Orders track",
}

const userName = ref('')
const email = ref('')
const phoneNumber = ref('')
const firstName = ref('')
const lastName = ref('')
const gender = ref('')   

// ----------------------------
onMounted(() => {
  onAuthStateChanged($auth, async (user) => {
    if (user) {
      const docRef = doc($db, 'suppliers', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const supplierData = docSnap.data()
        userName.value = supplierData.name
        email.value = supplierData.email
        phoneNumber.value = supplierData.phoneNumber || ''
        gender.value = supplierData.gender || ''

        const parts = supplierData.name.split(' ')
        firstName.value = parts[0] || ''
        lastName.value = parts.slice(1).join(' ') || ''
      }
    }
  })
})

// ----------------------------
const updateProfile = async () => {
  const user = $auth.currentUser
  if (!user) return

  try {
    await setDoc(
      doc($db, 'suppliers', user.uid),
      {
        name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        phoneNumber: phoneNumber.value,
        gender: gender.value
      },
      { merge: true } 
    )

    alert('Profile updated successfully!')

    firstName.value = ''
    lastName.value = ''
    email.value = ''
    phoneNumber.value = ''
    gender.value = ''
  } catch (err) {
    console.error(err)
    alert('Failed to update profile')
  }
}

</script>

<template>
  <div class="flex justify-start items-center">
    <SideBar
      :feild1="data.feild1"
      :feild2="data.feild2"
      :feild3="data.feild3"
      :userName="userName"
      :email="email"
    />

    <div class="container m-auto">
      <div class="bg-white p-4 rounded-2xl shadow">
        <div class="p-3 pb-5">
          <h3 class="font-bold text-xl">Profile</h3>
          <p>View & Update Your Personal and Contact Information</p>
        </div>

        <div class="p-5 shadow rounded-3xl mt-4">
          <h3 class="font-bold text-xl">Contact information</h3>
          <div class="flex gap-4 p-3">
            <div class="grid gap-2">
              <h1>Email</h1>
              <input type="email" v-model="email" class="w-xl border border-gray-300 rounded-full p-3 outline-none" />
            </div>
            <div class="grid gap-2">
              <h1>Phone Number</h1>
              <input type="number" v-model="phoneNumber" class="w-xl border border-gray-300 rounded-full p-3 outline-none" />
            </div>
          </div>
        </div>

        <div class="p-5 shadow rounded-3xl mt-10">
          <h3 class="font-bold text-xl">Personal information</h3>
          <div class="flex gap-4 p-3">
            <div class="grid gap-2">
              <h1>First Name</h1>
              <input type="text" v-model="firstName" class="w-xl border border-gray-300 rounded-full p-3 outline-none" />
            </div>
            <div class="grid gap-2">
              <h1>Last Name</h1>
              <input type="text" v-model="lastName" class="w-xl border border-gray-300 rounded-full p-3 outline-none" />
            </div>
          </div>

    
          <div class="flex gap-4 mt-3">
            <label class="flex items-center gap-2">
              <input type="radio" value="male" v-model="gender" /> Male
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="female" v-model="gender" /> Female
            </label>
          </div>
        </div>

        <div class="bg-[#C76950] p-3 rounded-3xl text-center mt-10 cursor-pointer">
          <button @click="updateProfile">Update Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>
