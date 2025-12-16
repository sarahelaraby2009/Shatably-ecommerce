<template>




  <div class="font-poppins">
    <NuxtLayout>

      <NuxtPage />

    </NuxtLayout>


  </div>
</template>
<style>
@import "swiper/swiper-bundle.css";
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

body {
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
}

html {
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
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
