<script>
import { icon } from "@fortawesome/fontawesome-svg-core";
import Default from "~/layouts/default.vue";
</script>
<template>
  <div class="flex justify-start items-center m-10">
    <div class="flex justify-center items-center text-[12px]">
      <p>Home</p>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="" />
    </div>
    <div class="flex justify-center items-center text-[12px]">
      <p>category</p>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="" />
    </div>
    <div class="flex justify-center items-center text-[12px]">
      <p>Lighting</p>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="" />
    </div>
    <div>
      <p class="text-[#C76950] text-[12px] font-bold">Product</p>
    </div>
  </div>
  <div class="flex justify-center items-start">
    <div>
      <div class="w-[620px] h-[412px] rounded-[18px] m-4">
        <img src="/assets/Lighting.jpeg" class="w-full h-full rounded-[18px]" />
      </div>
      <div class="flex justify-between w-[620px] m-4">
        <p class="font-medium text-[32px]">Recentaly viewed</p>
        <div class="flex gap-[10px]">
          <div
            class="w-[30px] h-[30px] bg-[#D9D9D9] flex justify-center items-center rounded-[50px]"
          >
            <font-awesome-icon :icon="['fas', 'angle-left']" class="" />
          </div>
          <div
            class="w-[30px] h-[30px] bg-[#D9D9D9] flex justify-center items-center rounded-[50px]"
          >
            <font-awesome-icon :icon="['fas', 'angle-right']" class="" />
          </div>
        </div>
      </div>
      <div class="flex justify-between w-[620px] gap-[18px] m-4">
        <div>
          <div class="w-[193px] h-[163px] rounded-[8px]">
            <img
              src="/assets/Lighting.jpeg"
              class="w-full h-full rounded-[8px]"
            />
          </div>
          <div class="flex justify-between mt-1">
            <p class="text-[12px]">Product Name</p>
            <p class="text-[12px] font-bold">300LE</p>
          </div>
        </div>
        <div>
          <div class="w-[193px] h-[163px] rounded-[8px]">
            <img
              src="/assets/Lighting.jpeg"
              class="w-full h-full rounded-[8px]"
            />
          </div>
          <div class="flex justify-between mt-1">
            <p class="text-[12px]">Product Name</p>
            <p class="text-[12px] font-bold">300LE</p>
          </div>
        </div>
        <div>
          <div class="w-[193px] h-[163px] rounded-[8px]">
            <img
              src="/assets/Lighting.jpeg"
              class="w-full h-full rounded-[8px]"
            />
          </div>
          <div class="flex justify-between mt-1">
            <p class="text-[12px]">Product Name</p>
            <p class="text-[12px] font-bold">300LE</p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-col m-4">
      <h2>LED Ceiling Light – Modern Round Design</h2>
      <p class="py-2">
        Modern LED ceiling light with bright, energy-saving illumination —
        perfect for any room.
      </p>
      <div id="details" class="flex-col mt-4">
        <p>Power: 50W</p>
        <p>Voltage: 220V</p>
        <p>Material: Aluminum + Acrylic</p>
        <p>Color: Warm White / Cool White</p>
        <p>Dimensions: 40cm</p>
      </div>
      <div class="flex">
        <div>
          <p>700 EGP</p>
          <div class="flex gap-2 items-center">
            <div>
              <font-awesome-icon
                v-for="n in 4"
                :key="n"
                :icon="['fas', 'star']"
                class="text-yellow-200 text-s"
              />
            </div>
            <p class="text-gray-400">44 reviews</p>
          </div>
        </div>
        <div class="flex justify-center items-center gap-[24px] bg-[#8C8C8C] p-[10]"> 
          <div id="plus">
            <font-awesome-icon :icon="['fas','plus']"
            class="w-[40px] h-[40px] bg-white p-[10px]"  />
          </div>
          <span>4</span>
          <div id="miuns">
            <font-awesome-icon :icon="['fas','minus']" 
            class="w-[40px] h-[40px] bg-white " />
          </div>
        </div>
      </div>
      <div id="delivery">
        <p>Delivery Info</p>
        <p>
          Delivery in 2–4 business days (Cairo) 3–7 days for other governorates
          Free return within 14 days Safe packaging – breakage protection
          Tracking number after shipping
        </p>
      </div>
      <div class="flex gap-4 m-4">
        <button class="py-2 px-10 bg-[#C76950] text-white rounded-[24px]">Buy Now</button>
        <button class="py-2 px-10 border border-[#612B1F] text-[#612B1F] rounded-[24px]">Add to Cart</button>
      </div>
    </div>
  </div>
  <div>
    <div class="flex justify-between m-4">
      <p class="font-medium text-[32px]">Reviewes</p>
      <p class="font-medium text-[20px]">see all</p>
    </div>
    <div class="flex-col">
      <div
        class="flex items-center gap-3 bg-white shadow-md p-4 m-4 rounded-[12px]"
      >
        <div class="w-[71px] h-[71px]">
          <img
            src="/assets/Lighting.jpeg"
            class="w-full h-full rounded-[50px]"
          />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <p>Fatma Senosy</p>
            <div class="flex justify-center text-gray-500">
              <p>08:10 PM</p>
              <p>|</p>
              <p>23 Mar 2022</p>
            </div>
          </div>
          <div class="flex items-center text-gray-500">
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <p class="pl-1">5.0</p>
          </div>
          <p>
            The light looks even better in real life. Bright, elegant, and easy
            to install. Totally worth it!
          </p>
        </div>
      </div>
      <div
        class="flex items-center gap-3 bg-white shadow-md p-4 m-4 rounded-[12px]"
      >
        <div class="w-[71px] h-[71px]">
          <img
            src="/assets/Lighting.jpeg"
            class="w-full h-full rounded-[50px]"
          />
        </div>
        <div class="flex-col">
          <div class="flex justify-between">
            <p>Fatma Senosy</p>
            <div class="flex justify-center text-gray-500">
              <p>08:10 PM</p>
              <p>|</p>
              <p>23 Mar 2022</p>
            </div>
          </div>
          <div class="flex items-center text-gray-500">
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <p class="pl-1">5.0</p>
          </div>
          <p>
            The light looks even better in real life. Bright, elegant, and easy
            to install. Totally worth it!
          </p>
        </div>
      </div>
    </div>
    <div class="flex-col m-4">
      <p class="font-medium text-[32px] m-4">Recommended Products</p>
      <div class="flex justify-between items-center px-[10px] ml-4 mr-4">
        <div
          class="flex-col justify-centerv items-center w-[406px] h-full shadow-2xl rounded-[18px]"
        >
          <div class="w-[406px] h-[294px] p-[12px]">
            <img
              src="/assets/Lighting.jpeg"
              class="w-full h-full rounded-[10px]"
            />
            <div
              class="absolute left-[367px] top-[1360px] bg-[#D9D9D9] w-[35px] h-[35px] rounded-[50px] flex justify-center items-center"
            >
              <font-awesome-icon
                :icon="['far', 'heart']"
                class="text-[#C76950] text-lg"
              />
            </div>
          </div>
          <div class="flex-col p-[12px]">
            <div class="flex justify-between">
              <p class="font-medium mb-2">Product Name</p>
              <div class="flex items-center text-gray-500">
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
              </div>
            </div>
            <p class="font-sm mb-2">Brand:brand</p>
            <div class="flex justify-between items-center">
              <p class="font-medium mb-2">300 LE</p>
              <div
                class="bg-[#C76950] w-[40px] h-[40px] rounded-[50px] flex justify-center items-center"
              >
                <font-awesome-icon
                  :icon="['fas', 'cart-shopping']"
                  class="text-[#D9D9D9] text-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex-col justify-centerv items-center w-[406px] h-full shadow-2xl rounded-[18px]"
        >
          <div class="w-[406px] h-[294px] p-[12px]">
            <img
              src="/assets/Lighting.jpeg"
              class="w-full h-full rounded-[10px]"
            />
            <div
              class="absolute left-[367px] top-[1360px] bg-[#D9D9D9] w-[35px] h-[35px] rounded-[50px] flex justify-center items-center"
            >
              <font-awesome-icon
                :icon="['far', 'heart']"
                class="text-[#C76950] text-lg"
              />
            </div>
          </div>
          <div class="flex-col p-[12px]">
            <div class="flex justify-between">
              <p class="font-medium mb-2">Product Name</p>
              <div class="flex items-center text-gray-500">
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
              </div>
            </div>
            <p class="font-sm mb-2">Brand:brand</p>
            <div class="flex justify-between items-center">
              <p class="font-medium mb-2">300 LE</p>
              <div
                class="bg-[#C76950] w-[40px] h-[40px] rounded-[50px] flex justify-center items-center"
              >
                <font-awesome-icon
                  :icon="['fas', 'cart-shopping']"
                  class="text-[#D9D9D9] text-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex-col justify-centerv items-center w-[406px] h-full shadow-2xl rounded-[18px]"
        >
          <div class="w-[406px] h-[294px] p-[12px]">
            <img
              src="/assets/Lighting.jpeg"
              class="w-full h-full rounded-[10px]"
            />
            <div
              class="absolute left-[367px] top-[1360px] bg-[#D9D9D9] w-[35px] h-[35px] rounded-[50px] flex justify-center items-center"
            >
              <font-awesome-icon
                :icon="['far', 'heart']"
                class="text-[#C76950] text-lg"
              />
            </div>
          </div>
          <div class="flex-col p-[12px]">
            <div class="flex justify-between">
              <p class="font-medium mb-2">Product Name</p>
              <div class="flex items-center text-gray-500">
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-yellow-200 text-s"
                />
              </div>
            </div>
            <p class="font-sm mb-2">Brand:brand</p>
            <div class="flex justify-between items-center">
              <p class="font-medium mb-2">300 LE</p>
              <div
                class="bg-[#C76950] w-[40px] h-[40px] rounded-[50px] flex justify-center items-center"
              >
                <font-awesome-icon
                  :icon="['fas', 'cart-shopping']"
                  class="text-[#D9D9D9] text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
