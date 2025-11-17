// plugins/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { 
  faMagnifyingGlass, 
  faSliders, 
  faHeart, 
  faCartShopping 
} from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faSliders, faHeart, faCartShopping)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
