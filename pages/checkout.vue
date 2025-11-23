<template>
  <div class="container mx-auto px-4 py-10 relative">
   
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

         <Checkcard></Checkcard>
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

</script>
