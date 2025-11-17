<template>
 <div>
 <NuxtLink v-for="category in categories":key="category.id":to="`/categories/${category.id}`">
 
 <h1>{{ category.name }}</h1>
 <img :src="category.image"></img>
 
 </NuxtLink>


 </div>




</template>
<script setup>
import {ref,onMounted}from 'vue'
import{collection,getDocs}from 'firebase/firestore';
const categories=ref([])
const{$db}=useNuxtApp()
onMounted(async()=>{
    const categoryRef=collection($db,"categories")
    const snapshot=await getDocs(categoryRef)
    categories.value=snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
    }))
})


</script>