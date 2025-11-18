<template>
<!-- <div class="w-[300px] p-4 shadow-lg bg-white m-5 rounded">
    <div class="w-[300px] rounded pb-6">
        <img class="w-full" src="/assets/light.jpeg">
    </div>
    <div class="w-[300px]">
        <h4 class="pb-3 font-bold">Product Name</h4>
        <p class="pb-3 text-gray-400">Brand: brand</p>
        <h5 class="font-bold">Price</h5>
    </div>
</div> -->

<div class="card">
    <div class="image">
        <img src="/assets/Lighting.jpeg">
    </div>
    <div class="para">
        <h3>Product Name</h3>
        <p>Brand: brand</p>
        <h5>Price</h5>
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