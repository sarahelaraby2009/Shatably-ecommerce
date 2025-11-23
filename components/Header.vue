<template>
  <header class="w-full bg-gray-100 px-[80px] pb-3 flex flex-col">

    <!-- Row 1 -->
    <nav class="flex items-center justify-between">

      <!-- Logo -->
      <div>
        <img src="/logo1.png" class="h-[220px] w-[200px] -my-6" alt="logo" />
      </div>

      <!-- Links -->
      <ul class="hidden md:flex items-center space-x-10 text-gray-700 font-medium">

        <li>
          <NuxtLink to="/" exact-active-class="text-[#C76950] text-[20px] font-medium"
            class="text-[18px] hover:text-[#C76950]">
            Home
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/pricing" exact-active-class="text-[#C76950] text-[20px] font-medium"
            class="text-[18px] hover:text-[#C76950]">
            Pricing
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/engineerpage" exact-active-class="text-[#C76950] text-[20px] font-medium"
            class="text-[18px] hover:text-[#C76950]">
            Professionals
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/favourite" exact-active-class="text-[#C76950] text-[20px] font-medium"
            class="text-[18px] hover:text-[#C76950]">
            WishList
          </NuxtLink>
        </li>

        <!-- Categories Dropdown -->
        <li class="relative">
          <button @click="open = !open" class="flex items-center hover:text-[#C76950]">
            Categories <span class="ml-1">▼</span>
          </button>

          <ul v-if="open" class="absolute top-full left-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
            <li v-for="category in categories" :key="category.id">
              <NuxtLink :to="`/categories/${category.id}`" class="block px-4 py-2 hover:bg-gray-100">
                {{ category.name }}
              </NuxtLink>
            </li>
          </ul>
        </li>

      </ul>

      <!-- Auth Buttons -->
      <div class="flex gap-3">
        <button class="px-5 py-2 rounded-[22px] w-[121px] bg-[#C76950] text-white hover:bg-[#AD563F]">
          Sign in
        </button>

        <button
          class="px-5 py-2 rounded-[22px] w-[121px] border border-[#612B1F] text-[#612B1F] hover:text-[#C76950] hover:border-[#C76950]">
          Sign up
        </button>
      </div>

    </nav>

    <!-- Row 2 -->
    <div class="flex px-32 -mt-10">

      <!-- Search -->
      <div class="flex items-center w-[700px] h-[45px] px-4 rounded-[24px] bg-white shadow">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="text-gray-500 mr-3" />
        <input type="text" placeholder="Search" class="flex-1 outline-none text-gray-600" />
        <font-awesome-icon :icon="['fas', 'sliders']" />
      </div>

      <!-- Cart -->
      <div class="flex items-center gap-2 ml-60">
        <div
          class="w-10 h-10 flex items-center justify-center rounded-full bg-[#C76950] shadow cursor-pointer hover:bg-orange-600 transition">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" class="text-white text-xl" />
        </div>
      </div>

    </div>

  </header>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';

const { $db } = useNuxtApp()
const open = ref(false)
const categories = ref([])

onMounted(async () => {
  const catRef = collection($db, "categories");
  const snapShot = await getDocs(catRef);
  console.log(" Snapshot size:", snapShot.size);

  categories.value = snapShot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log(" categories:", categories.value);
});


</script>
