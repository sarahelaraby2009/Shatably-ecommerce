<script setup>
import { collection, getDocs, addDoc } from "firebase/firestore";
const { $db } = useNuxtApp();

const migrate = async () => {
  try {
    console.log("Starting migration...");

    // 1) Fetch all categories
    const categoriesSnap = await getDocs(collection($db, "categories"));

    for (const categoryDoc of categoriesSnap.docs) {
      const categoryId = categoryDoc.id;

      // 2) Fetch all subcategories for each category
      const subSnap = await getDocs(
        collection($db, "categories", categoryId, "subcategories")
      );

      for (const subDoc of subSnap.docs) {
        const subId = subDoc.id;

        // 3) Fetch products inside each subcategory
        const productsSnap = await getDocs(
          collection($db, "categories", categoryId, "subcategories", subId, "products")
        );

        for (const productDoc of productsSnap.docs) {
          const data = productDoc.data();

          // 4) Add product to root /products
          await addDoc(collection($db, "products"), {
            ...data,
            categoryId,
            subId,
            migratedAt: new Date()
          });

          console.log(`Migrated product: ${productDoc.id}`);
        }
      }
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration error:", error);
  }
};
</script>

<template>
  <div class="p-10">
    <button
      @click="migrate"
      class="px-6 py-3 bg-green-600 text-white rounded-lg"
    >
      Run Migration
    </button>
  </div>
</template>