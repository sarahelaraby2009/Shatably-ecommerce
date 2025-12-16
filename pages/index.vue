<template>
  <div class="container lg:mx-auto">
    <div>
      <div class="flex justify-center h-[400px] w-full mt-[20px] lg:mb-[80px] relative">
        <Swiper :modules="modules" :slides-per-view="1" :space-between="10" :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }" :navigation="false"
          class="mySwiper h-[400px]">
          <SwiperSlide v-for="n in 7" :key="n">
            <img class="lg:w-full lg:h-full lg:object-cover object-contain" :src="`/pro-${n}.png`" loading="lazy"
              style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>

    <div class="mb-[80px]" >
      <p class="font-bold text-[25px] mb-2">Our Features</p>

      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 mx-5  mb-10">

        <div class="relative  h-[200px] rounded-[24px] shadow-xl flex flex-col justify-center gap-[20px] p-5 ">
          <img class="w-[50px]" src="/Calculator.png" />
          <p class="text-[#C76950]">Calculate your apartment size and finishing cost</p>
        </div>

        <div class="relative  h-[200px] rounded-[24px] shadow-xl flex flex-col justify-center gap-[20px] p-5 ">
          <img class="w-[50px]" src="/Home.png" />
          <p class="text-[#C76950]">Get your dream home at the best price</p>
        </div>

        <div class="relative  h-[200px] rounded-[24px] shadow-xl flex flex-col justify-center gap-[20px] p-5 ">
          <img class="w-[50px]" src="/Engineer.png" />
          <p class="text-[#C76950]">Register as an engineer to offer your services</p>
        </div>

        <div class="relative  h-[200px] rounded-[24px] shadow-xl flex flex-col justify-center gap-[20px] p-5 ">
          <img class="w-[50px]" src="/User.png" />
          <p class="text-[#C76950]">Register as a supplier to grow your business more</p>
        </div>

      </div>

    </div>

    <div class="w-full overflow-hidden mb-[80px]">
      <div class="slider-track flex gap-10 items-center">
        <img v-for="n in 13" :key="n" :src="`/image-${n}.png`" class="h-[30px] w-auto object-contain" />
        <img v-for="n in 13" :key="'clone-' + n" :src="`/image-${n}.png`" class="h-[30px] w-auto object-contain" />
      </div>
    </div>

    <div class="w-full mx-0 px-0 relative mb-[80px]">
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

    <!-- New Arrivals Section -->
    <div class="mb-[80px]">
      <p class="font-bold text-[25px]">New Arrivals</p>
      <div class="flex gap-3 cursor-pointer overflow-x-auto scrollbar-hide pb-2 m-5">
        <div class="border w-[80px] text-center border-[#C76950] outline-none rounded-full p-2 whitespace-nowrap"
          :class="activeSelection === 'all' ? ' bg-[#C76950] text-[#fefe]' : ''" @click="showAll">All</div>
        <div class="border border-[#C76950] outline-none rounded-full p-2 text-[#3E3E3E] whitespace-nowrap"
          :class="activeSelection === category.id ? 'bg-[#C76950] text-[#fefe]' : ''"
          @click="displayProducts(category.id)" v-for="category in cats" :key="category.id">{{ category.name }}</div>
      </div>
      <div ref="productContainer" class="flex gap-[50px] m-5 mt-5 overflow-x-auto scroll-smooth scrollbar-hide py-4">
        <productCard class="min-w-[250px]" v-for="product in newArrival" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>
      <div class="flex gap-5 justify-center items-center">
        <button @click="leftScrollNew"
          class="border border-[#3E3E3E] rounded-full flex justify-center items-center text-[#3E3E3E]  text-[20px] w-[40px] h-[40px]"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
        <button @click="rightScrollNew"
          class="border border-[#3E3E3E] text-[#3E3E3E] rounded-full text-[20px] w-[40px] h-[40px]"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
      </div>
    </div>

    <!-- Best Selling Section -->
    <div class="mb-[80px]">
      <p class="font-bold text-[25px]">Best Selling Products</p>
      <div class="flex gap-3 cursor-pointer overflow-x-auto scrollbar-hide pb-2 m-5">
        <div class="border w-[80px] text-center border-[#C76950] outline-none rounded-full p-2 whitespace-nowrap"
          :class="activeSelectionBest === 'all' ? ' bg-[#C76950] text-[#fefe]' : ''" @click="showAllBest">All</div>
        <div class="border border-[#C76950] outline-none rounded-full p-2 text-[#3E3E3E] whitespace-nowrap"
          :class="activeSelectionBest === category.id ? 'bg-[#C76950] text-[#fefe]' : ''"
          @click="displayProductsBest(category.id)" v-for="category in cats" :key="category.id">{{ category.name }}
        </div>
      </div>
      <div ref="productContainerBest" class="flex gap-[50px] m-5 mt-5 overflow-x-auto scroll-smooth scrollbar-hide py-4">
        <productCard class="min-w-[250px]" v-for="product in bestSelling" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>
      <div class="flex gap-5 justify-center items-center">
        <button @click="leftScrollBest"
          class="border border-[#3E3E3E] flex justify-center items-center rounded-full text-[#3E3E3E] text-[20px] w-[40px] h-[40px]"><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
        <button @click="rightScrollBest"
          class="border border-[#3E3E3E] text-[#3E3E3E] rounded-full text-[20px] w-[40px] h-[40px]"><font-awesome-icon icon="fa-solid fa-chevron-right" /></button>
      </div>
    </div>

    <!-- Electrical Section -->
    <div class="mb-[80px]">
      <div class="flex justify-between items-center">
        <p class="font-bold text-[25px]">Electrical Products</p>
        <div>

          <NuxtLink to="/categories/qZnJBWo0aLeJQk5W0D6D" class="text-[#8D8D8D] m-5 ">See more <font-awesome-icon
              icon="fa-solid fa-caret-right" /></NuxtLink>
        </div>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4  mt-5 lg:gap-[30px] overflow-x-auto scroll-smooth scrollbar-hide py-4">
        <productCard  v-for="product in electericalPro" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>



    </div>
    <!-- Plumbing products -->
    <div class="mb-[80px]">
      <div class="flex justify-between items-center">
        <p class="font-bold text-[25px]">Plumbing products</p>
        <NuxtLink to="/categories/0BzHvwuwBw2q5bKSDamR" class="text-[#8D8D8D] ">See more <font-awesome-icon
            icon="fa-solid fa-caret-right" /></NuxtLink>


      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 lg:gap-[30px] m-5 mt-5 overflow-x-auto scroll-smooth scrollbar-hide py-4">
        <productCard  v-for="product in plumbPro" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>
    </div>
    <!-- paints -->
    <div class="mb-[80px]">
      <div class="flex justify-between items-center">
        <p class="font-bold text-[25px]">Paints & Coatings</p>
        <NuxtLink to="/categories/vwmN6jB5dNzfnS5dr4Y6" class="text-[#8D8D8D] ">See more <font-awesome-icon
            icon="fa-solid fa-caret-right" /></NuxtLink>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 m-5 mt-5 overflow-x-auto lg:gap-[30px] scroll-smooth scrollbar-hide py-4 ">
        <productCard  v-for="product in paintPro" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>
    </div>
