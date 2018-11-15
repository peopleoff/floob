import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import ChatRoom from './views/ChatRoom.vue'
import Register from './views/Register.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
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
  ]
})

router.beforeEach((to, from, next) => {
  //Redirect to Chatroom if logged in
  if(to.path.toLowerCase() === "/" || to.path.toLowerCase() === "/register" ){
    if(store.state.user ){
      next({name: "ChatRoom"})
    }
    else{
      next()
    }
    //Redict to login if not signed in
  }else if(to.path.toLowerCase() == "/chatroom" && !store.state.user){
    next({name: "Index"})
  }
  else{
    next()
  }
})


export default router
