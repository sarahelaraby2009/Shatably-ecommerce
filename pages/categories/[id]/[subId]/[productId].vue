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

const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;
const categoryId = route.params.id;
const subId = route.params.subId;
const productId = route.params.productId;

const product = ref(null);
const loading = ref(true);
const error = ref(null);
const recommendedProducts = ref([]);
const quantity = ref(1);
const currentUser = ref(null);
const isInWishlist = ref(false);

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // ------- 1) Try Nested Path -------
    let docRef = doc(db, "categories", categoryId, "subcategories", subId, "products", productId);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      product.value = { id: docSnap.id, ...docSnap.data() };
    } else {
      product.value = null;
      error.value = "Product not found or has been deleted.";
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

const increaseQuantity = () => quantity.value++;
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};

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
  <div class="min-h-screen bg-white">
    <div class="hidden md:block bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex items-center gap-2 text-sm">
          <NuxtLink to="/" class="text-gray-600 hover:text-[#C76950]">
            Home
          </NuxtLink>
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-xs" />
          <NuxtLink to="/categories" class="text-gray-600 hover:text-[#C76950]">
            Categories
          </NuxtLink>
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-xs" />
          <NuxtLink to="/" class="text-gray-600 hover:text-[#C76950]">
            SubCategories
          </NuxtLink>
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-xs" />
          <span class="text-[#C76950] font-semibold">Product Details</span>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-20">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#C76950]"></div>
      <p class="text-gray-500 mt-4">Loading product...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center mx-4">
      <p class="text-red-600">{{ error }}</p>
      <button @click="router.back()" class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
        Go Back
      </button>
    </div>

    <div v-else-if="product" class="max-w-7xl mx-auto">
      <div class="hidden lg:grid lg:grid-cols-2 gap-8 px-4 py-8">
        <div class="flex flex-col gap-4">
          <div class="relative bg-white rounded-lg overflow-hidden shadow-sm">
            <img :src="product.image" :alt="product.name" class="w-full h-96 object-cover" />
            <button @click="toggleWishlist" class="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex justify-center items-center shadow-md hover:bg-gray-100">
              <font-awesome-icon :icon="[isInWishlist ? 'fas' : 'far', 'heart']" :class="isInWishlist ? 'text-orange-500' : 'text-gray-400'" class="text-xl" />
            </button>
          </div>

          <div class="bg-white rounded-lg px-3 py-4 shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-semibold">Recently Viewed</h3>
              <div class="flex gap-2">
                <button class="w-8 h-8 rounded-full bg-gray-100 shadow flex items-center justify-center hover:bg-gray-200">
                  <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-xs text-gray-600" />
                </button>
                <button class="w-8 h-8 rounded-full bg-gray-100 shadow flex items-center justify-center hover:bg-gray-200">
                  <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-xs text-gray-600" />
                </button>
              </div>
            </div>
            <div class="flex gap-2">
              <div v-for="i in 3" :key="i" class="flex-1">
                <img :src="`/assets/${i}.jpeg`" class="w-full h-32 object-cover rounded-lg mb-2" />
                <div class="flex justify-between text-xs px-1">
                  <p>Product Name</p>
                  <p class="font-bold">300 LE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ product.name }}</h1>
            <p class="text-gray-600 mb-4">{{ product.description }}</p>

            <div class="mb-4">
              <p class="text-4xl font-bold text-[#C76950]">{{ product.price }} EGP</p>
              <div class="flex items-center gap-2 mt-2">
                <div class="flex gap-1">
                  <font-awesome-icon v-for="i in 5" :key="i" :icon="[i <= 4 ? 'fas' : 'far', 'star']" class="text-yellow-400" />
                </div>
                <span class="text-sm text-gray-500">(44 reviews)</span>
              </div>
            </div>

            <div class="border-t pt-4 space-y-2 text-sm">
              <p><span class="font-semibold">Brand:</span> {{ product.brand }}</p>
              <p><span class="font-semibold">Seller:</span> {{ product.sellerId }}</p>
              <p v-if="product.bestSelling" class="text-orange-500 font-semibold">Best Selling</p>
              <p>Power: 50W</p>
              <p>Voltage: 220V</p>
              <p>Material: Aluminum + Acrylic</p>
              <p>Color: Warm White / Cool White</p>
              <p>Dimensions: 40cm</p>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <p class="font-semibold mb-4">Quantity</p>
            <div class="flex items-center gap-4 w-fit bg-gray-100 rounded-full p-3">
              <button @click="decreaseQuantity" :disabled="quantity <= 1" class="p-2 hover:bg-gray-200 rounded disabled:opacity-50">
                <font-awesome-icon :icon="['fas', 'minus']" />
              </button>
              <span class="font-semibold text-lg w-8 text-center">{{ quantity }}</span>
              <button @click="increaseQuantity" class="p-2 hover:bg-gray-200 rounded">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p class="font-semibold text-blue-900 mb-2">Delivery Information</p>
            <p class="text-sm text-blue-800 leading-relaxed">
              Delivery in 2-4 business days (Cairo), 3-7 days other governorates.
              <br />Free returns within 14 days. <br />Safe packaging with breakage protection.
            </p>
          </div>

          <div class="flex gap-3">
            <button class="flex-1 h-14 bg-[#C76950] text-white rounded-full hover:bg-[#b85840] font-semibold">
              Buy Now
            </button>
            <button @click="addToCart" class="flex-1 h-14 border border-[#612B1F] text-[#612B1F] rounded-full hover:bg-[#b85840] hover:border-[#b85840] hover:text-white font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div class="lg:hidden">
        <div class="relative">
          <img :src="product.image" :alt="product.name" class="w-full h-80 object-cover" />
          <button @click="toggleWishlist" class="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex justify-center items-center shadow-md">
            <font-awesome-icon :icon="[isInWishlist ? 'fas' : 'far', 'heart']" :class="isInWishlist ? 'text-orange-500' : 'text-gray-400'" />
          </button>
        </div>

        <div class="px-4 py-4 space-y-4">
          <div>
            <h1 class="text-xl font-bold text-gray-900 mb-1">{{ product.name }}</h1>
            <p class="text-sm text-gray-600 mb-3">{{ product.description }}</p>

            <div class="space-y-2 text-sm text-gray-700">
              <p>Power: 1800W - 2400W</p>
              <p>Material: High-Quality Plastic + Aluminum</p>
            </div>

            <p class="text-3xl font-bold text-[#C76950] mt-3">{{ product.price }} LE</p>
            <div class="flex items-center gap-2 mt-1">
              <div class="flex gap-1">
                <font-awesome-icon v-for="i in 5" :key="i" :icon="[i <= 4 ? 'fas' : 'far', 'star']" class="text-yellow-400 text-sm" />
              </div>
              <span class="text-sm text-gray-500">(44 reviews)</span>
            </div>
          </div>

          <div>
            <p class="font-semibold mb-2 text-sm">Quantity</p>
            <div class="flex items-center gap-3 w-fit bg-gray-100 rounded-full px-4 py-2">
              <button @click="decreaseQuantity" :disabled="quantity <= 1" class="text-[#C76950] disabled:opacity-50">
                <font-awesome-icon :icon="['fas', 'minus']" />
              </button>
              <span class="font-semibold w-8 text-center">{{ quantity }}</span>
              <button @click="increaseQuantity" class="text-[#C76950]">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p class="font-semibold text-blue-900 mb-1 text-sm">Delivery info</p>
            <p class="text-xs text-blue-800 leading-relaxed">
              Delivery in 2-4 days (Cairo)<br />
              Cash on Delivery available<br />
              Free return within 14 days
            </p>
          </div>

          <div class="flex gap-3 pb-4">
            <button class="flex-1 h-12 bg-[#C76950] text-white rounded-full font-semibold text-sm">
              Buy Now
            </button>
            <button @click="addToCart" class="flex-1 h-12 border-2 border-[#C76950] text-[#C76950] rounded-full font-semibold text-sm">
              Add to cart
            </button>
          </div>
        </div>

        <div class="px-4 py-4 bg-gray-50">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold text-lg">Recently viewed</h3>
            <div class="flex gap-2">
              <button class="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-xs" />
              </button>
              <button class="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-xs" />
              </button>
            </div>
          </div>

          <div class="flex gap-3 overflow-x-auto pb-2">
            <div v-for="i in 3" :key="i" class="flex-shrink-0 w-32">
              <img :src="`/assets/${i}.jpeg`" class="w-full h-28 object-cover rounded-lg mb-2" />
              <p class="text-xs font-medium truncate">Midea Window AC</p>
              <p class="text-xs text-gray-500">EMBER 4</p>
              <div class="flex items-center gap-1 mt-1">
                <div class="flex gap-0.5">
                  <font-awesome-icon v-for="j in 5" :key="j" :icon="['fas', 'star']" class="text-yellow-400" style="font-size: 8px" />
                </div>
                <span class="text-xs text-gray-500">5.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:hidden bg-gray-50 px-4 py-6">
        <h2 class="text-xl font-bold mb-4">Reviews</h2>
        <div class="space-y-3">
          <div v-for="i in 2" :key="i" class="bg-white rounded-lg p-3">
            <div class="flex gap-3 mb-2">
              <img src="/assets/HomeLogo.png" alt="User" class="w-10 h-10 rounded-full flex-shrink-0" />
              <div class="flex-1">
                <p class="font-semibold text-sm">Fatma Senosy</p>
                <p class="text-xs text-gray-400">08:10 PM | 23 Mar 2022</p>
              </div>
            </div>
            <div class="flex items-center gap-2 mb-2">
              <div class="flex gap-0.5">
                <font-awesome-icon v-for="j in 5" :key="j" :icon="['fas', 'star']" class="text-yellow-400" style="font-size: 10px" />
              </div>
              <span class="text-xs text-gray-600">5.0</span>
            </div>
            <p class="text-xs text-gray-600 leading-relaxed">
              The light looks even better in real life. Bright, elegant, and easy to install. Totally worth it!
            </p>
          </div>
        </div>
      </div>

      <div class="hidden lg:block px-4 py-8 max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-6">Reviews</h2>
        <div class="space-y-4">
          <div v-for="i in 2" :key="i" class="bg-white shadow-sm rounded-xl p-4">
            <div class="flex gap-3">
              <img src="/assets/HomeLogo.png" alt="User" class="w-12 h-12 rounded-full flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2 mb-2">
                  <p class="font-semibold text-gray-800">Fatma Senosy</p>
                  <p class="text-xs text-gray-400 whitespace-nowrap">08:10 PM | 23 Mar 2022</p>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="flex gap-0.5">
                    <font-awesome-icon v-for="j in 5" :key="j" :icon="['fas', 'star']" class="text-yellow-400 text-xs" />
                  </div>
                  <span class="text-sm text-gray-600">5.0</span>
                </div>
                <p class="text-sm text-gray-600 leading-relaxed">
                  The light looks even better in real life. Bright, elegant, and easy to install. Totally worth it!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 px-4 py-6 lg:py-8">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-xl lg:text-3xl font-bold mb-4 lg:mb-6">Recommended Products</h2>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <div v-for="prod in recommendedProducts" :key="prod.id" class="bg-white rounded-lg overflow-hidden shadow-sm">
              <div class="relative">
                <img :src="prod.image" :alt="prod.name" class="w-full h-32 lg:h-48 object-cover" />
              </div>
              <div class="p-3">
                <p class="text-sm font-semibold text-gray-800 mb-1 truncate">{{ prod.name }}</p>
                <p class="text-xs text-gray-500 mb-2 truncate">{{ prod.brand || 'Brand' }}</p>
                <div class="flex items-center gap-1 mb-2">
                  <div class="flex gap-0.5">
                    <font-awesome-icon v-for="j in 5" :key="j" :icon="['fas', 'star']" class="text-yellow-400" style="font-size: 8px" />
                  </div>
                  <span class="text-xs text-gray-500">5.0</span>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-base lg:text-lg font-bold text-gray-900">{{ prod.price }} LE</p>
                  <button class="w-7 h-7 lg:w-8 lg:h-8 bg-[#C76950] rounded-full flex items-center justify-center hover:bg-[#b85840]">
                    <font-awesome-icon :icon="['fas', 'plus']" class="text-white text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>