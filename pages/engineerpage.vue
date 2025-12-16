
<template>

  <div class=" h-[400px] flex container mx-auto px-4 md:px-8 lg:px-12 gap-6 pb-10 mt-10">
    <img class="w-full h-full rounded-[16px] object-cover" src="/Engtitle.png">
  </div>

  <div 
    class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10 container mx-auto px-4 md:px-8 lg:px-12 pb-10"
  >
    <EngineerCard
      v-for="eng in engineers"
      :key="eng.id"
      :engineer="eng"
    />
  </div>

</template>


<script setup>

import{ref,onMounted} from'vue';
import { collection, getDocs } from 'firebase/firestore';
useHead({
  title: 'Engineers',
  meta: [
    {
      name: 'description',
      content: 'اكتشف مهندسين موهوبين في مجالات مختلفة وتواصل معهم لمشاريعك التقنية.'
    }
  ]
})

const {$db}=useNuxtApp()
const engineers=ref([])

onMounted(async () => {
  const engineer = collection($db, "engineers");
  const snapShot = await getDocs(engineer);
  console.log("📦 Snapshot size:", snapShot.size);

  engineers.value = snapShot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

});

definePageMeta({
  layout: "default"

})
</script>