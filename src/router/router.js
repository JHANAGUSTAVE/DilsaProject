import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'

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
    }
   
];