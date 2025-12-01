import { ref, onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from "#app";
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function useDelete() {
  const { $db: db, $auth: auth } = useNuxtApp();

  const cartItems = ref([]);
  const localCartItems = ref([]);

  const loading = ref(true);
  const error = ref(null);

  let unsubscribeSnapshot = null;
  let unsubscribeAuth = null;

  // ------------------------------
  // الاستماع للسلة
  // ------------------------------
  function startListeningCart(uid) {
    if (unsubscribeSnapshot) {
      unsubscribeSnapshot();
      unsubscribeSnapshot = null;
    }

    loading.value = true;
    error.value = null;

    try {
      const q = query(
        collection(db, "carts"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      );

      unsubscribeSnapshot = onSnapshot(
        q,
        (snapshot) => {
          const data = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
             quantity: d.data().quantity || 1 //quantity ->عشان ف فايريبز مفيش quantity field
          }));

          cartItems.value = data;
          localCartItems.value = [...data];
          loading.value = false;
        },
        (err) => {
          error.value = "Failed to load cart";
          loading.value = false;
        }
      );
    } catch (err) {
      error.value = "Failed to initialize cart";
    }
  }

  // ------------------------------
  // حذف محلي (UI)
  // ------------------------------
  const removeLocal = (cartId) => {
    localCartItems.value = localCartItems.value.filter(
      (item) => item.id !== cartId
    );
  };

  // ------------------------------
  // حذف حقيقي من Firebase
  // ------------------------------
  async function removeFromCart(cartId) {
    const removedItem = localCartItems.value.find(
      (i) => i.id === cartId
    );

    // Optimistic UI
    removeLocal(cartId);

    try {
      await deleteDoc(doc(db, "carts", cartId));
    } catch (err) {
      console.error("Delete error:", err);

      // rollback لو فشل
      if (removedItem) {
        localCartItems.value = [removedItem, ...localCartItems.value];
      }

      alert("تعذر حذف المنتج. حاول مرة أخرى.");
    }
  }

  // ------------------------------
  // Auth Listener
  // ------------------------------
  onMounted(() => {
    unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        startListeningCart(user.uid);
      } else {
        cartItems.value = [];
        localCartItems.value = [];
        loading.value = false;
      }
    });
  });

  // ------------------------------
  // cleanup
  // ------------------------------
  onUnmounted(() => {
    if (unsubscribeSnapshot) unsubscribeSnapshot();
    if (unsubscribeAuth) unsubscribeAuth();
  });

  return {
    cartItems,
    localCartItems,
    loading,
    error,
    removeFromCart,
    startListeningCart,
  };
}
