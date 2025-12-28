<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import SideBar from "~/components/SideBar.vue";
useHead({
  title: "Orders Track",
  meta: [
    {
      name: "description",
      content: "تتبع طلباتك كمورد وابقَ على اطلاع دائم بحالة منتجاتك المباعة.",
    },
    {'keywords': 'تتبع الطلبات, مورد, منتجات, مبيعات, حالة الطلب, تجارة إلكترونية, متجر إلكتروني, تسوق عبر الإنترنت, إدارة المنتجات, تقارير المبيعات'},
  ],
});
// ----------------------------------------------------
const data = {
  feild1: "Profile",
  feild2: "Product uploads",
  feild3: "Orders track",
};

const products = ref([]);
const supplierId = ref(null);
const userName = ref("");
const email = ref("");
let $auth = null;
let $db = null;
if (process.client) {
  const nuxtApp = useNuxtApp();
  $auth = nuxtApp.$auth ?? null;
  $db = nuxtApp.$db ?? null;
}
// -----------------------------------------------------
const loadProducts = async () => {
  try {
    if (!process.client || !$auth || !$db) return;

    onAuthStateChanged($auth, async (user) => {
      if (user) {
        supplierId.value = user.uid;
        const supplierRef = doc($db, "suppliers", user.uid);
        const supplierDoc = await getDoc(supplierRef);

        if (supplierDoc.exists()) {
          const supplierData = supplierDoc.data();
          products.value = supplierData.products || [];
          userName.value = supplierData.name || "";
          email.value = supplierData.email || "";
        }
      }
    });
  } catch (err) {
    console.error("Error loading products:", err);
  }
};
// ---------------------------------------------------------
onMounted(() => {
  if (process.client) {
    loadProducts();
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Desktop -->
    <div class="hidden lg:flex">
      <SideBar
        :feild1="data.feild1"
        :feild2="data.feild2"
        :feild3="data.feild3"
        :userName="userName"
        :email="email"
      />

      <div class="flex-1 p-8">
        <div class="max-w-6xl mx-auto">
          <div class="mb-8">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-800">Orders track</h1>
                <p class="text-gray-500 text-sm mt-1">
                  View Your Uploaded Products
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div
              v-if="products.length === 0"
              class="text-center py-12 text-gray-400"
            >
              <div class="text-6xl mb-4">
                <font-awesome-icon
                  :icon="['far', 'folder-open']"
                  class="text-[40px] text-gray-400"
                />
              </div>
              <p class="text-lg font-medium text-gray-500">
                No products available at the moment
              </p>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-[#C76950] text-white">
                    <th class="text-left py-3 px-4 font-semibold text-sm">Name</th>
                    <th class="text-left py-3 px-4 font-semibold text-sm">Description</th>
                    <th class="text-left py-3 px-4 font-semibold text-sm">Image</th>
                    <th class="text-left py-3 px-4 font-semibold text-sm">Price</th>
                    <th class="text-left py-3 px-4 font-semibold text-sm">Category</th>
                    <th class="text-left py-3 px-4 font-semibold text-sm">Subcategory</th>
                    <th class="text-left py-3 px-4 font-semibold text-sm">Seller ID</th>
                    <th class="text-left py-3 px-4 font-semibold text-sm">Brand</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="product in products"
                    :key="product.id"
                    class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td class="py-4 px-4">
                      <p class="text-gray-800 font-medium">{{ product.name }}</p>
                    </td>
                    <td class="py-4 px-4">
                      <p class="text-gray-600 text-sm truncate max-w-xs">
                        {{ product.description || "—" }}
                      </p>
                    </td>
                    <td class="py-4 px-4">
                      <div
                        v-if="product.image"
                        class="w-10 h-10 rounded bg-gray-200 overflow-hidden"
                      >
                        <img
                          :src="product.image"
                          alt="Product"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        v-else
                        class="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-400 text-xs"
                      >
                        📷
                      </div>
                    </td>
                    <td class="py-4 px-4">
                      <p class="text-gray-800 font-medium">{{ product.price }} LE</p>
                    </td>
                    <td class="py-4 px-4">
                      <p class="text-gray-800 font-medium">{{ product.categoryName || "—" }}</p>
                    </td>
                    <td class="py-4 px-4">
                      <p class="text-gray-800 font-medium">{{ product.subcategory || "—" }}</p>
                    </td>

                    <td class="py-4 px-4">
                      <p class="text-gray-600 text-sm">{{ product.sellerId || "—" }}</p>
                    </td>
                    <td class="py-4 px-4">
                      <p class="text-gray-600 text-sm">{{ product.brand || "—" }}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="lg:hidden bg-white min-h-screen">
      <div class="border-b bg-white sticky top-0 z-10">
        <div class="flex justify-around">
          <NuxtLink to="/supplier" class="flex-1">
            <div class="text-center py-4 text-sm font-medium transition-all border-b-2 text-gray-500 border-transparent">
              {{ data.feild1 }}
            </div>
          </NuxtLink>
          <NuxtLink to="/supplier/productsUploads" class="flex-1">
            <div class="text-center py-4 text-sm font-medium transition-all border-b-2 text-gray-500 border-transparent">
              {{ data.feild2 }}
            </div>
          </NuxtLink>
          <NuxtLink to="/supplier/ordersTrack" class="flex-1">
            <div class="text-center py-4 text-sm font-medium transition-all border-b-2 text-[#C76950] border-[#C76950]">
              {{ data.feild3 }}
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="px-4 py-6">
        <div class="mb-6">
          <h1 class="text-xl font-bold text-gray-800">Orders track</h1>
          <p class="text-gray-500 text-xs mt-1">View Your Uploaded Products</p>
        </div>
        <div
          v-if="products.length === 0"
          class="text-center py-12 text-gray-400 bg-white rounded-lg border"
        >
          <font-awesome-icon
            :icon="['far', 'folder-open']"
            class="text-5xl text-gray-300 mb-4"
          />
          <p class="text-base font-medium text-gray-500">
            No products available
          </p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="product in products"
            :key="product.id"
            class="bg-white border border-gray-200 rounded-lg overflow-hidden"
          >
            <div class="bg-gray-100 p-4 flex justify-center">
              <div
                v-if="product.image"
                class="w-full h-48 rounded-lg bg-gray-200 overflow-hidden"
              >
                <img
                  :src="product.image"
                  alt="Product"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-full h-48 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-4xl"
              >
                📷
              </div>
            </div>

            <div class="divide-y divide-gray-200">
              <div class="flex py-3 px-4">
                <span class="text-xs font-semibold text-gray-500 w-24">Name:</span>
                <span class="text-sm text-gray-800 flex-1">{{ product.name }}</span>
              </div>

              <div class="flex py-3 px-4">
                <span class="text-xs font-semibold text-gray-500 w-24">Description:</span>
                <span class="text-sm text-gray-600 flex-1">{{ product.description || "—" }}</span>
              </div>

              <div class="flex py-3 px-4">
                <span class="text-xs font-semibold text-gray-500 w-24">Price:</span>
                <span class="text-sm font-bold text-gray-800 flex-1">{{ product.price }} LE</span>
              </div>

              <div class="flex py-3 px-4">
                <span class="text-xs font-semibold text-gray-500 w-24">Category:</span>
                <span class="text-sm font-bold text-gray-800 flex-1">{{ product.categoryName || "—" }}</span>
              </div>

              <div class="flex py-3 px-4">
                <span class="text-xs font-semibold text-gray-500 w-24">Subcategory:</span>
                <span class="text-sm font-bold text-gray-800 flex-1">{{ product.subcategory || "—" }}</span>
              </div>

              <div class="flex py-3 px-4">
                <span class="text-xs font-semibold text-gray-500 w-24">Seller ID:</span>
                <span class="text-sm text-gray-600 flex-1">{{ product.sellerId || "—" }}</span>
              </div>

              <div class="flex py-3 px-4">
                <span class="text-xs font-semibold text-gray-500 w-24">Brand:</span>
                <span class="text-sm text-gray-600 flex-1">{{ product.brand || "—" }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
