<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
  query,
  limit,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// --------------------------------------------------------
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;
const categoryId = route.params.id;
const subId = route.params.subId;
const productId = route.params.productId;
console.log("route params:", { categoryId, subId, productId });
const product = ref(null);
const loading = ref(true);
const error = ref(null);
const recommendedProducts = ref([]);
const quantity = ref(1);
const currentUser = ref(null);
const isInWishlist = ref(false);
// -----------------------------------------------------------
// if (!db) {
//   console.error("Firestore db is not available (nuxtApp.$db is undefined).");
//   error.value = "Internal error: database not initialized.";
//   loading.value = false;
// }

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // ------- 1) Try Nested Path -------
    let docRef = doc(db, "categories", categoryId, "subcategories", subId, "products", productId);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      product.value = { id: docSnap.id, ...docSnap.data() };
      console.log("Loaded from categories path");
    } 
    else {
      // ------- 2) Try Standalone products -------
      docRef = doc(db, "products", productId);
      docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        product.value = { id: docSnap.id, ...docSnap.data() };
        console.log("Loaded from top-level products collection");
      } 
      else {
        product.value = null;
        error.value = "Product not found.";
        console.warn("Product not found in either path.");
      }
    }
  } 
  
  catch (err) {
    console.error("Error fetching product:", err);
    error.value = err?.message || "Error loading product";
  } 
  
  finally {
    loading.value = false;
  }
};

