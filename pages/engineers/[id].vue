<script setup>
import { doc, getDoc } from "firebase/firestore";
const route = useRoute();
const { $db } = useNuxtApp();

const showImagePopup = ref(false);
const currentImageIndex = ref(0);
const openImagePopup = (index) => {
  currentImageIndex.value = index;  
  showImagePopup.value = true;     
};


const engineer = ref(null);

onMounted(async () => {
  const refDoc = doc($db, "engineers", route.params.id);
  const snap = await getDoc(refDoc);
  
  if (snap.exists()) {
    engineer.value = { id: snap.id, ...snap.data() };
  }
});
</script>


<template >

 <div v-if="engineer">
    
  <div class="w-full max-w-[1240px] bg-white shadow rounded-2xl p-6 flex gap-6 items-start relative container mx-auto">

  <img 
    :src="engineer.image" 
    class="w-[260px] h-[260px] object-cover rounded-xl"
  >

  <div class="flex flex-col gap-2 flex-1">

    <div class="pb-5">
      <h2 class="text-[24px] font-semibold text-[#1E1E1E]">{{ engineer.name }}</h2>
      <p class="text-[#8E8D8D] text-[15px]">{{engineer.location}}</p>
    </div>

    <p class="text-[15px] text-gray-700">
      <span class="font-semibold">Position: </span>
      {{ engineer.position }}
    </p>

    <p class="text-[15px] text-gray-700">
      <span class="font-semibold">Experience: </span>
      {{ engineer.yearsOfExperience }} years
    </p>


    <p class="text-[15px] text-gray-700 leading-relaxed">
      <span class="font-semibold">Specialization: </span>
      {{ engineer.specialization}}
       
    </p>
<div class="pt-5">
     <button class="mt-3 bg-[#C76950] text-white px-6 py-2 rounded-xl flex items-center gap-2 w-fit hover:bg-[#C76950] transition">
      WhatsApp 
<font-awesome-icon :icon="['fab', 'whatsapp']" class="text-xl" />
    </button>
</div>
   

  </div>

  <div class="absolute top-4 right-4 bg-[#F5F5F5] px-4 py-1 rounded-full flex items-center gap-1 text-[15px]">
    <span>{{ engineer.rating }}</span>
    <span class="text-yellow-400">★</span>
  </div>
</div>


<div class="pt-8 pb-10 container mx-40 ">
  <a href="#profile">
<button id="profile" class="  w-[135px]  mt-3 border text-black px-6 py-2 rounded-[24px]  hover:bg-[#C76950] hover:text-white transition">
      Profile 
    </button>
  </a>
     
    <a href="#project">
       <button class=" ml-3 w-[135px]  mt-3 border text-black px-6 py-2 rounded-[24px]  hover:bg-[#C76950] hover:text-white transition">
    Projects 
    </button>
    </a>
    
    <a href="#rating">
       <button class=" ml-3 w-[135px]  mt-3 border text-black px-6 py-2 rounded-[24px]  hover:bg-[#C76950] hover:text-white transition">
      Rating 
    </button>
    </a>
    
</div>
  
  <div id="profile" class="w-[1240px] h-[200px] bg-[#F9EEEC] shadow rounded-2xl  container mx-auto">
<h6 class="font-bold pb-7 pt-7 pl-10 text-[30px]"> Profile</h6>
<p class=" pb-7  pl-10">{{ engineer.bio }}
</p>
  </div>

  <div class="container mx-auto pt-10" id="project">
    <h1 class="font-bold pb-7 pt-7 pl-10 text-[30px]"> Projects </h1>
   <div class="overflow-x-auto scrollbar-none">

  <div class="flex gap-8 pr-4 pl-10">

  <div
    v-for="(img, index) in engineer.portfolio"
    :key="index"
    class="min-w-[350px] bg-white rounded-3xl shadow overflow-hidden"
  >
    <img 
    :src="img" 
    class="w-full h-[350px] object-cover cursor-pointer"
    @click="openImagePopup(index)"
  />>
  </div>


  <div 
  v-if="showImagePopup"
  class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
  @click="showImagePopup = false"
>
  <img 
    :src="engineer.portfolio[currentImageIndex]" 
    class="max-w-[90%] max-h-[90%] rounded-2xl shadow-xl"
    @click.stop
  />

  <button 
    class="absolute top-6 right-6 text-white text-3xl"
    @click="showImagePopup = false"
  >
    ✕
  </button>
</div>

</div>
</div>
  </div>


<div class="container mx-auto pt-10">
    <h1 class="font-bold pb-7 pt-7 pl-10 text-[30px]"> Services </h1>
    <div class="flex gap-8">
     <serviceCard class="ml-10"
     v-for="(serv,index) in engineer.services"
     :key="index"
     :service="serv"
     /> 
     
    </div>
</div>

<div id="rating" class="container mx-auto pt-10">
    <h1 class="font-bold pb-7 pt-7 pl-10 text-[30px]"> what customer Says? </h1>
    <div class="flex gap-8">
     <reviewCard class="ml-10"
     v-for="(rev , index) in engineer.reviews"
     :key="index"
     :review="rev"
     /> 
    </div>
</div>

<div class="container mx-20 px-4 pt-20 ">
  <div class="bg-white shadow-lg rounded-2xl p-6 max-w-[1150px] mx-auto border border-[#f2f2f2]">

    <h2 class="text-[28px] font-semibold text-gray-800 mb-10"> Write Your Review  </h2>

<div>
  <textarea
    class="w-full h-[120px] px-4 py-3 text-gray-500 text-[15px] rounded-2xl border border-gray-300
           resize-none leading-relaxed focus:outline-none"
    placeholder="Share your feedback and help create a better shopping experience for everyone"
  ></textarea>
</div>
      
    <div >
      <button
      class="bg-[#C76950] text-white px-10 py-3 rounded-3xl text-[16px] font-medium hover:bg-[#b65e47] transition mt-8"
    >
      Submit Review
    </button>
  
    </div>
        

  </div>
</div>
  </div>





</template>

