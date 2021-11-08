import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import PageNotFound from '@/components/PageNotFound'
import Contact from '@/components/Contact'
import SaveProduct from '@/components/SaveProduct'

export const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component:  Login
    },
    {
      path: '*',
      component:  PageNotFound
    },
    {
      path: '/contact',
      name: 'contact',
      component:  Contact
    },
    {
      path: '/dashboard/promotions',
      name: 'Dashboard',
      component:  Dashboard
    },
    {
      path: '/dashboard/users',
      name: 'Dashboard',
      component:  Dashboard
    },
    {
      path: '/dashboard/products',
      name: 'Dashboard',
      component:  Dashboard
    },
    {
      path: '/dashboard/products/add',
      name: 'SaveProduct',
      component:  SaveProduct
    }
   
];