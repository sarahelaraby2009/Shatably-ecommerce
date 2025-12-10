<template> 
  <div class="p-3 pb-5">
    <h3 class="font-bold text-xl">Addresses</h3>
    <p>Manage your addresses for fast and easy checkout</p>    
  </div>

  <div class="p-5 shadow rounded-3xl mt-4 ">
    <h3 class="font-bold text-xl">Address information</h3>

    <div class="flex flex-col md:flex-row gap-4 p-3">
      <div class="grid gap-2 flex-1">
        <h1>Governorate</h1>
        <div  class="w-full border border-gray-300 rounded-full p-3 outline-none focus:ring-2 focus:ring-[#C76950]"
>
          Egypt
        </div>
          
             
      </div>
      <div class="grid gap-2 w-full md:flex-1">
        <h1>City</h1>

        
             <select class="w-full border border-gray-300 rounded-full p-3 outline-none focus:ring-1 focus:ring-[#C76950] " 
             v-model="newAddress.city" >
<option  value="" selected hidden class="text-gray-50"> Choose your City</option>
<option class="text-black" value="cairo">Cairo</option>
  <option class="text-black" value="giza">Giza</option>
  <option class="text-black" value="alexandria">Alexandria</option>
  <option class="text-black" value="qalyubia">Qalyubia</option>
  <option class="text-black" value="sharqia">Sharqia</option>
  <option class="text-black" value="dakahlia">Dakahlia</option>
  <option class="text-black" value="gharbia">Gharbia</option>
  <option class="text-black" value="monufia">Monufia</option>
  <option class="text-black" value="beheira">Beheira</option>
  <option class="text-black" value="kafr_elsheikh">Kafr El Sheikh</option>
  <option class="text-black" value="damietta">Damietta</option>
  <option class="text-black" value="port_said">Port Said</option>
  <option class="text-black" value="ismailia">Ismailia</option>
  <option class="text-black" value="suez">Suez</option>
  <option class="text-black" value="fayoum">Fayoum</option>
  <option class="text-black" value="beni_suef">Beni Suef</option>
  <option class="text-black" value="minya">Minya</option>
  <option class="text-black" value="assiut">Assiut</option>
  <option class="text-black" value="sohag">Sohag</option>
  <option class="text-black" value="qena">Qena</option>
  <option class="text-black" value="luxor">Luxor</option>
  <option class="text-black" value="aswan">Aswan</option>
  <option class="text-black" value="red_sea">Red Sea</option>
  <option class="text-black" value="matrouh">Matrouh</option>
  <option class="text-black" value="north_sinai">North Sinai</option>
  <option class="text-black" value="south_sinai">South Sinai</option>
  <option class="text-black" value="new_valley">New Valley</option>

      </select>

        <!-- <input
          v-model="newAddress.city"
          type="text"
          placeholder="City"
          class="w-full border border-gray-300 rounded-full p-3 outline-none focus:ring-2 focus:ring-[#C76950]"
        />      -->
      </div>
    </div>

    <div class="grid gap-2 p-3">
      <h1>Address</h1>

      <input
        v-model="newAddress.street"
        type="text"
        placeholder="Enter your Address"
        class="w-full border border-gray-300 rounded-full p-3 outline-none focus:ring-1 focus:ring-[#C76950]"
      />     
    </div>

    <div class="bg-[#C76950] hover:bg-[#B55F47] p-3 rounded-3xl text-center mt-10 cursor-pointer transition-colors">
      <button 
        @click="addAddress"
        :disabled="loading"
        class="w-full text-white font-semibold disabled:opacity-50"
      > 
        {{ loading ? "Adding..." : "Add Address" }}
      </button>
    </div> 
  </div>

  <!-- Success Message -->
  <div
    v-if="successMessage"
    class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-3xl text-center"
  >
    {{ successMessage }}
  </div>

  <!-- Error Message -->
  <div
    v-if="errorMessage"
    class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-3xl text-center"
  >
    {{ errorMessage }}
  </div>

  <!-- Saved Addresses List -->
  <div v-if="addresses.length > 0" class="mt-8">
    <h3 class="font-bold text-2xl mb-4">Your Saved Addresses</h3>
    
    <div class="space-y-4">
      <div 
        v-for="(address, index) in addresses" 
        :key="index"
        class="p-5 shadow rounded-3xl border-2 border-gray-200 hover:border-[#C76950] transition-all"
      >
