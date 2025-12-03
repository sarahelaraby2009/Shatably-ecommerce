  <template>

    <EngineerSideBar>
      <div class="p-6 ml-12">
        <h1 class="text-2xl font-bold mb-4">Profile</h1>
        <p>View & Update Your Personal and Contact Information</p>
        <!-- Add more dashboard content here -->
      </div>
      <div>
        <div class="flex gap-20 ml-12">
          <!-- <div
          class="bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.08)] p-5  h-full w-[300px] flex flex-col gap-8 justify-start ml-8 mt-6 rounded-[24px] ">
          <div class="flex gap-3">
            <img src="/fake-profile.png" alt="profile" class="w-[70px]" />
            <p class="font-bold">Hello, {{ engineerName }}</p>
          </div>
          <div class="font-bold text-[24px] font-poppins ">My Account</div>
          <div @click="selected = 'profile'" class=" cursor-pointer flex gap-3 w-full p-2"
            :class="selected === 'profile' ? 'bg-[#EBCDC5] rounded-full ' : 'bg-transparent'"><font-awesome-icon
              :icon="['far', 'user']" />

            Profile</div>
          <div @click="selected = 'portfolio'" class=" cursor-pointer flex gap-3 w-full p-2"
            :class="selected === 'portfolio' ? 'bg-[#EBCDC5] rounded-full w-full' : 'bg-transparent'"><font-awesome-icon
              icon="fa-solid fa-briefcase" />Portfolio</div>
          <div @click="selected = 'services'" class=" cursor-pointer flex gap-3 w-full p-2"
            :class="selected === 'services' ? 'bg-[#EBCDC5] rounded-full w-full' : 'bg-transparent'"><font-awesome-icon
              icon="fa-solid fa-bell-concierge" />Services</div>

          <button @click="logout" class=" text-left mb-4 ">
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
            Logout </button>
        </div> -->

          <div class="flex flex-col justify-center  gap-2  mb-4">

            <div class="w-[500px] shadow-xl rounded-[24px] p-3 mb-3 mt-3 flex flex-col justify-center  gap-2 ">

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
    </EngineerSideBar>
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
    router.push('/signin');
  }
  const docSnap = await getDoc(doc($db, 'engineers', user.uid))
  if (docSnap.exists()) {
    const d = docSnap.data();
    engineerName.value = d.name;
    data.value = {
      position: d.position,
      specialization: d.specialization,
      yearsOfExperience: d.yearsOfExperience?.toString(),
      bio: d.bio,
    }
  }
})

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