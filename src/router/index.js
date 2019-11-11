import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HomeBanking from '../components/HomeBanking'
import Register from '../components/Register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/session',
      name: 'HomeBaking',
      component: HomeBanking

    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
