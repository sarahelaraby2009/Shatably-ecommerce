<template>


<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10 pr-20 pb-10">

  <!-- LEFT SIDE  -->
  <div class="lg:col-span-2">

  </div>

  <!-- RIGHT -->
  <div class="lg:col-span-1">
    
    <h2 class="font-bold pb-5 text-xl">Order Summary</h2>

    <div class="bg-white shadow rounded-2xl p-6">

      <div class="space-y-4">
        <div class="flex justify-between">
          <p>Subtotal</p> <p>200 LE</p>
        </div>

        <div class="flex justify-between">
          <p>Shipping</p><p>200 LE</p>
        </div>

        

        <hr />

        <div class="flex justify-between font-bold">
          <p>Total</p><p>200 LE</p>
        </div>
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