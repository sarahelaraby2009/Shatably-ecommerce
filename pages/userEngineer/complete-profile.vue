<template>
  <div class="flex justify-center items-center p-5 bg-[#fafafa]">
    <div class="p-5 rounded-[24px] w-[800px] m-3 bg-white shadow-lg flex flex-col gap-5">
      <h2 class="font-bold text-[25px] text-[#612B1F]">Complete Your Profile</h2>
      <form @submit.prevent="saveData">
        
        <!-- Profile Image Upload -->
        <div class="flex items-center gap-3 p-4">
          <div class="relative cursor-pointer group" @click="triggerProfileImage">
            <!-- Profile Image -->
            <img 
              v-if="imagePreview"
              :src="imagePreview" 
              alt="Profile" 
              class="w-16 h-16 rounded-full object-cover border-2 border-gray-300 group-hover:opacity-75 transition-opacity"
            />
            
            <!-- Default Avatar -->
            <div 
              v-else
              class="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center group-hover:bg-gray-400 transition-colors"
            >
              <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            
            <!-- Camera Icon -->
            <div class="absolute bottom-0 right-0 bg-[#C76950] rounded-full p-1.5 border-2 border-white shadow-lg group-hover:bg-[#a85740] transition-colors">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <!-- Hidden Profile Image Input -->
            <input 
              ref="profileImageInput"
              type="file"
              @change="handleProfileImageChange"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              class="hidden"
            />
          </div>
          
          <!-- User Info -->
          <div>
            <p class="font-semibold text-gray-800">Hello {{ userName }}!</p>
            <p class="text-xs text-gray-500 mt-1">Click icon to upload photo</p>
          </div>
        </div>

        <!-- Upload Progress -->
        <div v-if="isUploadingProfile" class="mt-3 px-4">
          <div class="flex items-center gap-2">
            <div class="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div class="bg-[#C76950] h-full rounded-full transition-all duration-300" 
                :style="{ width: profileUploadProgress + '%' }"></div>
            </div>
            <span class="text-xs text-gray-600">{{ profileUploadProgress }}%</span>
          </div>
        </div>

        <!-- Error Message for Profile Image -->
        <p v-if="profileImageError" class="text-red-500 text-xs mt-2 px-4">{{ profileImageError }}</p>

        <!-- Position -->
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Your Position</label>
          <select v-model="position" required
            class="font-bold text-m text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px]">
            <option disabled value="">Choose your position</option>
            <option>Architect</option>
            <option>Civil Engineer</option>
            <option>Interior Designer</option>
            <option>Finishing Engineer</option>
          </select>
        </div>

        <!-- Specialization -->
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Specialization</label>
          <input v-model="specialization" required pattern="^[A-Za-z0-9 -]+$"
            @invalid="(e) => e.target.setCustomValidity('Please enter valid content')"
                @input="(e) => e.target.setCustomValidity('')"

            class=" text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px]" 
            type="text" placeholder="e.g. Finishing - Interior Design" />
        </div>

        <!-- Mobile Number -->
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Mobile Number</label>
          <input v-model="mobile" required pattern="^01[0-9]{9}$"
            @invalid="(e) => e.target.setCustomValidity('Please enter valid mobile number')"
                @input="(e) => e.target.setCustomValidity('')"
 maxlength="11"
            class=" text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px]" 
            type="tel" placeholder="e.g. 01*********" />
        </div>

        <!-- Years of Experience -->
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Years Of Experience</label>
          <input v-model="experience"  min="0" max="50"

            class=" text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none h-[50px]" 
            type="number" placeholder="e.g. 5" />
        </div>

        <!-- Bio -->
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Bio</label>
          <textarea v-model="bio" required pattern="^[A-Za-z ]+$"
            @invalid="(e) => e.target.setCustomValidity('Please enter Letters only')"
                @input="(e) => e.target.setCustomValidity('')"

            class=" text-sm text-[#3E3E3E] border rounded-[24px] p-3 outline-none resize-none" 
            rows="4" placeholder="Write a short description about your work and experience"></textarea>
        </div>

        <!-- Certificate Upload -->
        <div class="flex gap-2 flex-col mb-5">
          <label class="font-bold text-m text-[#3E3E3E]">Upload Your Certificate</label>
          <div @click="triggerCertificateInput"
            class="bg-gray-100 border-2 border-dashed h-[120px] flex flex-col justify-center items-center border-gray-400 rounded-[24px] cursor-pointer hover:bg-gray-200 transition">
            <font-awesome-icon icon="fa-solid fa-upload" class="text-[#C76950] text-2xl mb-2" />
            <p class="text-gray-600 text-sm">
              <span class="text-blue-600 underline">Click</span> to upload certificate (JPG/PNG/PDF)
            </p>
            <input required
              ref="certificateInput" 
              type="file" 
              accept="image/*,.pdf" 
              class="hidden"
              @change="handleCertificateChange" 
            />
          </div>

          <!-- Certificate Preview -->
          <div v-if="certificatePreview" class="mt-3 flex justify-center">
            <div class="relative">
              <!-- Image Preview -->
              <img 
                v-if="certificateType?.startsWith('image')"
                :src="certificatePreview"
                class="w-[150px] h-[150px] object-cover rounded-[12px] border-2 border-[#C76950]" 
              />
              <!-- PDF Preview -->
              <div 
                v-else
                class="w-[150px] h-[150px] bg-gray-200 rounded-[12px] border-2 border-[#C76950] flex flex-col items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-file-pdf" class="text-red-500 text-4xl" />
                <p class="text-xs text-gray-600 mt-2">PDF File</p>
              </div>
              <!-- Remove Button -->
              <button 
                @click="removeCertificate" 
                type="button"
                class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                ✕
              </button>
            </div>
          </div>

          <!-- Certificate File Name -->
          <p v-if="certificateName" class="text-xs text-gray-600 mt-2 text-center">
             {{ certificateName }}
          </p>

          <!-- Certificate Upload Progress -->
          <div v-if="isUploadingCertificate" class="mt-3">
            <div class="flex items-center gap-2">
              <div class="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div class="bg-[#C76950] h-full rounded-full transition-all duration-300" 
                  :style="{ width: certificateUploadProgress + '%' }"></div>
              </div>
              <span class="text-xs text-gray-600">{{ certificateUploadProgress }}%</span>
            </div>
          </div>

          <!-- Certificate Error -->
          <p v-if="certificateError" class="text-red-500 text-xs mt-2">{{ certificateError }}</p>
        </div>

        <!-- General Error Message -->
        <p v-if="errorMessages" class="text-red-400 text-sm mb-3">{{ errorMessages }}</p>

        <!-- Submit Button -->
        <div>
          <button 
            type="submit"
            :disabled="isSaving"
            class="text-[#fefefe] w-full h-10 text-center text-sm mt-4 bg-[#C76950] rounded-[20px] flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#a85740] transition-colors">
            {{ isSaving ? 'Saving...' : 'Save Profile' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
useHead ({
  title: "Complete Engineer Profile",
  meta: [
    {
      name: "description",
      content: "اكمل ملف المهندس الخاص بك لتقديم خدماتك ومشاريعك للعملاء بسهولة.",
    },
    {'keywords': 'مهندس, ملف مهندس, تسجيل مهندس, خدمات مهندس, مشاريع مهندس, تصميم, تطوير, تجارة إلكترونية, متجر إلكتروني, تسوق عبر الإنترنت'},
  ],
});

// Form fields
const specialization = ref('')
const experience = ref('')
const bio = ref('')
const position = ref('')
const mobile = ref('')
const userName = ref('Ahmed')
const errorMessages = ref('')
const isSaving = ref(false)

// Profile Image
const profileImageInput = ref(null)
const profileImage = ref(null)
const imagePreview = ref(null)
const profileImageError = ref('')
const isUploadingProfile = ref(false)
const profileUploadProgress = ref(0)

// Certificate
const certificateInput = ref(null)
const certificate = ref(null)
const certificatePreview = ref(null)
const certificateName = ref('')
const certificateType = ref('')
const certificateError = ref('')
const isUploadingCertificate = ref(false)
const certificateUploadProgress = ref(0)

const { $db } = useNuxtApp()
const auth = getAuth()

onMounted(async () => {
  const user = auth.currentUser
  if (!user) {
    navigateTo('/signin')
    return
  }

  const docSnap = await getDoc(doc($db, 'engineers', user.uid))
  if (docSnap.exists()) {
    const data = docSnap.data()
    position.value = data.position || ''
    experience.value = data.yearsOfExperience || ''
    bio.value = data.bio || ''
    specialization.value = data.specialization || ''
    mobile.value = data.mobile || ''
    userName.value = data.name || 'Ahmed'
    
    // Load existing images
    if (data.image) {
      imagePreview.value = data.image
    }
    if (data.certificate) {
      certificatePreview.value = data.certificate
      certificateName.value = 'Existing Certificate'
    }
  }
})

// Profile Image Functions
const triggerProfileImage = () => {
  profileImageInput.value?.click()
}

const handleProfileImageChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    profileImageError.value = 'Please select a valid image (JPEG, PNG, JPG, WEBP)'
    return
  }

  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    profileImageError.value = 'Image size must be less than 5MB'
    return
  }

  profileImageError.value = ''
  profileImage.value = file
  imagePreview.value = URL.createObjectURL(file)

  // Simulate upload
  await uploadProfileImage(file)
}

const uploadProfileImage = async (file) => {
  isUploadingProfile.value = true
  profileUploadProgress.value = 0

  try {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      profileUploadProgress.value = i
    }
    console.log('Profile image uploaded successfully!')
  } catch (error) {
    console.error('Profile upload error:', error)
    profileImageError.value = 'Upload failed. Please try again.'
    imagePreview.value = null
  } finally {
    isUploadingProfile.value = false
    profileUploadProgress.value = 0
  }
}

