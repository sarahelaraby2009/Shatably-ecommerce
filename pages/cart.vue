<template>


<!-- Grid -->
<div class="w-full max-w-7xl mx-auto px-6 py-10 ">
</div>



<div class="grid grid-cols-1 lg:grid-cols-3 gap-8  ">
    <div>
<h2 class="font-bold pb-5 text-xl"> Order Summary</h2>

<div class="bg-white shadow rounded-2xl p-6 ">
   

    <div class=" space-y-4 ">
        <div class="flex justify-between "> <p> subtotal</p> <p> 200 LE</p> </div>
<div class="flex justify-between"> <p> shipping</p><p> 200 LE</p></div>
<div class="flex justify-between"> <p> Discount</p><p> 200 LE</p></div>
<hr></hr>
<div class="flex justify-between font-bold"> <p> Total </p><p> 200 LE</p></div>
    </div>

<button class="w-full mt-5 py-3 rounded-xl bg-[#C76950] text-white">
        Continue shopping
      </button>

      <button class="w-full mt-3 py-3 rounded-xl border">
        Check out
      </button>
</div>
    </div>
  </div>


<div class="contanier m-auto">
<div class="flex justify-between items-center px-60 py-7 ">
    
    <h1 class="font-bold text-[20px]">You may also like</h1>
    <p class="text-gray-500 flex items-center gap-1 cursor-pointer">
        See more 
        <font-awesome-icon :icon="['fas', 'angle-right']" class="text-sm" />
    </p>

</div>

<div class="flex justify-center gap-10">
    <ProductCard/>
     <ProductCard/>
      <ProductCard/>
</div>



</div>


</template>