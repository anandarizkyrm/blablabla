import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/detail/:id",
      component: () => import("./views/Detail.vue"),
    },
    {
      path: "/add",
      component: () => import("@/views/AddArticle.vue"),
    },
  ],
});
