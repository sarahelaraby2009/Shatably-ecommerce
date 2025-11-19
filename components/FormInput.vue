<template>
  <div class="flex flex-col gap-2">
    <label class="text">{{ label }}</label>

    <input
      :type="type"
      :placeholder="placeholder"
      class="input"
      v-model="model"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  placeholder: String,
  type: { type: String, default: "text" },
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
</style>
