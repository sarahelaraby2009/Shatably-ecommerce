<script setup>

</script>

<template>
  <div class="bg-[#4C261C] ">
    <div class="flex justify-between items-center py-10 px-10">
      <div class="text-white flex-col items-center justify-center gap-3">
        <div>
          <img src="/assets/HomeLogo.png" />
        </div>
        <h3 class="mb-3">+1 (7635) 547-12-97</h3>
        <h3>support@Shatably.com</h3>
      </div>
      <div class="text-white">
        <h3 class="mb-[24px]">Quick Links</h3>
        <div class="flex justify-between w-[325px] h-[140px]">
          <div class="text-gray-400">
           <nuxt-link>
            <p class="mb-[24px]">About us</p>
           </nuxt-link> 
           <nuxt-link>
               <p>Home</p>
           </nuxt-link>
          </div>
          <div class="text-gray-400">
            <nuxt-link>
                <p class="mb-[24px]">Categories</p>
            </nuxt-link>
            <nuxt-link>
                <p>Pricing</p>
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="mr-10">
        <p class="text-white mb-10">subscribe</p>
        <div class="flex">
          <input
            type="text"
            value="Get product updates"
            class="w-[248px] h-[50px] p-[8px] rounded-[6px] text-[#974E3B]"
          />
          <div
            class="flex justify-center items-center w-[50px] h-[50px] bg-[#C76950] absolute right-16 rounded-r-[6px]"
          >
            <font-awesome-icon
              :icon="['fas', 'arrow-right']"
              class="text-white"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center  ">
      <hr class="w-[1073px] border border-gray-200" />
    </div>
    <div class="flex justify-around items-center text-white">
        <div class="flex justify-start items-center gap-4 py-10 px-10">
          <div class="flex justify-center items-center w-[35px] h-[35px] border rounded-[50px]">
            <font-awesome-icon :icon="['fab', 'linkedin-in']" class="text-white text-[18px]" />
          </div>
          <div class="flex justify-center items-center w-[35px] h-[35px] border rounded-[50px]">
            <font-awesome-icon :icon="['fab', 'facebook-f']" class="text-white text-[18px]" />
          </div>
          <div class="flex justify-center items-center w-[35px] h-[35px] border rounded-[50px]">
            <font-awesome-icon :icon="['fab', 'twitter']" class="text-white text-[18px]" />
          </div>
        </div>
        <div class="flex justify-center items-center">
            <h4>A product of</h4>
            <div class="w-[35px] h-[43px]">
                <img class="w-full" src="/assets/HomeLogo.png">
            </div>
        </div>
        <h4>© 2025 Shatably. All rights reserved</h4>
    </div>
  </div>
</template>
