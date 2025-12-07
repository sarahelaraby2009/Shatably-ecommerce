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
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>


  </template>

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { ref, onMounted } from "vue";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import EditableField from "~/components/EditableField.vue";

definePageMeta({
  layout: 'default'
})

const auth = getAuth();
const router = useRouter();
const { $db } = useNuxtApp();
const engineerName = ref('');
const engineerImage = ref('');
const selected = ref('profile')
const data = ref({
  position: '',
  specialization: '',
  yearsOfExperience: '',
  bio: ''

})
onMounted(async () => {
  const user = auth.currentUser;
  if (!user) {
    return router.push('/signin');
  }

  const docSnap = await getDoc(doc($db, 'engineers', user.uid));
  if (!docSnap.exists()) {
    return router.push('/userEngineer/complete-profile');
  }

  const d = docSnap.data();

  if (d.profileComplete === false) {
    return router.push('/userEngineer/complete-profile');
  }

  if (!d.position || !d.specialization || !d.yearsOfExperience || !d.bio) {
    return router.push('/userEngineer/complete-profile');
  }

  engineerName.value = d.name;
  engineerImage.value = d.image;
  data.value = {
    position: d.position,
    specialization: d.specialization,
    yearsOfExperience: d.yearsOfExperience?.toString(),
    bio: d.bio,
  };
});

const saveChanges = async () => {
  const user = auth.currentUser
    ;
  try {
    await updateDoc(doc($db, 'engineers', user.uid), {
      position: data.value.position,
      specialization: data.value.specialization,
      yearsOfExperience: Number(data.value.yearsOfExperience),
      bio: data.value.bio
    })
  } catch (e) {
    console.error("Error updating profile:", e)
  }
}
const logout = async () => {
  await signOut(auth);
  router.push('/signin');
}

</script>