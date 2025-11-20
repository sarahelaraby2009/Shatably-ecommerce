<template>
  <div class="w-screen h-[154px] bg-[#F7F7F7] flex-col justify-center items-center">
    <div class="flex justify-around items-center">
      <div class="w-[79px] h-[79px]">
        <img src="/assets/HomeLogo.png" alt="" class="w-full" />
      </div>
      <div class="flex justify-center gap-[62px]">
        <nuxt-link>
          <h4>Home</h4>
        </nuxt-link>
        <nuxt-link>
          <h4>Pricing</h4>
        </nuxt-link>
        <nuxt-link>
          <h4>Categories</h4>
        </nuxt-link>
      </div>
      <div class="flex justify-center gap-10">
        <nuxt-link>
          <h4 class="bg-[#C76950] text-white py-[6px] px-[12px] rounded-[22px]">
            Sign in
          </h4>
        </nuxt-link>
        <nuxt-link>
          <h4
            class="border-s-[#C76950] bg-white text-[#612B1F] py-[6px] px-[12px] rounded-[22px]"
          >
            Sing up
          </h4>
        </nuxt-link>
      </div>
    </div>
    <div class="flex justify-around items-center">
      <div class="flex justify-center items-center">
        <input
          type="text"
          value="    Search"
          class="w-[773px] h-[51px] pr-[12px] py-[12px] pl-[15px] rounded-[24px]"
        />
        <div
          class="flex justify-center items-center w-[30px] h-[30px] rounded-[50px] relative right-[770px]"
        >
          <font-awesome-icon :icon="['fas', 'search']" />
        </div>
        <div
          class="flex justify-center items-center w-[30px] h-[30px] rounded-[50px] relative right-[70px]"
        >
          <font-awesome-icon :icon="['fas', 'filter']" />
        </div>
      </div>
      <div class="flex justify-end gap-3">
        <div
          class="flex justify-center items-center w-[40px] h-[40px] rounded-[50px] bg-white text-[#C76950]"
        >
          <font-awesome-icon :icon="['fas', 'heart']" />
        </div>
        <div
          class="flex justify-center items-center w-[40px] h-[40px] rounded-[50px] bg-[#C76950] text-white"
        >
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        </div>
      </div>
    </div>
  </div>
</template>
