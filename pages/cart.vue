<script setup>
import { useDelete } from "~/composables/useDelete";
import {computed}from"vue"

import { useNuxtApp } from "#app";
import { collection, query,doc,  updateDoc, where, limit, getDocs, } from "firebase/firestore";

import ProductCard from "~/components/productCard.vue";
useHead({
  title: 'Shopping Cart',
  meta: [
    {
      name: 'description',
      content: 'استعرض وادارة منتجاتك في سلة التسوق الخاصة بك بسهولة قبل إتمام عملية الشراء.'
    }
  ]
})
const { $db: db } = useNuxtApp();
const {
  cartItems,
  localCartItems,
  loading,
  error,
  removeFromCart,
} = useDelete();
const recommended=ref([])
const showAll=ref(false)
const displayProducts = computed(()=>{
if(showAll.value){
return recommended.value;

}
return recommended.value.slice(0,3)
})
//update quantity
async function updateQuantity(id, quantity) {
  if (quantity < 1) return;

  const idx = localCartItems.value.findIndex(i => i.id === id);
  if (idx !== -1) {
    localCartItems.value[idx].quantity = quantity;
  }

  const cartRef = doc(db, "carts", id);
  await updateDoc(cartRef, { quantity });
}
///////////////product ////
watch(
  () => cartItems.value,
  async (items) => {
    // 
    if (!items || items.length === 0) return;

    await loadingProducts(items);
  },
  { immediate: true }
);
async function loadingProducts(items) {
  try {
    const productsRef = collection(db, "products");

    const cartProducts = items
      .map(i => i.productSnapshot)
      .filter(Boolean);

    if (!cartProducts.length) return;
      const cartProductIds = cartProducts.map(p => p.id);

    // نطلع  (brand + category)
    const pairs = cartProducts.map(p => ({
      brand: p.brand || null,
      category: p.category
    }));

    const snap = await getDocs(productsRef);

    recommended.value = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
   .filter(p => {
  // نشيل المنتج لو موجود في الكارت
  if (cartProductIds.includes(p.id)) return false;
  

  return pairs.some(cp => {
    if (cp.brand && p.brand) {
      return (
        p.brand === cp.brand &&
        p.category === cp.category
      );
    }

    if (!cp.brand) {
      return p.category === cp.category;
    }

    return false;
  });
});
  } catch (err) {
    console.log("Error loading recommended:", err);
  }
}
/////////////progressbar 
const progress = computed(() => {
  return Math.min(localCartItems.value.length * 2, 100);
});
////////////////////subtotal
const subtotal=computed(()=>{
 const total = localCartItems.value.reduce(
     (acc, item) =>
      acc + (item.productSnapshot?.price || 0) * (item.quantity || 1),
    0
  );
  return Number(total.toFixed(2))

});
// 5% Discount
// Shipping
const shipping = 0

// Total after discount

