<template>

<div class="card">
    <div class="image">
        <div class="absolute left-[250px] top-[200px] bg-[#D9D9D9] w-[35px] h-[35px] rounded-[50px] flex justify-center items-center">
            <font-awesome-icon :icon="['far','heart']" class="text-[#C76950] text-lg"/>
        </div>
        <img src="/assets/Lighting.jpeg">
    </div>
    <div class="para">
        <div class="flex justify-between">
            <h3>Product Name</h3>
            <div>
                <font-awesome-icon :icon="['fas','star']"  class="text-yellow-200 text-s"/>
                <font-awesome-icon :icon="['fas','star']"  class="text-yellow-200 text-s"/>
                <font-awesome-icon :icon="['fas','star']"  class="text-yellow-200 text-s"/>
                <font-awesome-icon :icon="['fas','star']"  class="text-yellow-200 text-s"/>

            </div>
        </div>
        <p>Brand: brand</p>
        <div class="flex justify-between items-center">
            <h5>Price</h5>
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