<template>
<div class="p-4 bg-white shadow rounded-[24px] w-[355px] h-[auto] border border-[#F2F2F2] hover:border-[#C76950]">
  <div class="flex gap-3">

    <img :src="review.userImage" class="w-14 h-14 rounded-full object-cover">

    <div class="flex flex-col">
      <h4 class="font-semibold text-[18px] text-[#262626]">
        {{review.userName}}
      </h4>

      <p class="text-[#8e8d8d] font-normal text-[16px]">
{{ review.userId }}      </p>
    </div>

  </div>

  <p class="text-[#7c7b7b] font-normal text-[16px] mt-3 leading-relaxed">
{{ review.comment }}  </p>

  <div class="flex items-center gap-1 mt-3">
    <span class="text-yellow-400 text-[16px]">★★★★★</span>
  </div>

</div>


</template>
<script setup>
defineProps({
review:{
  type : Object,
  required: true
}

});
</script>