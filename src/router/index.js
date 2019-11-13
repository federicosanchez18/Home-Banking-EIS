import Vue from 'vue'
import Router from 'vue-router'
import changePassword from '@/components/ChangePassword'
import Login from '@/components/Login'
import HomeBanking from '../components/HomeBanking'
import Register from '../components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/session',
      name: 'HomeBanking',
      component: HomeBanking
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
