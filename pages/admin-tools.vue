<script setup>
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
const { $db } = useNuxtApp();


// 1️⃣ Delete floor products from /products
const deleteFloorProducts = async () => {
  try {
    alert("Deleting floor products...");

    const q = query(collection($db, "products"), where("categoryId", "==", "CRkVU2ug2MUHAAX92d61"));
    const snap = await getDocs(q);

    if (snap.empty) {
      alert("No floor products found ❌");
      return;
    }

    for (const d of snap.docs) {
      await deleteDoc(doc($db, "products", d.id));
      console.log("Deleted:", d.id);
    }

    alert("Floor products deleted successfully ✅");
  } catch (error) {
    console.error(error);
    alert("Error happened, check console");
  }
};

</script>

<template>
  <div class="p-10">
    
    <h1 class="text-2xl font-bold mb-5">
      Admin Tools
    </h1>

    <button
      @click="deleteFloorProducts"
      class="px-6 py-3 bg-red-600 text-white rounded-lg"
    >
      Delete Floor Products
    </button>

    <p class="mt-5 text-gray-600">
      بعد ما تدوسي الزرار ده وتتحذف البيانات، شغّلي صفحة الـ Migration اللي كنتِ عاملاها قبل كده.
    </p>

  </div>
</template>
