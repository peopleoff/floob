import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Chatroom from "./views/Chatroom.vue";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import PasswordReset from "./views/Passwordreset.vue";
import Reset from "./views/Reset.vue";

//Import Store
import store from "./store";

//Import UserService to login user from router
import UserService from "@/services/UserService";

Vue.use(Router);

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2)
    return parts
      .pop()
      .split(";")
      .shift();
}

function setError(message) {
  store.commit("UPDATE_SNACKBAR", {
    error: true,
    type: "error",
    message: message
  });
}

// function isAuth(to, from, next) {
//   let token = getCookie('token');
//   UserService.isAuth({
//     token: token
//   }).then(response => {
//     if (response.data.error) {
//       setError(response.data.message);
//       next({
//         path: '/'
//       })
//     } else {
//       next();
//     }
//   })
// }

function tokenLogin() {
  let token = getCookie("token");
  let user = store.state.user;

  //If no user & token is in cookies sign user in.
  if (!user && token) {
    UserService.tokenLogin({
      token: token
    }).then(response => {
      if (response.data.error) {
        setError("Error signing in");
        store.commit("SIGN_OUT");
        router.push({ to: "/login" });
      } else {
        store.commit("ADD_USER", {
          username: response.data.username
        });
      }
    });
  }
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/Chatroom/:id",
      name: "Chatroom",
      component: Chatroom
    },
    {
      path: "/Register",
      name: "Register",
      component: Register
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/PasswordReset",
      name: "PasswordReset",
      component: PasswordReset
    },
    {
      path: "/Logout",
      name: "Logout",
      beforeEnter: () => {
        store.commit("SIGN_OUT");
      }
    },
    {
      path: "/Reset/:token",
      name: "Reset",
      component: Reset
    }
  ]
});

router.beforeEach((to, from, next) => {
  tokenLogin();
  next();
});

export default router;
