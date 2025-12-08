<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";

const { $db } = useNuxtApp();
const categories = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const snap = await getDocs(collection($db, "categories"));
    categories.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("Error fetching categories:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="flex items-center gap-2 text-sm mx-6 lg:mx-10 mt-10">
      <NuxtLink to="/" class="text-gray-600 hover:text-[#C76950]">
        Home
      </NuxtLink>
      <font-awesome-icon
        :icon="['fas', 'chevron-right']"
        class="text-[12px]"
      />
      <NuxtLink to="/categories" class="text-[#C76950] font-semibold">
        Categories
      </NuxtLink>
    </div>

    <div class="flex justify-center mt-6 px-6 lg:px-10">
      <div class="w-full max-w-[1256px] h-auto">
        <img 
          src="/assets/image 3.png"
          alt="categories"
          class="w-full h-full object-cover rounded-2xl" 
        />
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center mt-10 mb-10">
      <div class="text-gray-500">Loading...</div>
    </div>
    
    <div v-else class="flex justify-center items-center mt-10 mb-10 px-4 sm:px-6">
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-[1256px]">
        <CategoryCard
          v-for="cat in categories"
          :key="cat.id"
          :id="cat.id"
          :name="cat.name || 'No Name'"
          :image="cat.image || '/default.png'"
          :to="`/categories/${cat.id}`"
        />
      </div>
    </div>
  </div>


</template>