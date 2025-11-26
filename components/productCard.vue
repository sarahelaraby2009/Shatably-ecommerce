<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp, useRouter } from "#app";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// --------------------------------------------------
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
// --------------------------------
const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;

// ------------------------------------------------
const isInWishlist = ref(false);
const isLoading = ref(false);
const isInCart = ref(false);
const cartQuantity = ref(0);
const isCartLoading = ref(false);

const currentUser = ref(null);
// --------------------------------------
const goToDetails = () => {
  router.push(`/category/${props.categoryId}/${props.subcategoryId}/${props.product.id}`);
};
// -----------------------------------------
onMounted(() => {
  if (!auth) return;
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user;
    if (user) checkWishlistAndCart();
  });
});
// ------------------------------------------
async function checkWishlistAndCart() {
  try {
    const wishlistDocId = `${currentUser.value.uid}_${props.product.id}`;
    const wishlistRef = doc(db, "wishlists", wishlistDocId);
    const snapW = await getDoc(wishlistRef);
    isInWishlist.value = snapW.exists();
  } catch (e) {
    console.warn("wishlist check failed", e);
  }

  try {
    const cartDocId = `${currentUser.value.uid}_${props.product.id}`;
    const cartRef = doc(db, "carts", cartDocId);
    const snap = await getDoc(cartRef);
    isInCart.value = snap.exists();
    if (snap.exists()) cartQuantity.value = snap.data().quantity || 1;
  } catch (e) {
    console.warn("cart check failed", e);
  }
}
// -------------------------------------------
async function addToWishlist(event) {
  event.stopPropagation(); // extra safety
  const user = currentUser.value;
  if (!user) {
    alert("Please sign in to save to wishlist");
    return;
  }
  const wishlistDocId = `${user.uid}_${props.product.id}`;
  const wishlistDocRef = doc(db, "wishlists", wishlistDocId);

  isLoading.value = true;
  try {
    const snap = await getDoc(wishlistDocRef);
    if (snap.exists()) {
      await deleteDoc(wishlistDocRef);
      isInWishlist.value = false;
    } else {
      await setDoc(wishlistDocRef, {
        userId: user.uid,
        productId: props.product.id,
        createdAt: serverTimestamp(),
        productSnapshot: {
          id: props.product.id,
          name: props.product.name,
          price: props.product.price,
          image: props.product.image,
          brand: props.product.brand,
        },
      });
      isInWishlist.value = true;
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
}
// -------------------------------------------
async function addToCart(event) {
  event.stopPropagation(); // extra safety
  const user = currentUser.value;
  if (!user) {
    alert("Please sign in to add to cart");
    return;
  }
  const cartDocId = `${user.uid}_${props.product.id}`;
  const cartRef = doc(db, "carts", cartDocId);
  isCartLoading.value = true;

  try {
    const snap = await getDoc(cartRef);
    if (snap.exists()) {
      const currentQty = snap.data().quantity || 1;
      const newQty = currentQty + 1;
      await setDoc(
        cartRef,
        {
          quantity: newQty,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      cartQuantity.value = newQty;
      isInCart.value = true;
    } else {
      await setDoc(cartRef, {
        userId: user.uid,
        productId: props.product.id,
        quantity: 1,
        createdAt: serverTimestamp(),
        productSnapshot: {
          id: props.product.id,
          name: props.product.name,
          image: props.product.image,
          price: props.product.price,
          brand: props.product.brand,
        },
      });
      cartQuantity.value = 1;
      isInCart.value = true;
    }
  } catch (err) {
    console.error("addToCart error", err);
  } finally {
    isCartLoading.value = false;
  }
}
// ------------------------------------------------
// const goToDetails = function(){
//   router.push({
//     name: 'category-id-subtId-productId', // Nuxt يولد الاسم تلقائياً حسب ترتيب الصفحات
//     params: {
//       id: props.product.categoryId,       // لازم يكون موجود في البيانات
//       subtId: props.product.subcategoryId, 
//       productId: props.product.id
//     }
//   });
// };

</script>
<!------------------------------------------------- -->
<template>
  <div class="card cursor-pointer" @click="goToDetails">
    <div class="image relative">
      <div
        @click.stop="addToWishlist"
        class="heart absolute top-3 right-3 bg-[#D9D9D9] w-[35px] h-[35px] rounded-full flex justify-center items-center z-10"
      >
        <font-awesome-icon
          :icon="[isInWishlist ? 'fas' : 'far', 'heart']"
          class="text-[#C76950] text-lg"
        />
      </div>

      <img :src="product.image" :alt="product.name" />
    </div>

    <div class="para">
      <div class="flex justify-between items-center">
        <h3>{{ product.name }}</h3>
        <div class="flex justify-center items-center">
          <font-awesome-icon
            :icon="['fas', 'star']"
            class="text-yellow-200 text-s"
          />
          <p>4.0</p>
        </div>
      </div>

      <p>{{ product.description }}</p>
      <p>Brand: {{ product.brand }}</p>

      <div class="flex justify-between items-center">
        <h5>{{ product.price }}</h5>
        <div
          @click.stop="addToCart"
          class="flex justify-center items-center rounded-full bg-[#C76950] p-[10px] w-[40px] h-[40px] cursor-pointer transform transition-transform duration-150 active:scale-90"
        >
          <font-awesome-icon
            :icon="['fas', 'cart-shopping']"
            class="text-white text-s"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  transition: 0.2s ease;
}
.card:hover {
  transform: translateY(-3px);
}
.image {
  width: 100%;
  height: 260px;
  position: relative;
}
.image img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}
.para :nth-child(1) { font-weight: 600; }
.para :nth-child(2) { color: rgb(94, 91, 91); }
.para :nth-child(3) { font-weight: bold; }
.heart { cursor: pointer; }
</style>