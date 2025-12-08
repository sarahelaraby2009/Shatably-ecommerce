<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
// -----------------------------------------------------------------
const { $auth, $db } = useNuxtApp();
const router = useRouter();
const userName = ref("");
// ----------------------------------------------------------------
onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (!user) router.push("/register");
    else userName.value = user.displayName || "";
  });
});

// --------------------------------------------------------------------
const continueToProfile = async () => {
  const user = $auth.currentUser;
  if (!user) return;

  try {
    await setDoc(
      doc($db, "suppliers", user.uid),
      {
        profileComplete: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    router.push("/supplier");
  } catch (err) {
    console.error(err);
    alert("Failed to update profile. Try again.");
  }
};
</script>

<template>
  <div class="flex-col">
    <div
      class="flex items-start py-12 px-6 bg-white shadow rounded-xl mx-4 md:mx-[90px] mt-6 md:mt-[30px]"
    >
      <div class="w-24 h-24 md:w-[130px] md:h-[150px] flex-shrink-0">
        <img
          src="/assets/supplier.jpeg"
          class="w-full h-full rounded-[24px] object-cover"
        />
      </div>
      <p class="m-4 font-bold text-[22px] md:text-[26px]">
        Hello, {{ userName }}
      </p>
    </div>

    <!-- title -->
    <div class="mx-4 md:mx-[90px] p-2">
      <h2 class="text-[22px] md:text-[26px] font-medium">Become a Supplier</h2>
      <p class="text-sm md:text-base">
        Join our marketplace and start selling your products. Review the
        commission and requirements.
      </p>
    </div>

    <!-- main card container -->
    <div class="md:py-[50px] md:px-[70px] mx-4 md:mx-[90px] my-10 md:my-[40px]">
      <div class="flex flex-col space-y-4">
        <div class="bg-[#EBCDC5] p-[24px] rounded-[24px]">
          <h2 class="text-[20px] md:text-[26px] font-medium">
            Commission Structure
          </h2>
          <ul class="list-disc px-8 mt-2">
            <li>Standard Commission: 30% per sale</li>
            <li>No hidden fees</li>
          </ul>
        </div>

        <div class="bg-[#EBCDC5] p-[24px] rounded-[24px]">
          <h2 class="text-[20px] md:text-[26px] font-medium">Requirements</h2>
          <ul class="list-disc px-8 mt-2">
            <li>Commercial Register Document</li>
            <li>Tax ID Certificate</li>
            <li>Valid National ID</li>
          </ul>
        </div>

        <div class="mt-2">
          <div
            class="bg-[#C76950] p-3 rounded-3xl text-center text-white cursor-pointer"
          >
            <button @click="continueToProfile">Continue</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
