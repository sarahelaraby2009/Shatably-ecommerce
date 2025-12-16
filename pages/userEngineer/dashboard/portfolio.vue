<template>
    <div class="flex flex-col lg:flex-row  min-h-screen ">
        <EngineerMobileView class="block lg:hidden" />
        <EngineerSideBar class="hidden lg:block w-[500px]" />
        
        <div class="flex flex-col flex-1 lg:p-10 p-4  min-h-screen">
            <div class="p-6 flex flex-col lg:flex-row lg:justify-between">
                <div>
                    <h1 class="text-2xl font-bold mb-4">Portfolio</h1>
                    <p>View & Update Your Portfolio</p>
                </div>
                <div>
                    <button v-if="showButton" @click="openModal"
                        class="bg-[#C76950] w-[150px] text-white px-2 py-1 rounded-xl shadow  transition">
                        Add Portfolio </button>
                </div>
                <div class="block lg:hidden">
                    <img :src="engineerImage" class="w-14 h-14 rounded-[22px] mt-5 object-cover ml-5 "/>
                    <h3 class="pt-1 font-bold text-xl ml-5 mt-5">Hello , {{ engineerName }}</h3>
                </div>

                <!-- Add more dashboard content here -->
            </div>
            <div class="flex flex-col justify-center items-center">
                <div v-if="show"
                    class="shadow-[0px_4px_12px_rgba(0,0,0,0.08)] w-auto lg:w-[500px] p-6 flex flex-col justify-center items-center rounded-[24px] mt-6 ">
                    <img src="/add-Image.png" alt="add service" class=" w-12 mb-3" />
                    <p class="text-[18px]">Add your Portfolio here</p>
                    <button @click="openModal"
                        class="bg-[#C76950] w-full text-white px-2 py-1 rounded-xl shadow  transition">
                        Add Portfolio </button>
                </div>
                <div v-if="showModal"
                    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div class="bg-white rounded-[24px] w-[500px]  p-5 relative">
                        <button @click="showModal = false" class="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 
             flex items-center justify-center shadow">✕</button>
                        <div class="flex flex-col gap-5">

                            <label class="font-bold w-full text-m text-[#3E3E3E]"> upload Photo </label>
                            <div
                                class="bg-gray-300 border border-dashed h-[100px] flex flex-col justify-center items-center border-gray-500 rounded-[24px]">
                                <font-awesome-icon icon="fa-solid fa-upload" class="text-[#C76950]" />
                                <p class="text-gray-500"><span class="text-[blue] underline cursor-pointer "
                                        @click="$refs.fileInput.click()">Click</span> to upload or drag & drop your
                                    photo(JPG/PNG)</p>
                                <input type="file" ref="fileInput" accept="image/*" class="hidden"
                                    @change="handleUpload" />
                            </div>
                            <div v-if="newService.preview" class="mt-2 flex justify-center">
                                <img :src="newService.preview" class="w-[80px] h-[80px] object-cover rounded-[12px]" />
                            </div>
                            <button @click="saveData"
                                class="bg-[#C76950] w-full text-white px-2 py-1 rounded-xl shadow  transition">
                                Save </button>
                                <span class="text-red-400 text-center">{{ errorMessage }}</span>
                        </div>

                    </div>
                </div>
                  <div v-if="showSecModal"
                    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div class="bg-white rounded-[24px] w-full max-w-[400px] p-6 shadow-xl">
                        <div class="flex flex-col items-center gap-4">
                            <!-- Warning Icon -->
                            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <font-awesome-icon icon="fa-solid fa-exclamation-triangle"
                                    class="text-red-500 text-3xl" />
                            </div>

                            <!-- Message -->
                            <h3 class="text-xl font-bold text-gray-800">Delete Service?</h3>
                            <p class="text-gray-600 text-center">
                                Are you sure you want to delete this service? This action cannot be undone.
                            </p>

                            <!-- Buttons -->
                            <div class="flex gap-3 w-full mt-2">
                                <button @click="showSecModal = false"
                                    class="flex-1 border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition">
                                    Cancel
                                </button>
                                <button @click="confirmDelete"
                                    class="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="services.length > 0" class="w-full max-w-[900px] mt-10 overflow-x-auto px-4">
                    <table
                        class="table-auto w-full border-collapse rounded-[12px] overflow-hidden shadow-lg ">
                        <thead >
                            <tr class="bg-[#C76950] text-white">
                                <th class="text-left py-3 px-4 font-semibold text-sm">Portfolio Photo</th>
                                <th class="text-left py-3 px-4 font-semibold text-sm">Upload Date</th>
                                <th class="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(service, index) in services" :key="index" 
                            class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td class="p-4">
                                    <img class="w-[50px] flex flex-col justify-center items-center" :src="service.preview" />
                                </td>
                                <td class="p-4">{{ service.timestamp }}</td>
                                <td class="p-4">
                                    <button @click="openEditModal(index)"
                                        class="text-blue-600 hover:text-blue-800 transition text-lg">
                                        <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                                    </button>
                                     <button @click="openDeleteModal(index)"
                                        class="text-red-600 hover:text-red-800 transition text-lg">
                                        <font-awesome-icon icon="fa-regular fa-trash-can" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>

    </div>

