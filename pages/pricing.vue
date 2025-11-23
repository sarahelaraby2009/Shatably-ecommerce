<template>
    <div class="w-full flex justify-center mt-[20px] px-4">
        <div class="max-w-[1200px] w-full flex flex-col gap-4">
            <!-- part1 -->
            <div class="mb-4">
                <div class="w-full h-[400px] flex justify-center mt-2 relative">
                    <img class="w-full h-full rounded-[16px] object-cover" src="/calc.avif" />
                    <div class="absolute inset-0 flex justify-center pointer-events-none">
                        <div class="w-full h-full bg-black/70 rounded-[16px]"></div>
                    </div>
                    <div class="absolute inset-0 flex flex-col justify-center items-center gap-3 px-4">
                        <h2 class="text-[#fefefe] font-bold text-[28px] max-w-[700px] text-center">Calculate Your
                            Apartment
                            Finishing Cost Easily</h2>
                        <p class="text-[#fefefe] font-medium text-[14px] max-w-[600px] text-left">A space where
                            creativity meets
                            craftsmanship find your engineer, view their work, and bring your dream
                            apartment to life.</p>
                    </div>
                </div>
            </div>

            <!-- part2 -->
            <div class="mt-4 flex flex-col justify-center gap-2 mb-3">
                <h2 class="text-[#262626] font-semibold text-[18px]">
                    Apartment Space (in square meters)
                </h2>
                <div>
                    <input required
                        class="border focus:border-[#612B1F] outline-none border-slate-300 w-full max-w-3xl rounded-[16px] h-10 px-4 text-[14px]"
                        v-model="calc" type="number" placeholder="Enter Your Space" />
                </div>
            </div>

            <!-- part3 -->
            <div class="flex flex-col justify-center gap-4">
                <div class="mb-2">
                    <h2 class="text-[#262626] font-semibold text-[18px]">Select the finishing level that suits your
                        budget:</h2>
                </div>
                <div class="flex gap-10 justify-center flex-wrap">
                    <div v-for="pkg in packages" :key="pkg.id" @click="selectedPkg = pkg"
                        :class="{ 'border-[#C76950] border-2': selectedPkg?.id === pkg.id, 'border-slate-200': selectedPkg?.id !== pkg.id }"
                        class="w-[260px] overflow-hidden text-left shadow-md rounded-[16px] h-[240px] cursor-pointer transition flex flex-col gap-4">
                        <img class="w-full h-[120px] rounded-t-[16px] object-cover" :src="pkg.image" />
                        <div class="flex flex-col gap-1 px-3">
                            <h2 class="text-[#262626] font-semibold text-[18px]">{{ pkg.name }}</h2>
                            <p class="text-[#595959] font-light text-[14px]">{{ pkg.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center mb-5">
                    <button type="button" @click="calculateCost" :disabled="!calc || !selectedPkg"
                        :class="{ 'opacity-50 cursor-not-allowed': !calc || !selectedPkg }"
                        class="text-[#fefefe] w-[180px] h-10 text-[14px] text-center bg-[#C76950] rounded-[16px] scroll-m-5 transition-all flex justify-center items-center hover:bg-[#A85A45] ">
                        Calculate Cost
                    </button>
                </div>

                 <!-- Results Section  -->
                <div ref="resultSection"  v-if="result > 0" class="flex flex-col mt-4">
                    <div class="p-4 rounded-[16px]">
                        <h1 class="text-[#262626] font-semibold text-[22px] mb-2">Your result</h1>
                    </div>

                    <!-- Cost Display -->
                    <div class="shadow-lg border border-[#C76950] rounded-[16px] p-5 mb-4">
                        <h1 class="text-[#262626] font-semibold text-[18px] mb-3">Estimated Finishing Cost</h1>
                        <div class="text-[#C76950] font-bold text-[32px] transition-all duration-500">
                            <span>{{ result.toLocaleString() }}</span> EGP
                        </div>
                    </div>

                    <!-- Materials Display - Enhanced Version -->
                    <div class="shadow-lg border border-slate-200 rounded-[16px] p-5">
                        <div class="flex items-center gap-2 mb-4">
                            <div class="w-10 h-10 bg-[#C76950] rounded-full flex items-center justify-center">
                                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            </div>
                            <h1 class="text-[#262626] font-semibold text-[20px]">Materials Required</h1>
                        </div>

                        <div ref="calcArea" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div v-for="(material, index) in materials" :key="index"
                                class="flex items-start mb-5 gap-2 p-3  rounded-[12px] border border-slate-100  transition-all duration-300 hover:shadow-md group">
                                <div class="flex-shrink-0 mt-0.5">
                                    <div
                                        class="w-5 h-5 rounded-full bg-[#C76950] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                </div>
                                <p class="text-[#262626] font-medium text-[14px] leading-relaxed flex-1">
                                    {{ material }}
                                </p>
                            </div>
                            <div class="flex gap-2 justify-center mt-5">
                                
                                    <button type="button" @click="router.push('/categories')"
                                        class="text-[#fefefe] w-[200px] h-10 text-center p-5 bg-[#C76950] rounded-[24px] flex justify-center items-center">Shop Now</button>
                              
                                    <button type="submit" @click="recalc"
                                        class=" w-[200px] h-10 text-center p-5 border border-[#C76950] text-[#262626] rounded-[24px] flex justify-center items-center">Recalculate</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'

const packages = ref([])
const { $db } = useNuxtApp()
const calc = ref('')
const calcArea=ref('')
const selectedPkg = ref(null)
let result = ref(0)
let materials = ref('')
const router=useRouter()
const resultSection=ref('')

onMounted(async () => {
    const snapshot = await getDocs(collection($db, 'packages'))
    packages.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
})

const calculateCost = () => {

    if (calc.value && selectedPkg.value) {
        result.value = calc.value * selectedPkg.value.price
        materials.value = selectedPkg.value.materials
        
       
    }
    setTimeout(()=>{
        if(resultSection.value){
            resultSection.value.scrollIntoView({
                behavior:"smooth",
                block:'start'
            })
        }
    },100)
}
const recalc=()=>{
    calc.value=''
    result.value=''
    materials.value=''

}
</script>