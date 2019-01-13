import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Signin from './views/Signin.vue'
import ChatRoom from './views/ChatRoom.vue'
import Register from './views/Register.vue'
import Changelog from './views/Changelog.vue'
import Download from './views/Download.vue'
import PageNotFound from './views/PageNotFound.vue'

import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/ChatRoom',
      name: 'ChatRoom',
      component: ChatRoom
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Changelog',
      name: 'Changelog',
      component: Changelog
    },
    {
      path: '/Download',
      name: 'Download',
      component: Download
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   //Redirect to Chatroom if logged in
//   if ((to.path.toLowerCase() === "/Signin" || to.path.toLowerCase() === "/Register") && store.state.user) {
//     next({
//       name: "ChatRoom"
//     })
//     return
//   }
//   //Redict to login if not signed in
//   if (to.path.toLowerCase() === "/chatroom" && !store.state.user) {
//     next({
//       name: "Signin"
//     })
//     return
//   }
//   next();
// })


export default router