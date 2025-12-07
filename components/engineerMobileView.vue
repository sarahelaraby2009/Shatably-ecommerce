<template>
    <div class="p-6">
      <div class="block lg:hidden">
        <div class="flex gap-4">
          <NuxtLink to="/userEngineer/dashboard">
            <div class="flex items-center gap-3 p-2  cursor-pointer"
            @click="selected='profile'"
            :class="selected==='profile'?'text-[#C76950]':''"
            >

              <p class="text-lg font-medium">Profile</p>
            </div>
          </NuxtLink>
          <NuxtLink to="/userEngineer/dashboard/portfolio">
            <div class="flex items-center gap-3 p-2  cursor-pointer"
            @click="selected='portfolio'"
            :class="selected==='portfolio'?'text-[#C76950]':''"
            >
             
              <p class="text-lg font-medium">Portfolio </p>
            </div>
          </NuxtLink>
          <NuxtLink to="/userEngineer/dashboard/services">
            <div class="flex items-center gap-3 p-2 cursor-pointer"
            @click="selected='services'"
            :class="selected==='services'?'text-[#C76950]':''"
            >
            
              <p class="text-lg font-medium">Services</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
</template>
<script setup>
import{ref} from 'vue';
const selected=ref('')
</script>