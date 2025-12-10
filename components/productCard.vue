<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useNuxtApp } from "#app";
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Props: product object + categoryId + subId
const props = defineProps({
  product: { type: Object, required: true },
  categoryId: { type: String, required: true },
  subId: { type: String, required: true },
});

const router = useRouter();
const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;

const isInWishlist = ref(false);
const isInCart = ref(false);
const cartQuantity = ref(0);
const currentUser = ref(null);

// -------------------------
const goToDetails = () => {
  console.log("GO DETAILS =>", props.categoryId, props.subId, props.product.id);
  const realCategory = props.product.categoryId || props.categoryId;
  const realSub = props.product.subId || props.subId;

  router.push(`/categories/${realCategory}/${realSub}/${props.product.id}`);
}

// -------------------------
onMounted(() => {
  if (!auth) return;
  onAuthStateChanged(auth, async (user) => {
    currentUser.value = user;
    if (user) await checkWishlistAndCart();
  });
});

async function checkWishlistAndCart() {
  if (!currentUser.value) return;
  const wishlistRef = doc(db, "wishlists", `${currentUser.value.uid}_${props.product.id}`);
  const snapW = await getDoc(wishlistRef);
  isInWishlist.value = snapW.exists();

  const cartRef = doc(db, "carts", `${currentUser.value.uid}_${props.product.id}`);
  const snapC = await getDoc(cartRef);
  isInCart.value = snapC.exists();
  if (snapC.exists()) cartQuantity.value = snapC.data().quantity || 1;
}

// -------------------------
async function addToWishlist(event) {
  event.stopPropagation();
  if (!currentUser.value) return alert("Please sign in");
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
}

// -------------------------
async function addToCart(event) {
  event.stopPropagation();
  if (!currentUser.value) return alert("Please sign in");
  const cartRef = doc(db, "carts", `${currentUser.value.uid}_${props.product.id}`);
  const snap = await getDoc(cartRef);
  if (snap.exists()) {
    const newQty = (snap.data().quantity || 1) + 1;
    await setDoc(cartRef, { quantity: newQty, updatedAt: serverTimestamp() }, { merge: true });
    cartQuantity.value = newQty;
  } else {
    await setDoc(cartRef, {
      userId: currentUser.value.uid,
      productId: props.product.id,
      quantity: 1,
      createdAt: serverTimestamp(),
      productSnapshot: props.product
    });
    cartQuantity.value = 1;
  }
  isInCart.value = true;
}
</script>


<template>
  <div class="card cursor-pointer  flex flex-col" @click="goToDetails">
    <!-- Image + Wishlist Heart -->
    <div class="image relative flex-shrink-0">
      <div @click.stop="addToWishlist"
        class="heart absolute top-3 right-3 bg-[#D9D9D9] w-8 h-8 rounded-full flex justify-center items-center z-10">
        <font-awesome-icon :icon="[isInWishlist ? 'fas' : 'far', 'heart']" class="text-[#C76950] text-md" />
      </div>
      <img :src="product.image" :alt="product.name" class="w-full h-60 object-contain rounded-lg" />
    </div>

    <!-- Product Info -->
    <div class="para mt-2 flex flex-col flex-grow">
      <div class="flex justify-between items-center">
        <h3 class="font-semibold line-clamp-1">{{ product.name }}</h3>
        <div class="flex items-center gap-1 text-yellow-400 flex-shrink-0">
          <font-awesome-icon :icon="['fas', 'star']" />
          <p>4.0</p>
        </div>
      </div>

      <p class="text-gray-500 text-sm mt-1 line-clamp-1">Brand: {{ product.brand }}</p>

      <!-- Spacer to push price & cart to bottom -->
      <div class="flex-grow"></div>

      <div class="flex justify-between items-center mt-2">
        <h5 class="font-bold">{{ product.price }} LE</h5>
        <div @click.stop="addToCart"
          class="flex justify-center items-center rounded-full bg-[#C76950] p-2 w-8 h-8 cursor-pointer transform transition-transform duration-150 active:scale-90">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" class="text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: white;
  width:280px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0.1, 0.1, 0.1, 0.1);
  padding: 10px;
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-3px);
}

.heart {
  cursor: pointer;
}
</style>
