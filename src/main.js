import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
/* eslint-disable no-new */
new Vue({
  router,
  render:h=>h(App)
}).$mount("#app")