<div class="fixed bottom-4 right-4 z-50">
  <Chatbot />
</div>
  </div>
  
</template>

<script setup>
import productCard from '~/components/productCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import { onMounted, ref } from 'vue';
import { collection, getDocs, where, limit, query, orderBy } from 'firebase/firestore';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Chatbot from '@/components/Chatbot.vue';   
useHead({
  title: 'Home | Shatably',
  meta: [
    {
      name: 'description',
      content: 'اكتشف أحدث المنتجات والخدمات في مجال التشطيب المنزلي مع منصتنا المتكاملة.'
    }
  ]
})
const products = ref([])
const cats = ref([])
const { $db } = useNuxtApp()
const route = useRoute()
const catId = route.params.id
const subId = route.params.subId
const newArrival = ref([])
const bestSelling = ref([])
const electericalPro = ref([])
const plumbPro = ref([])
const paintPro = ref([])
const all = ref(null)
const activeSelection = ref('all')
const activeSelectionBest = ref('all')
const productContainer = ref(null)
const productContainerBest = ref(null)
const modules = [Autoplay, Navigation];

onMounted(async () => {
  const q1 = query(collection($db, 'products'),
    orderBy('createdAt', 'desc'),
    limit(10))
  const snap = await getDocs(q1)
  newArrival.value = snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
    categoryId: d.data().categoryId,
  subId: d.data().subId
  }))

  const q2 = query(collection($db, 'products'),
    where('bestSelling', '==', true),
    limit(10))
  const snap2 = await getDocs(q2)
  bestSelling.value = snap2.docs.map(d => ({
  id: d.id,
  ...d.data(),
  categoryId: d.data().categoryId,
  subId: d.data().subId
}))

  const snapshot2 = await getDocs(collection($db, 'categories'))
  cats.value = snapshot2.docs.map(g => ({
    id: g.id,
    ...g.data(),
    
  }))

  const queryElec = query(collection($db, 'products'),
    where('categoryId', '==', 'qZnJBWo0aLeJQk5W0D6D'),
    limit(4))
  const snapElec = await getDocs(queryElec)
  electericalPro.value = snapElec.docs.map(elec => ({
    id: elec.id,
    ...elec.data(),
      categoryId: elec.data().categoryId,
  subId: elec.data().subId
  }))
  const queryplumb = query(collection($db, 'products'),
    where('categoryId', '==', '0BzHvwuwBw2q5bKSDamR'),
    limit(4))
  const snapplumb = await getDocs(queryplumb)
  plumbPro.value = snapplumb.docs.map(plumb => ({
    id: plumb.id,
    ...plumb.data(),
      categoryId: plumb.data().categoryId,
  subId: plumb.data().subId
  }))
  const queryPaint = query(collection($db, 'products'),
    where('categoryId', '==', 'vwmN6jB5dNzfnS5dr4Y6'),
    limit(4))
  const snapPaint = await getDocs(queryPaint)
  paintPro.value = snapPaint.docs.map(paint => ({
    id: paint.id,
    ...paint.data(),
      categoryId: paint.data().categoryId,
  subId: paint.data().subId
  }))


})

