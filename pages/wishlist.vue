<script setup>
/*
  pages/wishlist.vue
  - يعرض wishlist الخاصة باليوزر المسجّل دخول
  - يستخدم onAuthStateChanged للانتظار حتى يسجل اليوزر دخول
  - يستخدم onSnapshot لجلب التحديثات real-time
  - يسمح بإزالة عنصر من الwishlist
*/

import { ref, onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;

const items = ref([]);        // مصفوفة العناصر في الwishlist
const loading = ref(true);    // حالة تحميل
const error = ref(null);

let unsubscribeSnapshot = null;
let unsubscribeAuth = null;

function startListeningWishlist(uid) {
  // فك الاشتباك القديم لو موجود
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

    // onSnapshot -> real-time updates
    unsubscribeSnapshot = onSnapshot(
      q,
      (snapshot) => {
        items.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        loading.value = false;
      },
      (err) => {
        console.error('wishlist onSnapshot error:', err);
        error.value = 'Failed to load wishlist';
        loading.value = false;
      }
    );
  } catch (err) {
    console.error('startListeningWishlist error:', err);
    error.value = 'Failed to initialize wishlist';
    loading.value = false;
  }
}

async function removeFromWishlist(docId) {
  try {
    // إزالة الـ doc من collection wishlists
    await deleteDoc(doc(db, 'wishlists', docId));
    // items ستتحدّث أوتوماتيك من onSnapshot
  } catch (err) {
    console.error('removeFromWishlist error:', err);
    alert('Could not remove item. Try again.');
  }
}

onMounted(() => {
  // راقب حالة الauth — لو اليوزر دخل نبتدي نستقبل الwishlist
  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      startListeningWishlist(user.uid);
    } else {
      // لم يُسجّل الدخول -> أفرغ العناصر و أوقف الاستماع
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
    <h1 class="text-2xl font-semibold mb-4">قائمة المفضلات (Wishlist)</h1>

    <div v-if="loading" class="text-gray-500">جاري التحميل ...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="items.length === 0" class="text-gray-600">
      لا توجد منتجات في المفضلات حالياً.
      <div class="mt-3">
        <nuxt-link to="/" class="text-blue-600 underline">عودة للمتجر</nuxt-link>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in items"
        :key="item.id"
        class="bg-white rounded-lg shadow p-4 flex flex-col"
      >
        <div class="w-full h-48 overflow-hidden rounded">
          <img
            :src="item.productSnapshot?.image || '/placeholder.png'"
            :alt="item.productSnapshot?.name || 'product'"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="mt-3 flex-1">
          <h3 class="text-lg font-medium">
            {{ item.productSnapshot?.name || 'Unnamed product' }}
          </h3>
          <p class="text-sm text-gray-500 mt-1">
            {{ item.productSnapshot?.brand || '' }}
          </p>
          <p class="text-gray-800 font-semibold mt-2">
            {{ item.productSnapshot?.price || '' }}
          </p>
        </div>

        <div class="mt-4 flex items-center justify-between gap-2">
          <nuxt-link
            :to="`/products/${item.productSnapshot?.id}`"
            class="px-3 py-2 border rounded text-sm"
          >
            View
          </nuxt-link>

          <button
            @click="removeFromWishlist(item.id)"
            class="px-3 py-2 rounded bg-red-500 text-white text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* لو حبيتي تزودّي ستايل بسيط */
.container {
  max-width: 1100px;
}
</style>
