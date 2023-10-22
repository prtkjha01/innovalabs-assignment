import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    //@ts-ignore
    component: () => import("@pages/Home/index.vue"),
    name: "Home",
  },
  {
    path: "/question-a",
    name: "Question A",
    //@ts-ignore
    component: () => import("@pages/QuestionA/index.vue"),
  },
  {
    path: "/question-b",
    name: "Question B",
    //@ts-ignore
    component: () => import("@pages/QuestionB/index.vue"),
  },
  {
    path: "/question-c",
    name: "Question C",
    //@ts-ignore
    component: () => import("@pages/QuestionC/index.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
