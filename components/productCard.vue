<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// ----------------------------------------------------
const props = defineProps({
  product: { type: Object, required: true },
  categoryId: { type: String, required: true },
  subId: { type: String, required: true },
});
// -----------------------------------------------------
const router = useRouter();
const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;

const isInWishlist = ref(false);
const isInCart = ref(false);
const currentUser = ref(null);
// ------------------------------------------------------
const goToDetails = () => {
  router.push({
    path: `/categories/${props.categoryId}/${props.subId}/${props.product.id}`
  });
};

// ---------------------------------------------------------
onMounted(() => {
  if (!auth) return;
  onAuthStateChanged(auth, async (user) => {
    currentUser.value = user;
    if (user) await checkWishlistAndCart();
  });
});
// ---------------------------------------------------------
async function checkWishlistAndCart() {
  if (!currentUser.value) return;

  try {
    const wishlistRef = doc(db, "wishlists", `${currentUser.value.uid}_${props.product.id}`);
    const snapW = await getDoc(wishlistRef);
    isInWishlist.value = snapW.exists();

    const cartRef = doc(db, "carts", `${currentUser.value.uid}_${props.product.id}`);
    const snapC = await getDoc(cartRef);
    isInCart.value = snapC.exists();
  } catch (error) {
    console.error("Error:", error);
  }
}

// ---------------------------------------------------------
async function toggleWishlist(event) {
  event.stopPropagation();
  if (!currentUser.value) {
    router.push("/auth/login");
    return;
  }

  try {
    const wishlistRef = doc(db, "wishlists", `${currentUser.value.uid}_${props.product.id}`);
    const snap = await getDoc(wishlistRef);

    if (snap.exists()) {
      await deleteDoc(wishlistRef);
      isInWishlist.value = false;
    } else {
      await setDoc(wishlistRef, {
        userId: currentUser.value.uid,
        productId: props.product.id,
        createdAt: serverTimestamp(),
        productSnapshot: props.product
      });
      isInWishlist.value = true;
    }
  } catch (error) {
    console.error("Error updating wishlist:", error);
  }
}

// ---------------------------------------------------------
async function addToCart(event) {
  event.stopPropagation();
  if (!currentUser.value) {
    router.push("/auth/login");
    return;
  }

  try {
    const cartRef = doc(db, "carts", `${currentUser.value.uid}_${props.product.id}`);
    const snap = await getDoc(cartRef);

    if (snap.exists()) {
      const newQty = (snap.data().quantity || 1) + 1;
      await setDoc(cartRef, { quantity: newQty, updatedAt: serverTimestamp() }, { merge: true });
    } else {
      await setDoc(cartRef, {
        userId: currentUser.value.uid,
        productId: props.product.id,
        quantity: 1,
        createdAt: serverTimestamp(),
        productSnapshot: props.product
      });
    }
    isInCart.value = true;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer group"
    @click="goToDetails"
  >
    <div class="relative overflow-hidden bg-gray-100 aspect-square">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <button
        @click.stop="toggleWishlist"
        class="absolute top-3 right-3 bg-white rounded-[50px] p-2 shadow hover:shadow-md transition z-10"
      >
        <font-awesome-icon
          :icon="[isInWishlist ? 'fas' : 'far', 'heart']"
          :class="isInWishlist ? 'text-orange-500' : 'text-gray-400'"
          class="text-lg "
        />
      </button>

      <div v-if="product.bestSelling" class="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
      Best Selling
      </div>
    </div>

    <div class="p-4">
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="font-semibold text-gray-900 line-clamp-2 text-sm flex-1">{{ product.name }}</h3>
        <div class="flex items-center gap-1 flex-shrink-0">
          <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
          <span class="text-xs font-semibold">4.0</span>
        </div>
      </div>

      <p class="text-gray-600 text-xs line-clamp-2 mb-2">{{ product.description }}</p>

      <p class="text-gray-500 text-xs mb-3">{{ product.brand }}</p>

      <div class="flex items-center justify-between">
        <p class="text-lg font-bold text-[#C76950]">{{ product.price }} EGP</p>
        <button
          @click.stop="addToCart"
          class="bg-[#C76950] text-white w-[40px] h-[40px] p-2 rounded-[50px] hover:bg-[#b85840] transition-colors"
        >
          <font-awesome-icon :icon="['fas', 'cart-plus']" class="text-sm" />
        </button>
      </div>
    </div>
  </div>
</template>