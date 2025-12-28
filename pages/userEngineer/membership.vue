<template>
  <div class="min-h-screen flex flex-col mt-5 mx-5 md:mx-[100px]">


    <div class="max-w-4xl w-full">
      <div class="flex gap-2">
        <img :src="engineerImage" class="w-20 h-20 rounded-[20px] object-cover shadow-md mb-3" />
        <h2 class="font-bold text-[24px] mb-10">
          Hello,{{ engineerName }}
        </h2>

      </div>

      <div class="mb-10">
        <p class="text-left font-bold text-[28px]">Manage your Membership below</p>
        <p class="text-gray-600 text-md text-left  mx-auto ">
          Subscribe to the Engineer Membership to showcase your work, unlock your public profile,
          and allow clients to contact you directly.
        </p>
      </div>
      <div class="rounded-[24px] w-full max-w-none mx-auto shadow-lg bg-red-100 mb-12 p-3 overflow-visible">


        <h2 class="font-bold text-[20px] text-[#262626]">Important Information</h2>
        <ul class="text-[#262626] ">
          <li class="text-[16px]">• You <span class="font-semibold">cannot display your projects</span> until you
            subscribe.</li>
          <li class="text-[16px]">• After your membership expires, <span class="font-semibold">clients will not be able
              to contact
              you directly</span>.</li>
          <li class="text-[16px]">• You can edit, add, or remove your projects anytime during your active subscription.
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-14 mx-auto">
        <div class="bg-white rounded-2xl w-full max-w-[300px] shadow p-6 text-center">
          <h3 class="font-bold  text-lg mb-2">Showcase Your Work</h3>
          <p class="text-gray-600">Display your engineering projects clearly and professionally.</p>

        </div>

        <div class="bg-white rounded-2xl w-full max-w-[300px] shadow p-6 text-center ">
          <h3 class="font-bold text-lg mb-2">Direct Client Contact</h3>
          <p class="text-gray-600">Clients can reach out to you directly during your active plan.</p>

        </div>
        <div class="bg-white rounded-2xl w-full max-w-[300px] shadow p-6 text-center">
          <h3 class="font-bold text-lg mb-2">Public Engineer Profile</h3>
          <p class="text-gray-600">Your portfolio and skills become visible to all users.</p>

        </div>

      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-14 mx-auto">

        <div @click="openModal('Monthly', 1, 500)"
          class="bg-white rounded-2xl shadow w-full max-w-[300px] p-5 text-center border hover:shadow-xl transition cursor-pointer">
          <h1 class="text-gray-600 font-bold text-[20px]">Monthly Plan</h1>
          <p class="text-gray-600 text-[15px]">1 Month Access</p>
          <p class="text-[#C76950] font-bold text-[30px]">500EGP</p>
          <button class="px-5 py-2 bg-[#C76950] text-white rounded-xl shadow cursor-pointer transition">Subscribe
            Monthly</button>
        </div>
        <div @click="openModal('Quarterly', 3, 1200)"
          class="bg-white rounded-2xl shadow w-full max-w-[300px] p-5 text-center border hover:shadow-xl transition cursor-pointer">
          <h1 class="text-gray-600 font-bold text-[20px]">Quarterly Plan</h1>
          <p class="text-gray-600 text-[15px]">3 Months Access</p>
          <p class="text-[#C76950] font-bold text-[30px]">1200EGP</p>
          <button class="px-5 py-2 bg-[#C76950] text-white rounded-xl shadow cursor-pointer transition">Subscribe
            Quarterly</button>

        </div>
        <div @click="openModal('Semi', 6, 2500)"
          class="bg-white rounded-2xl shadow w-full max-w-[300px] p-5 text-center border hover:shadow-xl transition cursor-pointer">
          <h1 class="text-gray-600 font-bold text-[20px]">Semi Annual Plan</h1>
          <p class="text-gray-600 text-[15px]">6 Months Access</p>
          <p class="text-[#C76950] font-bold text-[30px]">2500EGP</p>
          <button class="px-5 py-2 bg-[#C76950] text-white rounded-xl shadow cursor-pointer transition">Subscribe
            6 Months</button>

        </div>
      </div>
      <div v-if="showModal" class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

        <div class="bg-white rounded-2xl shadow-xl w-[450px] p-5 relative">

          <!-- Close Button -->
          <button @click="showModal = false" class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300
             flex justify-center items-center text-gray-700 absolute -top-3 -right-3 shadow">
            ✕
          </button>

          <!-- Title -->
          <h2 class="text-[20px] font-bold text-[#C76950] text-center mb-1">Payment Details</h2>
          <p class="text-gray-500 text-[13px] text-center mb-4">
            Complete the payment to activate your membership.
          </p>

          <!-- Summary -->
          <div class="bg-gray-100 rounded-xl p-3 mb-4 text-[14px]">
            <p class="font-semibold text-gray-600">
              Plan:
              <span class="text-[#C76950]">{{ plan }}</span>
            </p>
            <p class="font-semibold text-gray-600">
              Months:
              <span class="text-[#C76950]">{{ selectedMonth }}</span>
            </p>
            <p class="font-semibold text-gray-600">
              Price:
              <span class="text-[#C76950]">{{ selectedPrice }} EGP</span>
            </p>
          </div>

          <!-- Inputs -->
          <form class="space-y-3" @submit.prevent="completePayment">

            <div>
              <label class="text-sm font-medium text-gray-600">Card Holder</label>
              <Input required type="text" pattern="^[A-Za-z ]+$"
                @invalid="(e) => e.target.setCustomValidity('Please enter a valid name')"
                @input="(e) => e.target.setCustomValidity('')"
                class="border rounded-lg w-full p-2 mt-1 text-sm outline-none" placeholder="e.g. Ahmed Youssef" />
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600">Card Number</label>
              <Input required type="text" class="border rounded-lg w-full p-2 mt-1 text-sm outline-none"
                pattern="^[0-9]{16}$" inputmode="numeric" maxlength="16"
                @invalid="(e) => e.target.setCustomValidity('Card number must be 16 digits')"
                @input="(e) => e.target.setCustomValidity('')" placeholder="0000 0000 0000 0000" />
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600">Expiry
                Date</label>
              <Input required type="text" class="border rounded-lg w-full p-2 mt-1 text-sm outline-none"
                v-model="expiry" ref="expiryInput" @input="handleExpiryInput" placeholder="MM/YY" maxlength="5" />
            </div>

            <div>
              <label class="text-sm font-medium text-gray-600">CVV</label>
              <Input required @input="cvvCheck" ref="cvvInput" v-model="cvv" type="password"
                class="border rounded-lg w-full p-2 mt-1 text-sm outline-none" placeholder="•••" maxlength="3"
                inputmode="numeric" />
            </div>

            <button type="submit"
              class="w-full mt-5 bg-[#C76950] text-white text-[15px] font-semibold py-2 rounded-lg hover:bg-[#b25745] transition">
              Pay Now
            </button>
          </form>

          <p class="text-green-600 text-sm text-center mt-2">{{ successMessage }}</p>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { updateDoc, getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

useHead({
  title: 'Engineer Membership',
  meta: [
    {
      name: 'description',
      content: 'تحكم في اشتراك العضوية الخاص بك كمهندس وعرض مشاريعك للعملاء.'
    }
  ]
})

const expiry = ref('')
const expiryInput = ref(null)
const cvv = ref('')
const cvvInput = ref(null)
const { $db } = useNuxtApp()
const auth = getAuth()
const selectedPlan = ref('')
const selectedMonth = ref(null)
const selectedPrice = ref(null)
const membershipType = ref('')
const showModal = ref(false)
const successMessage = ref('')
const engineerName = ref('')
const engineerImage = ref('')

onMounted(async () => {
  const user = auth.currentUser
  const docSnap = await getDoc(doc($db, 'engineers', user.uid))
  if (docSnap.exists()) {
    const data = docSnap.data()
    engineerName.value = data.name
    engineerImage.value = data.image
  }
})

const plan = computed(() => {
  if (selectedPlan.value === 'Monthly') return 'Monthly Plan'
  if (selectedPlan.value === 'Quarterly') return 'Quarterly Plan'
  return 'Semi Annual Plan'
})

const openModal = (plan, months, price) => {
  selectedPlan.value = plan
  selectedMonth.value = months
  selectedPrice.value = price
  showModal.value = true
}

const handleExpiryInput = (e) => {
  let value = e.target.value.replace(/\D/g, ''); // أرقام بس

  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4);
  }

  expiry.value = value;

  // Clear previous errors
  expiryInput.value.setCustomValidity('');

  // Validate only if complete
  if (value.length === 5) {
    const [month, year] = value.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (parseInt(month) < 1 || parseInt(month) > 12) {
      expiryInput.value.setCustomValidity('Month must be between 01 and 12');
    } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      expiryInput.value.setCustomValidity('Expiry date must be in the future');
    }
  }
}

const cvvCheck = (e) => {
  // امنع أي حاجة غير الأرقام
  const value = e.target.value.replace(/\D/g, '');
  cvv.value = value;

  cvvInput.value.setCustomValidity('');

  if (value.length > 0 && value.length < 3) {
    cvvInput.value.setCustomValidity('CVV must be 3 numbers');
  } else if (value.length === 0) {
    cvvInput.value.setCustomValidity('CVV is required');
  }
}
const completePayment = async (event) => {
  const form = event.target;

  // Check validity
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  try {
    const user = auth.currentUser;

    // احسب تاريخ الانتهاء حسب الخطة
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + selectedMonth.value);

    await updateDoc(doc($db, 'engineers', user.uid), {
      hasMembership: true,
      membershipType: selectedPlan.value,
      membershipExpiry: endDate,
      canUploadWork:true
    });
    


    successMessage.value = "Payment Success 🎉 Membership Activated";

    setTimeout(() => {
      showModal.value = false;
      successMessage.value = '';
      expiry.value = '';
      cvv.value = '';
      navigateTo('/userEngineer/dashboard');
    }, 2000);

  } catch (error) {
    console.error("Payment update error:", error);
    alert("Payment saved but failed to update system, please try again.");
  }
};


</script>