<script setup>
import { onMounted, ref } from 'vue'
import { useNuxtApp } from '#app'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

const { $auth, $db } = useNuxtApp()
const router = useRouter()
const userName = ref('')

// تأكيد تسجيل الدخول وعرض الاسم
onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (!user) router.push('/register')
    else userName.value = user.displayName || ''
  })
})

// حفظ مباشرة وتحديث profileComplete
const continueToProfile = async () => {
  const user = $auth.currentUser
  if (!user) return

  try {
    await setDoc(
      doc($db, 'suppliers', user.uid),
      {
        profileComplete: true,
        updatedAt: serverTimestamp()
      },
      { merge: true }
    )
    router.push('/supplier') // بعد الحفظ يروح للبروفايل
  } catch (err) {
    console.error(err)
    alert('Failed to update profile. Try again.')
  }
}
</script>

<template>
  <div class="flex-col">
    <div class="flex items-start mx-[90px] mt-[30px]">
      <div class="w-[130px] h-[150px]">
        <img src="/assets/supplier.jpeg" class="w-full h-full rounded-[24px]">
      </div>
      <p class="m-4 font-bold text-[26px]">Hello, {{ userName }}</p>
    </div>

    <div class="mx-[90px] p-2">
      <h2 class="text-[26px] font-medium">Become a Supplier</h2>
      <p>Join our marketplace and start selling your products. Review the commission and requirements.</p>
    </div>

    <div class="py-[50px] px-[70px] bg-white shadow mx-[90px] my-[40px] rounded-xl ">
      <div class="bg-[#EBCDC5] p-[24px] mb-[24px] rounded-[24px]">
        <h2 class="text-[26px] font-medium">Commission Structure</h2>
        <ul class="list-disc px-8">
          <li>Standard Commission:30% per sale</li>
          <li>No hidden fees</li>
        </ul>
      </div>

      <div class="bg-[#EBCDC5] p-[24px] rounded-[24px]">
        <h2 class="text-[26px] font-medium">Requirements</h2>
        <ul class="list-disc px-8">
          <li>Commercial Register Document</li>
          <li>Tax ID Certificate</li>
          <li>Valid National ID</li>
        </ul>
      </div>

      <div class="bg-[#C76950] p-3 rounded-3xl text-center mt-10 text-white cursor-pointer">
        <button @click="continueToProfile">Continue</button>
      </div>
    </div>
  </div>
</template>
