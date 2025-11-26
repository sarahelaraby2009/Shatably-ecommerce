<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;

const cartItems = ref([]);
const loading = ref(true);
const error = ref(null);

let unsubscribeSnapshot = null;
let unsubscribeAuth = null;

function startListeningCart(uid) {
  if (typeof unsubscribeSnapshot === 'function') {
    unsubscribeSnapshot();
    unsubscribeSnapshot = null;
  }

  loading.value = true;
  error.value = null;
  cartItems.value = [];

  try {
    const q = query(
      collection(db, 'carts'),
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );

    unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      cartItems.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      loading.value = false;
    }, (err) => {
      console.error('Cart onSnapshot error:', err);
      error.value = 'Failed to load cart';
      loading.value = false;
    });
  } catch (err) {
    console.error('ListeningCart error:', err);
    error.value = 'Failed to initialize cart';
    loading.value = false;
  }
}

async function removeFromCart(docId) {
  try {
    await deleteDoc(doc(db, 'carts', docId));
  } catch (err) {
    console.error('removeFromCart error:', err);
    alert('Could not remove item. Try again.');
  }
}

onMounted(() => {
  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      startListeningCart(user.uid);
    } else {
      if (typeof unsubscribeSnapshot === 'function') {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }
      cartItems.value = [];
      loading.value = false;
    }
  });
});

onUnmounted(() => {
  if (typeof unsubscribeSnapshot === 'function') unsubscribeSnapshot();
  if (typeof unsubscribeAuth === 'function') unsubscribeAuth();
});
</script>

<template>
<div class="container mx-auto p-4">

  <div class="flex justify-center gap-20">

    <!-- LEFT SIDE: Cart Products -->
    <div class="w-[530px] h-auto pt-10">
      <div v-if="loading" class="text-center py-10">Loading cart...</div>
      <div v-else-if="cartItems.length === 0" class="text-gray-600 mt-8">
        لا توجد منتجات في السلة حالياً.
      </div>

      <div v-else class="space-y-4">
        <checkcard
          v-for="item in cartItems"
          :key="item.id"
          :product="item.productSnapshot"
          :cart-id="item.id"
          @remove="removeFromCart(item.id)"
        />
      </div>
    </div>

    <!-- RIGHT SIDE: Order Summary -->
    <div class="lg:col-span-1 w-[430px] pt-10">
      <h2 class="font-bold pb-5 text-xl">Order Summary</h2>

      <div class="bg-white shadow rounded-2xl p-6">
        <div class="space-y-4">
          <div class="flex justify-between">
            <p>Subtotal</p> 
            <p>{{ cartItems.reduce((acc, item) => acc + (item.productSnapshot?.price || 0) * (item.quantity || 1), 0) }} LE</p>
          </div>

          <div class="flex justify-between">
            <p>Shipping</p><p>200 LE</p>
          </div>

          <hr />

          <div class="flex justify-between font-bold">
            <p>Total</p>
            <p>{{ cartItems.reduce((acc, item) => acc + (item.productSnapshot?.price || 0) * (item.quantity || 1), 0) + 200 }} LE</p>
          </div>
        </div>

        <button class="w-full mt-5 py-3 rounded-xl bg-[#C76950] text-white">
          Continue shopping
        </button>

        <button class="w-full mt-3 py-3 rounded-xl border">
          Check out
        </button>

      </div>
    </div>

  </div>

  <!-- You may also like -->
  <div class="mt-10">
    <div class="flex justify-between items-center px-60 py-7">
      <h1 class="font-bold text-[20px] text-[#3E3E3E]">You may also like</h1>
      <p class="text-gray-500 flex items-center gap-1 cursor-pointer">
          See more 
          <font-awesome-icon :icon="['fas', 'angle-right']" class="text-sm" />
      </p>
    </div>

    <div class="flex justify-center gap-10">
      <!-- هنا ممكن تحطي ProductCard components -->
    </div>
  </div>

</div>
</template>

<style scoped>
.container {
  max-width: 1100px;
}
</style>
