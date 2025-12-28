<template>
    <div class="flex flex-col lg:flex-row min-h-screen">
        <EngineerMobileView class="block lg:hidden" />
        <EngineerSideBar class="hidden lg:block w-[500px]" />
        
        <div class="flex flex-col flex-1 lg:p-10 p-4 min-h-screen">
            <div class="p-6 flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div class="flex-1">
                    <h1 class="text-2xl font-bold mb-4">Services</h1>
                    <p>View & Update Your Services</p>
                </div>
                <div>
                    <button v-if="showButton" @click="openModal"
                        class="bg-[#C76950] w-[150px] text-white px-2 py-1 rounded-xl shadow transition hover:bg-[#a85740]">
                        Add Services
                    </button>
                </div>
                <div class="block lg:hidden">
                    <img :src="engineerImage" class="w-14 h-14 rounded-[22px] mt-5 object-cover ml-5" />
                    <h3 class="pt-1 font-bold text-xl ml-5 mt-5">Hello, {{ engineerName }}</h3>
                </div>
            </div>

            <div class="flex flex-col justify-center items-center">
                <!-- Empty State -->
                <div v-if="show"
                    class="shadow-[0px_4px_12px_rgba(0,0,0,0.08)] w-auto lg:w-[500px] p-6 flex flex-col justify-center items-center rounded-[24px] mt-6">
                    <img src="/add.png" alt="add service" class="w-12 mb-3" />
                    <p class="text-[18px]">Add your service here</p>
                    <button @click="openModal"
                        class="bg-[#C76950] w-auto lg:w-full text-white px-2 py-1 rounded-xl shadow transition hover:bg-[#a85740]">
                        Add Services
                    </button>
                </div>

                <!-- Add/Edit Service Modal --> 
                <div v-if="showModal"
                    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-3">
                    <div class="bg-white rounded-[24px] w-auto lg:w-[500px] max-w-[500px] h-auto   p-3 relative">
                        <button @click="closeModal"
                            class="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center shadow">
                            ✕
                        </button>

                        <h2 class="text-xl font-bold mb-4 text-[#3E3E3E]">
                            {{ editIndex !== null ? 'Edit Service' : 'Add New Service' }}
                        </h2>

                        <div class="flex flex-col gap-4">
                            <div>
                                <label class="font-bold text-sm text-[#3E3E3E] block mb-2">Title</label>
                                <input type="text" v-model="newService.title" required pattern="^[A-Za-z0-9 -]+$"
                                  @invalid="(e) => e.target.setCustomValidity('Please enter valid content')"
                @input="(e) => e.target.setCustomValidity('')"
                                    class="font-semibold w-full text-sm text-[#3E3E3E] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border rounded-[24px] p-3 outline-none focus:border-[#C76950]"
                                    placeholder="e.g. Home Renovation" />
                            </div>

                            <div>
                                <label class="font-bold text-sm text-[#3E3E3E] block mb-2">Description</label>
                                <textarea v-model="newService.description" required rows="3" pattern="^[A-Za-z0-9 -]+$"
                                      @invalid="(e) => e.target.setCustomValidity('Please enter valid content')"
                @input="(e) => e.target.setCustomValidity('')"
                                    class="font-semibold w-full text-sm text-[#3E3E3E] shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border rounded-[24px] p-3 outline-none focus:border-[#C76950] resize-none"
                                    placeholder="Describe your work"></textarea>
                            </div>

                            <div>
                                <label class="font-bold text-sm text-[#3E3E3E] block mb-2">Upload Photo</label>
                                <div @click="$refs.fileInput.click()"
                                    class="bg-gray-100 border-2 border-dashed h-[120px] flex flex-col justify-center items-center border-gray-400 rounded-[24px] cursor-pointer hover:bg-gray-200 transition">
                                    <font-awesome-icon icon="fa-solid fa-upload" class="text-[#C76950] text-2xl mb-2" />
                                    <p class="text-gray-600 text-sm text-center px-4">
                                        <span class="text-blue-600 underline">Click</span> to upload photo (JPG/PNG)
                                    </p>
                                    <input type="file" ref="fileInput" accept="image/*" class="hidden"
                                        @change="handleUpload" />
                                </div>
                                <div v-if="newService.preview" class="mt-3 flex justify-center">
                                    <div class="relative">
                                        <img :src="newService.preview"
                                            class="w-[100px] h-[100px] object-cover rounded-[12px] border-2 border-[#C76950]" />
                                        <button @click="removePhoto" type="button"
                                            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button @click="saveData"
                                class="bg-[#C76950] w-full text-white px-4 py-3 rounded-xl shadow hover:bg-[#a85740] transition">
                                {{ editIndex !== null ? 'Update Service' : 'Save Service' }}
                            </button>
                            <span class="text-red-400 text-center">{{ errorMessage }}</span>
                        </div>
                    </div>
                </div>

                <!-- Delete Confirmation Modal -->
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

                <!-- Services Table -->
                <div v-if="services.length > 0" class="w-full max-w-[900px] mt-10 overflow-x-auto px-4">
                    <table
                        class="table-auto w-full border-collapse rounded-[12px] overflow-hidden shadow-lg ">
                        <thead >
                            <tr class="bg-[#C76950] text-white">
                                <th class="text-left py-3 px-4 font-semibold text-sm">Photo</th>
                                <th class="text-left py-3 px-4 font-semibold text-sm">Title</th>
                                <th class="text-left py-3 px-4 font-semibold text-sm">Description</th>
                                <th class="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(service, index) in services" :key="index"
                                class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                <td class="p-4">
                                    <img :src="service.preview"
                                        class="w-[50px] h-[50px] object-cover rounded-lg mx-auto" />
                                </td>
                                <td class="p-4 font-semibold">{{ service.title }}</td>
                                <td class="p-4 max-w-[300px] truncate">{{ service.description }}</td>
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
                                <!-- <td class="p-3">
                                   
                                </td> -->
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
  title: "Engineer Services",
  meta: [
    {
      name: "description",
      content: "تصفح وأدر خدماتك الهندسية لجذب المزيد من العملاء وعرض مهاراتك.",
    },
    {'keywords': 'engineering services, manage services, showcase services, client attraction, service portfolio, engineering projects, service management'},
  ],
});

