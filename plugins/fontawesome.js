import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

// منع إضافة CSS تلقائي
config.autoAddCss = false

// Solid icons (الصح هنا)
import { 
  faMagnifyingGlass,
  faSliders,
  faCartShopping,
  faStar,
  faArrowRight,
  faHeart,
  faStore,
  faBriefcase,      // ← هنا الصح
  faCalculator,
    faRobot       // ← هنا الصح
} from '@fortawesome/free-solid-svg-icons'

// Regular icons
import { 
  faHeart as faHeartRegular 
} from '@fortawesome/free-regular-svg-icons'

// Brands icons
import { 
  faFacebookF,
  faLinkedinIn,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

// Add icons
library.add(
  faMagnifyingGlass,
  faSliders,
  faCartShopping,
  faStar,
  faArrowRight,
  faHeart,
  faStore,
  faBriefcase,   
    faRobot ,
  faCalculator,
  faHeartRegular,
  faFacebookF,
  faLinkedinIn,
  faTwitter
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
