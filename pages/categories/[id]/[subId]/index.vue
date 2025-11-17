<template>

   <div>
   <NuxtLink v-for="product in products":key="product.id":to="`/categories/${categoryId}/${subId}/${product.id}`">
       <h1>{{ product.name }}</h1>
 <img :src="product.image"></img>



   </NuxtLink>

    
 

   </div>
    </template>
    <script setup>
import{ref,onMounted}from 'vue'
import { collection,getDocs } from 'firebase/firestore';
const products=ref([])
const{$db}=useNuxtApp()
const route=useRoute()
const categoryId=route.params.id
const subId=route.params.subId
onMounted(async()=>{
    const productsRef =collection($db,`categories/${categoryId}/subcategories/${subId}/products`)
    const snapshot=await getDocs(productsRef)
    products.value=snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    }))
})

</script>
