import Vue from 'vue'
import Router from 'vue-router'

// import AuthProtect from './auth-protect'
// import PageNotFound from '@/views/PageNotFound'

Vue.use(Router)

export default new Router({
    routes: [


        // {
        //     path: '/login/:username?/:password?',
        //     name: 'Login',
        //     component: () =>
        //         import ('@/views/Login'),
        //         props: true 
        // },

        {
            path: '/',
            name: 'Home',
            component: () =>
                import ('@/views/Home.vue'),
            beforeEnter: AuthProtect
        },

        
        // {
        //     path: '/analytics',
        //     name: 'Analytics',
        //     component: () =>
        //         import ('@/views/Analytics'),
        //     beforeEnter: AuthProtect
        // },

        // {
        //     path: '/reports',
        //     name: 'Reports',
        //     component: () =>
        //         import ('@/views/Reports'),
        //     beforeEnter: AuthProtect
        // },
        // {
        //     path: '/validation/:paramReportStatus/:paramReportType/:paramReportId/',
        //     name: 'ValidationView',
        //     component: () =>
        //         import ('@/views/ReportsValidation'),   
        //     beforeEnter: AuthProtect,
        //     props: true , 
        // },

        // {
        //     path: '/validation',
        //     name: 'Validation',
        //     component: () =>
        //         import ('@/views/ReportsValidation'),
        //     beforeEnter: AuthProtect,
        //     props: true , 
        // },
        // {
        //     path: '/administration',
        //     name: 'Administration',
        //     component: () =>
        //         import ('@/views/Administration'),
        //     beforeEnter: AuthProtect,
        //     meta: {
        //         is_admin: true
        //     }
        // },
        // {
        //     path: '/logs',
        //     name: 'Log',
        //     component: () =>
        //         import ('@/views/Log'),
        //     beforeEnter: AuthProtect,
        //     meta: {
        //         is_logManager: true
        //     }
        // },

        // {
        //     path: '/reports/:id/:model?/:type?',
        //     name: 'ReportPrintable',
        //     component: () =>
        //         import ('@/views/ReportPrintable'),
        //     props: true 
        // },
        // {
        //     path: '/setting',
        //     name: 'Setting',
        //     component: () =>
        //         import ('@/views/Settings'),
        //     beforeEnter: AuthProtect
        // },

        // {
        //     path: '/notifications',
        //     name: 'Notification',
        //     component: () =>
        //         import ('@/views/Notifications')
        // },

        // {
        //     path: '*',
        //     name: '404',
        //     component: PageNotFound

        // }
    ]
})