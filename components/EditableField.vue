<template>
    <div class="w-full p-3 rounded[24px] flex flex-col justify-center">
        <label class="font-semibold mb-2 block"> {{ label }} </label>
        <div @click="startEdit" class="flex justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.08)]  rounded-[24px] p-1 " >
            <div  v-if="!editing" class="text-gray-500 ">{{ modelValue }}</div>
            <input @click.stop v-else @blur="saveEdit" @keyup.enter="saveEdit"  v-model="localValue" type="text" pattern="^[A-Za-z0-9 -]+$"
 class="w-full outline-none text-gray-700 " />
            <!-- <font-awesome-icon v-if="!editing" :icon="['far', 'pen-to-square']"
                class="text-gray-400 cursor-pointer ml-3"  /> -->
            <!-- <font-awesome-icon v-else :icon="['fas', 'check']"
                class="text-green-500 cursor-pointer ml-3" @click="saveEdit" /> 
                <font-awesome-icon v-if="editing"
                    :icon="['fas', 'xmark']"
                    class="text-red-500 cursor-pointer hover:text-red-600 transition" 
                    @click="cancelEdit" 
                /> -->
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';   
const props=defineProps({
    label:String,
    modelValue:String,
})
const emit=defineEmits(['update:modelValue']);
const editing=ref(false);
const localValue=ref(props.modelValue);
const startEdit=()=>{
    editing.value=true
}
const regex = /^[A-Za-z0-9 -]+$/

const saveEdit = () => {
  if (!regex.test(localValue.value)) {
    alert("Only letters, numbers and spaces allowed")
    return
  }

  emit("update:modelValue", localValue.value.trim())
  editing.value = false
}
 
const cancelEdit=()=>{
    localValue.value=props.modelValue
    editing.value=false
}
watch(()=>props.modelValue,(newVal)=>{
    localValue.value=newVal
})



</script>