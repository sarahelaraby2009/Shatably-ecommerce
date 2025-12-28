  <template>
    <div class="flex flex-col lg:flex-row min-h-screen ">
      <EngineerSideBar class="hidden lg:block  w-[500px]" />


      <EngineerMobileView class="block lg:hidden" />
      
      <div class="flex flex-col flex-1 lg:p-10 p-4  min-h-screen">
        <div class="p-4 ">
          <h1 class="text-2xl font-bold mb-4">Profile</h1>
          <p>View & Update Your Personal and Contact Information</p>
          <div class="block lg:hidden">
            <div>
              <img :src="engineerImage" class="w-14 h-14 rounded-[22px] object-cover ml-5 "></img>
              <h3 class="pt-1 font-bold text-xl ml-5">{{ engineerName }}</h3>
            </div>
          </div>
          <!-- Add more dashboard content here -->
        </div>
        <div>
          <div class="px-3">


            <div class="w-full max-w-[500px]">

              <div class="w-auto lg:w-[500px] shadow-xl rounded-[24px] p-3 mb-3 mt-3 flex flex-col justify-center  gap-2 ">

                <EditableField label="Your Position" v-model="data.position" />
                <EditableField label="specialization" v-model="data.specialization" />
                <EditableField label="Your Experience" v-model="data.yearsOfExperience" />
                <EditableField label="Bio" v-model="data.bio" />
                <button @click="saveChanges"
                  :disabled="!data.position?.trim() || !data.specialization?.trim() || !data.yearsOfExperience?.trim() || !data.bio?.trim()"
                  :class="{ 'opacity-50 cursor-not-allowed': !data.position?.trim() || !data.specialization?.trim() || !data.yearsOfExperience?.trim() || !data.bio?.trim() }"
                  class="bg-[#C76950] w-full text-white px-2 py-1 rounded-xl shadow  transition">
                  Save Profile
                </button>
                          <p class="text-green-600 text-sm text-center mt-2">{{ successMessage }}</p>

              </div>

            </div>

          </div>
        </div>
      </div>

    </div>


  </template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useAuth } from "~/composables/useAuth";
import EditableField from "~/components/EditableField.vue";
useHead({
  title: "Engineer Dashboard",
  meta: [
    {
      name: "description",
      content: "تصفح لوحة تحكم المهندس الخاصة بك لإدارة ملفك الشخصي ومشاريعك بسهولة.",
    },
    {'keywords': 'لوحة تحكم مهندس, بروفايل مهندس, إدارة مشاريع, تحديث ملف شخصي, خبرة مهندس, تخصص مهندس, خدمات مهندس, عملاء, تصميم, تطوير'},
  ],
});

definePageMeta({
  layout: "default",
  
});

const router = useRouter();
const { $db, $auth } = useNuxtApp();
const { user } = useAuth();

// UI state
const engineerName = ref("");
const engineerImage = ref("");
const successMessage = ref("");

// form data
const data = ref({
  position: "",
  specialization: "",
  yearsOfExperience: "",
  bio: ""
});

onMounted(async () => {
  if (!user.value) {
    return router.push("/signin");
  }

  const docRef = doc($db, "engineers", user.value.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return router.push("/userEngineer/complete-profile");
  }

  const d = docSnap.data();

  if (!d.profileComplete) {
    return router.push("/userEngineer/complete-profile");
  }

  if (!d.position || !d.specialization || !d.yearsOfExperience || !d.bio) {
    return router.push("/userEngineer/complete-profile");
  }

  engineerName.value = d.name || "";
  engineerImage.value = d.image || "/default.png";

  data.value = {
    position: d.position,
    specialization: d.specialization,
    yearsOfExperience: d.yearsOfExperience.toString(),
    bio: d.bio
  };
});

const saveChanges = async () => {
  if (!user.value) return;

  try {
    await updateDoc(doc($db, "engineers", user.value.uid), {
      position: data.value.position,
      specialization: data.value.specialization,
      yearsOfExperience: Number(data.value.yearsOfExperience),
      bio: data.value.bio,
      profileComplete: true
    });

    successMessage.value = "Your data has been updated successfully";
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

const logout = async () => {
  await signOut($auth);
  router.push("/signin");
};
</script>
