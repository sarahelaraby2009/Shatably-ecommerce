<template>
  <div class="p-10">
    
    <h1 class="text-2xl font-bold mb-6">
      Search results for "{{ queryText }}"
    </h1>

    <!-- لو لسه بنحمّل -->
    <div v-if="loading">loading...</div>

    <!-- لو مفيش نتائج -->
    <div v-else-if="results.length === 0" class="text-gray-500 text-lg">
     
          product is not found 
    </div>

    <!-- عرض المنتجات -->
    <div v-else class="grid grid-cols-3 gap-6">
  <div v-for="item in results" :key="item.id">
  <ProductCard :product="item" />
</div>
    </div>

  </div>
</template>
<script setup>
import{ref,onMounted,watch} from 'vue'
import { collection,getDocs } from 'firebase/firestore'

useHead({
  title: 'Search | MyProject',
  meta: [
    {
      name: 'description',
      content: 'ابحث عن المنتجات التي تناسب احتياجاتك في مجال التشطيب المنزلي بسهولة وسرعة.'
    }
  ]
})
const route = useRoute()
const queryText = ref(route.query.query) //search word
const allProducts=ref([])
const results=ref([])
const loading=ref(true)
const { $db } = useNuxtApp()
onMounted(async()=>{
      const snapshot = await getDocs(collection($db, "products"))
      allProducts.value=snapshot.docs
      .map(doc=>({id:doc.id,
        ...doc.data()
      }))
      applySearch(queryText.value)
      
   loading.value = false
 })
 watch(
  () => route.query.query,
  (newQuery) => {
    queryText.value = newQuery
    applySearch(newQuery)
  }
)

function applySearch(word) {
  if (!word){
    results.value=[]
return  
}

  const search = word.toLowerCase()

  results.value = allProducts.value.filter(item =>
    item.name?.toLowerCase().includes(search)
  )
}
</script>