// Certificate Functions
const triggerCertificateInput = () => {
  certificateInput.value?.click()
}

const handleCertificateChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf']
  if (!allowedTypes.includes(file.type)) {
    certificateError.value = 'Please select a valid file (JPEG, PNG, JPG, WEBP, PDF)'
    return
  }

  const maxSize = 10 * 1024 * 1024 // 10MB for certificates
  if (file.size > maxSize) {
    certificateError.value = 'File size must be less than 10MB'
    return
  }

  certificateError.value = ''
  certificate.value = file
  certificateName.value = file.name
  certificateType.value = file.type

  // Create preview (only for images)
  if (file.type.startsWith('image')) {
    certificatePreview.value = URL.createObjectURL(file)
  } else {
    certificatePreview.value = 'pdf' // Placeholder for PDF
  }

  // Simulate upload
  await uploadCertificate(file)
}

const uploadCertificate = async (file) => {
  isUploadingCertificate.value = true
  certificateUploadProgress.value = 0

  try {
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 150))
      certificateUploadProgress.value = i
    }
    console.log('Certificate uploaded successfully!')
  } catch (error) {
    console.error('Certificate upload error:', error)
    certificateError.value = 'Upload failed. Please try again.'
    certificatePreview.value = null
  } finally {
    isUploadingCertificate.value = false
    certificateUploadProgress.value = 0
  }
}

