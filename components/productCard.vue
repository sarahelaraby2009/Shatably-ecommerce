<script setup>
defineProps({

  product: {
    type: Object,
    required: true,
  },

});
</script>
<template>

<template>
  <div class="card">
    <div class="image relative">
      <nuxt-link>
        <div
          class="heart absolute top-3 right-3 bg-[#D9D9D9] w-[35px] h-[35px] rounded-full flex justify-center items-center z-10"
        >
          <font-awesome-icon
            :icon="['far', 'heart']"
            class="text-[#C76950] text-lg"
          />
        </div>
        <img :src="product.image" alt="product.name">
    </div>
    <div class="para">
        <div class="flex justify-between">
            <h3>{{product.name }}</h3>
            <div>
                <font-awesome-icon :icon="['fas','star']"  class="text-yellow-200 text-s"/>
                <font-awesome-icon :icon="['fas','star']"  class="text-yellow-200 text-s"/>
                <font-awesome-icon :icon="['fas','star']"  class="text-yellow-200 text-s"/>
                <font-awesome-icon :icon="['fas','star']"  class="text-yellow-200 text-s"/>

            </div>
        </div>
      </div>

        </div>
    </div>
    
    
</div>
</template>
<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  transition: 0.2s ease;
}
.image{
    width: 100%;
    height: 300px;
    padding-bottom: 16px;
}
img{
    width: 100%;
    height: 100%;
    border-radius: 8px;
}
.para :nth-child(1){
    font-weight: 600;
}
.para :nth-child(2){
    color: rgb(94, 91, 91);;
}
.para :nth-child(3){
    font-weight: bold;
}
</style>
