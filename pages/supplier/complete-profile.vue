<script setup>
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'

useHead({
  title: "Complete Supplier Profile",
  meta: [
    {
      name: "description",
      content: "اكمل ملف المورد الخاص بك لتقديم خدماتك ومنتجاتك للعملاء بسهولة.",
    },
    {'keywords': 'مورد, ملف مورد, تسجيل مورد, خدمات مورد, منتجات مورد, تسويق مورد, تجارة إلكترونية, متجر إلكتروني, تسوق عبر الإنترنت, عروض خاصة'},
  ],
});

const { $auth, $db } = useNuxtApp()
const router = useRouter()

const uid = ref('')
const name = ref('')
const phone = ref('')
const Category = ref('')
const Tax = ref('')
const Bank = ref('')
const errorMessages = ref('')
const isLoading = ref(false) 

onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (user) uid.value = user.uid
    else router.push('/register') 
  })
})

const saveData = async () => {
  if (!name.value || !phone.value || !Category.value || !Tax.value || !Bank.value) {
    errorMessages.value = 'Please fill all the fields'
    return
  }

  isLoading.value = true
  errorMessages.value = ''

  try {
    await setDoc(
      doc($db, 'suppliers', uid.value),
      {
        companyName: name.value,
        phone: phone.value,
        category: Category.value,
        taxId: Tax.value,
        bankAccount: Bank.value,
        profileComplete: true, 
        updatedAt: serverTimestamp()
      },
      { merge: true }
    )

    router.push('/supplier/membership')
  } catch (err) {
    console.error(err)
    errorMessages.value = 'Failed to save profile. Try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center items-center p-5 bg-[#fafafa]">
    <div class="p-5 rounded-[24px] w-[800px] m-3 bg-white shadow-lg flex flex-col gap-5">
      <div>
        <h2 class="font-bold text-[25px] text-[#612B1F]">Supplier Information</h2>
        <p class="text-gr">Complete Your Profile</p>
      </div>
      
      <form @submit.prevent="saveData">
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Company Name</label>
          <input 
            v-model="name" 
            required
            :disabled="isLoading"
            class="font-normal text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px] disabled:opacity-50" 
            type="text"
            placeholder="enter company name" 
          />
        </div>

        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Phone Number</label>
          <input 
            v-model="phone" 
            required
            :disabled="isLoading"
            class="font-normal text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px] disabled:opacity-50" 
            type="tel"
            placeholder="enter phone number" 
          />
        </div>

        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Business Category</label>
          <input 
            v-model="Category" 
            required
            :disabled="isLoading"
            class="font-normal text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px] disabled:opacity-50" 
            type="text"
            placeholder="enter category" 
          />
        </div>

        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Tax Identification Number</label>
          <input 
            v-model="Tax" 
            required
            :disabled="isLoading"
            class="font-normal text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px] disabled:opacity-50" 
            type="text"
            placeholder="enter tax Identification number" 
          />
        </div>

        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Bank account number</label>
          <input 
            v-model="Bank" 
            required
            :disabled="isLoading"
            class="font-normal text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px] disabled:opacity-50" 
            type="text"
            placeholder="enter bank account number" 
          />
        </div>

        <p v-if="errorMessages" class="text-red-400 mb-3">{{ errorMessages }}</p>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="text-[#fefefe] w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Saving...' : 'Save Profile' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>