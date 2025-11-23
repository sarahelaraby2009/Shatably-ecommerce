<template>

 

 
  <div class="font-poppins">  
    <NuxtLayout>
       <NuxtPage />
    </NuxtLayout>
   
  
  </div>
</template>
<style>
@import "swiper/swiper-bundle.css";
body {
  overflow-x: hidden;
}

html {
  overflow-x: hidden;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;  
  scrollbar-width: none;  
}
.slider-track {
  width: max-content;
  animation: scroll-left 25s linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