// ---------------------------------------------------------------
const fetchRecommendedProducts = async () => {
  try {
    const productsCol = collection(
      db,
      "categories",
      categoryId,
      "subcategories",
      subId,
      "products"
    );
    const q = query(productsCol, limit(6));
    const snap = await getDocs(q);
    recommendedProducts.value = snap.docs
      .filter((d) => d.id !== productId)
      .slice(0, 4)
      .map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("Error loading recommended products:", err);
  }
};
// --------------------------------------------------
const addToCart = async () => {
  if (!currentUser.value) {
    router.push("/auth/login");
    return;
  }

  try {
    const cartRef = doc(db, "carts", `${currentUser.value.uid}_${productId}`);
    const snap = await getDoc(cartRef);

    if (snap.exists()) {
      const newQty = (snap.data().quantity || 1) + quantity.value;
      await setDoc(
        cartRef,
        { quantity: newQty, updatedAt: serverTimestamp() },
        { merge: true }
      );
    } else {
      await setDoc(cartRef, {
        userId: currentUser.value.uid,
        productId: productId,
        quantity: quantity.value,
        createdAt: serverTimestamp(),
        productSnapshot: product.value,
      });
    }
    quantity.value = 1;
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};
// -------------------------------------------------------
const toggleWishlist = async () => {
  if (!currentUser.value) {
    router.push("/auth/login");
    return;
  }

  try {
    const wishlistRef = doc(
      db,
      "wishlists",
      `${currentUser.value.uid}_${productId}`
    );
    const snap = await getDoc(wishlistRef);

    if (snap.exists()) {
      await deleteDoc(wishlistRef);
      isInWishlist.value = false;
    } else {
      await setDoc(wishlistRef, {
        userId: currentUser.value.uid,
        productId: productId,
        createdAt: serverTimestamp(),
        productSnapshot: product.value,
      });
      isInWishlist.value = true;
    }
  } catch (err) {
    console.error("Error updating wishlist:", err);
  }
};
// ----------------------------------------------------
const increaseQuantity = () => quantity.value++;
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};
// ------------------------------------------------
onMounted(() => {
  if (auth) {
    onAuthStateChanged(auth, (user) => {
      currentUser.value = user;
    });
  }
  fetchProduct();
  fetchRecommendedProducts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center gap-2 text-sm">
          <NuxtLink to="/" class="text-gray-600 hover:text-[#C76950]"
            >Home
            <font-awesome-icon
              :icon="['fas', 'chevron-right']"
              class="text-[12px]"
            />
          </NuxtLink>
          <NuxtLink to="/categories" class="text-gray-600 hover:text-[#C76950]"
            >Categories
            <font-awesome-icon
              :icon="['fas', 'chevron-right']"
              class="text-[12px]"
            />
          </NuxtLink>
          <NuxtLink to="/" class="text-gray-600 hover:text-[#C76950]"
            >SubCategories
            <font-awesome-icon
              :icon="['fas', 'chevron-right']"
              class="text-[12px]"
            />
          </NuxtLink>
          <span class="text-[#C76950] font-semibold">Product Details</span>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <div v-if="loading" class="text-center py-20">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#C76950]"
        ></div>
        <p class="text-gray-500 mt-4">Loading product...</p>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <p class="text-red-600">{{ error }}</p>
        <button
          @click="router.back()"
          class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Go Back
        </button>
      </div>

      <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="flex flex-col gap-4">
          <div class="relative bg-white rounded-lg overflow-hidden shadow-sm">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-96 object-cover"
            />
            <button
              @click="toggleWishlist"
              class="absolute top-4 right-4 bg-white w-[40px] h-[40px] rounded-[50px] flex justify-center items-center p-3 shadow-md hover:bg-gray-100"
            >
              <font-awesome-icon
                :icon="[isInWishlist ? 'fas' : 'far', 'heart']"
                :class="isInWishlist ? 'text-orange-500' : 'text-gray-400'"
                class="text-xl"
              />
            </button>
          </div>

          <div class="bg-white rounded-lg px-[12px] py-[16px] shadow-sm">
            <h3 class="text-lg font-semibold mb-3">Recently Viewed</h3>
            <div class="flex justify-between items-center gap-[8px]">
              <div class="w-[190px] h-[190px] flex-col gap-[8px]">
                <div class="w-[190px] h-[160px] rounded-[12px]">
                  <img
                    src="/assets/1.jpeg"
                    class="w-full h-full rounded-[12px]"
                  />
                </div>
                <div class="flex justify-between px-[4px] py-[2px] text-[14px]">
                  <p>Product Name</p>
                  <p class="font-bold">300 LE</p>
                </div>
              </div>
              <!-- ------------------------------------------------ -->
              <div class="w-[190px] h-[190px] flex-col gap-[8px]">
                <div class="w-[190px] h-[160px] rounded-[12px]">
                  <img
                    src="/assets/2.jpeg"
                    class="w-full h-full rounded-[12px]"
                  />
                </div>
                <div class="flex justify-between px-[4px] py-[2px] text-[14px]">
                  <p>Product Name</p>
                  <p class="font-bold">300 LE</p>
                </div>
              </div>
              <!-- ------------------------------------------------ -->
              <div class="w-[190px] h-[190px] flex-col gap-[8px]">
                <div class="w-[190px] h-[160px] rounded-[12px]">
                  <img
                    src="/assets/3.jpeg"
                    class="w-full h-full rounded-[12px]"
                  />
                </div>
                <div class="flex justify-between px-[4px] py-[2px] text-[14px]">
                  <p>Product Name</p>
                  <p class="font-bold">300 LE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">
              {{ product.name }}
            </h1>
            <p class="text-gray-600 mb-4">{{ product.description }}</p>

            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-4xl font-bold text-[#C76950]">
                  {{ product.price }} EGP
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <div class="flex gap-1">
                    <font-awesome-icon
                      v-for="i in 5"
                      :key="i"
                      :icon="[i <= 4 ? 'fas' : 'far', 'star']"
                      class="text-yellow-400"
                    />
                  </div>
                  <span class="text-sm text-gray-500">(44 reviews)</span>
                </div>
              </div>
            </div>

            <div class="border-t pt-4 space-y-2 text-sm">
              <p>
                <span class="font-semibold">Brand:</span> {{ product.brand }}
              </p>
              <p>
                <span class="font-semibold">Seller:</span>
                {{ product.sellerId }}
              </p>
              <p
                v-if="product.bestSelling"
                class="text-orange-500 font-semibold"
              >
                Best Selling
              </p>
              <p>Power: 50W</p> 
               <p> Voltage: 220V </p>
                <p>Material: Aluminum + Acrylic</p>
                <p>Color: Warm White / Cool White </p>
                <p>Dimensions: 40cm</p>
             
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <p class="font-semibold mb-4">Quantity</p>
            <div
              class="flex items-center gap-4 w-fit bg-gray-100 rounded-[32px] p-3"
            >
              <button
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
                class="p-2 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                <font-awesome-icon :icon="['fas', 'minus']" />
              </button>
              <span class="font-semibold text-lg w-8 text-center">{{
                quantity
              }}</span>
              <button
                @click="increaseQuantity"
                class="p-2 hover:bg-gray-200 rounded"
              >
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p class="font-semibold text-blue-900 mb-2">Delivery Information</p>
            <p class="text-sm text-blue-800 leading-relaxed">
              Delivery in 2-4 business days (Cairo), 3-7 days other
              governorates.
              <br />Free returns within 14 days. <br />Safe packaging with
              breakage protection.
            </p>
          </div>

          <div class="flex gap-3">
            <button
              class="w-[204px] h-[54px] px-[16px] py-[6px] bg-[#C76950] text-white rounded-[24px] hover:bg-gray-300 font-semibold"
            >
              Buy Now
            </button>
            <button
              @click="addToCart"
              class="w-[204px] h-[54px] px-[16px] py-[6px] border border-[#612B1F] text-[#612B1F] rounded-[24px] hover:bg-[#b85840] hover:border-[#b85840] hover:text-white font-semibold flex items-center justify-center gap-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12 mb-12 max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">Reviewes</h2>
      <div class="flex-col items-center justify-between gap-5">
        <div
          class="flex justify-between items-start text-gray-400 gap-[14px] shadow-sm rounded-[12px] py-[10px] px-[14px]"
        >
          <div class="flex gap-3">
            <img
              src="/assets/HomeLogo.png"
              alt="Fatma Senosy"
              class="w-12 h-12 rounded-full"
            />
            <div class="flex flex-col gap-2">
              <p class="font-medium text-gray-800">Fatma Senosy</p>
              <div class="flex gap-1">
                <font-awesome-icon
                  v-for="i in 5"
                  :key="i"
                  :icon="[i <= 5 ? 'fas' : 'far', 'star']"
                  class="text-yellow-400 text-sm"
                />
                <span class="text-gray-600 text-sm ml-1">5.0</span>
              </div>
              <p class="text-gray-600 text-sm">
                The light looks even better in real life. Bright, elegant, and
                easy to install. Totally worth it!
              </p>
            </div>
          </div>
          <p class="text-gray-400 text-sm whitespace-nowrap">
            08:10 PM <span>|</span> 23 Mar 2022
          </p>
        </div>
        <!-- ---------------------------------------------------- -->
        <div
          class="flex justify-between items-start text-gray-400 gap-[14px] shadow-sm rounded-[12px] py-[10px] px-[14px]"
        >
          <div class="flex gap-3">
            <img
              src="/assets/HomeLogo.png"
              alt="Fatma Senosy"
              class="w-12 h-12 rounded-full"
            />
            <div class="flex flex-col gap-2">
              <p class="font-medium text-gray-800">Fatma Senosy</p>
              <div class="flex gap-1">
                <font-awesome-icon
                  v-for="i in 5"
                  :key="i"
                  :icon="[i <= 5 ? 'fas' : 'far', 'star']"
                  class="text-yellow-400 text-sm"
                />
                <span class="text-gray-600 text-sm ml-1">5.0</span>
              </div>
              <p class="text-gray-600 text-sm">
                The light looks even better in real life. Bright, elegant, and
                easy to install. Totally worth it!
              </p>
            </div>
          </div>
          <p class="text-gray-400 text-sm whitespace-nowrap">
            08:10 PM <span>|</span> 23 Mar 2022
          </p>
        </div>
      </div>
    </div>

    <div v-if="product" class="mt-12 mb-12 max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">Recommended Products</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="prod in recommendedProducts"
          :key="prod.id"
          :product="prod"
          :categoryId="categoryId"
          :subId="subId"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
