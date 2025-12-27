<template>
  <div>
    <div class="relative min-h-screen w-full">
      <div
        class="blur-[2px] absolute bg-center inset-0 bg-cover"
        style="background-image: url('/sign.jpg')"
      >
        <div class="absolute inset-0 flex justify-center pointer-events-none">
          <div class="w-full h-full bg-black/40 rounded-[16px]"></div>
        </div>
      </div>

      <div
        class="relative ml-[-50px] z-10 flex flex-col-reverse lg:flex-row min-h-screen items-center px-5 py-10 gap-[50px] lg:gap-[120px] pl-[60px] lg:pl-[160px]">

        <div class="flex flex-col overflow-hidden m-5 bg-[#fefefe] lg:w-[500px] w-[340px] p-5 shadow-lg rounded-[20px] gap-[10px]">

          <form class="flex flex-col gap-2 w-full" @submit.prevent="handleSignUp">

            <h3 class="font-semibold text-base">sign up as :</h3>

            <div class="flex gap-2 justify-start items-center">
              <div class="options"
                @click="userRole = 'client'"
                :class="userRole === 'client' ? 'bg-[#C76950] text-[#fefefe]' : 'bg-transparent text-[#612B1F]'">
                Client
              </div>

              <div class="options"
                @click="userRole = 'engineer'"
                :class="userRole === 'engineer' ? 'bg-[#C76950] text-[#fefefe]' : 'bg-transparent text-[#612B1F]'">
                Engineer
              </div>

              <div class="options"
                @click="userRole = 'supplier'"
                :class="userRole === 'supplier' ? 'bg-[#C76950] text-[#fefefe]' : 'bg-transparent text-[#612B1F]'">
                Supplier
              </div>
            </div>

            <!-- Name -->
            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">Your name</label>
              <input required pattern="^[A-Za-z]+$"
                @invalid="(e) => e.target.setCustomValidity('Please enter Letters only')"
                @input="(e) => e.target.setCustomValidity('')"
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                v-model="name" placeholder="enter Your full name" type="text">
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">Email</label>
              <input required type="email"
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                v-model="email" placeholder="user@example.com">
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">Password</label>
              <input required type="password"
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                v-model="password" placeholder="*****">
            </div>

            <!-- Confirm Password -->
            <div class="flex flex-col gap-2 mb-2">
              <label class="font-semibold text-sm">confirm Password</label>
              <input required type="password"
                @input="matchPass"
                class="border focus:border-[#612B1F] outline-none shadow-md rounded-[20px] w-full h-10 px-3 text-sm"
                v-model="repassword" placeholder="*****">
            </div>

            <div>
              <input required type="checkbox">
              <span class="text-sm">
                Agree to our
                <span class="underline cursor-pointer">Terms and conditions</span>
              </span>
            </div>

            <span class="text-red-400 text-sm">{{ errorMessage }}</span>

            <div class="flex items-center gap-3 my-3">
              <div class="flex-1 h-px bg-gray-300"></div>
              <span class="text-gray-400 font-medium text-xs">or continue with</span>
              <div class="flex-1 h-px bg-gray-300"></div>
            </div>

            <!-- Google -->
            <div @click="googleSignUp"
              class="mb-3 flex cursor-pointer border border-gray-300 rounded-[20px] h-[35px] justify-center items-center text-center gap-3">
              <img src="/google.svg" class="w-5 h-5" alt="Google" />
              <p class="text-xs">Sign Up With Your Google Account</p>
            </div>

            <!-- Submit -->
            <button type="submit" :disabled="isLoading"
              class="text-[#fefefe] w-full h-10 text-center text-sm bg-[#C76950] rounded-[20px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isLoading ? "Loading..." : "Register" }}
            </button>

            <div class="text-center mt-3">
              <span class="text-sm text-gray-500">Already have an account?</span>
              <NuxtLink to="/signin" class="text-sm text-[#C76950] font-semibold hover:underline">
                Sign In
              </NuxtLink>
            </div>

          </form>

        </div>

        <div class="leading-[40px]">
          <p class="font-semibold text-[30px] text-[#fefefe] mb-5">
            Welcome to Shatably
          </p>
          <p class="text-[#fefefe] text-base">
            Make Your Dream Home A Reality with Shatbly
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDoc } from "firebase/firestore";

useHead({
  title: "Register | MyProject",
  meta: [{ name: "description", content: "انضم إلى مجتمعنا وابدأ رحلتك مع شطبلي اليوم." }],
});

definePageMeta({ layout: "withOutNavFoot" });

