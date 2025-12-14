<template>
  <div>
    <!-- Notification -->
    <div
      v-if="notification.show"
      class="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-sm p-4 rounded-lg shadow-lg flex items-center gap-3"
      :class="{
        'bg-green-50 text-green-800 border border-green-200': notification.type === 'success',
        'bg-red-50 text-red-800 border border-red-200': notification.type === 'error',
        'bg-yellow-50 text-yellow-800 border border-yellow-200': notification.type === 'warning'
      }"
    >
      <span v-if="notification.type === 'success'" class="text-green-500 text-xl">✓</span>
      <span v-else-if="notification.type === 'error'" class="text-red-500 text-xl">✕</span>
      <span v-else class="text-yellow-500 text-xl">⚠</span>
      
      <p class="flex-1 text-sm font-medium">{{ notification.message }}</p>
      
      <button 
        @click="notification.show = false"
        class="text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-10 relative">
   
      <h2 class="text-[18px] lg:text-[36px] font-bold mb-[5px] md:mb-5">Checkout</h2>

      <!-- Grid page -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

        <!--left side-->
        <div class="lg:col-span-2 space-y-3">
          <!-- Customer Info -->
          <section class="lg:space-y-3">
            <h2 class="text-[18px] lg:text-[22px] lg:mt-4 lg:mb-5 font-semibold">Customer info</h2>

            <!-- left side 2colum-->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">

              <div class="flex flex-col gap-1">
                <label class="text-xl text-black-600">First Name</label>
                <FormInput placeholder="First Name" v-model="firstName" />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-xl text-black-600">Last Name</label>
                <FormInput placeholder="Last Name" v-model="lastName" />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-xl text-black-600">Email</label>
                <FormInput placeholder="Example@gmail.com" type="email" v-model="email" />
              </div>

              <div class="flex flex-col gap-1">
                <label class="text-xl text-black-600">Phone Number</label>
                <FormInput placeholder="Phone Number" type="number" v-model="phone" />
              </div>

            </div>
          </section>

          <!-- Shipping details -->
          <section class="space-y-3">
            <h2 class="lg:mt-12 text-[18px] lg:text-[22px] font-semibold">Shipping details</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 pt-2 gap-4 bg-gray-50 p-4 rounded-2xl">

              <!-- Address -->
              <div class="md:col-span-2 flex flex-col gap-1">
                <label class="text-xl text-black-600">Address</label>
                <FormInput placeholder="Enter your Address" v-model="address" />
              </div>

              <!-- Governorate -->
              <div class="flex flex-col gap-1">
                <label class="text-xl text-black-600">Governorate</label>
                <FormInput placeholder="Governorate" v-model="governorate" />
              </div>

              <!-- City -->
              <div class="flex flex-col gap-1">
                <label class="text-xl text-black-600">City</label>
                <FormInput
                  type="select"
                  v-model="selectedGov"
                  :options="city"
                />
              </div>

            </div>
          </section>

          <!--payment methods-->
          <section class="space-y-3">
            <h1 class="lg:mt-12 lg:pb-1 text-[18px] lg:text-[22px] font-semibold">Payment Method</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">

              <div class="flex items-center gap-3">
                <input type="radio" name="payment" value="cash" v-model="payment" class="w-4 h-4"/>
                <label class="text-[20px]">Cash on Delivery</label>
              </div>

              <div class="flex items-center gap-3">
                <input type="radio" name="payment" value="card" v-model="payment" class="w-4 h-4"/>
                <label class="text-[20px]">Credit Card</label>
              </div>

              <div v-if="payment === 'card'" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pb-4">

                <!-- Card Number -->
                <div class="md:col-span-2 flex flex-col gap-1">
                  <label class="text-l text-black-600">Card Number</label>
                  <FormInput
                    placeholder="Enter your Card Number"
                    type="number"
                    v-model="cardNumber"
                  />
                </div>

                <!-- Expiry Date -->
                <div class="flex flex-col gap-1">
                  <label class="text-l text-black-600">Expiry Date</label>
                  <FormInput
                    placeholder="Expiry Date"
                    type="date"
                    v-model="expirydate"
                  />
                </div>

                <!-- CVV -->
                <div class="flex flex-col gap-1">
                  <label class="text-l text-black-600">CVV</label>
                  <FormInput
                    placeholder="CVV"
                    type="number"
                    v-model="CVV"
                  />
                </div>

              </div>
            </div>
          </section>

        </div>

        <!------------------------------right side -------------------------------------------------->
        <div class="lg:col-span-1">  
          <h2 class="taxt-[18px] lg:text-[20px] font-semibold mb-4 mt-5">Order Summary</h2>

          <div class="bg-white rounded-[16px] border border-gray-200 p-4 mb-4 relative">
            <checkcard2 v-for="item in cartItems" :key="item.id" :product="item"/>
            
            <!-- Discount Code Section -->
            <div class="mb-4 pb-4 border-b border-gray-200">
              <h3 class="text-[16px] font-semibold mb-2">Discount Code</h3>
              <input 
                type="text" 
                placeholder="enter your discount code" 
                v-model="discountcode"
                class="w-full px-3 py-2 border border-gray-300 rounded-[20px] outline-none focus:border-[#C76950] text-[13px] mb-2"
              />
              <button class="px-6 py-2 bg-[#C76950] text-white rounded-[20px] hover:bg-[#AD563F] text-[14px] font-medium">
                Apply
              </button>
            </div>

            <!-- Price Summary -->
            <div class="bg-white shadow rounded-2xl p-6">
              <div class="space-y-4">
                <div class="flex justify-between">
                  <p>Subtotal:</p>
                  <p>{{ subtotal }} LE</p>
                </div>
                <div class="flex justify-between">
                  <p>Discount (5%):</p>
                  <p>-{{ discount }} LE</p>
                </div>
                <div class="flex justify-between">
                  <p>Shipping:</p>
                  <p>{{ shipping }} LE</p>
                </div>
              </div>

              <hr class="mt-5"/>

              <!---مجموع-->   
              <div class="flex justify-between font-bold mt-3">
                <p>Total</p>
                <p>{{ total }} LE</p>
              </div>
            </div>

            <!-- Place Order Button -->
            <button @click="order" class="w-full mt-[10px] py-3 bg-[#C76950] text-white rounded-[22px] hover:bg-[#AD563F] text-[15px] font-medium">
              Place order
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