<!-- Show title (if not in edit mode) -->
         <div v-if="editIndex !== index">
          <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-3">
                <font-awesome-icon :icon="['fas', 'location-dot']" class="text-[#C76950] text-xl" />
                <h4 class="font-bold text-lg"> {{ address.city }}</h4>
                <span 
                  v-if="address.isDefault" 
                  class="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                   Default
                </span>
              </div>
              <p class="text-gray-700 text-base ml-7"> {{ address.street }}</p>
            </div>
            
            <div class="flex gap-2">
              <!-- edit button-->
              <button 
                @click="startEdit(index)"
                class="text-gray-700 hover:text-gray-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                title="Edit Address"
              >
                <font-awesome-icon :icon="['fas', 'edit']" />
              </button>
              
              <button 
              @click="confirmDelete(index)"

                class="text-[#C76950] hover:text-[#C76950] p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Delete Address"
              >
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
            </div>
          </div>

<!-- Default Title Selection Button -->
           <button 
            v-if="!address.isDefault"
            @click="setDefaultAddress(index)"
            class="w-full mt-3 bg-[#C76950] hover:bg-[#B55F47] text-white font-semibold py-2 px-4 rounded-full transition-colors flex items-center justify-center gap-2"
          >
            <font-awesome-icon :icon="['fas', 'check-circle']" />
            Set as Default Address
          </button>
          <!-- <div 
            v-else
            class="w-full mt-3 bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-full text-center"
          >
            ✓ This is your default address
          </div> -->
        </div>

        <div v-else>
          <h4 class="font-bold text-lg mb-4 text-[#C76950]">Edit Address</h4>
          
          <div class="flex gap-4 mb-3">
            <div class="grid gap-2 flex-1">
              <h1>Governorate</h1>
        <div  class="w-full border border-gray-300 rounded-full p-3 outline-none focus:ring-2 focus:ring-[#C76950]"
>
          Egypt
        </div>
            </div>
            <div class="grid gap-2 flex-1">
              <label class="text-sm font-medium">City</label>
              <input
                v-model="editForm.city"
                type="text"
                class="w-full border border-gray-300 rounded-full p-3 outline-none focus:ring-2 focus:ring-[#C76950]"
              />
            </div>
          </div>

          <div class="grid gap-2 mb-4">
            <label class="text-sm font-medium">Address</label>
            <input
              v-model="editForm.street"
              type="text"
              class="w-full border border-gray-300 rounded-full p-3 outline-none focus:ring-2 focus:ring-[#C76950]"
            />
          </div>

          <div class="flex gap-3">
            <button 
              @click="saveEdit(index)"
              :disabled="loading"
              class="flex-1 bg-[#C76950] text-white font-semibold py-2 px-4 rounded-full transition-colors disabled:opacity-50"
            >
              {{ loading ? "Saving..." : "Save Changes" }}
            </button>
            <button 
              @click="cancelEdit"
              class="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-full transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!--  if no address added -->
  <div v-else class="mt-8 p-8 text-center text-gray-400 bg-gray-50 rounded-3xl">
    <font-awesome-icon :icon="['fas', 'map-location-dot']" class="text-5xl mb-4" />
    <p class="text-lg">No addresses saved yet</p>
    <p class="text-sm">Add your first address using the form above!</p>
  </div>

  <!-- Confirm Delete Dialog -->
<ConfirmDialog 
  :show="showConfirmDialog"
  message="Are you sure you want to delete this address?"
  @confirm="deleteAddress"
  @cancel="showConfirmDialog = false"
/>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const { $auth, $db } = useNuxtApp();

// newaddress 
const newAddress = ref({
  city: "",
  street: ""
});

// saved address
const addresses = ref([]);

// edit
const editIndex = ref(null);
const editForm = ref({
  city: "",
  street: ""
});

