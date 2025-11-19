<template>
  <div class="container mx-auto px-4 py-10">
   
    <h2 class="text-[36px] font-bold mb-5">Checkout</h2>

    <!-- Grid page -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

      <!--left side-->
      <div class="lg:col-span-2 space-y-3">
        <!-- Customer Info -->
        <section class="space-y-3">
          <h2 class="text-[28px] mt-4 mb-5 font-semibold">Customer info</h2>

          <!-- left side 2colum-->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="First Name" placeholder="First Name" v-model="firstName" />
            <FormInput label="Last Name" placeholder="Last Name" v-model="lastName" />
            <FormInput label="Email" placeholder="Example@gmail.com" type="email" v-model="email" />
            <FormInput label="Phone Number" placeholder="Phone Number" type="number" v-model="phone" />
          </div>
        </section>

        <!-- Shipping details -->
        <section class="space-y-3">
          <h2 class=" mt-12 text-[28px] font-semibold">Shipping details</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 pt-2 gap-4">
            <div class="md:col-span-2">
              <FormInput label="Address" placeholder="Enter your Address" v-model="address" />
            </div>

            <FormInput label="City" placeholder="City" v-model="city" />
            <FormInput label="Governorate" placeholder="Governorate" v-model="governorate" />
          </div>
        </section>
        <!--payment methods-->
       <section class="space-y-3">
  <h2 class="mt-12 pb-4 text-[28px] font-semibold">Payment Method</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div class="flex items-center gap-3 p">
      <input  type="radio"  name="payment"  value="cash" v-model="payment" class="w-5 h-5"/>
      <label class="text">Cash on Delivery</label>
    </div>

    <div class="flex items-center gap-3">
      <input  type="radio"  name="payment" value="card" v-model="payment"class="w-5 h-5"/>
      <label class="text">Credit Card</label>
    </div>
              <div class="mt-3 md:col-span-2 pb-4">
              <FormInput label="Card Number" placeholder="Enter your Card Number"  type="number" v-model="cardNumber" />
            </div>
                  <FormInput label="Expiry Date" placeholder="Expiry Date" type="date" v-model="expirydate" />
                   <FormInput label="CVV" placeholder="CVV"  type="number" v-model="CVV" />
           
  </div>
</section>


      </div>

      <!------------------------------right side -------------------------------------------------->
  <div class="lg:col-span-1">
        <div class="bg-white rounded-[16px] border border-gray-200 p-4 mb-4 relative">
          <h2 class="text-[20px] font-semibold mb-4">Order Summary</h2>

          <!-- Delete Icon -->
          <button class="absolute top-4 right-4 text-gray-600 hover:text-red-500 z-7">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <div class="flex gap-3 items-start mb-4">
            <!-- Product Image -->
            <div class="relative flex-shrink-0">
              <img src="/1.jpg" class="rounded-[12px] w-[120px] h-[100px] object-cover" />
              <button 
                @click="liked = !liked"
                class="absolute top-0 right-2 text-xl cursor-pointer select-none transition"
                :class="liked ? 'text-red-500' : 'text-black'"
              >
                {{ liked ? '♥' : '♡' }}
              </button>
            </div>

            <!-- Product Info -->
            <div class="flex-1">
              <h3 class="text-[20px] font-med mb-1">lorem lorem</h3>
              <p class="text-[16px] font-bold text-gray-900 mb-1">100 EGP</p>
              <p class="text-[12px] text-gray-600 mb-2">
                Brand: <span class="font-medium text-gray-900">Brand Name</span>
              </p>
              
              <!-- Stars -->
              <div class="flex gap-0.5 mb-3">
                <span v-for="i in 5" :key="i" class="text-gray-300 text-sm">☆</span>
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center gap-2">
                <button @click="decrease" class="w-7 h-7 rounded-full bg-[#C76950] text-white flex items-center justify-center hover:bg-[#AD563F] text-lg">
                  −
                </button>
                <span class="text-[14px] font-medium min-w-[20px] text-center">{{ count }}</span>
                <button @click="increase" class="w-7 h-7 rounded-full bg-[#C76950] text-white flex items-center justify-center hover:bg-[#AD563F] text-lg">
                  +
                </button>
              </div>
            </div>
          </div>

          <!-- Discount Code Section -->
          <div class="mb-4 pb-4 border-b border-gray-200">
            <h3 class="text-[16px] font-semibold mb-2">Discount Code</h3>
            <input 
              type="text" 
              placeholder="enter your discount code" 
              v-model="discountcode"
              class="w-full px-3 py-2 border border-gray-300 rounded-[10px] outline-none focus:border-[#C76950] text-[13px] mb-2"
            />
            <button class="px-6 py-2 bg-[#C76950] text-white rounded-[20px] hover:bg-[#AD563F] text-[14px] font-medium">
              Apply
            </button>
          </div>

          <!-- Price Summary -->
          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-[14px]">
              <span class="text-gray-900">Subtotal</span>
              <span class="font-semibold text-gray-900">200 LE</span>
            </div>
            <div class="flex justify-between text-[14px]">
              <span class="text-gray-900">Shipping</span>
              <span class="font-semibold text-gray-900">65 LE</span>
            </div>
            <div class="flex justify-between text-[14px]">
              <span class="text-gray-900">Discount</span>
              <span class="font-semibold text-gray-900">20 LE</span>
            </div>
            
            <div class="border-t border-gray-300 pt-2 flex justify-between text-[16px]">
              <span class="font-bold text-gray-900">Total</span>
              <span class="font-bold text-gray-900">235 LE</span>
            </div>
          </div>

          <!-- Place Order Button -->
          <button class="w-full py-3 bg-[#C76950] text-white rounded-[10px] hover:bg-[#AD563F] text-[15px] font-medium">
            Place order
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");

const address = ref("");
const city = ref("");
const governorate = ref("");
const payment =ref("")
const cardNumber=ref("")
const expirydate=ref("")
const CVV=ref("")
const count=ref(1)
const liked = ref(false)
const increase = () => {
  count.value++
}

const decrease = () => {
  if (count.value > 1) {
    count.value--
  }
}
</script>
