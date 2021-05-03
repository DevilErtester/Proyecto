import Vue from "vue";
import Router from "vue-router";
import LoginDataService from "./services/LoginDataService"
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList"),
      meta: {
        auth: true,
      }
    },
    {
      path: "/editor",
      name: "Text Editor",
      component: () => import("./components/TextEditor"),
      meta: {
        auth: true,
      }
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial"),
      meta: {
        auth: true,
      }
    },
    {
      path: "/ejemplo",
      name: "Ejemplo",
      component: () => import("./components/Ejemplo"),
      meta: {
        auth: true,
      }
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("./components/Login")
    },
    {
      path: "/chat",
      name: "Chat",
      component: () => import("./components/Chat"),
      meta: {
        auth: true,
      }
    },
    {
      path: "/verifyLogin",
      name: "verifyLogin",
      component: () => import("./components/Login")
    },
    {
      path: "/Signup",
      name: "Signup",
      component: () => import("./components/Signup")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddTutorial"),
      meta: {
        auth: true,
      }
    }

  ]
});

//Route interceptor
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.auth) && to.meta.auth) {// determine whether the route needs login permission
    LoginDataService.verifyLogin().then(response => {
      if (response.status == 200) {// gets whether the current token exists
        next()
      } else {
        //There is no token, re authentication is required
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      }

    })
  }
  else {
    next();
  }
});
export default router