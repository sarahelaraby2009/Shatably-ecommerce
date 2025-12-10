<template>
    <div class="w-full bg-[#F7F7F7] shadow-md relative p-3">
        <div class="flex justify-between items-center p-2 h-[100px]">
            <!-- Burger Icon (Mobile) -->
            <button @click="mobileMenueOpen = !mobileMenueOpen" class="lg:hidden text-gray-700 text-2xl z-50">
                <font-awesome-icon icon="fa-solid fa-bars" />
            </button>

            <!-- Logo -->
            <div class="hidden lg:block">
                <img src="/logo mod.png" class="h-auto w-[150px] -my-6" alt="logo" />
            </div>

        <!-- Mobile Search Bar (منفصل تحت الnavbar) -->
        <transition name="dropdown">
            <div v-if="mobileSearchOpen" class="lg:hidden bg-[#F7F7F7] px-4 py-3 border-t">
                <div class="flex items-center justify-between w-full h-[45px] px-3 py-2 rounded-[24px] text-[#4B5563] bg-white"
                    style="box-shadow: 0 0 4px rgba(0,0,0,0.3);">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="mr-2 text-[#4B5563]" />
                    <input v-model="searchQuery" @keyup.enter="goSearch" type="text"
                        placeholder="Search for products or bands" 
                        class="outline-none text-[#4B5563] w-full text-sm" />
                </div>
            </div>
        </transition>

            <!-- الجزء المركزي: اللينكات والسيرش بار (Desktop) -->
            <div class="hidden lg:flex flex-col gap-[10px] justify-center items-center">
                <!-- Navigation Links -->
                <div class="flex justify-center items-center p-3 mr-14">
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
                        <li class="relative" @mouseenter="open = true"
    @mouseleave="closeCategories" >
                            <NuxtLink to="/categories" class="flex items-center hover:text-[#C76950]">
                                Categories <font-awesome-icon icon="fa-solid fa-caret-down" />
                            </NuxtLink>
                            <!-- Dropdown -->
                            <ul v-if="open" @mouseenter="clearTimeout(closeTimeout)" @mouseleave="closeCategories"
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
                        <input v-model="searchQuery" @keyup.enter="goSearch" type="text"
                            placeholder="Search for products or bands" class="outline-none text-[#4B5563] w-full" />
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

            <!-- Sign In / User Profile (Desktop) -->
            <div class="hidden lg:flex gap-3">
                <div v-if="!user" class="flex gap-3">
                    <button @click="signIN"
                        class="rounded-[22px] w-[121px] h-[36px] bg-[#C76950] text-white hover:bg-[#AD563F]">
                        Sign in
                    </button>
                    <button @click="signUP"
                        class="rounded-[22px] w-[121px] h-[36px] border border-[#612B1F] text-[#612B1F] hover:text-[#C76950] hover:border-[#C76950]">
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

            <!-- Search & Cart Icons (Mobile) -->
            <div class="lg:hidden flex items-center gap-3">
                <button @click="mobileSearchOpen = !mobileSearchOpen" class="text-gray-700 text-xl">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                </button>
                <nuxt-link to="/cart">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="text-gray-700 text-xl" />
                </nuxt-link>
            </div>
        </div>

        <!-- Overlay عند فتح المينيو -->
        <div v-if="mobileMenueOpen" @click="mobileMenueOpen = false"
            class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
        </div>

        <!-- Sidebar Mobile Menu -->
        <transition name="slide">
            <div v-if="mobileMenueOpen"
                class="lg:hidden fixed top-0 left-0 w-[280px] h-full bg-white shadow-2xl z-50 overflow-y-auto">

                <div class="p-6">
                    <!-- Logo -->
                    <div class="mb-8">
                        <img src="/logo mod.png" class="h-[auto] w-[120px]" alt="logo" />
                    </div>

                    <!-- User Profile Section -->
                    <div v-if="user" class="flex flex-col items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                        <div @click="showList = !showList" class="flex justify-center items-center gap-3 cursor-pointer w-full hover:bg-gray-50 p-2 rounded-lg transition">
                            <img :src="user.image || defaultAvatar"
                                class="w-12 h-12 rounded-full object-cover border-2" />
                            <div class="flex-1">
                                <p class="text-sm font-medium text-gray-800 truncate">
                                    {{ user.displayName || user.email }}
                                </p>
                            </div>
                            <font-awesome-icon :icon="showList ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"
                                class="text-gray-400 text-sm" />
                        </div>

                        <!-- User Profile Dropdown with Animation -->
                        <transition name="dropdown">
                            <div v-if="showList" class="w-full">
                                <button @click="goToProfile(); mobileMenueOpen = false"
                                    class="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#C76950] hover:bg-gray-50 rounded">
                                    View Profile
                                </button>
                                <NuxtLink v-for="link in menuLinks" 
                                :key="link.path" @click="mobileMenueOpen = false"
                                    :to="link.path"
                                    class="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#C76950] hover:bg-gray-50 rounded">
                                    {{ link.name }} 
                                </NuxtLink>
                                <!-- <NuxtLink v-if="role==='engineer'"
                                 to="/userEngineer/services"
                                    @click="mobileMenueOpen = false"
                                    class="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#C76950] hover:bg-gray-50 rounded">
                                    Services    
                                </NuxtLink>
                                <NuxtLink v-if="role==='engineer'"
                                 to="/userEngineer/portfolio  
                                    @click="mobileMenueOpen = "false"
                                    class="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#C76950] hover:bg-gray-50 rounded">
                                    Portfolio
                                </NuxtLink>
                                <NuxtLink v-if="role==='client'" 
                                to="/userprofile/addresses"
                                    @click="mobileMenueOpen = false"
                                    class="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#C76950] hover:bg-gray-50 rounded">
                                    Addresses
                                </NuxtLink> -->

                                
                            </div>
                        </transition>
                    </div>


                    <!-- Navigation Menu -->
                    <nav class="space-y-1">
                        <!-- Home -->
                        <NuxtLink @click="mobileMenueOpen = false" to="/"
                            class="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                            <font-awesome-icon icon="fa-solid fa-house" class="w-5 text-gray-600" />
                            <span class="text-[15px]">Home</span>
                        </NuxtLink>

                        <!-- Pricing -->
                        <NuxtLink @click="mobileMenueOpen = false" to="/pricing"
                            class="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                            <font-awesome-icon icon="fa-solid fa-tag" class="w-5 text-gray-600" />
                            <span class="text-[15px]">Pricing</span>
                        </NuxtLink>

                        <!-- Categories -->
                        <div>
                            <button @click="categoriesOpen = !categoriesOpen"
                                class="flex items-center justify-between w-full px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                                <div class="flex items-center gap-3">
                                    <font-awesome-icon icon="fa-solid fa-th-large" class="w-5 text-gray-600" />
                                    <span class="text-[15px]">Categories</span>
                                </div>
                                <font-awesome-icon
                                    :icon="categoriesOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"
                                    class="text-gray-400 text-sm" />
                            </button>
                            
                            <!-- Categories Dropdown with Animation -->
                            <transition name="dropdown">
                                <div v-if="categoriesOpen" class="ml-8 mt-1 space-y-1">
                                    <NuxtLink v-for="cat in categories" :key="cat.id" @click="mobileMenueOpen = false"
                                        :to="`/categories/${cat.id}`"
                                        class="block px-3 py-2 text-sm text-gray-600 hover:text-[#C76950] hover:bg-gray-50 rounded">
                                        {{ cat.name }}
                                    </NuxtLink>
                                </div>
                            </transition>
                        </div>

                        <!-- Professionals -->
                        <NuxtLink @click="mobileMenueOpen = false" to="/engineerpage"
                            class="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                            <font-awesome-icon icon="fa-solid fa-user-tie" class="w-5 text-gray-600" />
                            <span class="text-[15px]">Professionals</span>
                        </NuxtLink>

                        <!-- Wishlist -->
                        <NuxtLink @click="mobileMenueOpen = false" to="/wishlist"
                            class="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                            <font-awesome-icon icon="fa-solid fa-heart" class="w-5 text-gray-600" />
                            <span class="text-[15px]">Wishlist</span>
                        </NuxtLink>

                        <!-- Divider -->
                        <div class="py-2">
                            <div class="border-t border-gray-200"></div>
                        </div>

                        <!-- Log out / Sign in -->
                        <button v-if="user" @click="logout"
                            class="flex items-center gap-3 px-3 py-3 text-[#C76950] hover:bg-red-50 rounded-lg transition w-full">
                            <font-awesome-icon icon="fa-solid fa-right-from-bracket" class="w-5" />
                            <span class="text-[15px] font-medium">Log out</span>
                        </button>

                        <div v-else class="space-y-2 pt-2">
                            <button @click="signIN"
                                class="w-full rounded-lg py-3 bg-[#C76950] text-white hover:bg-[#AD563F] font-medium">
                                Sign in
                            </button>
                            <button @click="signUP"
                                class="w-full rounded-lg py-3 border-2 border-[#612B1F] text-[#612B1F] hover:text-[#C76950] hover:border-[#C76950] font-medium">
                                Sign up
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'
import { signOut } from "firebase/auth"

