<script setup>
import { useDelete } from "~/composables/useDelete";
import {computed}from"vue"

import { useNuxtApp } from "#app";
import { collection, query, where, limit, getDocs, } from "firebase/firestore";

import ProductCard from "~/components/productCard.vue";
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
async function updateQuantity({ id, quantity }) {
  const idx = localCartItems.value.findIndex(i => i.id === id);
  if (idx !== -1) {
    localCartItems.value[idx].quantity = quantity;
  }
     const cartRef = doc(db, "carts", id);
  await updateDoc(cartRef, { quantity });
}
///////////////product ////
watch(
  ()=>cartItems.value,
  async (items)=>{
    if(!items.length)
    return;
  const firstItem=items[0].productSnapshot;
    await loadingProducts(firstItem);
      
  },
  {immediate:true}
);
async function  loadingProducts(product){
   try {
    const productsRef = collection(db, "products");

    const q = query(
      productsRef,
      where("brand", "==", product.brand),
      limit(6)
    );

    const snap = await getDocs(q);

    recommended.value = snap.docs
      .filter((doc) => doc.id !== product.id)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

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
  return localCartItems.value.reduce(
     (acc, item) =>
      acc + (item.productSnapshot?.price || 0) * (item.quantity || 1),
    0
  )
});
// 5% Discount
// Shipping
const shipping = 100;

// Total after discount

const totalAfterDiscount = computed(() =>
  subtotal.value  + shipping
);
</script>

<template>
<div class="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

  <div class="lg:col-span-2 justify-center gap-20">

    <!-- LEFT SIDE: Cart Products -->
    <div class="w-[530px] h-auto pt-10">
 
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
      <div v-if="loading" class="text-center py-10">Loading cart...</div>
      <div v-else-if="localCartItems.length === 0" class="text-gray-600 mt-8">
        لا توجد منتجات في السلة حالياً.
      </div>

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

    <!-- RIGHT SIDE: Order Summary -->
    <div class="lg:col-span-1 w-[430px] pt-10">
      <h2 class="font-bold pb-5 text-xl">Order Summary</h2>

      <div class="bg-white shadow rounded-2xl p-6">
        <div class="space-y-4">
        <div class="flex justify-between">
          <p>Subtotal:</p>
          <p>{{ subtotal }} LE</p>
        </div>
        <!-- <div class="flex justify-between">
          <p>Discount (5%):</p>
           <p>-{{ discount }} LE</p>
        </div> -->

        <div class="flex justify-between ">
          <p>Shipping:</p>
          <p>{{ shipping }} LE</p>
        </div>

           
            
          </div>


          <hr class="mt-5"/>


           <!---مجموع-->   
          <div class="flex justify-between font-bold mt-3">
            <p>Total</p>
            <p> {{  totalAfterDiscount}} LE</p>
          </div>
        </div>
       
        <NuxtLink to="/">
        <button class="w-full mt-5 py-3 rounded-xl bg-[#C76950] text-white">
           Continue shopping
        </button>
        </NuxtLink>
        
       <NuxtLink to="/checkout">
        <button class="w-full mt-3 py-3 rounded-xl border">
          Check out
        </button>
        </NuxtLink>

      </div>
    </div>

  </div>

  <!-- You may also like -->
  <div class="mt-10  gap-3 px-10">
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
