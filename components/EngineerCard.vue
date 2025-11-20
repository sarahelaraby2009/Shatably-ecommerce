<template>

<NuxtLink :to="`/engineers/${engineer.id}`" class="block">

<div class="p-4 bg-white shadow rounded-[24px] w-[407px] min-h-[550px] border border-[#F2F2F2] hover:border-[#C76950] cursor-pointer" >
    <div >
        <img :src="engineer.portfolio[0]" class="rounded-[24px] w-[403px] h-[306px]" >
    </div>
    <p class="pt-5 pb-5"> {{ engineer.descriptionWork}}
 
    </p>
    <hr class="w-[343px] pt-5"  ></hr>
    <div class="flex items-center justify-between ">

  <div class="flex  gap-3">
    <img :src="engineer.image" class="w-14 h-14 rounded-full object-cover ">

    <div class="flex flex-col">
      <h4 class="font-semibold text-[18px] text-[#1E1E1E]">
        {{ engineer.name }}
      </h4>

      <p class="text-[#AAAAAA] font-normal text-[16px]">
{{ engineer.position }}
      </p>
    </div>
  </div>

  <!-- الريت -->
  <div class="flex items-center gap-1">
    <span class="text-[#AAAAAA] font-medium text-[14px]">{{engineer.rating}}</span>
    <span class="text-yellow-400 text-[16px]">★</span>
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