const showModal = ref(false);
const showSecModal = ref(false);
const services = ref([]);
const show = ref(true);
const showButton = ref(false);
const engineerName = ref('');
const engineerImage = ref('');
const editIndex = ref(null);
const deleteIndex = ref(null); // Store index to delete
const errorMessage=ref('')
const auth=getAuth()


const { $db } = useNuxtApp();
const router = useRouter();

const newService = ref({
    title: '',
    description: '',
    photo: null,
    preview: ''
});

onMounted(async () => {
    const { getAuth } = await import('firebase/auth');
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        router.push('/signin');
        return;
    }

    const docSnap = await getDoc(doc($db, 'engineers', user.uid));
    
    if (!docSnap.exists()) {
        router.push('/userEngineer/complete-profile');
        return;
    }

    const d = docSnap.data();
    engineerName.value = d.name;
    engineerImage.value = d.image;

    if (d.profileComplete === false) {
        router.push('/userEngineer/complete-profile');
    }
});

const openModal = () => {
    editIndex.value = null;
    newService.value = { title: '', description: '', photo: null, preview: '' };
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    editIndex.value = null;
    newService.value = { title: '', description: '', photo: null, preview: '' };
};

const openEditModal = (index) => {
    editIndex.value = index;
    newService.value = { ...services.value[index] };
    showModal.value = true;
};

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
    if (file) {
        newService.value.photo = file;
        newService.value.preview = URL.createObjectURL(file);
    }
};

const removePhoto = () => {
    newService.value.photo = null;
    newService.value.preview = '';
};

const saveData = () => {
    const user=auth.currentUser
    if(!user){
        errorMessage.value='Please sign in'
        return;
    }
    // Validation
    if (!newService.value.title || !newService.value.description) {
        errorMessage.value='please fill the fields'
        return;
    }

    if (!newService.value.preview) {
        alert('Please upload a photo');
        return;
    }

    if (editIndex.value === null) {
        // Add new service
        services.value.push({ ...newService.value });
    } else {
        // Update existing service
        services.value[editIndex.value] = { ...newService.value };
    }

    // Clear form and close modal
    newService.value = { title: '', description: '', photo: null, preview: '' };
    editIndex.value = null;
    showModal.value = false;
    show.value = false;
    showButton.value = true;
};
</script>