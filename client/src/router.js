import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Chatroom from './views/Chatroom.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Chatroom/:id',
      name: 'Chatroom',
      component: Chatroom
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
  ]
})