</template>

<script setup>
      
import { ref, onMounted } from 'vue';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
useHead({
  title: "Engineer portfolio",
  meta: [
    {
      name: "description",
      content: "تصفح محفظة اعمالك و حدثها.",
    },
    {'keywords': 'لوحة تحكم مهندس, بروفايل مهندس, إدارة مشاريع, تحديث ملف شخصي, خبرة مهندس, تخصص مهندس, خدمات مهندس, عملاء, تصميم, تطوير'},
  ],
});
const { $db } = useNuxtApp();

const showSecModal = ref(false);
const auth = getAuth();
const router = useRouter();
const engineerName = ref('');
const engineerImage = ref('');
const deleteIndex = ref(null); // Store index to delete
const editIndex = ref(null);
const errorMessage=ref('')


onMounted(async () => {
    const user = auth.currentUser;
    if (!user) {
        router.push('/signin');
    }
    const docSnap = await getDoc(doc($db, 'engineers', user.uid))
    if (!docSnap.exists()) {
        router.push('/userEngineer/complete-profile');
    }
    if (docSnap.exists()) {
        const d = docSnap.data();
        engineerName.value = d.name;
        engineerImage.value = d.image;
        if (d.profileComplete === false) {
            router.push('/userEngineer/complete-profile');
        }
    }


})

const showModal = ref(false);
const openModal = () => showModal.value = true;
const services = ref([])
const show = ref(true)
const showButton = ref(false)
const timestamp = new Date().toLocaleDateString();
const newService = ref({
    title: '',
    description: '',
    photo: null,
    preview: '',
    timestamp: timestamp
})

const openEditModal = (index) => {
    editIndex.value = index
    newService.value = { ...services.value[index] }
    showModal.value = true

}
const openDeleteModal = (index) => {
    deleteIndex.value = index;
    showSecModal.value = true;
};

const confirmDelete = () => {
    if (deleteIndex.value !== null) {
        services.value.splice(deleteIndex.value, 1);
        deleteIndex.value = null;
    }
    
    showSecModal.value = false;
    
    // Show empty state if no services left
    if (services.value.length === 0) {
        show.value = true;
        showButton.value = false;
    }
};

const handleUpload = (event) => {
    const file = event.target.files[0];
    newService.value.photo = file;
    newService.value.preview = URL.createObjectURL(file); // تعمل صورة محلية

}

const saveData = () => {
    const user = auth.currentUser;
      if (!user) {
        errorMessage.value='Please sign in';
        return
    }
    if (editIndex.value === null) {
        services.value.push({ ...newService.value });

    }
    else { services.value[editIndex.value] = { ...newService.value } }
    editIndex.value = null
    // Clear form
    newService.value = { title: "", description: "", photo: null, preview: "" };

    showModal.value = false;
    show.value = false
    showButton.value = true

};




</script>