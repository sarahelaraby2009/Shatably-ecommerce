<script setup>
import { useRoute } from 'vue-router'

defineProps({
  email: String,
  userName: String,
  feild1: String,
  feild2: String,
  feild3: String,
})

const route = useRoute()
const isActive = (routeName) => route.name === routeName
</script>

<template>
  <div>
    <!-- Mobile -->
    <div class="lg:hidden border-b bg-white sticky top-0 z-10">
      <div class="flex flex-col items-center pt-4">
        <!-- Profile Image Mobile -->
        <div class="relative mb-3">
          <img
            src="/supplier.jpeg"
            class="w-12 h-12 rounded-full object-cover"
          />
          <label
            for="upload"
            class="absolute bottom-0 right-0 bg-white border rounded-full p-1 shadow cursor-pointer"
          >
            <font-awesome-icon
              :icon="['fas', 'edit']"
              class="text-gray-700 text-xs"
            />
          </label>
        </div>
        <h3 class="font-bold text-lg">{{ userName }}</h3>
        <p class="text-sm text-gray-500 mb-4">{{ email }}</p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-around border-t">
        <NuxtLink to="/supplier" class="flex-1">
          <div
            :class="[
              'text-center py-4 text-sm font-medium transition-all border-b-2',
              isActive('supplier') 
                ? 'text-[#C76950] border-[#C76950]' 
                : 'text-gray-500 border-transparent'
            ]"
          >
            {{ feild1 }}
          </div>
        </NuxtLink>

        <NuxtLink to="/supplier/productsUploads" class="flex-1">
          <div
            :class="[
              'text-center py-4 text-sm font-medium transition-all border-b-2',
              isActive('supplier-productsUploads') 
                ? 'text-[#C76950] border-[#C76950]' 
                : 'text-gray-500 border-transparent'
            ]"
          >
            {{ feild2 }}
          </div>
        </NuxtLink>

        <NuxtLink to="/supplier/ordersTrack" class="flex-1">
          <div
            :class="[
              'text-center py-4 text-sm font-medium transition-all border-b-2',
              isActive('supplier-ordersTrack') 
                ? 'text-[#C76950] border-[#C76950]' 
                : 'text-gray-500 border-transparent'
            ]"
          >
            {{ feild3 }}
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Desktop-->
    <div class="hidden lg:block">
      <div class="grid grid-cols-[300px_1fr] pt-10 gap-10 pb-10">
        <aside class="space-y-1 shadow rounded-2xl h-[600px]">
          <div class="flex gap-4 pt-5">
            <div class="relative">
              <img
                src="/supplier.jpeg"
                class="w-14 h-14 rounded-full object-cover ml-5"
              />
              <label
                for="upload"
                class="absolute bottom-0 right-0 bg-white border rounded-full pr-1 pl-1 shadow cursor-pointer"
              >
                <font-awesome-icon
                  :icon="['fas', 'edit']"
                  class="text-gray-700 text-xs"
                />
              </label>
            </div>
            <div class="grid">
              <h3 class="pt-1 font-bold text-xl">Hello {{ userName }}!</h3>
              <p class="text-sm text-gray-500 pb-5">{{ email }}</p>
            </div>
          </div>

          <hr />
          <div class="space-y-5 pl-5 pr-2 h-[800px]">
            <h3 class="font-bold pt-5 text-2xl pb-5">My Account</h3>

            <NuxtLink to="/supplier">
              <div
                :class="[
                  'flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-all',
                  isActive('supplier') 
                    ? 'bg-[#EBCDC5] text-[#612B1F] font-bold' 
                    : 'hover:bg-white text-gray-800'
                ]"
              >
                <font-awesome-icon :icon="['fas', 'user']" class="text-[20px]" />
                <p class="text-lg font-medium">{{ feild1 }}</p>
              </div>
            </NuxtLink>

            <NuxtLink to="/supplier/productsUploads">
              <div
                :class="[
                  'flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-all',
                  isActive('supplier-productsUploads') 
                    ? 'bg-[#EBCDC5] text-[#612B1F] font-bold' 
                    : 'hover:bg-white text-gray-800'
                ]"
              >
                <font-awesome-icon
                  :icon="['fas', 'location-dot']"
                  class="text-[20px]"
                />
                <p class="text-lg font-medium">{{ feild2 }}</p>
              </div>
            </NuxtLink>

            <NuxtLink to="/supplier/ordersTrack">
              <div
                :class="[
                  'flex items-center gap-3 p-2 rounded-2xl cursor-pointer transition-all',
                  isActive('supplier-ordersTrack') 
                    ? 'bg-[#EBCDC5] text-[#612B1F] font-bold' 
                    : 'hover:bg-white text-gray-800'
                ]"
              >
                <font-awesome-icon
                  :icon="['fas', 'bookmark']"
                  class="text-[20px]"
                />
                <p class="text-lg font-medium">{{ feild3 }}</p>
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
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
