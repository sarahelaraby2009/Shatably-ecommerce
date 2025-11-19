
<template>

<div class="w-[360px] bg-white rounded-2xl shadow-md overflow-hidden">
  
  <div class="w-full">
    <img 
      :src="service.image" 
      class="w-full h-[200px] object-cover"
    />
    
  </div>

  <div class="p-4">
    <h3 class="text-xl font-semibold">
{{service.title}} 
   </h3>
    
    <p class="text-gray-600 mt-2 leading-relaxed">
     {{service.description}}

    </p>
  </div>

</div>


</template>

<script setup>
defineProps({
service:{
  type : Object,
  required: true
}

});
</script>