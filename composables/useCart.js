import { ref, computed } from 'vue'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

// ✅ Global state - مشترك بين كل الصفحات
const cartItems = ref([])
const isLoading = ref(false)
let unsubscribeFunc = null

export const useCart = () => {
  const { $db } = useNuxtApp()

  // حساب عدد المنتجات
  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + (item.quantity || 1)
    }, 0)
  })

  // الاستماع للتغييرات Real-time
  const subscribeToCart = (userId) => {
    // إلغاء الاستماع السابق
    if (unsubscribeFunc) {
      unsubscribeFunc()
    }

    if (!userId) {
      cartItems.value = []
      return
    }

    try {
      const cartRef = collection($db, 'carts')
      const q = query(cartRef, where('userId', '==', userId))
      
      // الاستماع للتحديثات
      unsubscribeFunc = onSnapshot(q, (snapshot) => {
        cartItems.value = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log('🛒 Cart updated:', cartItems.value.length, 'items')
        console.log('📊 Cart count:', cartCount.value)
      }, (error) => {
        console.error('❌ Cart error:', error)
      })
    } catch (err) {
      console.error('❌ Subscribe error:', err)
    }
  }

  // إيقاف الاستماع
  const unsubscribe = () => {
    if (unsubscribeFunc) {
      unsubscribeFunc()
      unsubscribeFunc = null
    }
    cartItems.value = []
  }

  return {
    cartItems,
    cartCount,
    isLoading,
    subscribeToCart,
    unsubscribe
  }
}