.custom-label label {
  font-size: 12px;
}
</style>
<script setup>
import {ref,onMounted,onUnmounted,computed} from "vue";
import { useNuxtApp } from "#app";
import { collection, query, onSnapshot, getDocs, writeBatch, addDoc, serverTimestamp, where, doc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const { $db: db, $auth: auth } = useNuxtApp();
const userId=ref(null);
const cartItems=ref([]);
const isLoading = ref(true);

let unsubAuth = null;
let unsubCart = null;
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");

const address = ref("");
const governorate = ref("Egypt");
const city = [
  "Cairo",
  "Alexandria",
  "Giza",
  "Luxor",
  "Aswan",
  "Suez",
  "Port Said",
  "Ismailia",
  "Dakahlia",
  "Sharqia",
  "Kafr El Sheikh",
  "Gharbia",
  "Menoufia",
  "Beni Suef",
  "Faiyum",
  "Qena",
  "Sohag",
  "Asyut",
  "Minya",
  "New Valley",
  "Matrouh",
  "North Sinai",
  "South Sinai",
  "Red Sea",
  "Damietta",
  "Ain Sokhna",
  "6th of October",
  "10th of Ramadan",
  "October 6 City"
];
//////////shipping cost
const shippingRules = {
  "Cairo": 50,
  "Giza": 60,
  "Alexandria": 70,
  "Dakahlia": 80,
  "Sharqia": 80,
  "Kafr El Sheikh": 85,
  "Gharbia": 85,
  "Menoufia": 90,
  "Beni Suef": 90,
  "Faiyum": 95,
  "Qena": 100,
  "Luxor": 110,
  "Aswan": 120,
  "Matrouh": 100,
  "South Sinai": 120,
  "North Sinai": 130,
 
};
const selectedGov=ref("")
const payment =ref("")
const cardNumber=ref("")
const expirydate=ref("")
const CVV=ref("")

const notification = ref({
  show: false,
  message: '',
  type: 'success'
});

function showNotification(message, type = 'success') {
  notification.value = { show: true, message, type };
  
  setTimeout(() => {
    notification.value.show = false;
  }, 4000);
}


function round3(num) {
  return Number(num.toFixed(3));
}
const subtotal = computed(() => {
  const sum = cartItems.value.reduce((sum, item) => {
    return sum + (item.productSnapshot.price * item.quantity);
  }, 0);
  return round3(sum);
});

const discountRate = 0.05;
const discount = computed(() => {
  return round3(subtotal.value * discountRate);
});

const shipping = computed(() => {
  
  return shippingRules[selectedGov.value] || 120; 
});

const total = computed(() => {
  return round3(subtotal.value - discount.value + shipping.value);
});
/////////order colllection


function validateCheckout() {
  const required = [
    firstName.value.trim(),
    lastName.value.trim(),
    email.value.trim(),
    phone.value.trim(),
    address.value.trim(),
    selectedGov.value.trim(),
    payment.value,
  ];

  if (payment.value === "card") {
    required.push(
      cardNumber.value.trim(),
      expirydate.value.trim(),
      CVV.value.trim()
    );
  }

  return required.some(field => !field); // true = error
}
function cleanData(obj) {
  if (obj === null || obj === undefined) return null;
  if (typeof obj !== 'object') return obj;
  

   if (obj._methodName === 'serverTimestamp' || obj.constructor?.name === 'FieldValue') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => cleanData(item)).filter(item => item !== null);
  }
  
  const cleaned = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      cleaned[key] = cleanData(value);
    } else if (value === null) {
      cleaned[key] = null;
    }
    // تخطي undefined تماماً
  }
  return cleaned;
}


