<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50" @click="$emit('cancel')"></div>
      
      <!-- Dialog Box -->
      <div class="relative bg-white rounded-3xl p-6 min-w-[320px] max-w-md mx-4 shadow-xl">
        <p class="text-gray-700 text-center text-lg mb-6">{{ message }}</p>
        
        <div class="flex gap-3 justify-center">
          <button 
            @click="$emit('cancel')"
            class="px-6 py-2.5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button 
            @click="$emit('confirm')"
            class="px-6 py-2.5 rounded-full bg-[#C76950] text-white hover:bg-[#B55F47] transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String
})

defineEmits(['confirm', 'cancel'])
</script>