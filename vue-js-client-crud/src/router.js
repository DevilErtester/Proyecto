import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tutorials",
      name: "tutorials",
      component: () => import("./components/TutorialsList")
    },
    {
      path: "/tutorials/:id",
      name: "tutorial-details",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/ejemplo",
      name: "Ejemplo",
      component: () => import("./components/Ejemplo")
    },
    {
      path: "/login",
      name: "Login",
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
      component: () => import("./components/AddTutorial")
    }

  ]
});
