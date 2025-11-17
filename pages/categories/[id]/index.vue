<template>
   <div>
   <NuxtLink v-for="subCat in subCategories":key="subCat.id":to="`/categories/${categoryId}/${subCat.id}`">
       <h1>{{ subCat.name }}</h1>
 <img :src="subCat.image"></img>



   </NuxtLink>

    
 

   </div>
    </template>
    <script setup>
import{ref,onMounted}from 'vue'
import { collection,getDocs } from 'firebase/firestore';
const subCategories=ref([])
const{$db}=useNuxtApp()
const route=useRoute()
const categoryId=route.params.id
onMounted(async()=>{
    const catRef=collection($db,`categories/${categoryId}/subcategories`)
    const snapshot=await getDocs(catRef)
    subCategories.value=snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    }))
})

</script>