<template>
    <div class="p-8">
        <h1 class="font-bold text-[32px]">wishlist</h1>
     <div v-if="loading" class="text-gray-500"> loading...</div>
    <div v-else="items.length ===0" class="text-gray-600">
        No items in your wishlist yet
    </div>
    <!--show product-->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <ProductCard
  v-for="p in items"
  :key="p.id"
  :product="p"
/>
    </div>
    </div>
</template>
<script setup>
import {ref ,onMounted}from "vue"
import { useAuth } from "~/composables/useAuth";
import {collection,getDocs} from 'firebase/firestore'
const{$db}=useNuxtApp()
const items=ref([])//دي منتجات اللي هتتعرض favourite
const loading=ref(true)
const{user}=useAuth()
onMounted(async()=>{
    if(!user.value) 
    return navigateTo("/signin")
    const FavRef = collection($db, `users/${user.value.uid}/wishlist`)//منتجات من firebase favourite
    const snapshot=await getDocs(FavRef)
    items.value=snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    }))
    loading.value=false
})
</script>
<style scoped>
</style>