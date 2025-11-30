<template>

      <div class="min-h-screen ">
    <!-- Header -->
    <div class="max-w-4xl mx-auto mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
      <p class="text-gray-500">Track and manage your orders</p>
    </div>

    <!-- Orders Container -->
    <div class="max-w-4xl mx-auto space-y-6">
      
     
      <!-- Order Card 2 - Shipped -->
      <div class="bg-white rounded-3xl shadow-lg shadow-blue-100/50 overflow-hidden border border-blue-100 hover:shadow-xl transition-shadow duration-300">
        <!-- Order Header -->
        <div class="bg-[#C76950] p-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              </svg>
            </div>
            <div>
              <p class="text-white font-semibold">Order #ORD-2024-002</p>
              <p class="text-white/70 text-sm">25 November 2025</p>
            </div>
          </div>
          <span class="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
            </svg>
            Shipped
          </span>
        </div>
        
        <!-- Order Items -->
        <div class="p-5">
          <div class="flex gap-4">
            <div class="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
              <img src="https://via.placeholder.com/80" alt="Product" class="w-full h-full object-cover"/>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">Premium Wooden Door</h3>
              <p class="text-gray-400 text-sm">WoodCraft • Qty: 1</p>
              <p class="text-blue-500 font-bold mt-1">EGP 5,500</p>
            </div>
          </div>
        </div>

        <!-- Shipping Progress -->
        <div class="px-5 pb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-500">Shipping Progress</span>
            <span class="text-sm text-blue-500 font-medium">Out for delivery</span>
          </div>
          <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-[#C76950] rounded-full" style="width: 45%"></div>
          </div>
          <div class="flex justify-between mt-2 text-xs text-gray-400">
            <span>Confirmed</span>
            <span>Shipped</span>
            <span>Out for delivery</span>
            <span>Delivered</span>
            
          </div>
        </div>
        
        <!-- Order Footer -->
        <div class="bg-gray-50 px-5 py-4 flex justify-between items-center">
          <div>
            <p class="text-gray-400 text-sm">Total Amount</p>
            <p class="text-2xl font-bold text-gray-800">EGP 5,500</p>
          </div>
          <button class="px-5 py-2.5 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Track Package
          </button>
        </div>
      </div>

      

     

    </div>


 <!--  when no orders -->
      
       <div class="bg-white rounded-3xl shadow-lg p-12 text-center">
        <div class="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-[#C76950]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
        <p class="text-gray-500 mb-6">Start shopping to see your orders here</p>
        <button class="px-8 py-3 bg-[#C76950] text-white rounded-full font-semibold hover:bg-[#B55F47] transition-colors">
          Start Shopping
        </button>
      </div>
    

  </div>
</template>