const email = ref("");
const name = ref("");
const password = ref("");
const repassword = ref("");
const errorMessage = ref("");
const userRole = ref("");
const isLoading = ref(false);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const { $auth } = useNuxtApp();
const { $db } = useNuxtApp();

const matchPass = () => {
  errorMessage.value = password.value !== repassword.value
    ? "Passwords don't match"
    : "";
};

// GOOGLE SIGNUP
const googleSignUp = async () => {
  errorMessage.value = "";
  if (!userRole.value) {
    errorMessage.value = "Please select your account type";
    return;
  }

  isLoading.value = true;

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup($auth, provider);
    const user = result.user;

    const userDoc = await getDoc(doc($db, "users", user.uid));

    if (userDoc.exists()) {
      const existingRole = userDoc.data().role;
      if (existingRole === "client") navigateTo("/");
      else if (existingRole === "engineer") navigateTo("/userEngineer/complete-profile");
      else navigateTo("/supplier");
      return;
    }

    await setDoc(doc($db, "users", user.uid), {
      email: user.email,
      name: user.displayName,
      role: userRole.value,
      cart: [],
      createdAt: serverTimestamp(),
    });

    if (userRole.value === "engineer") {
      await setDoc(doc($db, "engineers", user.uid), {
        name: user.displayName,
        email: user.email,
        portfolio: [],
        position: "",
        rating: 0,
        createdAt: serverTimestamp(),
        profileComplete: false,
        canUploadWork: false,
        hasMembership: false,
        membershipType: null,
        membershipExpiry: null,
        reviews: [],
        specialization: "",
        yearsOfExperience: 0,
        bio: "",
        image: user.image || "",
        certificateName: "",
      });
      navigateTo("/userEngineer/complete-profile");

    } else if (userRole.value === "supplier") {
      await setDoc(doc($db, "suppliers", user.uid), {
        name: user.displayName,
        email: user.email,
        rating: 0,
        products: [],
        createdAt: serverTimestamp(),
        image: user.photoURL || "",
        profileComplete: false,
        hasMembership: false,
      });
      navigateTo("/supplier/complete-profile");

    } else {
      await setDoc(doc($db, "clients", user.uid), {
        name: user.displayName,
        email: user.email,
        orders: [],
        favorites: [],
        createdAt: serverTimestamp(),
      });
      navigateTo("/");
    }

  } catch (err) {
    console.error("Google sign up error:", err);
    errorMessage.value = "Google sign up failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

// EMAIL REGISTER
const handleSignUp = async () => {
  errorMessage.value = "";

  if (!emailRegex.test(email.value)) {
    errorMessage.value = "Invalid email format";
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = "Password must be at least 6 characters";
    return;
  }

  if (password.value !== repassword.value) {
    errorMessage.value = "Passwords don't match";
    return;
  }

  if (!userRole.value) {
    errorMessage.value = "Please select your account type";
    return;
  }

  isLoading.value = true;

  try {
    const userCredential = await createUserWithEmailAndPassword($auth, email.value, password.value);
    const user = userCredential.user;

    await setDoc(doc($db, "users", user.uid), {
      email: email.value,
      name: name.value,
      role: userRole.value,
      cart: [],
      createdAt: serverTimestamp(),
    });

    if (userRole.value === "engineer") {
      await setDoc(doc($db, "engineers", user.uid), {
        name: name.value,
        email: email.value,
        portfolio: [],
        position: "",
        rating: 0,
        createdAt: serverTimestamp(),
        profileComplete: false,
        canUploadWork: false,
        hasMembership: false,
        membershipType: null,
        membershipExpiry: null,
        reviews: [],
        specialization: "",
        yearsOfExperience: 0,
        bio: "",
        image: "",
        services: [],
        mobile: "",
      });

    } else if (userRole.value === "supplier") {
      await setDoc(doc($db, "suppliers", user.uid), {
        name: name.value,
        email: email.value,
        rating: 0,
        products: [],
        createdAt: serverTimestamp(),
        profileComplete: false,
        image: "",
      });

    } else {
      await setDoc(doc($db, "clients", user.uid), {
        name: name.value,
        email: email.value,
        orders: [],
        favorites: [],
        createdAt: serverTimestamp(),
      });
    }

    navigateTo("/signin");

  } catch (err) {
    console.error("Sign up error:", err);
    if (err.code === "auth/email-already-in-use")
      errorMessage.value = "This email is already registered. Please sign in instead.";
    else if (err.code === "auth/weak-password")
      errorMessage.value = "Password is too weak.";
    else
      errorMessage.value = "Registration failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.options {
  border-radius: 20px;
  border: 1px solid #612b1f;
  cursor: pointer;
  text-align: center;
  height: 34px;
  padding: 12px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}
.options:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
