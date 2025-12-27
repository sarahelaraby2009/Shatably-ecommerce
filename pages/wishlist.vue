<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useNuxtApp } from "#app";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import WishlistCard from "@/components/WishlistCard.vue"; // استيراد الكارد
useHead({
  title: "Wishlist | MyProject",
  meta: [
    {
      name: "description",
      content:
        "استعرض وادارة قائمة الأمنيات الخاصة بك بسهولة واختر ما يناسبك من منتجات.",
    },
  ],
});

const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;

const items = ref([]);
const loading = ref(true);
const error = ref(null);

let unsubscribeSnapshot = null;
let unsubscribeAuth = null;

function startListeningWishlist(uid) {
  if (typeof unsubscribeSnapshot === "function") {
    unsubscribeSnapshot();
    unsubscribeSnapshot = null;
  }

  loading.value = true;
  error.value = null;
  items.value = [];

  try {
    const q = query(
      collection(db, "wishlists"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    unsubscribeSnapshot = onSnapshot(
      q,
      (snapshot) => {
        items.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        loading.value = false;
      },
      (err) => {
        console.error("wishlist onSnapshot error:", err);
        error.value = "Failed to load wishlist";
        loading.value = false;
      }
    );
  } catch (err) {
    console.error("ListeningWishlist error:", err);
    error.value = "Failed to initialize wishlist";
    loading.value = false;
  }
}

async function removeFromWishlist(docId) {
  try {
    await deleteDoc(doc(db, "wishlists", docId));
  } catch (err) {
    console.error("removeFromWishlist error:", err);
    alert("Could not remove item. Try again.");
  }
}

onMounted(() => {
  unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      startListeningWishlist(user.uid);
    } else {
      if (typeof unsubscribeSnapshot === "function") {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }
      items.value = [];
      loading.value = false;
    }
  });
});

onUnmounted(() => {
  if (typeof unsubscribeSnapshot === "function") unsubscribeSnapshot();
  if (typeof unsubscribeAuth === "function") unsubscribeAuth();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col justify-center items-center pt-20">
  <div class="flex justify-center items-center rounded-full bg-[#FFEDD5] w-[80px] h-[80px] mb-6">
    <font-awesome-icon :icon="['fab', 'gratipay']"
     class="text-[40px] text-[#C76950]" />
  </div>
  <div v-if="items.length === 0" class="text-center max-w-md">
    <h2 class="font-semibold text-[24px] text-black mb-2">
      No Items in Your Wishlist
    </h2>
    <p class="text-[14px] text-[#8C8C8C] mb-6">
      Save your favorite items and come back anytime.
    </p>
    <nuxt-link to="/">
      <button
        class="bg-[#C76950] text-white px-8 py-3 rounded-full w-full text-[16px] font-medium hover:bg-[#B85840] transition"
      >
        Start shopping
      </button>
    </nuxt-link>
  </div>
</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <WishlistCard
        v-for="item in items"
        :key="item.id"
        :product="item"
        :on-remove="removeFromWishlist"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1100px;
}
</style>