//  Loading and Message Status
const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");
const showConfirmDialog = ref(false);
const deleteTargetIndex = ref(null);

//  جلب العناوين المحفوظة
const fetchAddresses = async () => {
  const user = $auth.currentUser;
  if (!user) return;

  try {
    const docSnap = await getDoc(doc($db, "users", user.uid));
    if (docSnap.exists() && docSnap.data().addresses) {
      addresses.value = docSnap.data().addresses;
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
};

// Add new address
const addAddress = async () => {
  if (!newAddress.value.city || !newAddress.value.street) {
    errorMessage.value = "Please fill all fields";
    setTimeout(() => errorMessage.value = "", 3000);
    return;
  }

  const user = $auth.currentUser;
  if (!user) {
    errorMessage.value = "Please sign in first";
    return;
  }

  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    // If it's the first address, it will automatically remain the default.
    const isFirstAddress = addresses.value.length === 0;
    
    addresses.value.push({ 
      ...newAddress.value,
      isDefault: isFirstAddress
    });

    await updateDoc(doc($db, "users", user.uid), {
      addresses: addresses.value
    });

    successMessage.value = isFirstAddress 
      ? "Address added successfully as default " 
      : "Address added successfully ";

    newAddress.value = {
   
      city: "",
      street: ""
    };

    setTimeout(() => successMessage.value = "", 3000);
  } catch (error) {
    console.error("Error adding address:", error);
    errorMessage.value = "Failed to add address";
    addresses.value.pop();
  } finally {
    loading.value = false;
  }
};

// start edit
const startEdit = (index) => {
  editIndex.value = index;
  editForm.value = { ...addresses.value[index] };
};

// cancel edit
const cancelEdit = () => {
  editIndex.value = null;
  editForm.value = {
    city: "",
    street: ""
  };
};


// save edit
const saveEdit = async (index) => {
  if (!editForm.value.city || !editForm.value.street) {
    errorMessage.value = "Please fill all fields";
    setTimeout(() => errorMessage.value = "", 3000);
    return;
  }

  const user = $auth.currentUser;
  if (!user) return;

  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    addresses.value[index] = { ...editForm.value };

    await updateDoc(doc($db, "users", user.uid), {
      addresses: addresses.value
    });

    successMessage.value = "Address updated successfully ";
    editIndex.value = null;

    setTimeout(() => successMessage.value = "", 3000);
  } catch (error) {
    console.error("Error updating address:", error);
    errorMessage.value = "Failed to update address";
    fetchAddresses();
  } finally {
    loading.value = false;
  }
};

// delete address
// فتح الـ confirm dialog
const confirmDelete = (index) => {
  deleteTargetIndex.value = index;
  showConfirmDialog.value = true;
};

// delete address
const deleteAddress = async () => {
  const index = deleteTargetIndex.value;
  showConfirmDialog.value = false;
  
  const user = $auth.currentUser;
  if (!user) return;

  const wasDefault = addresses.value[index].isDefault;

  try {
    addresses.value.splice(index, 1);

    if (wasDefault && addresses.value.length > 0) {
      addresses.value[0].isDefault = true;
    }

    await updateDoc(doc($db, "users", user.uid), {
      addresses: addresses.value
    });

    successMessage.value = "Address deleted successfully ";
    setTimeout(() => successMessage.value = "", 3000);
  } catch (error) {
    console.error("Error deleting address:", error);
    errorMessage.value = "Failed to delete address";
    fetchAddresses();
  }
};

// make the address as default
const setDefaultAddress = async (index) => {
  const user = $auth.currentUser;
  if (!user) return;

  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    // شيل الـ default من كل العناوين
    addresses.value.forEach((addr, i) => {
      addr.isDefault = (i === index);
    });

    await updateDoc(doc($db, "users", user.uid), {
      addresses: addresses.value
    });

    successMessage.value = "Default address updated ✔";
    setTimeout(() => successMessage.value = "", 3000);
  } catch (error) {
    console.error("Error setting default address:", error);
    errorMessage.value = "Failed to update default address";
    fetchAddresses();
  } finally {
    loading.value = false;
  }
};


onMounted(() => {
  fetchAddresses();
});
</script>