async function order(){
  const hasError = validateCheckout();
  if(hasError){
    showNotification("Please fill all required fields", "error");   
    return;
  }
  
  if(!userId.value){
    showNotification("Please log in first", "warning"); 
    return;
  }
  
  try {
    const orderData = {
      userId: userId.value,
      customerInfo: {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
      },
      shippingInfo: {
        address: address.value.trim(),
        city: selectedGov.value.trim(),
        governorate: governorate.value,
      },
      paymentInfo: {
        method: payment.value,
        ...(payment.value === "card" && {
          cardNumber: cardNumber.value.trim(),
          expirydate: expirydate.value.trim(),
          CVV: CVV.value.trim(),
        })
      },
      orderItems: cartItems.value.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.productSnapshot.price,
        title: item.productSnapshot.name,
        image: item.productSnapshot.image,
      })),
      subtotal: subtotal.value || 0,
      discount: discount.value || 0,
      shipping: shipping.value || 0,
      total: total.value || 0,
      status: "pending",
      createdAt: serverTimestamp(),
    };
    
    const cleanedOrderData = cleanData(orderData);
    console.log("CLEANED ORDER DATA => ", cleanedOrderData);
    
    const orderRef = await addDoc(collection(db, "orders"), cleanedOrderData);
    console.log("ORDER ID:", orderRef.id);
    
    showNotification("Order placed! Your Order ID is: " + orderRef.id, "success");  
    // Clear cart
    const batch = writeBatch(db);
    cartItems.value.forEach((item) => {
      batch.delete(doc(db, "carts", item.id));
    });
    await batch.commit();

  } catch (error) {
    console.error("Order Error:", error);
    showNotification("Failed to place order: " + error.message, "error");  
  }
}

//user
onMounted(()=>{
  unsubAuth=onAuthStateChanged(auth,(user)=>{
    if(user){
      userId.value=user.uid;
      subscribeTocart();
    }
    else{
      userId.value=null;
      cartItems.value=[]
    }
  })
});
onUnmounted(()=>{ //stop listener
  if(unsubAuth) unsubAuth();
   if(unsubCart) unsubCart();
});
function subscribeTocart(){
  const q=query( collection(db, "carts"),
  where("userId", "==", userId.value));
  unsubCart=onSnapshot(q,(snapshot)=>{
    cartItems.value=snapshot.docs.map((doc)=>({ 
      id:doc.id,
      ...doc.data()
    }));
    console.log("CHECKOUT CART ITEMS => ", cartItems.value);
    isLoading.value= false;
  })
}


</script>
