<template>
  <div class="p-2 sm:p-4">
    <!-- Orders Container -->
    <div class="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      
      <!-- Order Card -->
      <div class="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border">
        <!-- Order Header -->
        <div class="bg-[#C76950] p-2.5 sm:p-4 flex justify-between items-center">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div class="min-w-0">
              <p class="text-white font-semibold text-xs sm:text-base">Order #{{ order.id }}</p>
              <p class="text-white/70 text-[10px] sm:text-sm">{{ formattedDate }}</p>
            </div>
          </div>
          
          <!-- Status Badges -->
          <span class="bg-[#EBCDC5] text-gray-700 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium flex items-center gap-1" v-if="order.status === 'pending'">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" stroke-width="2" />
              <path d="M12 7v5l3 2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ order.status }}
          </span>

          <span class="bg-[#EBCDC5] text-gray-700 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium flex items-center gap-1" v-else-if="order.status === 'Deliverd'">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
            {{ order.status }}
          </span>

          <span class="bg-[#EBCDC5] text-gray-700 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium flex items-center gap-1" v-else-if="order.status === 'confirmed'">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" stroke-width="2" />
              <path d="M9 12l2 2 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ order.status }}
          </span>

          <span class="bg-[#EBCDC5] text-gray-700 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium flex items-center gap-1" v-else-if="order.status === 'shipped'">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
            {{ order.status }}
          </span>

          <span class="bg-[#EBCDC5] text-gray-700 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium flex items-center gap-1" v-else-if="order.status === 'out for delivery'">
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
            <span class="hidden sm:inline">{{ order.status }}</span>
            <span class="sm:hidden">Out</span>
          </span>

          <span class="bg-[#EBCDC5] text-gray-700 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-medium flex items-center gap-1" v-else>
            <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            {{ order.status }}
          </span>
        </div>
        
        <!-- Order Items -->
        <div class="p-3 sm:p-5" v-for="item in order.orderItems" :key="item.productId">
          <div class="flex gap-2.5 sm:gap-4">
            <div class="w-14 h-14 sm:w-20 sm:h-20 bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0">
              <img :src="item.image" alt="Product" class="w-full h-full object-cover"/>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-gray-800 text-xs sm:text-base leading-tight">{{ item.title }}</h3>
              <p class="text-gray-400 text-[10px] sm:text-sm mt-0.5 sm:mt-1">Quantity: {{ item.quantity }}</p>
              <p class="text-gray-800 font-bold text-xs sm:text-base mt-0.5 sm:mt-1">{{ item.price }} EGP</p>
            </div>
          </div>
        </div>

        <!-- Shipping Progress -->
        <div class="px-3 sm:px-5 pb-3 sm:pb-4">
          <div class="flex items-center justify-between mb-1.5 sm:mb-2">
            <span class="text-[10px] sm:text-sm text-gray-500">Shipping Progress</span>
          </div>
          <div class="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden" v-if="order.status === 'pending'">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 15%"></div>
          </div>
          <div class="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden" v-else-if="order.status === 'confirmed'">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 35%"></div>
          </div>
          <div class="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden" v-else-if="order.status === 'shipped'">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 55%"></div>
          </div>
          <div class="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden" v-else-if="order.status === 'out for delivery'">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 85%"></div>
          </div>
          <div class="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden" v-else>
            <div class="h-full bg-[#C76950] rounded-full" style="width: 100%"></div>
          </div>
          <div class="flex justify-between mt-1.5 sm:mt-2 text-[8px] sm:text-xs text-gray-400">
            <span>Pending</span>
            <span>Confirmed</span>
            <span>Shipped</span>
            <span class="hidden sm:inline">Out for delivery</span>
            <span class="sm:hidden">Out</span>
            <span>Delivered</span>
          </div>
        </div>
        
        <!-- Order Footer -->
        <div class="bg-gray-50 px-3 sm:px-5 py-2.5 sm:py-4 flex justify-between items-center">
          <div>
            <p class="text-gray-400 text-[10px] sm:text-sm">Total Amount</p>
            <p class="text-lg sm:text-2xl font-bold text-gray-800">{{ order.subtotal }} EGP</p>
          </div>
          <button 
            class="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-[#EBCDC5] text-gray-700 rounded-full font-medium hover:bg-[#ddbdb3] text-[10px] sm:text-base whitespace-nowrap" 
            v-if="order.status === 'pending' || order.status === 'confirmed'" 
            @click="confirmCancel"
            :disabled="isDeleting"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>

    <ConfirmDialog 
      :show="showConfirmDialog"
      message="Are you sure you want to cancel this order?"
      confirm-text="Yes, Cancel"
      @confirm="cancelOrder"
      @cancel="showConfirmDialog = false"
    />
  </div>
</template>
<script setup>
const props =defineProps({
  order: {
    type: Object,
    required: true,
  }
});

import { ref , computed } from 'vue';
import { useNuxtApp } from '#app';
import { doc, deleteDoc } from 'firebase/firestore';


const emit = defineEmits(['orderCancelled']);

const { $db } = useNuxtApp();
const isDeleting = ref(false);
const isDeleted = ref(false);
const showConfirmDialog = ref(false);


const confirmCancel = () => {
  showConfirmDialog.value = true;
};

const cancelOrder = async () => {
  showConfirmDialog.value = false;
  
  try {
    isDeleting.value = true;
    
    await deleteDoc(doc($db, 'orders', props.order.id));
    
    isDeleted.value = true;
    
    emit('orderCancelled', props.order.id);
    
  } catch (error) {
    console.error('Error cancelling order:', error);
    alert('Failed to cancel order. Please try again.');
  } finally {
    isDeleting.value = false;
  }
};




const formattedDate = computed(() => {
  const createdAt = props.order.createdAt;
  
  if (!createdAt) return '';
  
  // لو Firestore Timestamp
  if (typeof createdAt.toDate === 'function') {
    const date = createdAt.toDate();
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // لو فيه seconds
  if (createdAt.seconds) {
    const date = new Date(createdAt.seconds * 1000);
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return '';
});

</script>

