<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const route = useRoute();
const router = useRouter();
const { $db } = useNuxtApp();
const categoryId = route.params.id;
const subId = route.params.subId;

const products = ref([]);
const headerImage = ref("/assets/Categories.png");
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const selectedBrand = ref("");
const minPrice = ref("");
const maxPrice = ref("");

onMounted(async () => {
  if (!categoryId || !subId) {
    error.value = "Missing category or subcategory id in route params.";
    loading.value = false;
    return;
  }

  try {
    const subcategoryDoc = await getDoc(
      doc($db, "categories", categoryId, "subcategories", subId)
    );

    if (subcategoryDoc.exists() && subcategoryDoc.data().header) {
      headerImage.value = subcategoryDoc.data().header;
    }

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

const availableBrands = computed(() => {
  const brands = new Set();
  products.value.forEach((p) => {
    if (p.brand) brands.add(p.brand);
  });
  return Array.from(brands).sort();
});

const hasActiveFilters = computed(() => {
  return selectedBrand.value || minPrice.value || maxPrice.value;
});

const clearFilters = () => {
  selectedBrand.value = "";
  minPrice.value = "";
  maxPrice.value = "";
};

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    // Search filter
    if (
      searchQuery.value &&
      !p.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) {
      return false;
    }
    // Brand filter
    if (selectedBrand.value && p.brand !== selectedBrand.value) {
      return false;
    }
    // Price filters
    if (minPrice.value && p.price < Number(minPrice.value)) {
      return false;
    }
    if (maxPrice.value && p.price > Number(maxPrice.value)) {
      return false;
    }
    return true;
  });
});
</script>

<template>
  <div class="min-h-screen bg-white px-4 md:px-6 lg:px-8 xl:px-10">
    <!-- Breadcrumb -->
    <div
      class="flex items-center gap-2 text-xs md:text-sm mt-6 md:mt-8 lg:mt-10 max-w-[1256px] mx-auto w-full"
    >
      <NuxtLink to="/" class="text-gray-600 hover:text-[#C76950]">
        Home
      </NuxtLink>
      <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-[10px] md:text-[12px]" />
      <NuxtLink to="/categories" class="text-gray-600 hover:text-[#C76950]">
        Category
      </NuxtLink>
      <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-[10px] md:text-[12px]" />
      <span class="text-[#C76950] font-semibold"> Products </span>
    </div>

    <!-- Header Image -->
    <div class="flex justify-center mt-4 md:mt-5 lg:mt-6">
      <div class="w-full max-w-[1256px] h-auto mx-auto rounded-lg overflow-hidden">
        <img
          :src="headerImage"
          alt="products header"
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Main Content -->
    <div class="py-6 md:py-7 lg:py-8 max-w-[1256px] mx-auto">
      <!-- Search Bar -->
      <div
        class="flex items-center w-full max-w-full md:max-w-[500px] lg:max-w-[600px] h-[42px] md:h-[45px] px-4 py-2 rounded-[24px] text-[#4B5563] bg-white mb-4 md:mb-5 lg:mb-6"
        style="box-shadow: 0 0 4px rgba(0, 0, 0, 0.3)"
      >
        <font-awesome-icon
          :icon="['fas', 'magnifying-glass']"
          class="mr-3 text-[#4B5563] text-sm md:text-base"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="outline-none text-[#4B5563] w-full text-sm md:text-base"
        />
      </div>

      <!-- Filters Section -->
      <div class="mb-4 md:mb-5 lg:mb-6">
        <div class="flex items-center justify-between mb-3 md:mb-4">
          <h3 class="text-base md:text-lg lg:text-xl font-semibold text-[#4B5563]">Filters</h3>
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-xs md:text-sm text-[#C76950] hover:underline font-medium"
          >
            Clear All
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <!-- Brand Filter -->
          <div>
            <label class="block text-xs md:text-sm font-medium text-[#4B5563] mb-2"
              >Brand</label
            >
            <select
              v-model="selectedBrand"
              class="w-full border border-gray-300 rounded-[24px] px-3 md:px-4 py-2 outline-none focus:border-[#C76950] text-sm md:text-base"
            >
              <option value="">All Brands</option>
              <option
                v-for="brand in availableBrands"
                :key="brand"
                :value="brand"
              >
                {{ brand }}
              </option>
            </select>
          </div>

          <!-- Min Price -->
          <div>
            <label class="block text-xs md:text-sm font-medium text-[#4B5563] mb-2"
              >Min Price</label
            >
            <input
              type="number"
              placeholder="0"
              v-model="minPrice"
              class="w-full border border-gray-300 rounded-[24px] px-3 md:px-4 py-2 outline-none focus:border-[#C76950] text-sm md:text-base"
            />
          </div>

          <!-- Max Price -->
          <div>
            <label class="block text-xs md:text-sm font-medium text-[#4B5563] mb-2"
              >Max Price</label
            >
            <input
              type="number"
              placeholder="∞"
              v-model="maxPrice"
              class="w-full border border-gray-300 rounded-[24px] px-3 md:px-4 py-2 outline-none focus:border-[#C76950] text-sm md:text-base"
            />
          </div>
        </div>

        <!-- Active Filters Badges -->
        <div
          v-if="hasActiveFilters"
          class="mt-3 md:mt-4 flex items-center gap-2 flex-wrap"
        >
          <span class="text-xs md:text-sm text-[#4B5563] font-medium">Active filters:</span>
          <span
            v-if="selectedBrand"
            class="px-2 md:px-3 py-1 bg-[#C76950] text-white text-xs md:text-sm rounded-full flex items-center gap-2"
          >
            {{ selectedBrand }}
            <button @click="selectedBrand = ''" class="hover:text-gray-200 text-base md:text-lg">
              ×
            </button>
          </span>
          <span
            v-if="minPrice"
            class="px-2 md:px-3 py-1 bg-[#C76950] text-white text-xs md:text-sm rounded-full flex items-center gap-2"
          >
            Min: {{ minPrice }} LE
            <button @click="minPrice = ''" class="hover:text-gray-200 text-base md:text-lg">
              ×
            </button>
          </span>
          <span
            v-if="maxPrice"
            class="px-2 md:px-3 py-1 bg-[#C76950] text-white text-xs md:text-sm rounded-full flex items-center gap-2"
          >
            Max: {{ maxPrice }} LE
            <button @click="maxPrice = ''" class="hover:text-gray-200 text-base md:text-lg">
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-10 md:py-12 lg:py-16">
        <p class="text-gray-500 text-sm md:text-base">Loading products...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center text-red-500 py-10 md:py-12 lg:py-16">
        <p class="text-sm md:text-base">{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="filteredProducts.length === 0"
        class="text-center text-gray-500 py-10 md:py-12 lg:py-16"
      >
        <p class="text-sm md:text-base">
          {{
            products.length === 0
              ? "No products in this category."
              : "No products match your filters."
          }}
        </p>
      </div>

      <!-- Products Grid -->
      <div
        v-else
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 xl:gap-6"
      >
        <ProductCard
          v-for="p in filteredProducts"
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