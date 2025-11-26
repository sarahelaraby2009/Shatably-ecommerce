<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "#app";
import { doc, getDoc } from "firebase/firestore";
import { useNuxtApp } from "#app";

const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;

const route = useRoute();
const categoryId = route.params.id;
const subCategoryId = route.params.subId;
const productId = route.params.productId;

const product = ref(null);

onMounted(async () => {
  if (categoryId && subCategoryId && productId) {
    const docRef = doc(
      db,
      "categories",
      categoryId,
      "subcategories",
      subCategoryId,
      "products",
      productId
    );
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      product.value = snap.data();
    } else {
      console.warn("Product not found");
    }
  }
});
</script>

<template>
  <div class="flex flex-col m-10">
    <!-- Breadcrumbs -->
    <div class="flex gap-2 text-[12px] mb-4">
      <p>Home</p>
      <font-awesome-icon :icon="['fas', 'angle-right']" />
      <p>Category</p>
      <font-awesome-icon :icon="['fas', 'angle-right']" />
      <p>Subcategory</p>
      <font-awesome-icon :icon="['fas', 'angle-right']" />
      <p class="text-[#C76950] font-bold">{{ product?.name || 'Product' }}</p>
    </div>

    <!-- Main product area -->
    <div class="flex gap-6">
      <div class="w-[620px]">
        <div class="w-full h-[412px] rounded-[18px] overflow-hidden mb-4">
          <img :src="product?.image" alt="" class="w-full h-full object-cover" />
        </div>
        <p class="font-medium text-[32px] mb-2">Recently Viewed</p>
        <!-- يمكن إضافة carousel للمنتجات هنا -->
      </div>

      <div class="flex-col flex-1">
        <h2 class="text-[28px] font-semibold mb-2">{{ product?.name }}</h2>
        <p class="mb-4 text-gray-700">{{ product?.description }}</p>
        <div class="mb-4">
          <p>Price: <span class="font-bold">{{ product?.price }} LE</span></p>
          <p>Brand: {{ product?.brand || 'Unknown' }}</p>
        </div>
        <div class="flex gap-4">
          <button class="py-2 px-10 bg-[#C76950] text-white rounded-[24px]">Buy Now</button>
          <button class="py-2 px-10 border border-[#612B1F] text-[#612B1F] rounded-[24px]">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* بسيطة للتمثيل */
</style>
