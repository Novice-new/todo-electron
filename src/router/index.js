import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
    meta: {
      auth: false,
    },
  },

  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
    meta: {
      auth: false,
    },
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: { title: "主页", icon: "el-icon-help", auth: true },
      },
    ],
  },
  {
    path: "/overview",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Overview",
        component: () => import("@/views/overview/index"),
        meta: { title: "任务预览", icon: "el-icon-s-operation", auth: true },
      },
    ],
    meta: { title: "overview", icon: "el-icon-s-operation", auth: true },
  },
  {
    path: "/completed",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Completed",
        component: () => import("@/views/completed/index"),
        meta: { title: "完成详情", icon: "el-icon-time", auth: true },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  routes
})

export default router
