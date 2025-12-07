<template>
  <div class="flex flex-col gap-2">
    <label class="text">{{ label }}</label>
       <!-- Select -->
    <select
      v-if="type === 'select'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border rounded-lg px-3 py-2 w-full"
      required
    >
      <option disabled value="" class="placeholder-option">Select {{ label }}</option>
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>

    <!-- Input -->
    <input
      v-else
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border rounded-lg px-3 py-2 w-full"
      required
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  placeholder: String,
  type: { type: String, default: "text" },
    options: {
    type: Array,
    default: () => []
  },

  modelValue: String
})

const emit = defineEmits(["update:modelValue"])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value)
})
</script>

<style>
.input{
  border:1px solid #CFCFCF ;
  border-radius: 24px;
  padding: 14px;
}
.text{
  font-size: 24px;
}

select:invalid {
  color: #959494;
}


select option {
  color: #000;
}


.placeholder-option {
  color: #959494;
}

@media (max-width: 768px) {
  .text {
    font-size: 18px; /* موبايل */
  }

  input,
  select {
    font-size: 18px;
  }
    input::placeholder {
    font-size: 16px; /* placeholder */

  }

  select:invalid {
    font-size: 16px; /* Select placeholder */
  }
}
</style>
