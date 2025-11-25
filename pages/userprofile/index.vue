<template>
 <div class="p-3 pb-5">
        <h3 class="font-bold text-xl"> Profile </h3>
<p> View & Update Your Personal and Contact Information</p>    
        </div>


<div class="p-5  shadow rounded-3xl mt-4">
     <h3 class="font-bold text-xl "> Contact information </h3>

     <div class="flex gap-4  p-3">
<div class="grid gap-2 ">
        <h1> Email </h1>
 <input
      type="email"
      placeholder="Example@gmail.com"
      class="w-xl border border-gray-300 rounded-full p-3 outline-none"
    />     </div>
     <div class="grid gap-2">
        <h1> Phone Number </h1>
 <input
      type="number"
      placeholder=" Phone number"
      class="w-xl border border-gray-300 rounded-full p-3 outline-none"
    />     </div>
     </div>
     
</div>

  <div class="p-5 shadow rounded-3xl mt-10">
     <h3 class="font-bold text-xl "> Personal information </h3>

     <div class="flex gap-4  p-3">
<div class="grid gap-2 ">
        <h1> First Name </h1>
 <input
      type="text"
      placeholder="First Name"
      class="w-xl border border-gray-300 rounded-full p-3 outline-none"
    />     </div>
     <div class="grid gap-2">
        <h1> Last Name </h1>
 <input
      type="text"
      placeholder=" Last Name"
      class="w-xl border border-gray-300 rounded-full p-3 outline-none"
    />     </div>
     </div>
     
     <div class="flex gap-4">
           <input  type="radio"  name="Gender" value="male" /> 
          <label> Male </label>
          <input  type="radio"  name="Gender" value="Female" />  
<label> Female </label>
     
     </div>
  
</div>


<div class="bg-[#C76950] p-3 rounded-3xl text-center mt-10 cursor-pointer">
    <button> Update Profile </button>
</div>   
</template>