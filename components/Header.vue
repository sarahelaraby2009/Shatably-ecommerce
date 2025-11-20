<template>
    <header class="w-full bg-gray-100 px-[80px] pb-2 flex flex-col">
      
   <nav class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <!-- <img src="/logo1.png" class="h-[131px] w-[107px]" alt="logo">
      </img> -->
<!-- <img src="/logo1.png" class="h-[90px] w-[70px]" alt="logo"></img> -->
 
<img src="/logo1.png" class="h-[220px] w-[200px] -my-6" alt="logo"></img>
      </div>
     <ul class="hidden md:flex items-center space-x-10 text-gray-700 font-medium">
  <!-- Home -->
  <li>
  <NuxtLink to="/" exact-active-class="  text-[20px] font-medium text-[#C76950]" class="text-[18px] font-normal hover:text-[#C76950]">
    Home
  </NuxtLink>
</li>


  <!-- Pricing -->
  <li>
    <NuxtLink to="/pricing" exact-active-class="text-[#C76950] text-xl font-medium"class=" text-[18px] font-normal hover:text-[#C76950]">
      Pricing
    </NuxtLink>
  </li>
    <li>
      
  <NuxtLink to="/engineerpage" exact-active-class="  text-[20px] font-medium text-[#C76950]" class="text-[18px] font-normal hover:text-[#C76950]">
    Professionals
  </NuxtLink>
</li>

    <li>   
  <NuxtLink to="/favourite" exact-active-class="  text-[20px] font-medium text-[#C76950]" class="text-[18px] font-normal hover:text-[#C76950]">
    WishList
  </NuxtLink>
</li>

<li class="relative" @click="open = !open">
  <!-- Link الرئيسي -->
  <NuxtLink to="#" class="flex items-center hover:text-[#C76950]">
    Categories <span class="ml-1">▼</span>
  </NuxtLink>

  <!-- Dropdown Menu -->
  <ul v-if="open" class="absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-lg">
    <li>
      <NuxtLink to="/categories" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500 " exact-active-class="font-medium  bg-gray-100">
      Electrical
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/categories" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500" exact-active-class="font-medium text-orange-500 bg-gray-100">
      Plumbing
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/categories" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500" exact-active-class="font-medium text-orange-500 bg-gray-100">
        flooring&cladding
      </NuxtLink>
    </li>
     <li>
      <NuxtLink to="/categories" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500" exact-active-class="font-medium text-orange-500 bg-gray-100">
        Doors
      </NuxtLink>
    </li>
     <li>
      <NuxtLink to="/categories" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500" exact-active-class="font-medium text-orange-500 bg-gray-100">
        Paints
      </NuxtLink>
    </li>
    <li>
      <NuxtLink to="/categories" class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500" exact-active-class="font-medium  text-orange-500 bg-gray-100">
        Constuction chemicals
      </NuxtLink>
    </li>
  </ul>
</li>
</ul>
<div class="flex gap-3"> <!-- اضبط القيمة حسب المسافة المطلوبة -->
  <button class="px-5 py-2 rounded-[22px] w-[121px] h-[36px] bg-[#C76950] text-white hover:bg-[#AD563F]">
    Sign in
  </button>
  <button class="px-5 py-2 rounded-[22px] w-[121px] h-[36px] border border-[#612B1F] text-[#612B1F] hover:text-[#C76950] hover:border-[#C76950]">
    Sign up
  </button>
</div>
</nav>
<!--------------------------row 2 ------------>
<div class="flex  pl-32 "> 
  <div class="flex -mt-12 pl-32 pr-6 items-center">
  
  <!-- مربع البحث -->
  <div class="flex items-center justify-between w-[700px] h-[45px] px-3 py-2 rounded-[24px] text-[#4B5563] bg-white" style="box-shadow: 0 0 4px rgba(0,0,0,0.3);">
    <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-2 text-[#4B5563]" />
    <input type="text" placeholder="Search" class="outline-none text-[#4B5563] w-full" />
    <font-awesome-icon :icon="['fas', 'sliders']" class="text-[#000] w-5 h-5" />
  </div>

  <!-- أيقونات الهارت + الكارت -->
  <div class="flex items-center  gap-2  ml-60 ">
 

    <!-- Cart -->
    <div class="w-10 h-10 flex items-center justify-center rounded-full bg-[#C76950] shadow cursor-pointer hover:bg-orange-600 transition">
      <font-awesome-icon :icon="['fas', 'cart-shopping']" class="text-white text-xl" />
    </div>
  </div>
  </div>

</div>


    </header>
  
  </template>
  <script setup>
import { ref } from 'vue'
const open = ref(false)
</script>