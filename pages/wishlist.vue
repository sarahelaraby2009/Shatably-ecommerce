<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import WishlistCard from '@/components/WishlistCard.vue'; // استيراد الكارد

const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;

const items = ref([]);
const loading = ref(true);
const error = ref(null);

let unsubscribeSnapshot = null;
let unsubscribeAuth = null;

function startListeningWishlist(uid) {
  if (typeof unsubscribeSnapshot === 'function') {
    unsubscribeSnapshot();
    unsubscribeSnapshot = null;
  }

  loading.value = true;
  error.value = null;
  items.value = [];

  try {
    const q = query(
      collection(db, 'wishlists'),
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );

    unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      items.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      loading.value = false;
    }, (err) => {
      console.error('wishlist onSnapshot error:', err);
      error.value = 'Failed to load wishlist';
      loading.value = false;
    });
  } catch (err) {
    console.error('ListeningWishlist error:', err);
    error.value = 'Failed to initialize wishlist';
    loading.value = false;
  }
}

async function removeFromWishlist(docId) {
  try {
    await deleteDoc(doc(db, 'wishlists', docId));
  } catch (err) {
    console.error('removeFromWishlist error:', err);
    alert('Could not remove item. Try again.');
  }
}

onMounted(() => {
  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      startListeningWishlist(user.uid);
    } else {
      if (typeof unsubscribeSnapshot === 'function') {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }
      items.value = [];
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
    <h1 class="text-2xl font-semibold m-4">Wishlist</h1>
    <div v-if="items.length === 0" class="text-gray-600 ml-4 mt-8">
      Your wishlist is empty. <div class="mt-4">
        <nuxt-link to="/" class="bg-gray-200 px-4 py-2 rounded-md ">Back to home</nuxt-link>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <WishlistCard v-for="item in items" :key="item.id" :product="item" :on-remove="removeFromWishlist" />

    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1100px;
}
</style>
