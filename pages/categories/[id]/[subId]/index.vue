<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { doc, collection, getDocs } from "firebase/firestore";


const route = useRoute();
const router = useRouter();
const { $db } = useNuxtApp();
const categoryId = route.params.id;
const subId = route.params.subId;

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const selectedBrand = ref("");
const minPrice = ref("");
const maxPrice = ref("");
const showFilters = ref(false);

onMounted(async () => {
  if (!categoryId || !subId) {
    error.value = "Missing category or subcategory id in route params.";
    loading.value = false;
    return;
  }

  try {
    const productsRef = collection(
      doc(collection($db, "categories"), categoryId),
      "subcategories",
      subId,
      "products"
    );
    const snap = await getDocs(productsRef);

    if (snap.empty) {
      products.value = [];
    } else {
      products.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    error.value = "Failed to load products";
  } finally {
    loading.value = false;
  }
});

const availableBrands=computed(()=>{
  const brands=products.value
  .map(p=>p.brand)
  .filter(Boolean)
  .filter((v, i, arr) => arr.indexOf(v) === i);
  return brands.sort();

})

const filteredProducts=computed(()=>{
  let result=products.value
  if(searchQuery.value.trim()!==''){
    const query=searchQuery.value.trim().toLowerCase()
    result=result.filter((product)=>{
      const nameMatch=product.name?.toLowerCase().includes(query)
      const descMatch=product.description?.toLowerCase().includes(query)
      const brandMatch=product.brand?.toLowerCase().includes(query)
      return nameMatch || descMatch || brandMatch
    })
  }
  if(selectedBrand.value){
    result=result.filter(p=>p.brand===selectedBrand.value)
  }
  if(minPrice.value){
    const min=parseFloat(minPrice.value)
    result=result.filter(p=>p.price>=min)
  }
  if(maxPrice.value){
    const max=parseFloat(maxPrice.value)
    result=result.filter(p=>p.price<=max)
  }
   return result;
})
const hasActiveFilters = computed(() => {
  return selectedBrand.value || minPrice.value || maxPrice.value;
});

const clearFilters=()=>{
  selectedBrand.value=''
  minPrice.value=''
  maxPrice.value=''
}
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

// Back button
const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="px-6 py-8">
    <div class="flex items-center mb-6">
      <button @click="goBack" class="mr-4 text-gray-600 hover:text-gray-800">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button>
     
    </div>
    <!-- //Search bar and filters -->
    <div class="flex items-center justify-between w-[600px] h-[45px] px-3 py-2 rounded-[24px] text-[#4B5563] bg-white"
      style="box-shadow: 0 0 4px rgba(0,0,0,0.3);">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-2 text-[#4B5563]" />
      <input v-model="searchQuery" type="text" placeholder="Search" class="outline-none text-[#4B5563] w-full" />
     
    </div>
    <div class="mt-4 mb-4">
      <div class="mt-4 mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold">Filters</h3>
        <button v-if="hasActiveFilters" @click="clearFilters" class="text-sm text-[#C76950] underline">Clear All</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-[#4B5563] mb-2">Brand</label>
          <select v-model="selectedBrand" class="w-full border border-gray-300 rounded-[24px] p-2">
            <option value="">All Brands</option>
            <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#4B5563] mb-2">Min Price</label>
          <input type="number" placeholder="0" v-model="minPrice"
            class="w-full border border-gray-300 rounded-[24px] p-2" />
        </div>
        <div>
          <label class="block text-sm font-medium text-[#4B5563] mb-2">Max Price</label>
          <input type="number" placeholder="∞" v-model="maxPrice"
            class="w-full border border-gray-300 rounded-[24px] p-2" />
        </div>
        <!-- Active Filters Badge -->
        <div v-if="hasActiveFilters" class="mt-4 flex items-center gap-2 flex-wrap">
          <span class="text-sm text-[#4B5563]">Active filters:</span>
          <span v-if="selectedBrand" class="px-3 py-1 bg-[#C76950] text-white text-xs rounded-full">
            {{ selectedBrand }}
          </span>
          <span v-if="minPrice" class="px-3 py-1 bg-[#C76950] text-white text-xs rounded-full">
            Min: {{ minPrice }}
          </span>
          <span v-if="maxPrice" class="px-3 py-1 bg-[#C76950] text-white text-xs rounded-full">
            Max: {{ maxPrice }}
          </span>
          
        </div>
      </div>
    </div>
    <!-- ------------------------------ -->
    <div v-if="loading" class="text-center">
      <p class="text-gray-500">Loading products...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <div v-else-if="products.length === 0" class="text-center text-gray-500">
      No products in this category.
    </div>

    <div v-else class="flex justify-center items-start mt-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" :categoryId="categoryId" :subId="subId" />
      </div>
    </div>
  </div>
</template>