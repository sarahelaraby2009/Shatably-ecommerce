<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { doc, collection, getDocs } from "firebase/firestore";

const route = useRoute();
const { $db } = useNuxtApp();

const categoryId = route.params.id;  
const subcategories = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const subRef = collection(doc($db, "categories", categoryId), "subcategories");
    const snap = await getDocs(subRef);

    if (snap.empty) {
      subcategories.value = [];
    } else {
      subcategories.value = snap.docs.map(d => ({
        id: d.id,
        name: d.data().name,
        image: d.data().image,
        to: `/categories/${categoryId}/subcategories/${d.id}` 
      }));
    }
  } catch (err) {
    console.error(err);
    error.value = "fall";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex justify-center items-center mt-[40px] mb-[40px]">
   <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <CategoryCard
        v-for="sub in subcategories"
        :key="sub.id"
        :id="sub.id"
        :name="sub.name"
        :image="sub.image"
        :to="sub.to"
      />
    </div>
  </div>
</template>
 

