<script setup>
import { ref, onMounted, watch } from "vue";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNuxtApp } from "#app";
import { onAuthStateChanged } from "firebase/auth";

const { $auth, $db } = useNuxtApp();

const data = {
  feild1: "Profile",
  feild2: "Product uploads",
  feild3: "Orders track",
};

const userName = ref("");
const email = ref("");
const phoneNumber = ref("");
const firstName = ref("");
const lastName = ref("");
const gender = ref("");
const currentUser = ref(null);
const loading = ref(true);
const profileImage = ref("/5.jpg");

const loadSupplierData = async (user) => {
  if (!user) {
    loading.value = false;
    return;
  }

  try {
    const docRef = doc($db, "suppliers", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const supplierData = docSnap.data();
      userName.value = supplierData.name || "";
      email.value = supplierData.email || "";
      phoneNumber.value = supplierData.phoneNumber || "";
      gender.value = supplierData.gender || "";

      if (supplierData.image && supplierData.image.trim() !== "") {
        profileImage.value = supplierData.image;
      }

      const parts = (supplierData.name || "").split(" ");
      firstName.value = parts[0] || "";
      lastName.value = parts.slice(1).join(" ") || "";
    }
  } catch (err) {
    console.error("Error loading supplier data:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  onAuthStateChanged($auth, async (user) => {
    currentUser.value = user;
    if (user) {
      await loadSupplierData(user);
    } else {
      loading.value = false;
    }
  });
});

watch(currentUser, async (newUser) => {
  if (newUser) {
    await loadSupplierData(newUser);
  }
});

const handleImageSelect = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    profileImage.value = e.target.result;

    const user = $auth.currentUser;
    if (user) {
      await setDoc(
        doc($db, "suppliers", user.uid),
        {
          image: e.target.result,
        },
        { merge: true }
      );
    }
  };
  reader.readAsDataURL(file);
};

