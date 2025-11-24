<template>
  <div class="w-full">
    <div>
      <div>
        <Swiper :modules="modules" :slides-per-view="1" :space-between="10" :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }" :pagination="{ clickable: true }" :navigation="false"
          class="mySwiper h-[400px]">
          <SwiperSlide v-for="n in 7" :key="n">
            <img class="w-full h-full object-cover" :src="`/pro-${n}.png`" loading="lazy"
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

    <div class="w-full overflow-hidden">
      <div class="slider-track flex gap-10 items-center">
        <img v-for="n in 13" :key="n" :src="`/image-${n}.png`" class="h-[30px] w-auto object-contain" />
        <img v-for="n in 13" :key="'clone-' + n" :src="`/image-${n}.png`" class="h-[30px] w-auto object-contain" />
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

    <!-- New Arrivals Section -->
    <div class="m-5">
      <p class="font-bold text-[25px]">New Arrivals</p>
      <div class="flex gap-2 cursor-pointer overflow-x-auto scrollbar-hide pb-2">
        <div class="border border-[#C76950] outline-none rounded-full p-2 whitespace-nowrap"
          :class="activeSelection === 'all' ? ' bg-[#C76950] text-[#fefe]' : ''" @click="showAll">All</div>
        <div class="border border-[#C76950] outline-none rounded-full p-2 text-[#3E3E3E] whitespace-nowrap"
          :class="activeSelection === category.id ? 'bg-[#C76950] text-[#fefe]' : ''"
          @click="displayProducts(category.id)" v-for="category in cats" :key="category.id">{{ category.name }}</div>
      </div>
      <div ref="productContainer" class="flex gap-8 m-5 mt-5 overflow-x-auto scroll-smooth scrollbar-hide py-4">
        <productCard class="min-w-[250px]" v-for="product in newArrival" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>
      <div class="flex gap-5 justify-center items-center">
        <button @click="leftScroll" class="border border-[#3E3E3E] rounded-full text-[#3E3E3E] text-[20px] w-[40px]">&lt;</button>
        <button @click="rightScroll" class="border border-[#3E3E3E] text-[#3E3E3E] rounded-full text-[20px] w-[40px]">&gt;</button>
      </div>
    </div>

    <!-- Best Selling Section -->
    <div class="m-5">
      <p class="font-bold text-[25px]">Best Selling Products</p>
      <div class="flex gap-2 cursor-pointer overflow-x-auto scrollbar-hide pb-2">
        <div class="border border-[#C76950] outline-none rounded-full p-2 whitespace-nowrap"
          :class="activeSelectionBest === 'all' ? ' bg-[#C76950] text-[#fefe]' : ''" @click="showAllBest">All</div>
        <div class="border border-[#C76950] outline-none rounded-full p-2 text-[#3E3E3E] whitespace-nowrap"
          :class="activeSelectionBest === category.id ? 'bg-[#C76950] text-[#fefe]' : ''"
          @click="displayProductsBest(category.id)" v-for="category in cats" :key="category.id">{{ category.name }}</div>
      </div>
      <div ref="productContainerBest" class="flex gap-8 m-5 mt-5 overflow-x-auto scroll-smooth scrollbar-hide py-4">
        <productCard class="min-w-[250px]" v-for="product in bestSelling" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>
      <div class="flex gap-5 justify-center items-center">
        <button @click="leftScrollBest" class="border border-[#3E3E3E] rounded-full text-[#3E3E3E] text-[20px] w-[40px]">&lt;</button>
        <button @click="rightScrollBest" class="border border-[#3E3E3E] text-[#3E3E3E] rounded-full text-[20px] w-[40px]">&gt;</button>
      </div>
    </div>

    <!-- Electrical Section -->
    <div class="m-5">
      <p class="font-bold text-[25px]">Electrical Products</p>
      <div class="flex gap-8 m-5 mt-5 overflow-x-auto scroll-smooth scrollbar-hide py-4">
        <productCard class="min-w-[250px]" v-for="product in electericalPro" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>
    </div>
    <!-- Plumbing products -->
    <div class="m-5">
      <p class="font-bold text-[25px]">Plumbing products</p>
      <div class="flex gap-8 m-5 mt-5 overflow-x-auto scroll-smooth scrollbar-hide py-4">
        <productCard class="min-w-[250px]" v-for="product in plumbPro" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>
    </div>
    <!-- paints -->
    <div class="m-5">
      <p class="font-bold text-[25px]">Paints & Coatings</p>
      <div class="flex gap-8 m-5 mt-5 overflow-x-auto scroll-smooth scrollbar-hide py-4">
        <productCard class="min-w-[250px]" v-for="product in paintPro" :key="product.id" :product="product"
          :categoryId="product.categoryId" :subId="product.subId" />
      </div>
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
    ...d.data()
  }))
  
  const q2 = query(collection($db, 'products'),
    where('bestSelling', '==', true),
    limit(10))
  const snap2 = await getDocs(q2)
  bestSelling.value = (snap2).docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  const snapshot2 = await getDocs(collection($db, 'categories'))
  cats.value = snapshot2.docs.map(g => ({
    id: g.id,
    ...g.data()
  }))

  const queryElec = query(collection($db, 'products'),
    where('categoryId', '==', 'qZnJBWo0aLeJQk5W0D6D'),
    limit(4))
  const snapElec = await getDocs(queryElec)
  electericalPro.value = snapElec.docs.map(elec => ({
    id: elec.id,
    ...elec.data()
  }))
  const queryplumb = query(collection($db, 'products'),
    where('categoryId', '==', '0BzHvwuwBw2q5bKSDamR'),
    limit(4))
  const snapplumb = await getDocs(queryplumb)
  plumbPro.value = snapplumb.docs.map(plumb => ({
    id: plumb.id,
    ...plumb.data()
  }))
  const queryPaint = query(collection($db, 'products'),
    where('categoryId', '==', 'vwmN6jB5dNzfnS5dr4Y6'),
    limit(4))
  const snapPaint = await getDocs(queryPaint)
  paintPro.value = snapPaint.docs.map(paint => ({
    id: paint.id,
    ...paint.data()
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
    ...selected.data()
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
    ...d.data()
  }))
  activeSelection.value = 'all'
}

const leftScroll = () => {
  productContainer.value.scrollBy({
    left: -300,
    behavior: "smooth"
  })
}

const rightScroll = () => {
  productContainer.value.scrollBy({
    left: 300,
    behavior: "smooth"
  })
}

const showAllBest = async () => {
  const qbest = query(collection($db, 'products'),
    where('bestSelling', '==', true),
    limit(10))
  const snapbest = await getDocs(qbest)
  bestSelling.value = snapbest.docs.map(d => ({
    id: d.id,
    ...d.data()
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
    ...selected.data()
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
</script>