import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CrudOnePage from "../views/CrudOnePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/users",
      name: "Users",
      component: CrudOnePage,
    },
    {
      path: "/buku",
      name: "Toko Buku",
      component: () => import("../views/TokoBuku.vue"),
    },
    {
      path: "/add-buku",
      name: "Tambah Buku",
      component: () => import("../views/TambahBuku.vue"),
    },
    {
      path: "/buku/:id",
      name: "about",
      component: () => import("../views/DetailBuku.vue"),
    },
  ],
});

export default router;
