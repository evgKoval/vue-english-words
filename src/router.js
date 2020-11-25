import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Leaders from "./views/Leaders.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/leaders",
      name: "leaders",
      component: Leaders
    }
  ]
});