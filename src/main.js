import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from '@/router/router'
// import router from './router'
// import { store } from '@/store' 
// import i18n from '@/lang/lang'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
    router,
    // store,
    // i18n,
    render: h => h(App),
}).$mount('#app')





// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
