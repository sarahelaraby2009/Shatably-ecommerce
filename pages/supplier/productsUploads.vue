<script setup>
import { ref, onMounted } from "vue";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import SideBar from "~/components/SideBar.vue";
import AddProductModal from "~/components/AddProductModal.vue";
// ------------------------------------------------------------------
const data = {
  feild1: "Profile",
  feild2: "Product uploads",
  feild3: "Orders track",
};

const showAddModal = ref(false);
const products = ref([]);
const editingProduct = ref(null);
const supplierId = ref(null);
const userName = ref("");
const email = ref("");
const { $auth, $db } = useNuxtApp();

// ----------------------------------------------------------------------
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
// ----------------------------------------------------
const handleAddProduct = () => {
  editingProduct.value = null;
  showAddModal.value = true;
};
// --------------------------------------------------------
const onCloseModal = () => {
  showAddModal.value = false;
  editingProduct.value = null;
};
// -----------------------------------------------------------
const onSaveProduct = async (payload) => {
  try {
    if (editingProduct.value) {
      const index = products.value.findIndex(
        (p) => p.id === editingProduct.value.id
      );
      if (index !== -1) {
        const oldProduct = products.value[index];
        const updatedProduct = { ...oldProduct, ...payload };

        products.value[index] = updatedProduct;

        const supplierRef = doc(db, "suppliers", supplierId);
        await updateDoc(supplierRef, {
          products: arrayRemove(oldProduct),
        });
        await updateDoc(supplierRef, {
          products: arrayUnion(updatedProduct),
        });
      }
    } else {
      const newProduct = {
        id: Date.now(),
        ...payload,
      };

      products.value.push(newProduct);

      const supplierRef = doc($db, "suppliers", supplierId.value);
      await updateDoc(supplierRef, {
        products: arrayUnion(newProduct),
      });
    }

    showAddModal.value = false;
    editingProduct.value = null;
  } catch (err) {
    console.error("Error saving product:", err);
    await loadProducts(); 
  }
};
// --------------------------------------------------------------------------
const deleteProduct = async (id) => {
  try {
    const product = products.value.find((p) => p.id === id);
    if (!product) return;

    products.value = products.value.filter((p) => p.id !== id);

    const supplierRef = doc($db, "suppliers", supplierId.value);
    await updateDoc(supplierRef, {
      products: arrayRemove(product),
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    await loadProducts();
  }
};

const editProduct = (product) => {
  editingProduct.value = product;
  showAddModal.value = true;
};

// -----------------------------------------------------------------
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
              <h1 class="text-2xl font-bold text-gray-800">Product</h1>
              <p class="text-gray-500 text-sm mt-1">
                View & Update Your project
              </p>
            </div>
            <button
              @click="handleAddProduct"
              class="bg-[#C76950] hover:bg-[#b55a42] text-white font-medium py-2 px-6 rounded-full transition-colors"
            >
              Add Product
            </button>
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
            <p class="text-sm mt-2">Click on <span class="text-bold text-[#C76950]">Add Product</span> to add a new product</p>
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
                  <th class="text-center py-3 px-4 font-semibold text-sm">
                    Actions
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

                  <td class="py-4 px-4">
                    <div class="flex items-center justify-center gap-3">
                      <button
                        @click="editProduct(product)"
                        class="text-gray-400 hover:text-[#C76950] transition-colors"
                        title="Edit"
                      >
                        <font-awesome-icon
                          :icon="['far', 'edit']"
                          class="text-[20px] text-black"
                        />
                      </button>
                      <button
                        @click="deleteProduct(product.id)"
                        class="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <font-awesome-icon
                          :icon="['far', 'trash-can']"
                          class="text-[20px] text-black"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <AddProductModal
      :show="showAddModal"
      :initial="editingProduct"
      @close="onCloseModal"
      @save="onSaveProduct"
    />
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
</style>
