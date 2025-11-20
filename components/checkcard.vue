<template>
  <div class="w-full bg-white p-5 rounded-2xl shadow mb-5">

    <div class="flex gap-4 items-start relative w-full">

      <!-- Delete button -->
      <button class="absolute top-4 right-4 text-gray-600 hover:text-red-500 z-10">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      <!-- Product Image -->
      <div class="relative flex-shrink-0">
        <img :src="product.image" class="rounded-xl w-[150px] h-[120px] object-cover" />

        <button @click="liked = !liked"
          class="absolute top-2 right-2 text-xl cursor-pointer transition select-none"
          :class="liked ? 'text-red-500' : 'text-black'">
          {{ liked ? '♥' : '♡' }}
        </button>
      </div>

      <!-- Product Info -->
      <div class="flex-1">
        <h3 class="text-[18px] font-semibold mb-1">{{ product.name }}</h3>

        <p class="text-[16px] font-bold text-gray-900 mb-1">{{ product.price }} EGP</p>

        <p class="text-[12px] text-gray-600 mb-2">
          Brand:
          <span class="font-medium text-gray-900">
            {{ product.brand }}
          </span>
        </p>

        <!-- Stars -->
        <div class="flex gap-0.5 mb-3">
          <span v-for="i in 5" :key="i" class="text-gray-300 text-sm">☆</span>
        </div>

        <!-- Quantity Controls -->
        <div class="flex items-center gap-3">
          <button @click="decrease"
            class="w-7 h-7 bg-[#C76950] shadow rounded-full text-[20px] text-white flex items-center justify-center hover:bg-[#AD563F]">
            −
          </button>

          <span class="w-8 h-8 flex items-center justify-center bg-white rounded-full text-[14px] font-medium shadow">
            {{ count }}
          </span>

          <button @click="increase"
            class="w-7 h-7 bg-[#C76950] shadow rounded-full text-white flex items-center justify-center hover:bg-[#AD563F] text-[20px]">
            +
          </button>
        </div>
      </div>

    </div>

  </div>
</template>


<script setup>
const props = defineProps({
  product: {
    type: Object,
    default: () => ({
      name: 'lorem lorem',
      price: 100,
      brand: 'Brand Name',
      image: '/1.jpg'
    })
  },

})
const liked = ref(false)
const count=ref(1)
const increase = () => {
  count.value++
}

const decrease = () => {
  if (count.value > 1) {
    count.value--
  }
}

</script>