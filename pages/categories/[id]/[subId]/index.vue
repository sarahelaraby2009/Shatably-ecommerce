<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, collection, getDocs } from 'firebase/firestore';

const route = useRoute();
const router = useRouter();
const { $db } = useNuxtApp();
const categoryId = route.params.id;
const subId = route.params.subId;

const products = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  if (!categoryId || !subId) {
    error.value = 'Missing category or subcategory id in route params.';
    loading.value = false;
    return;
  }

  try {
    const productsRef = collection(
      doc(collection($db, 'categories'), categoryId),
      'subcategories',
      subId,
      'products'
    );
    const snap = await getDocs(productsRef);

    if (snap.empty) {
      products.value = [];
    } else {
      products.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    }
  } catch (err) {
    console.error('Error fetching products:', err);
    error.value = 'خطأ في تحميل المنتجات';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="px-6 py-8">
    <div v-if="loading" class="text-center">Loading products...</div>

    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else>
      <div v-if="products.length === 0" class="text-center text-gray-500">
        لا توجد منتجات في هذه الفئة حالياً.
      </div>

      <div v-else class="flex justify-center items-start mt-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="p in products"
            :key="p.id"
            :product="p"
            :to="p.to"
            v-on:click.native.prevent="goToProduct(p.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