const displayProducts = async (catId) => {
  console.log('Selected category:', catId)
  const q3 = query(collection($db, 'products'),
    where('categoryId', '==', catId),
    orderBy('createdAt', 'desc'),
    limit(8))

  const snap3 = await getDocs(q3)
  newArrival.value = snap3.docs.map(selected => ({
    id: selected.id,
    ...selected.data(),
    categoryId: selected.data().categoryId,
  subId: selected.data().subId
  }))
  activeSelection.value = catId
}

const showAll = async () => {
  const q1 = query(collection($db, 'products'),
    orderBy('createdAt', 'desc'),
    limit(10))
  const snap = await getDocs(q1)
  newArrival.value = snap.docs.map(d => ({
    id: d.id,
    ...d.data(),
      categoryId: d.data().categoryId,
  subId: d.data().subId
  }))
  activeSelection.value = 'all'
}



const showAllBest = async () => {
  const qbest = query(collection($db, 'products'),
    where('bestSelling', '==', true),
    limit(10))
  const snapbest = await getDocs(qbest)
  bestSelling.value = snapbest.docs.map(d => ({
    id: d.id,
    ...d.data(),
      categoryId: d.data().categoryId,
  subId: d.data().subId
  }))
  activeSelectionBest.value = 'all'
}

const displayProductsBest = async (catId) => {
  console.log('Selected category:', catId)
  const q3best = query(collection($db, 'products'),
    where('bestSelling', '==', true),
    where('categoryId', '==', catId),
    limit(8))

  const snap3best = await getDocs(q3best)
  bestSelling.value = snap3best.docs.map(selected => ({
    id: selected.id,
    ...selected.data(),
      categoryId: selected.data().categoryId,
  subId: selected.data().subId
  }))
  activeSelectionBest.value = catId
}

const leftScrollBest = () => {
  productContainerBest.value.scrollBy({
    left: -300,
    behavior: "smooth"
  })
}

const rightScrollBest = () => {
  productContainerBest.value.scrollBy({
    left: 300,
    behavior: "smooth"
  })
}
const leftScrollNew = () => {
  productContainer.value.scrollBy({
    left: -300,
    behavior: "smooth"
  })
}

const rightScrollNew = () => {
  productContainer.value.scrollBy({
    left: 300,
    behavior: "smooth"
  })
}
</script>