<template>
  <div class="card">
     <nuxt-link>
       <div class="image">
         <img :src="image" :alt="name" />
       </div>
     </nuxt-link>
    <nuxt-link
      :to="to">
    <div
      class="font-bold block text-center text-lg hover:text-orange-600 transition hover:cursor-pointer">
      {{ name }}
    </div>
    </nuxt-link>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  name: String,
  image: String,
  to: String, 
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
  /* display: flex; */
  /* flex-direction: column;
  align-items: center; */
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
  /* object-fit: cover; */
  height: 100%;
}
</style>