const mobileMenueOpen = ref(false)
const categoriesOpen = ref(false)
const showList = ref(false)
const mobileSearchOpen = ref(false)
const { $auth } = useNuxtApp()
const userData = ref(null)
const categories = ref([])
const { $db } = useNuxtApp()
const open = ref(false)
const showMenu = ref(false)
const { user } = useAuth()
const searchQuery = ref("")
const defaultAvatar = "/default.png"
const router = useRouter()

let closeTimeout = null

const closeCategories = () => {
    closeTimeout = setTimeout(() => {
        open.value = false
    }, 200)  // نص ثانية كافية
}

const menuLinks=computed(()=>{
    if(!userData.value) return[]
    const role=userData.value?.role || null
const links={
    engineer:[{name:'Portfolio',path:'/userEngineer/dashboard/portfolio'},
    {name:'Services',path:'/userEngineer/dashboard/services'}],

    client:[{name:'address', path:'/userprofile/address'},
    {name:'orders',path:'/userprofile/orders'}],

    supplier:[{name:'products',path:'/supplier/productsUpload'},
    {name:'orders',path:'/supplier/ordersTrack'}]
}
return links[role]
})



const signIN = () => {
    navigateTo('/signin')
    mobileMenueOpen.value = false
}

const signUP = () => {
    navigateTo('/register')
    mobileMenueOpen.value = false
}

