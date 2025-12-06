<template> 
  <div class="container m-auto px-4">
    
    <!-- Mobile Layout -->
    <div class="lg:hidden pt-6 pb-10">
      
      <!-- Mobile Tabs Navigation -->
      <nav class="flex gap-6 mb-6 border-b">
        <NuxtLink 
          to="/userprofile" 
          class="pb-2 text-sm font-medium"
          :class="$route.path === '/userprofile' ? 'text-[#C17767] border-b-2 border-[#C17767]' : 'text-gray-500'"
        >
          Profile
        </NuxtLink>
        <NuxtLink 
          to="/userprofile/address" 
          class="pb-2 text-sm font-medium"
          :class="$route.path === '/userprofile/address' ? 'text-[#C17767] border-b-2 border-[#C17767]' : 'text-gray-500'"
        >
          Address
        </NuxtLink>
        <NuxtLink 
          to="/userprofile/orders" 
          class="pb-2 text-sm font-medium"
          :class="$route.path === '/userprofile/orders' ? 'text-[#C17767] border-b-2 border-[#C17767]' : 'text-gray-500'"
        >
          Orders
        </NuxtLink>
      </nav>

      <!-- Mobile Content -->
      <div class="bg-white p-4 rounded-2xl shadow">
        
      
        <div v-if="$route.path === '/userprofile'" class="flex flex-col items-start mb-6">
          <div class="relative mb-3">
            <img src="/13.jpg" class="w-24 h-24 rounded-full object-cover">
            <label for="upload" class="absolute bottom-0 right-0 bg-white border rounded-full p-1.5 shadow cursor-pointer">
              <font-awesome-icon :icon="['fas', 'edit']" class="text-gray-700 text-sm" />
            </label>
          </div>
          <h3 class="font-bold text-lg">Hello {{ profile.name }}!</h3>
                      <p class="text-sm text-gray-500 pb-5">{{ profile.email }}</p>

        </div>

        <NuxtPage />
      </div>
    </div>

    <!-- Desktop Layout (Original) -->
    <div class="hidden lg:grid grid-cols-[300px_1fr] pt-10 gap-10 pb-10">
      <!-- Sidebar left -->
      <aside class="space-y-1 shadow rounded-2xl h-[600px]">
        <!-- image+name -->
        <div class="flex gap-4 pt-5">
          <div class="relative">
            <img src="/13.jpg" class="w-14 h-14 rounded-full object-cover ml-5">
            <label for="upload" class="absolute bottom-0 right-0 bg-white border rounded-full object-cover pr-1 pl-1 shadow cursor-pointer">
              <font-awesome-icon :icon="['fas','edit']" class="text-gray-700 text-xs" />
            </label>
          </div>
          <div class="grid">
            <h3 class="pt-1 font-bold text-xl">Hello {{ profile.name }}</h3>
            <p class="text-sm text-gray-500 pb-5">{{ profile.email }}</p>
          </div>
        </div>

        <hr/>

        <!-- info -->
        <div class="space-y-5 pl-5 pr-2 h-[800px]">
          <h3 class="font-bold pt-5 text-2xl pb-5">My Account</h3>

          <NuxtLink to="/userprofile">
            <div class="flex items-center gap-3 p-2 hover:bg-[#EBCDC5] rounded-2xl cursor-pointer">
              <font-awesome-icon :icon="['fas', 'user']" class="text-[20px]" />
              <p class="text-lg font-medium">Profile</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/userprofile/address">
            <div class="flex items-center gap-3 p-2 hover:bg-[#EBCDC5] rounded-2xl cursor-pointer">
              <font-awesome-icon :icon="['fas', 'location-dot']" class="text-[20px]" />
              <p class="text-lg font-medium">Address</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/userprofile/orders">
            <div class="flex items-center gap-3 p-2 hover:bg-[#EBCDC5] rounded-2xl cursor-pointer">
              <font-awesome-icon :icon="['fas', 'bookmark']" class="text-[20px]" />
              <p class="text-lg font-medium">Orders</p>
            </div>
          </NuxtLink>

          <hr/>

          <NuxtLink to="/signin">
            <div class="flex items-center gap-3 p-2 hover:bg-[#EBCDC5] rounded-2xl cursor-pointer">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-[20px]" />
              <p class="text-lg font-medium">Log out</p>
            </div>
          </NuxtLink>
        </div>
      </aside>

      <!-- right -->
      <div class="bg-white p-4 rounded-2xl shadow">
        <NuxtPage />
      </div>
    </div>

  </div> 
</template>
<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const { $auth, $db } = useNuxtApp();

const profile = ref({
  email: "",
  name:"",
});

const fetchProfile = async (uid) => {
  const snap = await getDoc(doc($db, "users", uid));
  if (snap.exists()) {
    profile.value = snap.data();
  }
};


onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (user) fetchProfile(user.uid);
  });
});



definePageMeta({
  layout: "default",

})

</script>
