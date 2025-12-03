<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import SideBar from "~/components/SideBar.vue";
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
const { $auth, $db } = useNuxtApp();
// ------------------------------------------------------
const loadProducts = async () => {
  try {
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

// -------------------------------------------------------
onMounted(() => {
  loadProducts();
});
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
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
            <p class="text-sm mt-2">
              Go to <span class="text-bold text-[#C76950]">Product uploads</span> to add products
            </p>
          </div>

       
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-[#C76950] text-white">
                  <th class="text-left py-3 px-4 font-semibold text-sm">
                    Name
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sm">
                    Description
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sm">
                    Image
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sm">
                    Price
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sm">
                    Seller ID
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sm">
                    Brand
                  </th>
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
                    <p class="text-gray-800 font-medium">
                      {{ product.price }} LE
                    </p>
                  </td>
                  <td class="py-4 px-4">
                    <p class="text-gray-600 text-sm">
                      {{ product.sellerId || "—" }}
                    </p>
                  </td>
                  <td class="py-4 px-4">
                    <p class="text-gray-600 text-sm">
                      {{ product.brand || "—" }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
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
