<template>
  <div class="bg-white rounded-lg shadow p-4 flex flex-col">
    <div class="w-full h-48 overflow-hidden rounded">
      <img
        :src="product.productSnapshot?.image || '/placeholder.png'"
        :alt="product.productSnapshot?.name || 'product'"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="mt-3 flex-1">
      <h3 class="text-lg font-medium">{{ product.productSnapshot?.name || 'Unnamed product' }}</h3>
      <p class="text-sm text-gray-500 mt-1">{{ product.productSnapshot?.brand || '' }}</p>
      <p class="text-gray-800 font-semibold mt-2">{{ product.productSnapshot?.price || '' }}</p>
    </div>

    <div class="mt-4 flex items-center justify-between gap-2">
      <nuxt-link :to="`/products/${product.productSnapshot?.id}`" class="px-3 py-2 border rounded text-sm">
        View
      </nuxt-link>

      <button @click="onRemove(product.id)" class="px-3 py-2 rounded bg-red-500 text-white text-sm">
        Remove
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  onRemove: {
    type: Function,
    required: true
  }
})
</script>
