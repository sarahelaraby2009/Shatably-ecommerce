<template>
    <div class="w-full bg-[#F7F7F7] shadow-md">
        <div class="flex justify-between items-center p-2 h-[100px]">
            <div>
                <img src="/logo mod.png" class="h-[auto] w-[150px] -my-6" alt="logo"></img>
            </div>

            <!-- الجزء المركزي: اللينكات والسيرش بار -->
            <div class="flex flex-col gap-[10px] justify-center items-center">
                <!-- Navigation Links -->
                <div class="flex justify-center items-center">
                    <ul class="flex gap-10 items-center justify-center">
                        <li>
                            <NuxtLink to="/" exact-active-class="text-[20px] font-medium text-[#C76950]"
                                class="text-[18px] font-normal hover:text-[#C76950]">
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/pricing" exact-active-class="text-[#C76950] text-xl font-medium"
                                class="text-[18px] font-normal hover:text-[#C76950]">
                                Pricing
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/engineerpage" exact-active-class="text-[20px] font-medium text-[#C76950]"
                                class="text-[18px] font-normal hover:text-[#C76950]">
                                Professionals
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/wishlist" exact-active-class="text-[20px] font-medium text-[#C76950]"
                                class="text-[18px] font-normal hover:text-[#C76950]">
                                WishList
                            </NuxtLink>
                        </li>
                        <li class="relative" @mouseenter="open = true" @mouseleave="open = false">
                            <NuxtLink to="/categories" class="flex items-center hover:text-[#C76950]">
                                Categories <font-awesome-icon icon="fa-solid fa-caret-down" />
                            </NuxtLink>
                            <!-- Dropdown -->
                            <ul v-if="open"
                                class="absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                                <li v-for="cat in categories" :key="cat.id">
                                    <NuxtLink class="block px-4 py-2 hover:bg-gray-100 hover:text-orange-500"
                                        exact-active-class="font-medium text-orange-500 bg-gray-100"
                                        :to="`/categories/${cat.id}`">
                                        {{ cat.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <!-- Search Bar with Cart -->
                <div class="flex justify-center items-center gap-4">
                    <!-- Search Box -->
                    <div class="flex items-center justify-between w-[600px] h-[45px] px-3 py-2 rounded-[24px] text-[#4B5563] bg-white"
                        style="box-shadow: 0 0 4px rgba(0,0,0,0.3);">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-2 text-[#4B5563]" />
                        <input v-model="searchQuery" @keyup.enter="goSearch" type="text" placeholder="Search for products or bands"
                            class="outline-none text-[#4B5563] w-full" />
                        <font-awesome-icon :icon="['fas', 'sliders']" class="text-[#C76950] w-5 h-5" />
                    </div>

                    <!-- Cart Icon -->
                    <nuxt-link to="/cart">
                        <div
                            class="w-10 h-10 flex items-center justify-center rounded-full bg-[#F9EEEC] shadow cursor-pointer hover:bg-orange-600 transition">
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="text-[#C76950] text-xl" />
                        </div>
                    </nuxt-link>
                </div>
            </div>

            <!-- Sign In / User Profile -->
            <div class="flex gap-3">
                <div v-if="!user" class="flex gap-3">
                    <button @click="signIN"
                        class=" rounded-[22px] w-[121px] h-[36px] bg-[#C76950] text-white hover:bg-[#AD563F]">
                        Sign in
                    </button>
                    <button @click="signUP"
                        class=" rounded-[22px] w-[121px] h-[36px] border border-[#612B1F] text-[#612B1F] hover:text-[#C76950] hover:border-[#C76950]">
                        Sign up
                    </button>
                </div>

                <div v-else class="relative w-10">
                    <img @click.stop="showMenu = !showMenu" :src="user.image || defaultAvatar"
                        class="w-10 h-10 rounded-full object-cover border cursor-pointer" />
                    <div v-if="showMenu" @click.stop
                        class="absolute right-0 mt-3 w-40 bg-slate-50 rounded shadow-lg py-2 z-50">
                        <p class="px-4 py-2 text-sm text-gray-600 border-b">
                            {{ user.displayName || user.email }}
                        </p>
                        <button @click="goToProfile"
                            class="block w-full text-left px-4 py-2 text-sm hover:bg-[#EBCDC5] text-gray-600">
                            Profile
                        </button>
                        <button @click="logout"
                            class="block text-left w-full font-semibold px-4 py-2 text-sm text-[#C76950] hover:text-orange-500">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { collection, getDocs,doc,getDoc } from 'firebase/firestore'
import { signOut } from "firebase/auth"

const { $auth } = useNuxtApp()
const userData=ref(null)
const categories = ref([])
const { $db } = useNuxtApp()
const open = ref(false)
const showMenu = ref(false)
const { user } = useAuth()
const searchQuery = ref("")
const defaultAvatar = "/default.png"
const router = useRouter()

const signIN = () => {
    navigateTo('/signin')
}

const signUP = () => {
    navigateTo('/register')
}

const logout = async () => {
    await signOut($auth)
}

const goSearch = () => {
    if (searchQuery.value.trim() !== "") {
        navigateTo(`/search?query=${searchQuery.value}`)
    }
}

onMounted(async () => {
    const categoryRef = collection($db, "categories")
    const snapshot = await getDocs(categoryRef)
    categories.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    const currentUser = $auth.currentUser;
    if (!currentUser) return;
    const userDoc=await getDoc(doc($db,'users',currentUser.uid))
    if(userDoc.exists()){
        userData.value=userDoc.data()
    }

})

const goToProfile=()=>{
    
    const role=userData.value.role;
    if(role==='engineer'){
        router.push('/userEngineer/dashboard')
    }
    else if(role==='client'){
        router.push('/userprofile')
    }
    else(
        router.push('/')
    )
}
</script>