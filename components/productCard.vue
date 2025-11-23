<script setup>
const props= defineProps({
    product:{
        type:Object,
        required:true,
    },
    categoryId: {
    type: String,
    required: false   // خليها false عشان الهوم بيچ لسه مش فيها IDs
  },
  subId: {
    type: String,
    required: false
  }
});
const router=useRouter()
const goToDetails=()=>{
     router.push(`/categories/${props.categoryId}/${props.subId}/${props.product.id}`);

}
</script>
<template>

<div class="card" @click="goToDetails">
    <div class="image">
        <div class="absolute left-[250px] top-[200px] bg-[#D9D9D9] w-[35px] h-[35px] rounded-[50px] flex justify-center items-center">
            <font-awesome-icon :icon="['far','heart']" class="text-[#C76950] text-lg"/>
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
       
        <p>Brand:{{ product.brand }}</p>
        <div class="flex justify-between items-center">
            <h5>{{  product.price}}</h5>
            <div class="flex justify-center items-center rounded-[50px] bg-[#C76950] p-[10px] w-[40px] h-[40px]">
                <font-awesome-icon :icon="['fas','cart-shopping']" class="text-white text-s" />
            </div>

        </div>
    </div>
    
    
</div>
</template>
<style scoped>
.card{
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    width: 307px;
    background-color: white;
    padding: 10px;
    border-radius: 12px;
    cursor: pointer;
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
