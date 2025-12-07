<script setup>
import { useRoute } from 'vue-router'
// -------------------------------------------
defineProps({
    email: String,
    userName: String,
    feild1: String,
    feild2: String,
    feild3: String,
})
// -------------------------------------------------
const route = useRoute()
const isActive = (routeName) => {
  return route.name === routeName
}
</script>

<template>
  <div>
    <div class="grid grid-cols-[300px_1fr] pt-10 gap-10 pb-10">
      <!-- Sidebar left -->
      <aside class="space-y-1 shadow rounded-2xl h-[600px]">
        <!-- image+name -->
        <div class="flex gap-4 pt-5">
          <div class="relative">
            <img
              src="/13.jpg"
              class="w-14 h-14 rounded-full object-cover ml-5"
            />
            <label
              for="upload"
              class="absolute bottom-0 right-0 bg-white border rounded-full object-cover pr-1 pl-1 shadow cursor-pointer"
            >
              <font-awesome-icon
                :icon="['fas', 'edit']"
                class="text-gray-700 text-xs"
              />
            </label>
          </div>
          <div class="grid">
            <h3 class="pt-1 font-bold text-xl">Hello {{userName}}!</h3>
            <p class="text-sm text-gray-500 pb-5">{{email}}</p>
          </div>
        </div>

        <hr />
        <!-- info -->
        <div class="space-y-5 pl-5 pr-2 h-[800px]">
          <h3 class="font-bold pt-5 text-2xl pb-5">My Account</h3>

          <NuxtLink to="/supplier">
            <div
              :class="[
                'flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-all',
                isActive('supplier') 
                  ? 'bg-[#EBCDC5] text-white font-bold' 
                  : 'hover:bg-[#EBCDC5] text-gray-800'
              ]"
            >
              <font-awesome-icon :icon="['fas', 'user']" class="text-[20px]" />
              <p class="text-lg font-medium">{{feild1}}</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/supplier/productsUploads">
            <div
              :class="[
                'flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-all',
                isActive('supplier-productsUploads') 
                  ? 'bg-[#EBCDC5] text-white font-bold' 
                  : 'hover:bg-[#EBCDC5] text-gray-800'
              ]"
            >
              <font-awesome-icon
                :icon="['fas', 'location-dot']"
                class="text-[20px]"
              />
              <p class="text-lg font-medium">{{feild2}}</p>
            </div>
          </NuxtLink>

          <NuxtLink to="/supplier/ordersTrack">
            <div
              :class="[
                'flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-all',
                isActive('supplier-ordersTrack') 
                  ? 'bg-[#EBCDC5] text-white font-bold' 
                  : 'hover:bg-[#EBCDC5] text-gray-800'
              ]"
            >
              <font-awesome-icon
                :icon="['fas', 'bookmark']"
                class="text-[20px]"
              />
              <p class="text-lg font-medium">{{feild3}}</p>
            </div>
          </NuxtLink>

          <hr />
          <div
            class="flex items-center gap-3 p-2 hover:bg-[#EBCDC5] rounded-2xl cursor-pointer transition-all"
          >
            <font-awesome-icon
              :icon="['fas', 'right-from-bracket']"
              class="text-[20px]"
            />
            <p class="text-lg font-medium">log out</p>
          </div>
        </div>
      </aside>

      <!-- right -->
      <!-- <div class="bg-white p-4 rounded-2xl shadow">
        <NuxtPage />
      </div> -->
    </div>
  </div>
</template>

<style scoped>
/* smooth transition */
div {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>