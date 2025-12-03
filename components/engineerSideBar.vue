<template>

    <div class="container m-auto">


        <div class="grid grid-cols-[300px_1fr] pt-10 gap-10 pb-10">

            <!-- Sidebar left -->
            <aside class="space-y-1 shadow rounded-2xl h-[600px]">
                <!-- image+name -->
                <div class="flex gap-4 pt-5">

                    <div class="relative">
                        <img :src="engineerImage" class="w-14 h-14 rounded-full object-cover ml-5 ">
                        <label for="upload"
                            class="absolute bottom-0 right-0 bg-white border rounded-full object-cover pr-1 pl-1 shadow cursor-pointer">
                            <font-awesome-icon :icon="['fas', 'edit']" class="text-gray-700 text-xs" />
                        </label>
                    </div>
                    <div class="grid">
                        <h3 class="pt-1 font-bold text-xl">{{ engineerName }}</h3>
                        <p class="text-sm text-gray-500 pb-5"> {{ engineerEmail }}</p>
                        <p class="text-sm text-gray-500 pb-5"> {{ engineerPosition }}</p>
                    </div>
                </div>

                <hr />
                <!-- info -->
                <div class="space-y-5 pl-5 pr-2 h-[800px] ">

                    <h3 class="font-bold pt-5 text-2xl pb-5"> My Account</h3>

                    <NuxtLink to="/userEngineer/dashboard">
                        <div class="flex items-center gap-3 p-2 hover:bg-[#EBCDC5] rounded-2xl cursor-pointer">
                            <font-awesome-icon :icon="['fas', 'user']" class="text-[20px]" />
                            <p class="text-lg font-medium">Profile</p>
                        </div>
                    </NuxtLink>



                    <NuxtLink to="/userEngineer/dashboard/portfolio">
                        <div class="flex items-center gap-3 p-2 hover:bg-[#EBCDC5] rounded-2xl cursor-pointer">
                            <font-awesome-icon :icon="['far', 'user']" />
                            <p class="text-lg font-medium">Portfolio </p>
                        </div>
                    </NuxtLink>


                    <NuxtLink to="/userEngineer/dashboard/services">
                        <div class="flex items-center gap-3 p-2 hover:bg-[#EBCDC5] rounded-2xl cursor-pointer">
                            <font-awesome-icon icon="fa-solid fa-bell-concierge" />
                            <p class="text-lg font-medium">Services</p>
                        </div>
                    </NuxtLink>


                    <hr />
                    <div class="flex items-center gap-3 p-2 hover:bg-[#EBCDC5] rounded-2xl cursor-pointer">
                        <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="text-[20px]" />
                        <p @click="logout" class="text-lg font-medium">log out</p>
                    </div>
                </div>

            </aside>



            <!-- right -->
            <div class="bg-white p-4 rounded-2xl shadow">

                <slot />


            </div>


        </div>
    </div>

</template>

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { ref, onMounted } from "vue";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
const auth = getAuth();
const router = useRouter();
const { $db } = useNuxtApp();
const engineerName = ref('');
const engineerEmail = ref('');
const engineerPosition = ref('');
const engineerImage = ref();
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
        engineerEmail.value = d.email;
        engineerPosition.value = d.position;
        engineerImage.value = d.image;
        data.value = {
            position: d.position,
            specialization: d.specialization,
            yearsOfExperience: d.yearsOfExperience?.toString(),
            bio: d.bio,
        }
    }
})

const logout = async () => {
    await signOut(auth);
    router.push('/signin');
}


</script>