const updateProfile = async () => {
  const user = $auth.currentUser;
  if (!user) {
    alert("Please login first");
    return;
  }

  if (!firstName.value || !lastName.value || !email.value) {
    alert("Please fill in all required fields");
    return;
  }

  try {
    await setDoc(
      doc($db, "suppliers", user.uid),
      {
        name: `${firstName.value} ${lastName.value}`,
        email: email.value,
        phoneNumber: phoneNumber.value,
        gender: gender.value,
      },
      { merge: true }
    );

    userName.value = `${firstName.value} ${lastName.value}`;
    alert("Profile updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to update profile");
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Desktop -->
    <div class="hidden lg:flex justify-start items-start">
      <SideBar
        :feild1="data.feild1"
        :feild2="data.feild2"
        :feild3="data.feild3"
        :userName="userName"
        :email="email"
      />

      <div class="container m-auto p-4">
        <div v-if="loading" class="bg-white p-8 rounded-2xl shadow text-center">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#C76950]"
          ></div>
          <p class="text-gray-500 mt-4">Loading profile...</p>
        </div>

        <div v-else class="bg-white p-6 rounded-2xl shadow">
          <div class="p-3 pb-5">
            <h3 class="font-bold text-2xl">Profile</h3>
            <p class="text-gray-600">
              View & Update Your Personal and Contact Information
            </p>
          </div>

          <div class="p-5 shadow rounded-3xl mt-4">
            <h3 class="font-bold text-xl mb-4">Contact information</h3>
            <div class="flex gap-4">
              <div class="flex-1 grid gap-2">
                <h1 class="font-semibold">Email</h1>
                <input
                  type="email"
                  v-model="email"
                  class="border border-gray-300 rounded-full p-3 outline-none focus:border-[#C76950]"
                  placeholder="Enter your email"
                />
              </div>
              <div class="flex-1 grid gap-2">
                <h1 class="font-semibold">Phone Number</h1>
                <input
                  type="tel"
                  v-model="phoneNumber"
                  class="border border-gray-300 rounded-full p-3 outline-none focus:border-[#C76950]"
                  placeholder="Enter your number"
                />
              </div>
            </div>
          </div>

          <div class="p-5 shadow rounded-3xl mt-6">
            <h3 class="font-bold text-xl mb-4">Personal information</h3>
            <div class="flex gap-4">
              <div class="flex-1 grid gap-2">
                <h1 class="font-semibold">First Name</h1>
                <input
                  type="text"
                  v-model="firstName"
                  class="border border-gray-300 rounded-full p-3 outline-none focus:border-[#C76950]"
                  placeholder="First Name"
                />
              </div>
              <div class="flex-1 grid gap-2">
                <h1 class="font-semibold">Last Name</h1>
                <input
                  type="text"
                  v-model="lastName"
                  class="border border-gray-300 rounded-full p-3 outline-none focus:border-[#C76950]"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div class="flex gap-6 mt-4 px-3">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="male"
                  v-model="gender"
                  class="w-4 h-4 cursor-pointer"
                />
                <span class="text-gray-700">Male</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="female"
                  v-model="gender"
                  class="w-4 h-4 cursor-pointer"
                />
                <span class="text-gray-700">Female</span>
              </label>
            </div>
          </div>

          <button
            @click="updateProfile"
            class="w-full bg-[#C76950] text-white p-3 rounded-full text-center mt-6 cursor-pointer hover:bg-[#b85840] transition font-semibold"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="lg:hidden bg-white min-h-screen">
      <!-- Mobile -->
      <div class="border-b bg-white sticky top-0 z-10">
        <div class="flex justify-around border-t">
          <NuxtLink to="/supplier" class="flex-1">
            <div
              class="text-center py-4 text-sm font-medium transition-all border-b-2 text-[#C76950] border-[#C76950]"
            >
              {{ data.feild1 }}
            </div>
          </NuxtLink>

          <NuxtLink to="/supplier/productsUploads" class="flex-1">
            <div
              class="text-center py-4 text-sm font-medium transition-all border-b-2 text-gray-500 border-transparent"
            >
              {{ data.feild2 }}
            </div>
          </NuxtLink>

          <NuxtLink to="/supplier/ordersTrack" class="flex-1">
            <div
              class="text-center py-4 text-sm font-medium transition-all border-b-2 text-gray-500 border-transparent"
            >
              {{ data.feild3 }}
            </div>
          </NuxtLink>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center min-h-screen">
        <div class="text-center">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#C76950]"
          ></div>
          <p class="text-gray-500 mt-4">Loading profile...</p>
        </div>
      </div>

      <div v-else class="px-4 py-6">
        <div class="mb-6">
          <h2 class="text-xl font-bold">Profile</h2>
          <p class="text-xs text-gray-500">
            View & Update Your Personal and Contact Information
          </p>
        </div>

        <div class="flex items-center gap-3 mb-6">
          <div class="relative">
            <img
              :src="profileImage"
              alt="Profile"
              class="w-16 h-16 rounded-full object-cover"
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
              id="upload-mobile"
              type="file"
              accept="image/*"
              @change="handleImageSelect"
              class="hidden"
            />
          </div>
          <div>
            <p class="font-bold text-base">Hello {{ firstName }}!</p>
            <p class="text-base">{{ email }}</p>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="font-bold text-sm mb-3">Contact Information</h3>

          <div class="mb-3">
            <label class="text-xs text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              v-model="email"
              class="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#C76950] text-sm"
              placeholder="Marinamikhaeel@gmail.com"
            />
          </div>

          <div class="mb-3">
            <label class="text-xs text-gray-600 mb-1 block">Phone Number</label>
            <input
              type="tel"
              v-model="phoneNumber"
              class="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#C76950] text-sm text-gray-400"
              placeholder="enter your number"
            />
          </div>
        </div>

        <div class="mb-6">
          <h3 class="font-bold text-sm mb-3">Personal Information</h3>

          <div class="mb-3">
            <label class="text-xs text-gray-600 mb-1 block">First Name</label>
            <input
              type="text"
              v-model="firstName"
              class="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#C76950] text-sm"
              placeholder="Marina"
            />
          </div>

          <div class="mb-3">
            <label class="text-xs text-gray-600 mb-1 block">Last Name</label>
            <input
              type="text"
              v-model="lastName"
              class="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-[#C76950] text-sm"
              placeholder="Marina"
            />
          </div>

          <div class="flex gap-6 mt-3">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="male"
                v-model="gender"
                class="w-4 h-4 cursor-pointer accent-gray-400"
              />
              <span class="text-sm text-gray-600">Male</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="female"
                v-model="gender"
                class="w-4 h-4 cursor-pointer accent-gray-400"
              />
              <span class="text-sm text-gray-600">Female</span>
            </label>
          </div>
        </div>

        <button
          @click="updateProfile"
          class="w-full bg-[#C76950] text-white py-3 rounded-full font-medium hover:bg-[#b85840] transition text-sm"
        >
          Update profile
        </button>
      </div>
    </div>
  </div>
</template>
