<template>

      <div class="min-h-screen ">
   

    <!-- Orders Container -->
    <div class="max-w-4xl mx-auto space-y-6">
      
     
      <!-- Order Card 2 - Shipped -->
      <div class="bg-white rounded-3xl   overflow-hidden border ">
        <!-- Order Header -->
        <div class="bg-[#C76950] p-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div>
              <p class="text-white font-semibold"> OrderID {{order.id}}</p>
              <p class="text-white/70 text-sm">{{ order.createdAt }}</p>
            </div>
          </div>
          <span class="bg-[#EBCDC5] text-black-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1" v-if="order.status==='pending'">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9" stroke-width="2" />
    <path d="M12 7v5l3 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
            {{ order.status }}
          </span>

            <span class="bg-[#EBCDC5] text-black-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1" v-else-if="order.status==='Deliverd'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
            {{ order.status }}
          </span>

             <span class="bg-[#EBCDC5] text-black-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1" v-else-if="order.status==='confirmed'">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="9" stroke-width="2" />
    <path d="M9 12l2 2 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
            {{ order.status }}
          </span>

             <span class="bg-[#EBCDC5] text-black-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1" v-else-if="order.status==='shipped'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
            {{ order.status }}
          </span>

             <span class="bg-[#EBCDC5] text-black-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1" v-else-if="order.status==='out for delivery'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
            {{ order.status }}
          </span>

             <span class="bg-[#EBCDC5] text-black-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1" v-else="order.status==='Delivered'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
            {{ order.status }}
          </span>

        </div>
        
        <!-- Order Items -->
        <div class="p-5" v-for="item in order.orderItems"
      :key="item.productId">
          <div class="flex gap-4">
            <div class="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
              <img :src="item.image" alt="Product" class="w-full h-full object-cover"/>
            </div>
            <div class="flex-1" 
            >
              <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
              <p class="text-gray-400 text-sm"> Quantity : {{item.quantity}}</p>
              <p class="text-black-500 font-bold mt-1">{{item.price}} EGP </p>
            </div>
          </div>
        </div>

        <!-- Shipping Progress -->
        <div class="px-5 pb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-500">Shipping Progress</span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden" v-if="order.status=== 'pending'">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 15%"></div>
          </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden" v-else-if="order.status=== 'confirmed'">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 35%"></div>
          </div>

           <div class="h-2 bg-gray-100 rounded-full overflow-hidden" v-else-if="order.status=== 'shipped'">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 55%"></div>
          </div>

           <div class="h-2 bg-gray-100 rounded-full overflow-hidden" v-else-if="order.status=== 'out for delivery'">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 85%"></div>
          </div>

           <div class="h-2 bg-gray-100 rounded-full overflow-hidden" v-else ="order.status=== 'Delivered'">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 100%"></div>
          </div>
          <div class="flex justify-between mt-2 text-xs text-gray-400">
            <span>Pending</span>
            <span>Confirmed</span>
            <span>Shipped</span>
            <span>Out for delivery</span>
            <span>Delivered</span>
            
          </div>
        </div>
        
        <!-- Order Footer -->
        <div class="bg-gray-50 px-5 py-4 flex justify-between items-center">
          <div>
            <p class="text-gray-400 text-sm">Total Amount</p>
            <p class="text-2xl font-bold text-gray-800">{{order.subtotal}} EGP </p>
          </div>
          <button class="px-5 py-2.5 bg-[#EBCDC5] text-black-300 rounded-full font-medium hover:bg-[#EBCDC5] " v-if="order.status=== 'pending' ||  order.status === 'confirmed'" 
        @click="cancelOrder"
        :disabled="isDeleting"  >
            
            Cancel Order 
          </button>
        </div>
      </div>

      

     

    </div>


 
    

  </div>
</template>

<script setup>
const props =defineProps({
  order: {
    type: Object,
    required: true,
  }
});

import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { doc, deleteDoc } from 'firebase/firestore';


const emit = defineEmits(['orderCancelled']);

const { $db } = useNuxtApp();
const isDeleting = ref(false);
const isDeleted = ref(false);

const cancelOrder = async () => {
  if (!confirm('Are you sure you want to cancel this order?')) return;
  
  try {
    isDeleting.value = true;
    
    //Delete the order from   Firebase
    await deleteDoc(doc($db, 'orders', props.order.id));
    
    //  hide the compoennt
    isDeleted.value = true;
    
    // give the information to the order page
    emit('orderCancelled', props.order.id);
    
  } catch (error) {
    console.error('Error cancelling order:', error);
    alert('Failed to cancel order. Please try again.');
  } finally {
    isDeleting.value = false;
  }
};


</script>

