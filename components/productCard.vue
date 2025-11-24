<script setup>
import { useNuxtApp } from '#app';
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    },
});
const nuxtApp = useNuxtApp();
const db = nuxtApp.$db;
const auth = nuxtApp.$auth;

async function addToWishlist(){

  const user = auth.currentUser;
  if(!user){
    alert('Please sign in to save to wishlist');
    return;
  }
  const wishlistDocId = `${user.uid}_${props.product.id}`;
  const wishlistDocRef = doc(db, 'wishlists', wishlistDocId);

  const existing = await getDoc(wishlistDocRef);

  if(existing.exists()){
    await deleteDoc(wishlistDocRef);
    alert('Removed from wishlist')
  }
  else{
    await setDoc(wishlistDocRef,{
      userId: user.uid,
      ProductId: props.product.id,
      createdAt: serverTimestamp(),
      productSnapshot:{
        id: props.product.id,
        name: props.product.name,
        price: props.product.price,
        image: props.product.image,
        brand: props.product.brand,
      },
    });
    alert('Added to wishlist')
  }
}

</script>

<template>
  <nuxt-link>
    <div class="card">
      <div class="image relative">
        <nuxt-link>
          <div
            @click="addToWishlist"
            class="heart absolute top-3 right-3 bg-[#D9D9D9] w-[35px] h-[35px] rounded-full flex justify-center items-center z-10"
          >
            <font-awesome-icon
              :icon="['far', 'heart']"
              class="text-[#C76950] text-lg"
            />
          </div>
        </nuxt-link>
  
        <img :src="product.image" :alt="product.name" />
      </div>
  
      <div class="para">
        <div class="flex justify-between items-center">
          <h3>{{ product.name }}</h3>
          <div class="flex justify-center items-center">
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <p>4.0</p>
            <!-- <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            />
            <font-awesome-icon
              :icon="['fas', 'star']"
              class="text-yellow-200 text-s"
            /> -->
          </div>
        </div>
  
        <p>{{ product.description }}</p>
        <p>Brand: {{ product.brand }}</p>
  
        <div class="flex justify-between items-center">
          <h5>{{ product.price }}</h5>
          <nuxt-link class="cursor-pointer">
            <div
              class="flex justify-center items-center rounded-full bg-[#C76950] p-[10px] w-[40px] h-[40px]"
            >
              <font-awesome-icon
                :icon="['fas', 'cart-shopping']"
                class="text-white text-s"
              />
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<style scoped>
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 12px;
  transition: 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
}

.image {
  width: 100%;
  height: 260px;
  position: relative;
}

.image img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.para :nth-child(1) {
  font-weight: 600;
}
.para :nth-child(2) {
  color: rgb(94, 91, 91);
}
.para :nth-child(3) {
  font-weight: bold;
}

.heart {
  cursor: pointer;
}
</style>