const totalAfterDiscount = computed(() =>
 Number(( subtotal.value  + shipping).toFixed(2))
);
</script>
<!------------------------------------------------------------>
<template>
<div class="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
  <!--------- no card items ---------------->
  <div v-if="!loading&&localCartItems.length === 0" class="col-span-full  pt-5 min-h-[70vh]-screen flex items-center justify-center text-gray-600">
     <div class="text-center"> 
    <div class="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <svg class="w-12 h-12 text-[#C76950]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    </div>
    <h3 class=" text-[18px] lg:text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h3>
    <p class="text-gray-500 mb-6"> Looks like you haven’t added anything to your cart yet.<br></br>
      Start shopping to see your orders here</p>
      <NuxtLink to="/">
       <button class="px-14 py-3 bg-[#C76950] text-white rounded-full font-semibold hover:bg-[#B55F47] transition-colors">
      Start Shopping
    </button>
  </NuxtLink>
     </div>
      </div>
     <div class="lg:col-span-2 justify-center gap-20">

    <!-- LEFT SIDE: Cart Products -->
    <div v-if="localCartItems.length > 0" class="w-full max-w-[530px] h-auto pt-10">
   
        <!-- Progress Bar Section -->
     <div class="mb-6 relative w-full">

  <!-- Background bar -->
  <div class="bg-gray-200 rounded-full h-4 w-full overflow-hidden">
    <div
      class="h-4 rounded-full transition-all duration-300"
      :style="{ width: progress + '%', backgroundColor: '#C76950' }"
    ></div>
  </div>

  <!-- 🔥 Icon that moves -->
  <font-awesome-icon
    icon="fa-solid fa-cart-plus"
    class="absolute -top-3 text-2xl transition-all duration-300"
    :style="{ left: progress + '%' }"
    style="color:#b2441f; transform: translateX(-50%);"
  />
          <p class="text-sm text-gray-600 mt-2">
            Items: {{ localCartItems.length }}  
          </p>
        </div>
       <h2 class="font-bold pb-5  text-[18px] lg:text-xl">My cart</h2>
      <div v-if="loading" class="text-center py-10">Loading cart...</div>
    

      <div v-else class="space-y-4">
        <checkcard
          v-for="item in localCartItems"
          :key="item.id"
          :product="item.productSnapshot"
          :cart-id="item.id"
          :quantity="item.quantity"
            @update-quantity="updateQuantity"
          @remove="removeFromCart"
        />
      </div>
    </div>
    </div>

    <!-- RIGHT SIDE: Order Summary -->
    <div   v-if="localCartItems.length > 0" class="lg:col-span-1 w-full pt-[19px] lg:pt-[100px]">
      <h2 class="font-bold pb-5  text-[18px] lg:text-xl">Order Summary</h2>

      <div class="bg-white shadow rounded-2xl p-6">
        <div class="space-y-4">
        <div class="flex justify-between">
          <p class="text-[16px] lg:text-base">Subtotal:</p>
          <p class="text-[16px] lg:text-base">{{ subtotal }} LE</p>
        </div>
        <!-- <div class="flex justify-between">
          <p>Discount (5%):</p>
           <p>-{{ discount }} LE</p>
        </div> -->

        <div class="flex justify-between ">
          <p class="text-[16px] lg:text-base">Shipping:</p>
          <p class="text-[16px] lg:text-base">{{ shipping }} LE</p>
        </div>

           
            
          </div>


          <hr class="mt-5"/>


           <!---مجموع-->   
          <div class="flex justify-between font-bold mt-3 ">
            <p class="text-[16px] lg:text-base">Total</p>
            <p class="text-[16px] lg:text-base"> {{  totalAfterDiscount}} LE</p>
          </div>
        </div>
       
        <NuxtLink to="/">
        <button class="w-full mt-5 py-3 rounded-[22px] bg-[#C76950] text-white">
           Continue shopping
        </button>
        </NuxtLink>
        
       <NuxtLink to="/checkout">
        <button class="w-full mt-3 py-3 rounded-[22px] border">
          Check out
        </button>
        </NuxtLink>

      </div>


  </div>

  <!-- You may also like -->
  <div  v-if="localCartItems.length > 0" class="mt-10  gap-3 px-10">
    <div class="flex justify-between items-center px-50 py-7">
      <h1 class="font-bold text-[20px] text-[#3E3E3E]">You may also like</h1>
       <!-- SEE MORE BUTTON -->
  <div v-if="recommended.length > 3" class="mt-6">
    <button
      class="text-[#8D8D8D] font-semibold hover:underline"
      @click="showAll = !showAll"
    >
      {{ showAll ? "See less" : "See More" }}
    </button>
    </div>
    </div>

     <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-10 mb-5 place-items-center">

    <ProductCard
      v-for="item in displayProducts"
      :key="item.id"
      :product="item"
      :categoryId="item.categoryId"
      :subId="item.subId"
    />
</div>
  </div>


</template>

<style scoped>
.container {
  max-width: 1100px;
}
</style>
