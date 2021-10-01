import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import { store } from '@/store' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import i18n from '../plugins/i18n';
import FlagIcon from 'vue-flag-icon';
import { BDropdown } from 'bootstrap-vue';

Vue.component('b-dropdown', BDropdown)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(FlagIcon);

Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')


