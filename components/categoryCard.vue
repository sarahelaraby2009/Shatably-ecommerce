
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
  width: 100%;
  max-width: 402px;
  aspect-ratio: 402 / 500;
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.image {
  width: 100%;
  flex: 1;
  padding-bottom: 16px;
  overflow: hidden;
}

.image:hover {
  cursor: pointer;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}

/* Mobile responsive */
@media (max-width: 640px) {
  .card {
    padding: 8px;
    border-radius: 8px;
  }
  
  .image {
    padding-bottom: 8px;
  }
  
  .font-bold {
    font-size: 0.875rem;
  }
}
</style>