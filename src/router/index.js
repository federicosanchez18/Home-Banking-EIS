import Vue from 'vue'
import Router from 'vue-router'
import changePassword from '@/components/ChangePassword'
import Login from '@/components/Login'
import HomeBanking from '../components/HomeBanking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cambioClave',
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
      name: 'HomeBaking',
      component: HomeBanking
    },]
})
