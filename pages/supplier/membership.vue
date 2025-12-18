<script setup>
import { onMounted, ref } from "vue";
import { useNuxtApp } from "#app";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

useHead({
  title: "Supplier Membership",
  meta: [
    {
      name: "description",
      content:
        "استعرض وحدث ملف المورد الخاص بك بسهولة لضمان تقديم أفضل الخدمات والمنتجات لعملائك.",
    },
    {
      keywords:
        "مورد, ملف مورد, تحديث ملف مورد, معلومات مورد, خدمات مورد, منتجات مورد, تجارة إلكترونية, متجر إلكتروني, تسوق عبر الإنترنت, عروض خاصة",
    },
  ],
});

const { $auth, $db } = useNuxtApp();
const router = useRouter();
const userName = ref("");
const supplierImage = ref("/5.jpg");
const selectedFile = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");

onMounted(() => {
  onAuthStateChanged($auth, async (user) => {
    if (!user) {
      router.push("/register");
    } else {
      try {
        const supplierDoc = await getDoc(doc($db, "suppliers", user.uid));
        if (supplierDoc.exists()) {
          const supplierData = supplierDoc.data();
          userName.value = supplierData.name || user.displayName || "";

          if (supplierData.image && supplierData.image.trim() !== "") {
            supplierImage.value = supplierData.image;
          }
        } else {
          userName.value = user.displayName || "";
        }
      } catch (err) {
        console.error("Error fetching supplier data:", err);
        userName.value = user.displayName || "";
      }
    }
  });
});

const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (file) {
    if (!file.type.startsWith("image/")) {
      errorMessage.value = "Please select an image file";
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      errorMessage.value = "Image size must be less than 1MB";
      return;
    }

    selectedFile.value = file;
    errorMessage.value = "";
    isLoading.value = true;

    try {
      // قراءة الصورة كـ Base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        supplierImage.value = base64Image;

        // حفظ فوراً في Firestore
        const user = $auth.currentUser;
        if (user) {
          await setDoc(
            doc($db, "suppliers", user.uid),
            {
              image: base64Image,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
          console.log("Image saved to Firebase");
        }
        isLoading.value = false;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Error saving image:", err);
      errorMessage.value = "Failed to save image";
      isLoading.value = false;
    }
  }
};

const continueToProfile = async () => {
  const user = $auth.currentUser;
  if (!user) return;

  isLoading.value = true;
  errorMessage.value = "";

  try {
    const updateData = {
      profileComplete: true,
      updatedAt: serverTimestamp(),
    };

    if (selectedFile.value && supplierImage.value) {
      updateData.image = supplierImage.value;
    }

    await setDoc(doc($db, "suppliers", user.uid), updateData, { merge: true });

    router.push("/supplier/compelete-profile");
  } catch (err) {
    console.error("Error updating profile:", err);
    errorMessage.value = err.message || "Failed to update profile. Try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex-col">
    <div
      class="flex items-start py-12 px-6 bg-white shadow rounded-xl mx-4 md:mx-[90px] mt-6 md:mt-[30px]"
    >
      <div
        class="w-20 h-20 md:w-[130px] md:h-[150px] flex-shrink-0 relative group"
      >
        <img
          :src="supplierImage"
          class="w-full h-full rounded-[24px] object-contain shadow-md"
          alt="Supplier"
        />
        <label
          class="absolute bottom-[-7px] right-[-7px] flex justify-center items-center bg-white text-white p-2 rounded-[50px] shadow-md cursor-pointer hover:bg-[#EBCDC5] transition"
        >
          <font-awesome-icon
            :icon="['far', 'camera']"
            class="text-[18px] text-black"
          />

          <input
            type="file"
            @change="handleFileSelect"
            accept="image/*"
            class="hidden"
          />
        </label>
      </div>
      <p class="m-4 font-bold text-[22px] md:text-[26px]">
        Hello, {{ userName }}
      </p>
    </div>

    <!-- title -->
    <div class="mx-4 md:mx-[90px] p-2">
      <h2 class="text-[22px] md:text-[26px] font-medium">Become a Supplier</h2>
      <p class="text-sm md:text-base">
        Join our marketplace and start selling your products. Review the
        commission and requirements.
      </p>
    </div>

    <!-- main card container -->
    <div class="md:py-[50px] md:px-[70px] mx-4 md:mx-[90px] my-10 md:my-[40px]">
      <div class="flex flex-col space-y-4">
        <div class="bg-[#EBCDC5] p-[24px] rounded-[24px]">
          <h2 class="text-[20px] md:text-[26px] font-medium">
            Commission Structure
          </h2>
          <ul class="list-disc px-8 mt-2">
            <li>Standard Commission: 30% per sale</li>
            <li>No hidden fees</li>
          </ul>
        </div>

        <div class="bg-[#EBCDC5] p-[24px] rounded-[24px]">
          <h2 class="text-[20px] md:text-[26px] font-medium">Requirements</h2>
          <ul class="list-disc px-8 mt-2">
            <li>Commercial Register Document</li>
            <li>Tax ID Certificate</li>
            <li>Valid National ID</li>
          </ul>
        </div>

        <div class="mt-2">
          <div
            class="bg-[#C76950] p-3 rounded-3xl text-center text-white cursor-pointer hover:bg-[#b25745] transition disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'opacity-50 cursor-not-allowed': isLoading }"
          >
            <button @click="continueToProfile" :disabled="isLoading">
              {{ isLoading ? "Uploading..." : "Continue" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>