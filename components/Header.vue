<template>
    <header class="w-full bg-gray-100 px-[80px] pb-2 flex flex-col">
      
   <nav class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <!-- <img src="/logo1.png" class="h-[131px] w-[107px]" alt="logo">
      </img> -->
<!-- <img src="/logo1.png" class="h-[90px] w-[70px]" alt="logo"></img> -->
 
<img src="/logo1.png" class="h-[auto] w-[200px] -my-6" alt="logo"></img>
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

  <!-- Main link -->
  <NuxtLink to="#" class="flex items-center hover:text-[#C76950]">
    Categories <span class="ml-1">▼</span>
  </NuxtLink>

  <!-- Dropdown -->
  <ul
    v-if="open"
    class="absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-lg"
  >
    <li v-for="cat in categories" :key="cat.id">
      <NuxtLink class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500" exact-active-class="font-medium  text-orange-500 bg-gray-100"
        :to="`/categories/${cat.id}`"
        
        
      >
        {{ cat.name }}
      </NuxtLink>
    </li>
  </ul>

</li>
</ul>

<div class="flex gap-3"> <!-- sigin in -->
   <div v-if="!user" class="flex gap-3">
  <button   @click="signIN" class="px-5 py-2 rounded-[22px] w-[121px] h-[36px] bg-[#C76950] text-white hover:bg-[#AD563F]">
    Sign in
  </button>
  <button @click="signUP" class="px-5 py-2 rounded-[22px] w-[121px] h-[36px] border border-[#612B1F] text-[#612B1F] hover:text-[#C76950] hover:border-[#C76950]">
    Sign up
  </button>
   </div>
   <!--user show -->
     <div v-else class="relative">
     <img @click.stop="showMenu = !showMenu"
      :src="user.photoURL || defaultAvatar"
      class="w-10 h-10 rounded-full object-cover border cursor-pointer"
     />
     <!--dropdown-->
     <div v-if="showMenu"  @click.stop class="absolute right-0 mt-3 w-40 bg-slate-50 rounded shadow-lg py-2 z-50">
     <p class="px-4 py-2 text-sm text-gray-600 border-b">
     {{ user.displayName || user.email }}
      </p>
      <!--to profile page -->
     <NuxtLink
     to="/profile"
     class="block w-full px-4 py-2 text-sm hover:bg-[#EBCDC5] text-gray-600"
     >
     Profile
     </NuxtLink>
      <button
     @click="logout"
      class="block text-left w-full font-semibold px-4 py-2 text-sm text-[#C76950] hover:text-orange-500">
       Logout
       </button>
       </div>
     </div>
</div>
</nav>
<!--------------------------row 2 ------------>
<div class="flex  pl-32 "> 
  <div class="flex -mt-12 pl-32 pr-6 items-center">
  
  <!-- مربع البحث -->
  <div class="flex items-center justify-between w-[700px] h-[45px] px-3 py-2 rounded-[24px] text-[#4B5563] bg-white" style="box-shadow: 0 0 4px rgba(0,0,0,0.3);">
    <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-2 text-[#4B5563]" />
    <input  v-model ="searchQuery"  @keyup.enter="goSearch"  type="text" placeholder="Search" class="outline-none text-[#4B5563] w-full" />
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
import { ref ,onMounted} from 'vue'
import { useAuth } from '~/composables/useAuth'
import{ collection,getDocs}from 'firebase/firestore'
import { signOut } from "firebase/auth"
const { $auth } = useNuxtApp()
const categories=ref([])
const {$db}=useNuxtApp()
const open = ref(false)
const showMenu=ref(false)//to show dropdownlist user
const { user } = useAuth()
const searchQuery=ref("")
const defaultAvatar = "/default.png"
const signIN = () => {
  navigateTo('/signin')
} 

const signUP = () => {
  navigateTo('/register')
}
const logout = async () => {
  await signOut($auth)
}
const goSearch=()=>{
  if(searchQuery.value.trim() !== ""){
    navigateTo(`/search?query=${searchQuery.value}`)
  }
}
onMounted(async()=>{
  const categoryRef=collection($db,"categories")
  const snapshot=await getDocs(categoryRef)
  categories.value=snapshot.docs.map(doc=>({
    id:doc.id,
    ...doc.data()
  }))
})
</script>