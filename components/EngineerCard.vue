<template>

<NuxtLink :to="`/engineers/${engineer.id}`" class="block">

<div class="p-2 sm:p-4 bg-white shadow rounded-[16px] sm:rounded-[24px] w-full min-h-[280px] sm:min-h-[550px] border border-[#F2F2F2] hover:border-[#C76950] cursor-pointer">
    <div>
        <img :src="engineer.portfolio[0]" class="rounded-[16px] sm:rounded-[24px] w-full h-[140px] sm:h-[306px] object-cover">
    </div>
    <p class="pt-2 sm:pt-5 pb-5 sm:pb-8 text-[12px] sm:text-[16px] line-clamp-2 sm:line-clamp-none">
      {{ engineer.descriptionWork }}
    </p>
    <hr class="w-full pt-4 sm:pt-5">
    <div class="flex items-center justify-between">

      <div class="flex gap-2 sm:gap-3">
        <img :src="engineer.image" class="w-8 h-8 sm:w-14 sm:h-14 rounded-full object-cover">

        <div class="flex flex-col">
          <h4 class="font-semibold text-[12px] sm:text-[18px] text-[#1E1E1E]">
            {{ engineer.name }}
          </h4>

          <p class="text-[#AAAAAA] font-normal text-[10px] sm:text-[16px]">
            {{ engineer.position }}
          </p>
        </div>
      </div>

      <!-- الريت -->
      <div class="flex items-center gap-1">
        <span class="text-[#AAAAAA] font-medium text-[10px] sm:text-[14px]">{{ engineer.rating }}</span>
        <span class="text-yellow-400 text-[12px] sm:text-[16px]">★</span>
      </div>

    </div>
  </div>

</NuxtLink>

</template>

<script setup>
defineProps({
  engineer: {
    type: Object,
    required: true
  }
})
</script>