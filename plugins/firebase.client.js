// plugins/firebase.client.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQGpT2-cdHXhAdnl6b3I8-lqx9x89PZDA",
  authDomain: "my-ecommerce-55fc4.firebaseapp.com",
  projectId: "my-ecommerce-55fc4",
  storageBucket: "my-ecommerce-55fc4.firebasestorage.app",
  messagingSenderId: "639493385679",
  appId: "1:639493385679:web:caf2fd8332eef0d3ddb6ba",
  measurementId: "G-9XFNXT5WJ2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db=getFirestore(app)


export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth,db
    },
  };
});
