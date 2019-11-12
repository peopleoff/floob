import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Rooms from './views/Rooms.vue'
import Room from './views/Room.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import PasswordReset from './views/PasswordReset.vue'
//Import Store
import store from './store';
//Import UserService to login user from router
import UserService from '@/services/UserService'

Vue.use(Router)

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function setError(message) {
  store.commit('UPDATE_SNACKBAR', {
    error: true,
    type: 'error',
    message: message
  })
}


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
      path: '/Rooms',
      name: 'Rooms',
      component: Rooms
    },
    {
      path: '/Room/:id',
      name: 'room',
      component: Room
    },
    {
      path: '/PasswordReset/:token',
      name: 'PasswordReset',
      component: PasswordReset
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/AccountRecovery',
      name: 'AccountRecovery',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/AccountRecovery.vue')
    },
    {
      path: '/TermsOfService',
      name: 'TermsOfService',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/TermsOfService.vue')
    },
    {
      path: '/PrivacyPolicy',
      name: 'AccountRecPrivacyPolicyovery',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/PrivacyPolicy.vue')
    },
  ]
})


router.beforeEach((to, from, next) => {

  function tokenLogin() {

    let token = getCookie('token');
    let user = store.state.user

    //If no user & token is in cookies sign user in.
    if (!user && token) {
      UserService.login({
        token: token
      }).then(response => {
        if (response.data.error) {
          setError('Error signing in')
          store.commit('LOGOUT_USER')
        } else {
          console.log(response);
          store.commit('ADD_USER', response.data)
        }
      })
    }
  }

  tokenLogin();
  next();
});

export default router