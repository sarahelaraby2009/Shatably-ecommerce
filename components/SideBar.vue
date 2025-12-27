<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNuxtApp } from "#app";

const { $auth, $db } = useNuxtApp();

// ----------------------------
// Reactive object لكل بيانات المورد
const supplierData = ref({
  name: "",
  email: "",
  phoneNumber: "",
  gender: "",
  profileImage: "/5.jpg", // صورة افتراضية
});

// ----------------------------
// جلب بيانات المورد من Firebase
const fetchSupplier = async (uid) => {
  try {
    const snap = await getDoc(doc($db, "suppliers", uid));
    if (snap.exists()) {
      const data = snap.data();
      supplierData.value = data;

      // جلب الصورة من Firebase
      if (data.image && data.image.trim() !== "") {
        supplierData.value.profileImage = data.image;
      }
    }
  } catch (err) {
    console.error("Error fetching supplier:", err);
  }
};
// ----------------------------
// رفع صورة البروفايل وتحديثها
const handleImageSelect = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    supplierData.value.profileImage = e.target.result;

    const user = $auth.currentUser;
    if (user) {
      await updateDoc(doc($db, "suppliers", user.uid), {
        profileImage: e.target.result,
      });
    }
  };
  reader.readAsDataURL(file);
};

// ----------------------------
// تحديث بيانات المورد (email, phone, name, gender)
const updateSupplierData = async () => {
  const user = $auth.currentUser;
  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    await updateDoc(doc($db, "suppliers", user.uid), {
      name: supplierData.value.name,
      email: supplierData.value.email,
      phoneNumber: supplierData.value.phoneNumber,
      gender: supplierData.value.gender,
      profileImage: supplierData.value.profileImage,
    });

    alert("Profile updated successfully!");
  } catch (err) {
    console.error("Error updating supplier:", err);
    alert("Failed to update profile");
  }
};

// ----------------------------
// Mounted: تحقق من المستخدم وجلب البيانات
onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (user) fetchSupplier(user.uid);
  });
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile -->
    <div class="lg:hidden pt-6 pb-10">
      <!-- Tabs -->
      <nav class="flex gap-6 mb-6 border-b">
        <NuxtLink
          to="/supplier"
          class="pb-2 text-sm font-medium"
          :class="
            $route.path === '/supplier'
              ? 'text-[#C17767] border-b-2 border-[#C17767]'
              : 'text-gray-500'
          "
        >
          Profile
        </NuxtLink>
        <NuxtLink
          to="/supplier/productsUploads"
          class="pb-2 text-sm font-medium"
          :class="
            $route.path === '/supplier/productsUploads'
              ? 'text-[#C17767] border-b-2 border-[#C17767]'
              : 'text-gray-500'
          "
        >
          Product uploads
        </NuxtLink>
        
        <NuxtLink
          to="/supplier/ordersTrack"
          class="pb-2 text-sm font-medium"
          :class="
            $route.path === '/supplier/ordersTrack'
              ? 'text-[#C17767] border-b-2 border-[#C17767]'
              : 'text-gray-500'
          "
        >
          Orders track
        </NuxtLink>
      </nav>

      <!-- Content -->
      <div class="bg-white p-4 rounded-2xl shadow">
        <div class="flex items-start gap-3 mb-6">
         <div class="relative flex-shrink-0">
            <img
              :src="supplierData.profileImage"
              class="w-14 h-14 rounded-full object-cover shadow-md"
            />
            <label
              for="upload-desktop"
              class="absolute bottom-[-6px] right-[-5px] flex justify-center items-center w-[25px] h-[25px] bg-white text-white p-2 rounded-[50px] shadow-md cursor-pointer hover:bg-[#EBCDC5] transition"
            >
              <font-awesome-icon
                :icon="['far', 'camera']"
                class="text-[12px] text-black"
              />
            </label>
            <input
              id="upload-desktop"
              type="file"
              accept="image/*"
              @change="handleImageSelect"
              hidden
            />
          </div>
          <div>
            <h3 class="font-bold text-lg">Hello {{ supplierData.name }}!</h3>
            <p class="text-sm text-gray-500">{{ supplierData.email }}</p>
          </div>
        </div>

        <!-- Form لتعديل البيانات -->
        <div class="space-y-4">
          <input
            v-model="supplierData.name"
            type="text"
            placeholder="Full Name"
            class="w-full border rounded px-3 py-2"
          />
          <input
            v-model="supplierData.email"
            type="email"
            placeholder="Email"
            class="w-full border rounded px-3 py-2"
          />
          <input
            v-model="supplierData.phoneNumber"
            type="tel"
            placeholder="Phone Number"
            class="w-full border rounded px-3 py-2"
          />
          <div class="flex gap-4">
            <label>
              <input type="radio" value="male" v-model="supplierData.gender" />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                v-model="supplierData.gender"
              />
              Female
            </label>
          </div>

          <button
            @click="updateSupplierData"
            class="w-full bg-[#C76950] text-white py-2 rounded hover:bg-[#b85840] transition"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden lg:grid grid-cols-[350px_1fr] pt-10 gap-10 pb-10">
      <aside class="space-y-1 shadow rounded-2xl h-[600px] p-5">
        <div class="flex gap-4 items-start mb-5">
          <div class="relative flex-shrink-0">
            <img
              :src="supplierData.profileImage"
              class="w-14 h-14 rounded-full object-cover shadow-md"
            />
            <label
              for="upload-desktop"
              class="absolute bottom-[-6px] right-[-5px] flex justify-center items-center w-[25px] h-[25px] bg-white text-white p-2 rounded-[50px] shadow-md cursor-pointer hover:bg-[#EBCDC5] transition"
            >
              <font-awesome-icon
                :icon="['far', 'camera']"
                class="text-[12px] text-black"
              />
            </label>
            <input
              id="upload-desktop"
              type="file"
              accept="image/*"
              @change="handleImageSelect"
              hidden
            />
          </div>
          <div class="grid">
            <h3 class="pt-1 font-bold text-xl">
              Hello {{ supplierData.name }}
            </h3>
            <p class="text-sm text-gray-500">{{ supplierData.email }}</p>
          </div>
        </div>

        <hr />

        <div class="space-y-5">
          <NuxtLink
            to="/supplier"
            class="block p-2 hover:bg-[#EBCDC5] rounded-2xl text-lg font-medium"
          >
          <font-awesome-icon :icon="['fas', 'user']" class="text-[20px]" />
            Profile
          </NuxtLink>
          <NuxtLink
            to="/supplier/productsUploads"
            class="block p-2 hover:bg-[#EBCDC5] rounded-2xl text-lg font-medium"
          >
           <font-awesome-icon
                  :icon="['fas', 'location-dot']"
                  class="text-[20px]"
                />
            Product uploads
          </NuxtLink>
          <NuxtLink
            to="/supplier/ordersTrack"
            class="block p-2 hover:bg-[#EBCDC5] rounded-2xl text-lg font-medium"
          >
           <font-awesome-icon
                  :icon="['fas', 'bookmark']"
                  class="text-[20px]"
                />
            Orders track
          </NuxtLink>
        <hr/>
          <NuxtLink
            to="/signin"
            class="block p-2 hover:bg-[#EBCDC5] rounded-2xl text-lg font-medium"
          >
                        <font-awesome-icon
                :icon="['fas', 'right-from-bracket']"
                class="text-[20px]"
              />

            Log out
          </NuxtLink>
        </div>
      </aside>

      <main>
        <NuxtPage />
      </main>
    </div>
  </div>
</template>
