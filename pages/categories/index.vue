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
  <div v-if="loading">Loading...</div>
  <div v-else class="flex justify-center items-center mt-[40px] mb-[40px]">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
</template>
