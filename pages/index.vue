<template>
  <div class="w-full">
    <div>
      <div>
        <Swiper :modules="modules" :slides-per-view="1" :space-between="10" :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }" :navigation="false"
          class="mySwiper h-[400px]">
          <SwiperSlide v-for="n in 7" :key="n">
            <img class="w-full h-full object-cover" :src="`/slider-${n}.png`" loading="lazy"
              style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <div class="mb-16 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4">

      <div class="relative w-full h-[250px] rounded-[24px] shadow-md overflow-hidden">
        <img class="w-full h-full object-cover" src="/first.avif" />
        <div class="absolute inset-0 flex items-end">
          <p class="bg-black/40 w-full text-center text-white p-3 text-[18px]">
            Calculate your apartment size and finishing cost easily.
          </p>
        </div>
      </div>

      <div class="relative w-full h-[250px] rounded-[24px] shadow-md overflow-hidden">
        <img class="w-full h-full object-cover" src="/2nd.jpg" />
        <div class="absolute inset-0 flex items-end">
          <p class="bg-black/40 w-full text-center text-white p-3 text-[18px]">
            Get your dream home at the best price.
          </p>
        </div>
      </div>

      <div class="relative w-full h-[250px] rounded-[24px] shadow-md overflow-hidden">
        <img class="w-full h-full object-cover" src="/3rd.jpg" />
        <div class="absolute inset-0 flex items-end">
          <p class="bg-black/40 w-full text-center text-white p-3 text-[18px]">
            Register as an engineer to display your designs, offer your services.
          </p>
        </div>
      </div>

      <div class="relative w-full h-[250px] rounded-[24px] shadow-md overflow-hidden">
        <img class="w-full h-full object-cover" src="/4th.jpg" />
        <div class="absolute inset-0 flex items-end">
          <p class="bg-black/40 w-full text-center text-white p-3 text-[18px]">
            Register as a supplier to grow your business, show your Products.
          </p>
        </div>
      </div>

    </div>




    <div>
      <div class="mt-5 mb-5">
        <Swiper :modules="modules" :slides-per-view="8" :space-between="30" :loop="true"
          :autoplay="{ delay: 0, disableOnInteraction: false }" :navigation="false" :speed="1000"
          class="mySwiper h-full">
          <SwiperSlide v-for="n in 13" :key="n">
            <img class="w-auto h-full object-contain" :src="`/image-${n}.png`"
              />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

        <div class="w-full mx-0 px-0 relative mt-8 mb-8">
      <div class="flex justify-center h-[500px] w-full mt-[20px] relative">
        <img class="w-full h-full object-cover" src="/hero.avif" alt="hero photo" />

        <div class="absolute inset-0 flex justify-center pointer-events-none">
          <div class="w-full h-full bg-black/40"></div>
        </div>

        <div class="absolute flex flex-col gap-4 inset-0 justify-center items-start p-5 m-5 w-full">
          <h2 class="text-[#fefefe] font-medium text-[60px] text-left">Measure. Build. Shine</h2>
          <p class="max-w-[700px] text-[#fefefe] text-[24px] font-medium text-left">Plan with purpose, build with
            passion, shine with success.</p>
        </div>
      </div>
    </div>

    <div class="m-5">
      <p class="font-bold text-[25px]">New Arrivals</p>
      <div>
        <ProductCard v-for="product in products" :key="product.id">hi</ProductCard>
      </div>
    </div>

  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import { onMounted , ref } from 'vue';
import { collection, getDocs,ref } from 'firebase/firestore';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const product=ref({})
const {$db}=useNuxtApp()
const route=useRoute()
const catId=route.params.id
const subId=route.params.subId


const modules = [Autoplay, Navigation];

onMounted(async()=>{
  snapshot=await getDocs(collection($db,`categories/${catId}/'subcategories/${subId}/'products'/${productId}`))
  product.value=snapshot.docs.map(doc=>({
    id:doc.id,
    ...doc.data()
  }))
})
</script>