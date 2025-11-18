<template>
  <div class="card">
    <div class="image">
      <img :src="image" :alt="name" />
    </div>

    <nuxt-link
      :to="to" class="font-bold block text-lg hover:text-blue-600 transition">
      {{ name }}
    </nuxt-link>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  name: String,
  image: String,   
})
</script>

<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
  width: 402px;
  height: 500px;
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  transition: transform .2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card:hover {
  transform: translateY(-4px);
}

.image {
  width: 100%;
  padding-bottom: 16px;
  height: 451px;
}

img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  height: 100%; 
}
</style>
