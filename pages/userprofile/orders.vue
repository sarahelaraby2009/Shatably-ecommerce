<template>
  <div class="max-w-4xl mx-auto mb-8">
    <h1 class="font-bold text-xl">My Orders</h1>
    <p>Track and manage your orders</p>
  </div>

  <!-- when no orders -->
  <div class="p-12 text-center" v-if="orders.length === 0">
    <div class="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg class="w-12 h-12 text-[#C76950]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    </div>
    <h3 class="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
    <p class="text-gray-500 mb-6">Start shopping to see your orders here</p>

    <NuxtLink to="/categories">
      <button class="px-8 py-3 bg-[#C76950] text-white rounded-full font-semibold hover:bg-[#B55F47] transition-colors">
      Start Shopping
    </button>
    </NuxtLink>
    
  </div>

  <ordercard 
    v-for="order in orders"
    :key="order.id"
    :order="order"
    @order-cancelled="handleOrderCancelled"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
useHead({
  title: 'User Orders',
  meta: [
    {
      name: 'description',
      content: 'تعقب وادارة طلباتك بسهولة من خلال صفحة الطلبات الخاصة بك.'
    }
  ]
})

const orders = ref([]);
const loading = ref(true);

const { $db } = useNuxtApp();

const fetchOrders = async (uid) => {
  const q = query(
    collection($db, "orders"),
    where("userId", "==", uid)
  );

  const snap = await getDocs(q);

  orders.value = snap.docs.map((doc) => ({
    id: doc.id,
   ...doc.data({ serverTimestamps: 'estimate' }),
  }));

  loading.value = false;
};

//  This is the function that will immediately remove the order from the list
const handleOrderCancelled = (orderId) => {
  orders.value = orders.value.filter(order => order.id !== orderId);
};

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      fetchOrders(user.uid);
    }
  });
});
</script>