<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { useNuxtApp } from '#app';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// ---------------------------------
// Route & Router
const route = useRoute();
const router = useRouter();
const categoryId = route.params.id;
const subId = route.params.subId;
const productId = route.params.productId;

// ---------------------------------
// Firebase
const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;

// ---------------------------------
// Reactive states
const product = ref(null);
const loading = ref(true);
const error = ref(null);

// ---------------------------------
// Fetch product from Firestore
const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  try {
    const docRef = doc(db, 'categories', categoryId, 'subcategories', subId, 'products', productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      product.value = docSnap.data();
    } else {
      error.value = 'Product not found or has been deleted.';
    }
  } catch (err) {
    error.value = err.message || 'An error occurred while fetching product.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProduct();
});

// ---------------------------------
// Back button
const goBack = () => {
  router.push(`/categories/${categoryId}/${subId}`);
};
</script>

<template>
  <div class="p-4">
    <!-- Breadcrumb -->
    <div class="flex justify-start items-center m-4 gap-2 text-[12px]">
      <p @click="router.push('/categories')" class="cursor-pointer hover:underline">Home</p>
      <font-awesome-icon :icon="['fas','angle-right']" />
      <p @click="router.push(`/categories/${categoryId}`)" class="cursor-pointer hover:underline">Category</p>
      <font-awesome-icon :icon="['fas','angle-right']" />
      <p @click="router.push(`/categories/${categoryId}/${subId}`)" class="cursor-pointer hover:underline">Subcategory</p>
      <font-awesome-icon :icon="['fas','angle-right']" />
      <p class="text-[#C76950] font-bold">Product</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-20 text-gray-500">Loading product...</div>

    <!-- Error -->
    <div v-if="error" class="text-center py-20 text-red-500">{{ error }}</div>

    <!-- Product Details -->
    <div v-if="product && !loading" class="flex flex-col lg:flex-row gap-6">
      <!-- Left Column: Images + Recently viewed -->
      <div class="flex flex-col gap-4 w-full lg:w-1/2">
        <!-- Main Product Image -->
        <div class="w-full h-[412px] rounded-[18px] overflow-hidden shadow-md">
          <img :src="product.image" alt="Product Image" class="w-full h-full object-cover" />
        </div>

        <!-- Recently viewed -->
        <div>
          <p class="font-medium text-[32px]">Recently viewed</p>
          <div class="flex gap-2 mt-2">
            <div v-for="n in 3" :key="n" class="w-[193px] h-[163px] rounded-[8px] overflow-hidden relative">
              <img src="/assets/Lighting.jpeg" class="w-full h-full object-cover" />
              <div class="flex justify-between mt-1">
                <p class="text-[12px]">Product Name</p>
                <p class="text-[12px] font-bold">300LE</p>
              </div>
              <div class="absolute top-2 right-2 bg-gray-300 w-[25px] h-[25px] rounded-full flex justify-center items-center">
                <font-awesome-icon :icon="['fas','angle-left']" class="text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Product Info -->
      <div class="flex flex-col gap-4 w-full lg:w-1/2">
        <h2 class="text-3xl font-bold">{{ product.name }}</h2>
        <p class="py-2">{{ product.description }}</p>

        <!-- Details -->
        <div id="details" class="flex flex-col mt-4 text-gray-700">
          <p>Brand: {{ product.brand }}</p>
          <p>Seller: {{ product.sellerId }}</p>
          <p v-if="product.bestSelling" class="text-orange-500 font-bold">Best Selling 🔥</p>
          <p>Added on: {{ product.createdAt?.toDate().toLocaleDateString() }}</p>
        </div>

        <!-- Price + Rating + Quantity -->
        <div class="flex justify-between items-center mt-4">
          <div>
            <p class="text-xl font-semibold">{{ product.price }} LE</p>
            <div class="flex gap-2 items-center mt-1">
              <div>
                <font-awesome-icon :icon="['fas','star']" class="text-yellow-200" v-for="i in 4" :key="i"/>
              </div>
              <p class="text-gray-400">44 reviews</p>
            </div>
          </div>

          <div class="flex gap-2 items-center bg-gray-300 p-2 rounded-full">
            <button class="px-2 py-1 bg-white rounded-full">
              <font-awesome-icon :icon="['fas','minus']" />
            </button>
            <span>1</span>
            <button class="px-2 py-1 bg-white rounded-full">
              <font-awesome-icon :icon="['fas','plus']" />
            </button>
          </div>
        </div>

        <!-- Delivery info -->
        <div id="delivery" class="mt-4 text-gray-700">
          <p class="font-semibold">Delivery Info</p>
          <p>
            Delivery in 2–4 business days (Cairo), 3–7 days other governorates.
            Free return within 14 days. Safe packaging – breakage protection.
            Tracking number after shipping.
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 mt-4">
          <button @click="goBack" class="py-2 px-10 bg-gray-200 rounded-[24px] hover:bg-gray-300">Back</button>
          <button class="py-2 px-10 bg-[#C76950] text-white rounded-[24px] hover:bg-[#C65A40]">Buy Now</button>
          <button class="py-2 px-10 border border-[#612B1F] text-[#612B1F] rounded-[24px] hover:bg-gray-100">Add to Cart</button>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="mt-10">
      <div class="flex justify-between items-center m-4">
        <p class="font-medium text-[32px]">Reviews</p>
        <p class="font-medium text-[20px] cursor-pointer text-gray-600">See all</p>
      </div>

      <div class="flex flex-col">
        <div
          v-for="n in 2"
          :key="n"
          class="flex items-center gap-3 bg-white shadow-md p-4 m-4 rounded-[12px]"
        >
          <div class="w-[71px] h-[71px]">
            <img src="/assets/Lighting.jpeg" class="w-full h-full rounded-full" />
          </div>
          <div class="flex flex-col flex-1">
            <div class="flex justify-between">
              <p>Fatma Senosy</p>
              <div class="flex justify-center text-gray-500 gap-1">
                <p>08:10 PM</p> | <p>23 Mar 2022</p>
              </div>
            </div>
            <div class="flex items-center text-gray-500 mt-1">
              <font-awesome-icon :icon="['fas','star']" class="text-yellow-200" v-for="i in 4" :key="i"/>
              <p class="pl-1">5.0</p>
            </div>
            <p class="mt-1">
              The light looks even better in real life. Bright, elegant, and easy to install. Totally worth it!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommended Products -->
    <div class="mt-10 flex flex-col">
      <p class="font-medium text-[32px] m-4">Recommended Products</p>
      <div class="flex flex-wrap justify-start gap-4 px-4">
        <div
          v-for="n in 3"
          :key="n"
          class="flex-col w-[406px] shadow-2xl rounded-[18px] overflow-hidden relative"
        >
          <div class="w-full h-[294px] relative">
            <img src="/assets/Lighting.jpeg" class="w-full h-full object-cover rounded-[10px]" />
            <div class="absolute top-2 right-2 bg-gray-300 w-[35px] h-[35px] rounded-full flex justify-center items-center">
              <font-awesome-icon :icon="['far','heart']" class="text-[#C76950] text-lg" />
            </div>
          </div>
          <div class="p-3 flex flex-col gap-1">
            <div class="flex justify-between">
              <p class="font-medium mb-2">Product Name</p>
              <div class="flex items-center text-gray-500">
                <font-awesome-icon :icon="['fas','star']" class="text-yellow-200" v-for="i in 4" :key="i"/>
              </div>
            </div>
            <p class="text-sm mb-2">Brand: brand</p>
            <div class="flex justify-between items-center">
              <p class="font-medium mb-2">300 LE</p>
              <div class="bg-[#C76950] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                <font-awesome-icon :icon="['fas','cart-shopping']" class="text-white text-lg"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
