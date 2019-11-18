import Vue from 'vue'
import Router from 'vue-router'
import changePassword from '@/components/ChangePassword'
import Login from '@/components/Login'
import HomeBanking from '../components/HomeBanking'
import Register from '../components/Register'
import Transfer from '../components/Transfer'
import CashOut from '../components/CashOut'
import ExtractionLimit from '../components/ExtractionLimit'

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
    },
    {
      path: '/Transfer',
      name: 'Transfer',
      component: Transfer
    },
    {
      path: '/CashOut',
      name: 'CashOut',
      component: CashOut
    },
    {
      path: '/Limit',
      name: 'Limit',
      component: ExtractionLimit
    }
  ]
})
