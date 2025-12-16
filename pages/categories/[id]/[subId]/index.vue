<script setup>
import { ref, onMounted, computed } from "vue"; // ← أضيفي computed
import { useRoute, useRouter } from "vue-router";
import { doc, collection, getDocs } from "firebase/firestore";

useHead({
  title: "Products",
  meta: [
    {
      name: "description",
      content: "تسوق أفضل المنتجات في فئات مختلفة بسهولة ويسر.",
    },
    {'keywords': 'تسوق, منتجات, فئات, شراء إلكتروني, متجر إلكتروني, تسوق عبر الإنترنت, عروض خاصة, تخفيضات, تسوق آمن, تجربة تسوق'},
  ],
});

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

// ✅ استخراج البراندات المتاحة من المنتجات
const availableBrands = computed(() => {
  const brands = products.value
    .map(p => p.brand)
    .filter(brand => brand && brand.trim() !== ''); // إزالة القيم الفارغة
  
  // إزالة التكرار
  return [...new Set(brands)].sort();
});

// ✅ فحص إذا كان هناك فلاتر نشطة
const hasActiveFilters = computed(() => {
  return selectedBrand.value !== "" || minPrice.value !== "" || maxPrice.value !== "";
});

// ✅ تصفية المنتجات بناءً على الفلاتر والبحث
const filteredProducts = computed(() => {
  let filtered = products.value;

  // فلتر البحث
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(p => 
      p.name?.toLowerCase().includes(query) || 
      p.brand?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
    );
  }

  // فلتر البراند
  if (selectedBrand.value) {
    filtered = filtered.filter(p => p.brand === selectedBrand.value);
  }

  // فلتر السعر الأدنى
  if (minPrice.value) {
    const min = parseFloat(minPrice.value);
    filtered = filtered.filter(p => {
      const price = parseFloat(p.price);
      return !isNaN(price) && price >= min;
    });
  }

  // فلتر السعر الأقصى
  if (maxPrice.value) {
    const max = parseFloat(maxPrice.value);
    filtered = filtered.filter(p => {
      const price = parseFloat(p.price);
      return !isNaN(price) && price <= max;
    });
  }

  return filtered;
});

// ✅ مسح كل الفلاتر
const clearFilters = () => {
  searchQuery.value = "";
  selectedBrand.value = "";
  minPrice.value = "";
  maxPrice.value = "";
};

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

    <!-- Search bar -->
    <div class="flex items-center justify-between w-full max-w-[600px] h-[45px] px-3 py-2 rounded-[24px] text-[#4B5563] bg-white"
      style="box-shadow: 0 0 4px rgba(0,0,0,0.3);">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-2 text-[#4B5563]" />
      <input v-model="searchQuery" type="text" placeholder="Search products..." class="outline-none text-[#4B5563] w-full" />
    </div>

    <!-- Filters -->
    <div class="mt-4 mb-4">
      <div class="mt-4 mb-4 flex items-center justify-between">
        <h3 class="text-lg font-semibold">Filters</h3>
        <button v-if="hasActiveFilters" @click="clearFilters" class="text-sm text-[#C76950] underline hover:text-[#b55840]">
          Clear All
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Brand Filter -->
        <div>
          <label class="block text-sm font-medium text-[#4B5563] mb-2">Brand</label>
          <select v-model="selectedBrand" class="w-full border border-gray-300 rounded-[24px] p-2 outline-none focus:border-[#C76950]">
            <option value="">All Brands</option>
            <option v-for="brand in availableBrands" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>

        <!-- Min Price -->
        <div>
          <label class="block text-sm font-medium text-[#4B5563] mb-2">Min Price (LE)</label>
          <input 
            type="number" 
            placeholder="0" 
            v-model="minPrice"
            class="w-full border border-gray-300 rounded-[24px] p-2 outline-none focus:border-[#C76950]" 
          />
        </div>

        <!-- Max Price -->
        <div>
          <label class="block text-sm font-medium text-[#4B5563] mb-2">Max Price (LE)</label>
          <input 
            type="number" 
            placeholder="∞" 
            v-model="maxPrice"
            class="w-full border border-gray-300 rounded-[24px] p-2 outline-none focus:border-[#C76950]" 
          />
        </div>
      </div>

      <!-- Active Filters Badges -->
      <div v-if="hasActiveFilters" class="mt-4 flex items-center gap-2 flex-wrap">
        <span class="text-sm text-[#4B5563] font-medium">Active filters:</span>
        <span v-if="selectedBrand" class="px-3 py-1 bg-[#C76950] text-white text-xs rounded-full flex items-center gap-2">
          {{ selectedBrand }}
          <button @click="selectedBrand = ''" class="hover:text-gray-200">✕</button>
        </span>
        <span v-if="minPrice" class="px-3 py-1 bg-[#C76950] text-white text-xs rounded-full flex items-center gap-2">
          Min: {{ minPrice }} LE
          <button @click="minPrice = ''" class="hover:text-gray-200">✕</button>
        </span>
        <span v-if="maxPrice" class="px-3 py-1 bg-[#C76950] text-white text-xs rounded-full flex items-center gap-2">
          Max: {{ maxPrice }} LE
          <button @click="maxPrice = ''" class="hover:text-gray-200">✕</button>
        </span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#C76950]"></div>
      <p class="text-gray-500 mt-4">Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500 py-12">
      {{ error }}
    </div>

    <!-- No Products -->
    <div v-else-if="products.length === 0" class="text-center text-gray-500 py-12">
      <p class="text-lg">No products in this category.</p>
    </div>

    <!-- No Results After Filtering -->
    <div v-else-if="filteredProducts.length === 0" class="text-center text-gray-500 py-12">
      <p class="text-lg mb-2">No products match your filters</p>
      <button @click="clearFilters" class="text-[#C76950] underline hover:text-[#b55840]">
        Clear all filters
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else>
      <div class="mb-4 text-gray-600">
        <span class="font-semibold">{{ filteredProducts.length }}</span> product(s) found
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="p in filteredProducts"
          :key="p.id"
          :product="p"
          :categoryId="categoryId"
          :subId="subId"
        />
      </div>
    </div>
  </div>
</template>