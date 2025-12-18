<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const route = useRoute();
const { $db } = useNuxtApp();

const categoryId = route.params.id;  
const subcategories = ref([]);
const headerImage = ref("/assets/image 4.png"); // Default image
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    // Fetch the category document to get the header image
    const categoryDoc = await getDoc(doc($db, "categories", categoryId));
    if (categoryDoc.exists() && categoryDoc.data().header) {
      headerImage.value = categoryDoc.data().header;
    }

    // Fetch subcategories
    const subRef = collection(doc($db, "categories", categoryId), "subcategories");
    const snap = await getDocs(subRef);

    if (snap.empty) {
      subcategories.value = [];
    } else {
      subcategories.value = snap.docs.map(d => ({
        id: d.id,
        name: d.data().name,
        image: d.data().image,
        to: `/categories/${categoryId}/${d.id}` 
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
  <div class="min-h-screen bg-white">
    <div class="flex items-center gap-2 text-sm mx-6 lg:mx-10 mt-10">
      <NuxtLink to="/" class="text-gray-600 hover:text-[#C76950]">
        Home
      </NuxtLink>
      <font-awesome-icon
        :icon="['fas', 'chevron-right']"
        class="text-[12px]"
      />
      <NuxtLink to="/categories" class="text-gray-600 hover:text-[#C76950]">
        Categories
      </NuxtLink>
      <font-awesome-icon
        :icon="['fas', 'chevron-right']"
        class="text-[12px]"
      />
      <NuxtLink to="#" class="text-[#C76950] font-semibold">
        SubCategories
      </NuxtLink>
    </div>

    <div class="flex justify-center mt-6 px-6 lg:px-10">
      <div class="w-full max-w-[1256px] h-auto">
        <img 
          :src="headerImage"
          alt="subcategories"
          class="w-full h-full object-cover rounded-2xl" 
        />
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center mt-10 mb-10">
      <div class="text-gray-500">Loading...</div>
    </div>

    <div v-else-if="error" class="flex justify-center items-center mt-10 mb-10">
      <div class="text-red-500">Failed to load subcategories</div>
    </div>

    <div v-else class="flex justify-center items-center mt-10 mb-10 px-4 sm:px-6">
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-[1256px]">
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

    <div v-if="!loading && !error && subcategories.length === 0" class="flex justify-center items-center mt-10 mb-10">
      <div class="text-gray-500">No subcategories found</div>
    </div>
  </div>
</template>