const logout = async () => {
    await signOut($auth)
    mobileMenueOpen.value = false
}

const goSearch = () => {
    if (searchQuery.value.trim() !== "") {
        navigateTo(`/search?query=${searchQuery.value}`)
        mobileMenueOpen.value = false
        mobileSearchOpen.value = false
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
    const userDoc = await getDoc(doc($db, 'users', currentUser.uid))
    if (userDoc.exists()) {
        userData.value = userDoc.data()
    }
})

const goToProfile = () => {
    if (!userData.value) return;
    const role = userData.value.role;
    if (role === 'engineer') {
        router.push('/userEngineer/dashboard')
    }
    else if (role === 'client') {
        router.push('/userprofile')
    }
    else {
        router.push('/supplier')
    }
    mobileMenueOpen.value = false
}
</script>

<style scoped>
/* Sidebar slide animation */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from {
    transform: translateX(-100%);
}

.slide-leave-to {
    transform: translateX(-100%);
}

/* Dropdown smooth animation */
.dropdown-enter-active {
    animation: slideDown 0.3s ease-out;
}

.dropdown-leave-active {
    animation: slideUp 0.2s ease-in;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
        max-height: 0;
    }
    to {
        opacity: 1;
        transform: translateY(0);
        max-height: 500px;
    }
}

@keyframes slideUp {
    from {
        opacity: 1;
        transform: translateY(0);
        max-height: 500px;
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
        max-height: 0;
    }
}
</style>