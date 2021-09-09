import Vue from 'vue'
import Router from 'vue-router'

import CheckAccess from './check-access'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
    routes: [

        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ('@/components/Login'),
            props: true 
        },

        {
            path: '/',
            name: 'Home',
            component: () =>
                import ('@/components/Home'),
            beforeEnter: CheckAccess,
            
        },
        {
            path: '*',
            name: '404',
            component: PageNotFound

        }
    ]
})