<template>
  <div>
    <div class="flex">
      <div class="bg-white shadow-md ml-4 h-full w-[300px] flex flex-col gap-8 justify-center items-center p-2">
        <h2 class="font-bold text-[#C76950] text-[25px] text-center mt-3">My Account</h2>
        <div class=" cursor-pointer">Dashboard</div>
        <div class=" cursor-pointer">Upload Portfolio Image</div>
        <div class=" cursor-pointer">Add Project</div>
        <div class=" cursor-pointer">Membership</div>
        <div class=" cursor-pointer">Edit Profile</div>
        <button @click="logout" class="mt-auto mb-5 border border-[#C76950] text-[#C76950] rounded-[20px] h-10 mx-5 w-full">
          Logout  </button>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, signOut } from "firebase/auth"; 
const auth = getAuth();
const logout=async()=>{
  await signOut(auth);
  navigateTo('/signin');  
}

</script>