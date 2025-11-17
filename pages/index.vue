<template>
  <div>
    <div class="">
      <div class="group relative">
        <div class="flex bg-red-300  cursor-pointer ">Categories</div>
        <div class="hidden group-hover:block absolute">
        <NuxtLink
  v-for="category in categories"
  :key="category.id"
  :to="`/categories/${category.id}`"
  class="block px-4 py-2 hover:bg-gray-100 transition"
>
  {{ category.name }}
</NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import{ref,onMounted} from'vue';
import { collection, getDocs } from 'firebase/firestore';

const {$db}=useNuxtApp()
const categories=ref([])

onMounted(async () => {
  const catRef = collection($db, "categories");
  const snapShot = await getDocs(catRef);
  console.log("📦 Snapshot size:", snapShot.size);

  categories.value = snapShot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("✅ categories:", categories.value);
});


</script>




