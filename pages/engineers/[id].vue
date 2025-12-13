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



<template>
  <div v-if="engineer">
    
    <!-- Hero Card -->
    <div class=" mt-10 w-full max-w-[1240px] bg-white shadow rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start relative container mx-auto">

      <img 
        :src="engineer.image" 
        class="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] object-cover rounded-xl"
      >

      <div class="flex flex-col gap-2 flex-1 text-center md:text-left w-full">

        <div class="pb-3 md:pb-5">
          <h2 class="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#1E1E1E]">{{ engineer.name }}</h2>
          <p class="text-[#8E8D8D] text-[14px] sm:text-[15px]">{{ engineer.location }}</p>
        </div>

        <p class="text-[14px] sm:text-[15px] text-gray-700">
          <span class="font-semibold">Position: </span>
          {{ engineer.position }}
        </p>

        <p class="text-[14px] sm:text-[15px] text-gray-700">
          <span class="font-semibold">Experience: </span>
          {{ engineer.yearsOfExperience }} years
        </p>

        <p class="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
          <span class="font-semibold">Specialization: </span>
          {{ engineer.specialization }}
        </p>

        <div class="pt-3 md:pt-5 flex justify-center md:justify-start">
          <button class="mt-3 bg-[#C76950] text-white px-5 sm:px-6 py-2 rounded-xl flex items-center gap-2 w-fit hover:bg-[#b65e47] transition">
            WhatsApp 
            <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-lg sm:text-xl" />
          </button>
        </div>

      </div>

      <!-- Rating Badge -->
      <div class="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#F5F5F5] px-3 sm:px-4 py-1 rounded-full flex items-center gap-1 text-[13px] sm:text-[15px]">
        <span>{{ engineer.rating }}</span>
        <span class="text-yellow-400">★</span>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="pt-6 md:pt-8 pb-6 md:pb-10 container mx-auto px-4 md:px-10 lg:mx-40">
      <div class="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3">
        <a href="#profile">
          <button id="profile-btn" class="w-[110px] sm:w-[135px] mt-2 sm:mt-3 border text-black px-4 sm:px-6 py-2 rounded-[24px] text-[14px] sm:text-base hover:bg-[#C76950] hover:text-white transition">
            Profile 
          </button>
        </a>
        
        <a href="#project">
          <button class="w-[110px] sm:w-[135px] mt-2 sm:mt-3 border text-black px-4 sm:px-6 py-2 rounded-[24px] text-[14px] sm:text-base hover:bg-[#C76950] hover:text-white transition">
            Projects 
          </button>
        </a>
        
        <a href="#rating">
          <button class="w-[110px] sm:w-[135px] mt-2 sm:mt-3 border text-black px-4 sm:px-6 py-2 rounded-[24px] text-[14px] sm:text-base hover:bg-[#C76950] hover:text-white transition">
            Rating 
          </button>
        </a>
      </div>
    </div>
    
    <!-- Profile Section -->
    <div id="profile" class="w-full max-w-[1240px] min-h-[150px] md:min-h-[200px] bg-[#F9EEEC] shadow rounded-2xl container mx-auto px-4 sm:px-6 md:px-10">
      <h6 class="font-bold pb-4 md:pb-7 pt-5 md:pt-7 text-[22px] sm:text-[26px] md:text-[30px]">Profile</h6>
      <p class="pb-5 md:pb-7 text-[14px] sm:text-[15px] md:text-base leading-relaxed">{{ engineer.bio }}</p>
    </div>

    <!-- Projects Section -->
    <div class="container mx-auto pt-8 md:pt-10 px-4" id="project">
      <h1 class="font-bold pb-5 md:pb-7 pt-5 md:pt-7 text-[22px] sm:text-[26px] md:text-[30px] md:pl-10">Projects</h1>
      <div class="overflow-x-auto scrollbar-none">
        <div class="flex gap-4 sm:gap-6 md:gap-8 pr-4 md:pl-10 pb-4">
          <div
            v-for="(img, index) in engineer.portfolio"
            :key="index"
            class="min-w-[280px] sm:min-w-[300px] md:min-w-[350px] bg-white rounded-3xl shadow overflow-hidden flex-shrink-0"
          >
            <img 
              :src="img" 
              class="w-full h-[280px] sm:h-[300px] md:h-[350px] object-cover cursor-pointer"
              @click="openImagePopup(index)"
            />
          </div>
        </div>
      </div>

      <!-- Image Popup -->
      <div 
        v-if="showImagePopup"
        class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        @click="showImagePopup = false"
      >
        <img 
          :src="engineer.portfolio[currentImageIndex]" 
          class="max-w-full max-h-[85vh] rounded-2xl shadow-xl"
          @click.stop
        />
        <button 
          class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-2xl sm:text-3xl"
          @click="showImagePopup = false"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Services Section -->
    <div class="container mx-auto pt-8 md:pt-10 px-4">
      <h1 class="font-bold pb-5 md:pb-7 pt-5 md:pt-7 text-[22px] sm:text-[26px] md:text-[30px] md:pl-10">Services</h1>
      <div class="overflow-x-auto scrollbar-none">
        <div class="flex gap-3 sm:gap-6 md:gap-8 md:pl-10 pb-4">
          <serviceCard
            v-for="(serv, index) in engineer.services"
            :key="index"
            :service="serv"
            class="min-w-[160px] sm:min-w-[200px] md:min-w-[280px] flex-shrink-0"
          /> 
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div id="rating" class="container mx-auto pt-8 md:pt-10 px-4">
      <h1 class="font-bold pb-5 md:pb-7 pt-5 md:pt-7 text-[22px] sm:text-[26px] md:text-[30px] md:pl-10">What Customers Say?</h1>
      <div class="overflow-x-auto scrollbar-none">
        <div class="flex gap-3 sm:gap-6 md:gap-8 md:pl-10 pb-4">
          <reviewCard
            v-for="(rev, index) in engineer.reviews"
            :key="index"
            :review="rev"
            class="min-w-[160px] sm:min-w-[200px] md:min-w-[280px] flex-shrink-0"
          /> 
        </div>
      </div>
    </div>

    <!-- Write Review Section -->
    <div class="container mx-auto px-4 pt-12 md:pt-20 pb-10">
      <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-6 max-w-[1150px] mx-auto border border-[#f2f2f2]">

        <h2 class="text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-gray-800 mb-6 md:mb-10">Write Your Review</h2>

        <div>
          <textarea
            class="w-full h-[100px] sm:h-[120px] px-3 sm:px-4 py-3 text-gray-500 text-[14px] sm:text-[15px] rounded-2xl border border-gray-300 resize-none leading-relaxed focus:outline-none focus:border-[#C76950]"
            placeholder="Share your feedback and help create a better shopping experience for everyone"
          ></textarea>
        </div>
          
        <div class="flex justify-center sm:justify-start">
          <button class="bg-[#C76950] text-white px-6 sm:px-10 py-2.5 sm:py-3 rounded-3xl text-[14px] sm:text-[16px] font-medium hover:bg-[#b65e47] transition mt-6 md:mt-8">
            Submit Review
          </button>
        </div>

      </div>
    </div>
  </div>
</template>
<!-- <style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style> -->