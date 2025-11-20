<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { collection, getDocs } from "firebase/firestore";

const route = useRoute();
const { $db } = useNuxtApp();

const categoryId = route.params.id;
const subId = route.params.subid;

const products = ref([]);
const loading = ref(true);

onMounted(async () => {
  console.log("categoryId:", categoryId, "subId:", subId);
  try {
    const productsRef = collection($db, "categories", categoryId, "subcategories", subId, "products");
    console.log("productsRef path:", productsRef.path);

    const snap = await getDocs(productsRef);
    console.log("snapshot empty:", snap.empty);

    snap.docs.forEach(doc => console.log("product doc:", doc.id, doc.data()));

    products.value = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col items-center mt-10 mb-10">
    <div v-if="loading">Loading...</div>
    <div v-else-if="products.length === 0">No products found</div>
    <client-only>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <div v-for="p in products" :key="p.id" class="border p-4 rounded">
          <img :src="p.image" class="w-full h-48 object-cover mb-2"/>
          <h3>{{ p.name }}</h3>
          <p>{{ p.price }}</p>
          <p v-if="p.brand">Brand: {{ p.brand }}</p>
          <p>{{ p.description }}</p>
        </div>
      </div>
    </client-only>
  </div>
</template>
