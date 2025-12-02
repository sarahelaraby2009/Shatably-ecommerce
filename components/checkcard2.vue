<template>
  <div class="w-full bg-white p-5 rounded-2xl shadow mb-5">
       
    <div class="flex gap-4 items-start relative w-full">

      <!-- Product Image -->
      <div class="relative flex-shrink-0">
  <img 
    :src="product.productSnapshot.image" 
    class="rounded-xl w-[150px] h-[120px] object-cover" 
  />

  <!-- Quantity under the image -->
    <div 
    class="absolute bottom-1 right-2 w-8 h-8 bg-[#C76950] text-white 
           rounded-full flex items-center justify-center text-[12px] font-bold shadow-lg"
  >
    {{ localQuantity }}
  </div>
</div>

      <!-- Product Info -->
      <div class="flex-1">
        <h3 class="text-[18px] font-semibold mb-1">
          {{ product.productSnapshot.name }}
        </h3>

        <p class="text-[16px] font-bold text-gray-900 mb-1">
          {{ product.productSnapshot.price }} EGP
        </p>

        <p class="text-[12px] text-gray-600 mb-2">
          Brand:
          <span class="font-medium text-gray-900">
            {{ product.productSnapshot.brand || 'Unknown' }}
          </span>
        </p>

        <!-- Stars -->
        </div>
      </div>

    </div>


</template>


<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["update-quantity", "remove"])

const localQuantity = ref(props.product.quantity)

const increase = () => {
  localQuantity.value++
  emit("update-quantity", { id: props.product.id, quantity: localQuantity.value })
}

const decrease = () => {
  if (localQuantity.value > 1) {
    localQuantity.value--
    emit("update-quantity", { id: props.product.id, quantity: localQuantity.value })
  }
}

// Sync if parent changes
watch(
  () => props.product.quantity,
  (newVal) => {
    localQuantity.value = newVal
  }
)
</script>