const removeCertificate = () => {
  certificate.value = null
  certificatePreview.value = null
  certificateName.value = ''
  certificateType.value = ''
  if (certificateInput.value) {
    certificateInput.value.value = ''
  }
}

// Save Form
const saveData = async () => {
  errorMessages.value = ''

  // Validation
  if (!position.value || !specialization.value || !experience.value || !bio.value || !mobile.value) {
    errorMessages.value = "Please fill all required fields."
    return
  }

  if (!profileImage.value && !imagePreview.value) {
    errorMessages.value = "Please upload a profile image."
    return
  }

  isSaving.value = true

  try {
    const user = auth.currentUser
    
    // Here you would upload images to Firebase Storage and get URLs
    // For now, using local URLs as placeholders
    
    await updateDoc(doc($db, 'engineers', user.uid), {
      position: position.value,
      specialization: specialization.value,
      yearsOfExperience: Number(experience.value),
      bio: bio.value,
      image: imagePreview.value, // Replace with actual Firebase Storage URL
      mobile: mobile.value,
      certificate: certificatePreview.value, // Replace with actual Firebase Storage URL
      certificateName: certificateName.value,
      profileComplete: true
    })

    console.log('Profile saved successfully!')
    navigateTo("/userEngineer/membership")

  } catch (error) {
    console.error('Save error:', error)
    errorMessages.value = "Failed to save profile. Please try again."
  } finally {
    isSaving.value = false
  }
}
</script>