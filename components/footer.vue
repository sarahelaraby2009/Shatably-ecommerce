<script setup></script>
<template>
  <div class="bg-[#4C261C] ">
    <div class="grid grid-cols-1 lg:grid-cols-3 py-8 px-8">
      <div class="text-white flex-col items-center justify-center gap-3">
        <div> <img class="ml-[-50px] w-[200px] lg:w-[200px]" src="/logo mod.png" /> </div>
        <h3 class="mb-3 font-semibold">Contact Us</h3>
        <h3 class="mb-3">+1 (7635) 547-12-97</h3>
        <h3>support@Shatably.com</h3>
      </div>
      <div class="text-white flex flex-col items-start justify-center gap-6">
        <h3 class="font-semibold">Quick Links</h3>
        <div class="flex flex-col lg:flex-row  lg:justify-between lg:items-center w-[325px]">
          <div class="text-gray-400 flex flex-col gap-3">
            <nuxt-link :to="'/aboutus'">
              <p>About us</p>
            </nuxt-link>
            <nuxt-link :to="'/'">
              <p>Home</p>
            </nuxt-link>
            <nuxt-link :to="'/engineerpage'">
              <p>Professionals</p>
            </nuxt-link>
          </div>
          <div class="text-gray-400 flex flex-col gap-3">
            <nuxt-link :to="'/categories'">
              <p>Categories</p>
            </nuxt-link>
            <nuxt-link :to="'/pricing'">
              <p>Pricing</p>
            </nuxt-link>
            <nuxt-link :to="'/wishlist'">
              <p>Wishlist</p>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="mr-10 flex flex-col items-start justify-center">
        <p class="text-white mb-10 font-semibold">subscribe</p>
        <div class="flex"> <input type="text" value="Get product updates"
            class=" w-[248px] h-[50px] p-[8px] rounded-[6px] text-[#974E3B]" />
          <div
            class="flex justify-center items-center w-[50px]  bg-[#C76950]  rounded-r-[6px]">
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-white" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center ">
      <hr class="w-[1073px] border border-gray-200" />
    </div>
    <div class=" text-white flex flex-col lg:flex-row lg:justify-between lg:items-center">
      <div>
        <h3 class="font-semibold p-5">Follow Us</h3>
        <div class="flex  gap-4 p-8">
          <div class="flex justify-center items-center w-[35px] h-[35px] border rounded-[50px]"> <font-awesome-icon
              :icon="['fab', 'linkedin-in']" class="text-white text-[18px]" /> </div>
          <div class="flex justify-center items-center w-[35px] h-[35px] border rounded-[50px]"> <font-awesome-icon
              :icon="['fab', 'facebook-f']" class="text-white text-[18px]" /> </div>
          <div class="flex justify-center items-center w-[35px] h-[35px] border rounded-[50px]"> <font-awesome-icon
              :icon="['fab', 'twitter']" class="text-white text-[18px]" /> </div>
        </div>
      </div>

      <div class="flex flex-start  items-center ml-[30px]">
        <h4>A product of</h4>
        <div class="w-[50px] h-[43px]"> <img class="w-full" src="/logo mod.png" /> </div>
      </div>
      <h4 class="ml-[30px]">© 2025 Shatably. All rights reserved</h4>
    </div>
  </div>
</template>