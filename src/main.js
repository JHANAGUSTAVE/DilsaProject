import Vue from 'vue'
import App from './App.vue'
import { routes } from '@/router/router'
import VueRouter from 'vue-router';
import { store } from '@/store' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import i18n from '../plugins/i18n';
import FlagIcon from 'vue-flag-icon';
import { BDropdown } from 'bootstrap-vue';

Vue.component('b-dropdown', BDropdown)

Vue.use(VueRouter);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(FlagIcon);

Vue.config.productionTip = false




const router = new VueRouter({
  routes,
  mode: 'history'
});

// Make BootstrapVue available throughout your project
/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')


