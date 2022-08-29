import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login.vue";
import waitPage from "@/views/waitPage.vue";
import editProfile from "@/components/editProfile.vue";
import Register from "@/views/singIn.vue";
import Dashboard from "@/views/dashboard.vue";
import Products from "@/components/views/products.vue";
import NotFound from "@/views/notFoundPage.vue";
import Home from "@/components/views/home.vue";
import Requests from "@/views/requests.vue";
import authUser from "@/components/views/authUser.vue";
import addProduct from "@/components/views/addProduct.vue";
import addStore from "@/components/views/addStore.vue";
import authProduct from "@/components/views/authProduct.vue";
import sendProduct from "@/components/sendProductSection.vue";
import makeProduct from "@/components/views/makeProduct.vue";
import Report from "@/views/report.vue";
import homeApp from "@/views/homeApp.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: homeApp,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/wait",
      name: "wait",
      component: waitPage,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      children: [
        {
          path: "report",
          name: "report",
          component: Report,
        },
        {
          path: "products/:page([0-9]*)",
          name: "products",
          component: Products,
          props: (route) => ({ query: route.query.data }),
        },
        {
          path: "",
          component: Home,
          props: (route) => ({ query: route.query.data }),
        },
        {
          path:"productsgroupsend",
          name:"groupSend",
          component: () => import("../components/views/groupSendProduct.vue")
        },
        {
          path: "requests",
          name: "requests",
          component: Requests,
          children: [
            {
              path: "makeProduct",
              component: makeProduct,
            },
            {
              path: "authUser",
              component: authUser,
            },
            {
              path: "addProduct",
              component: addProduct,
            },
            {
              path: "withExcel",
              name:"excel",
              component: () => import("../components/views/excelSender.vue"),
            },
            {
              path: "addStore",
              component: addStore,
            },
            {
              path: "getProduct",
              component: authProduct,
            },
          ],
        },
        {
          path: "sendProduct/:id([0-9]+)/:store_id([0-9]+)",
          name: "sendProductSection",
          component: sendProduct,
          props: (route) => ({ query: route.query.data }),
        },
        {
          path: "changeProfile/:user_id",
          name: "editProfile",
          component: editProfile,
          props: (route) => ({ query: route.query.data }),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
