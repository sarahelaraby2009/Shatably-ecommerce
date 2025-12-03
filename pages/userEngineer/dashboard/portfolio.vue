<template>
    <EngineerSideBar>
        <div class="p-6 ml-12  flex justify-between">
            <div>
                <h1 class="text-2xl font-bold mb-4">Portfolio</h1>
                <p>View & Update Your Portfolio</p>
            </div>
            <div>
                <button v-if="showButton" @click="openModal"
                    class="bg-[#C76950] w-[150px] text-white px-2 py-1 rounded-xl shadow  transition">
                    Add Portfolio </button>
            </div>

            <!-- Add more dashboard content here -->
        </div>
        <div class="flex flex-col justify-center items-center">
            <div v-if="show"
                class="shadow-[0px_4px_12px_rgba(0,0,0,0.08)] w-[500px] p-6 flex flex-col justify-center items-center rounded-[24px] mt-6 ml-12 ">
                <img src="/add image.png" alt="add service" class=" w-12 mb-3" />
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
                            <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleUpload" />
                        </div>
                        <div v-if="newService.preview" class="mt-2 flex justify-center">
                            <img :src="newService.preview" class="w-[80px] h-[80px] object-cover rounded-[12px]" />
                        </div>
                        <button @click="saveData"
                            class="bg-[#C76950] w-full text-white px-2 py-1 rounded-xl shadow  transition">
                            Save </button>
                    </div>

                </div>
            </div>
            <div v-if="services.length > 0" class="w-[600px] mt-10 ml-12">
                <table
                    class="table-auto p-5 w-full border-collapse rounded-[12px] overflow-hidden shadow-lg text-center">
                    <thead class="bg-[#C76950] text-white rounded-t-[12px] col-span-4 p-3">
                        <tr>
                            <th>Portfolio Photo</th>
                            <th>Upload Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(service, index) in services" :key="index">
                            <td>
                                <img class="w-[50px]" :src="service.preview" />
                            </td>
                            <td>{{ service.timestamp }}</td>
                            <td @click="openEditModal(index)"><font-awesome-icon icon="fa-solid fa-pen-to-square" />
                            </td>
                            <td @click="deleteService(index)"><font-awesome-icon icon="fa-regular fa-trash-can" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </EngineerSideBar>
</template>

<script setup>
import { ref } from 'vue';

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
const editIndex = ref(null)
const openEditModal = (index) => {
    editIndex.value = index
    newService.value = { ...services.value[index] }
    showModal.value = true

}

const handleUpload = (event) => {
    const file = event.target.files[0];
    newService.value.photo = file;
    newService.value.preview = URL.createObjectURL(file); // تعمل صورة محلية

}

const saveData = () => {
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
const deleteService = (index) => {
    services.value.splice(index, 1)
    if (services.value.length === 0) {
        editIndex.value = null
    }
}



</script>