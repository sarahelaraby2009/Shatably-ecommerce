<template>
  <div class="flex justify-center items-center p-5  bg-[#fafafa] ">
    <div class="p-5 rounded-[24px] w-[800px] m-3 bg-white shadow-lg flex flex-col gap-5">
      <h2 class="font-bold text-[25px] text-[#612B1F]">Complete Your Profile</h2>
      <form @submit.prevent="saveData">
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Profile Image URL</label>
          <input v-model="image"
            class="font-semibold text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px]" type="text"
            placeholder="Paste image link here" />
        </div>
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Your Position</label>
          <select v-model="position" required
            class="font-bold text-m text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px]">
            <option disabled value="">Choose your position</option>
            <option>Architect</option>
            <option>Civil Engineer</option>
            <option>Interior Designer</option>
            <option>Finishing Engineer</option>
          </select>
        </div>
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Specialization</label>
          <input v-model="specialization" required
            class="font-semibold text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px]" type="text"
            placeholder="e.g. Finishing - Interior Design" />
        </div>
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Mobile Number</label>
          <input v-model="mobile" required 
            class="font-semibold text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px]" type="number"
            placeholder="e.g.01*********" />
        </div>
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Years Of Experience</label>
          <input v-model="experience"
            class="font-semibold text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px]" type="text"
            placeholder="e.g. 5" />
        </div>
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Bio</label>
          <input v-model="bio" required
            class="font-semibold text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[100px]" type="text"
            placeholder="Write a short desription about your work and experience" />
        </div>
        <P class="text-red-400">{{ errorMessages }}</P>
        <div>
          <button
            class="text-[#fefefe] w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">Save
            Profile</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { getDoc, updateDoc, doc } from 'firebase/firestore'

const specialization = ref('')
const experience = ref('')
const bio = ref('')
const position = ref('')
const image = ref('')
const mobile = ref('')
const { $db } = useNuxtApp()
const auth = getAuth()
const errorMessages = ref('')

onMounted(async () => {
  const user = auth.currentUser
  if (!user) {
    navigateTo('/signin')

  }
  const docSnap = await getDoc(doc($db, 'engineers', user.uid))
  if (docSnap.exists()) {
    const data = docSnap.data()
    position.value = data.position
    experience.value = data.yearsOfExperience
    bio.value = data.bio
    specialization.value = data.specialization
    image.value=data.image
    mobile.value=data.mobile
  }
})

const saveData = async () => {
  const user = auth.currentUser
  if (!position.value || !specialization.value || !experience.value || !bio.value) {
    errorMessages.value = "Please fill all required fields."
    return
  }

  await updateDoc(doc($db, 'engineers', user.uid), {
    position: position.value,
    specialization: specialization.value,
    yearsOfExperience:Number (experience.value),
    bio: bio.value,
    image:image.value,
    mobile:mobile.value,
    profileComplete: true

  })
  navigateTo("/userEngineer/membership")
}







</script>