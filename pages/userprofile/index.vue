<template>
  <div class="p-3 pb-5">
    <h3 class="font-bold text-xl">Profile</h3>
    <p>View & Update Your Personal and Contact Information</p>
  </div>

  <div class="p-5 shadow rounded-3xl mt-4">
    <h3 class="font-bold text-xl">Contact Information</h3>

    <div class="flex flex-col md:flex-row gap-4 p-3">
      <div class="grid gap-2 w-full md:w-auto">
        <h1>Email</h1>
        <div class="w-full md:w-[250px] border border-gray-300 rounded-full p-3 outline-none">
          {{ profile.email }}
        </div>
      </div>
      <div class="grid gap-2 w-full md:w-auto">
        <h1>Phone Number</h1>
        <input
          v-model="profile.phone"
          type="number"
          placeholder="Enter your Number"
          class="w-full md:w-xl border border-gray-300 rounded-full p-3 outline-none focus:ring-1 focus:ring-[#C76950]"
        />
      </div>
    </div>
  </div>

  <div class="p-5 shadow rounded-3xl mt-10">
    <h3 class="font-bold text-xl">Personal Information</h3>

    <div class="flex flex-col md:flex-row gap-4 p-3">
      <div class="grid gap-2 w-full md:w-auto">
        <h1>First Name</h1>
        <input
          v-model="profile.firstName"
          type="text"
          placeholder="First Name"
          class="w-full md:w-xl border border-gray-300 rounded-full p-3 outline-none focus:ring-1 focus:ring-[#C76950]"
        />
      </div>
      <div class="grid gap-2 w-full md:w-auto">
        <h1>Last Name</h1>
        <input
          v-model="profile.lastName"
          type="text"
          placeholder="last name"
          class="w-full md:w-xl border border-gray-300 rounded-full p-3 outline-none focus:ring-1 focus:ring-[#C76950]"
        />
      </div>
    </div>

    <div class="flex gap-4 p-3">
      <input v-model="profile.gender" type="radio" name="Gender" value="Male" />
      <label>Male</label>
      <input v-model="profile.gender" type="radio" name="Gender" value="Female" />
      <label>Female</label>
    </div>
  </div>

  <div class="bg-[#C76950] hover:bg-[#B55F47] p-3 rounded-3xl text-center mt-10 cursor-pointer transition-colors">
    <button
      @click="updateProfile"
      :disabled="loading"
      class="w-full text-white font-semibold disabled:opacity-50"
    >
      {{ loading ? "Updating..." : "Save profile" }}
    </button>
  </div>

  <!-- Success Message -->
  <div
    v-if="successMessage"
    class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-3xl text-center"
  >
    {{ successMessage }}
  </div>

  <!-- Error Message -->
  <div
    v-if="errorMessage"
    class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-3xl text-center"
  >
    {{ errorMessage }}
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

useHead({
  title: 'User Profile',
  meta: [
    {
      name: 'description',
      content: 'تحكم في معلوماتك الشخصية ومعلومات الاتصال الخاصة بك بسهولة وأمان.'
    }
  ]
});

const { $auth, $db } = useNuxtApp();

const profile = ref({
  email: "",
  phone: "",
  firstName: "",
  lastName: "",
  gender: "",
  name: ""
});

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

// Validation regex  
const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]+$/;

// import user information
const fetchProfile = async (uid) => {
  try {
    const docSnap = await getDoc(doc($db, "users", uid));
    if (docSnap.exists()) {
      profile.value = { ...profile.value, ...docSnap.data() };
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    errorMessage.value = "Failed Loading Data";
  }
};

// update information function
const updateProfile = async () => {
  const user = $auth.currentUser;

  if (!user) {
    errorMessage.value = "You should sign in first";
    return;
  }

  // Validation 
  if (profile.value.firstName?.trim() && !nameRegex.test(profile.value.firstName)) {
    errorMessage.value = "First name must contain letters only";
    return;
  }

  if (profile.value.lastName?.trim() && !nameRegex.test(profile.value.lastName)) {
    errorMessage.value = "Last name must contain letters only";
    return;
  }

  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    const updatedData = {
      email: profile.value.email,
      phone: profile.value.phone,
      firstName: profile.value.firstName?.trim() || "",
      lastName: profile.value.lastName?.trim() || "",
      gender: profile.value.gender,
      name: `${profile.value.firstName?.trim() || ""} ${profile.value.lastName?.trim() || ""}`.trim()
    };

    await updateDoc(doc($db, "users", user.uid), updatedData);

    profile.value.name = updatedData.name;
    successMessage.value = "Profile updated successfully";

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);

  } catch (error) {
    console.error("Error updating profile:", error);
    errorMessage.value = "An error occurred during the update. Please try again";

  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  onAuthStateChanged($auth, (user) => {
    if (user) {
      fetchProfile(user.uid);
    } else {
      errorMessage.value = "Please, sign in first";
    }
  });
});

definePageMeta({
  layout: "default"
});
</script>