<template>
 <nuxt-link :to="to || '#'" class="block">
  <div class="card">
       <div class="image">
         <img :src="image" :alt="name" />
       </div>
    <div
      class="font-bold block text-center text-lg hover:text-orange-600 transition hover:cursor-pointer">
      {{ name }}
    </div>
  </div>
  </nuxt-link>
</template>

<script setup>
defineProps({
  id: String,
  name: String,
  image: String,
  to: { type: String, default: '#' }, 
});
</script>

<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  width: 402px;
  height: 500px;
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.image {
  width: 100%;
  padding-bottom: 16px;
  height: 451px;
}
.image:hover {
  cursor: pointer;
}

img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  height: 100%;
}
</style>
