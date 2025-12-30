<template>
<div class="container mx-auto  px-[20px] md:px-[40px] py-10">

<!-- Grid page -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-2  gap-y-7 items-start">
    
      <div>
    <img src="/about.png"></img>
    </div>
    <!--about us-->
    <div class="space-y-4">
  <h2 class="text-2xl font-bold">About us</h2>
      <p class="text-[#595959] text-[16px] md:text-[20px] leading-relaxed">
      Shatably simplifies the home-finishing journey by helping users shop a wide range of materials, calculate their finishing cost based on apartment size, and get instant advice through our smart chatbot. We also empower suppliers and engineers to showcase their work and reach new clients all in one trusted platform.
      </p>
    </div>
    <div class="lg:col-span-2 rounded-[24px] px-[24px] py-[30px]  bg-[#F9EEEC] ">
       <h2 class="title">Our vision</h2> 
       <p class="text-[14px] md:text-[20px]  pt-2">To become the most reliable digital destination for home finishing in the region where users confidently make decisions, professionals grow their businesses, and the entire finishing journey becomes transparent, efficient, and inspiring.</p>
      </div>
    <div>
        <h2 class="title"> What We Do</h2>
        <p class="text-[14px] md:text-[20px]  pt-2">We combine technology, materials, and professional expertise in one platform</p>
    </div>
    <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-[30px] gap-y-[20px] rounded-[24px]   md:px-[40px]  ">
         <!--1-->
        <div class="cardbox">
        <div class="flex items-center gap-3">
            <font-awesome-icon  icon="fa-solid fa-store"  class="text-[#C76950]  w-7 h-7"/>
          <h2 class="font-semibold text-[24px]  ">Smart Materials Shopping </h2>
          </div>
          <p class="leading-relaxed mt-3">Browse a wide collection of finishing products paints, flooring, doors, plumbing, electrical, and more from trusted suppliers.</p>
         </div>
         <!-- card 2--->
          <div class="cardbox">
        <div class="flex items-center gap-3">
            <font-awesome-icon  icon="fa-solid fa-calculator"  class="text-[#C76950]  w-7 h-7"/>
          <h2 class="font-semibold text-[24px]  ">Cost Calculation Tool </h2>
          </div>
          <p class="leading-relaxed mt-3">Users can enter their apartment size to get a clear estimate of finishing costs based on material selections and quality levels.</p>
         </div>
         <!--3-->
         <div class="cardbox">
        <div class="flex items-center gap-3">
            
            <font-awesome-icon  icon="fa-solid fa-robot" class="text-[#C76950]  w-7 h-7"/>
          <h2 class="font-semibold text-[24px]  "> AI Chat Support </h2>
          </div>
          <p class="leading-relaxed mt-3">Our smart chatbot acts as your personal advisor, giving you quick and helpful guidance for your finishing choices.</p>
         </div> 
         <!--4 -->
          <div class="cardbox">
        <div class="flex items-center gap-3">
            <font-awesome-icon  icon="fa-solid fa-briefcase"  class="text-[#C76950]  w-7 h-7"/>
          <h2 class="font-semibold text-[24px]  "> Supplier & Engineer Portfolios</h2>
          </div>
          <p class="leading-relaxed mt-3">
            Browse a wide collection of finishing products paints, flooring, doors, plumbing, electrical, and more from trusted suppliers.

          </p>
         </div>   
         
    </div>
    </div>


</div>


</template>
<script setup>
  useHead({
    title: 'About Us',
    meta: [
      {
        name: 'description',
        content: 'تعرف علينا وعلى رؤيتنا في تسهيل رحلة التشطيب المنزلي للمستخدمين والمهندسيين.'
      }
    ]
  })
</script>


<style scoped>
.cardbox {
  border-radius: 24px;
  width: 100%;              
  min-height: 174px;  
  /* width: 617px; */
  /* height: 174px; */
  background-color: #FEFEFE;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.title {
  color: #262626;
  font-weight: bold;
  font-size: 24px;
  border-bottom: none !important;
}
img {
  width: 100%;
  height: auto;
  max-width: 100%;
  display: block;
}
@media (max-width: 768px) {
  .cardbox {
    padding: 16px;
   min-height: 111px;
  }
  .cardbox h2{
     font-size: 16px;
    font-weight: 600;
  }
    .cardbox p {
    font-size: 12px;
  }
  .title{
       font-size: 16px;
  }
   
}
</style>