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
  <div class="w-full flex justify-center mt-[20px] px-4">
    <div class="max-w-[1200px] w-full flex flex-col gap-4">
      
      <div class="flex items-center gap-2 text-sm ">
        <NuxtLink to="/" class="text-gray-600 hover:text-[#C76950]">Home
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-[12px]" />
        </NuxtLink>
        <NuxtLink to="/categories" class="text-[#C76950] font-semibold">Categories
        </NuxtLink>
      </div>
      <div class="w-full h-[400px] flex justify-center relative">
        <img src="/categoriess.png" alt="Categories Banner" class="w-full object-contain rounded-[24px]" />
      </div>
      <div v-if="loading">Loading...</div>
      <div v-else class="flex justify-center items-center mt-[40px] mb-[40px]">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard v-for="cat in categories" :key="cat.id" :id="cat.id" :name="cat.name || 'No Name'"
            :image="cat.image || '/default.png'" :to="`/categories/${cat.id}`" />
        </div>
      </div>
    </div>
  </div>


</template>
