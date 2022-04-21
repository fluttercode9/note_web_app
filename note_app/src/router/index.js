import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/Home-screen.vue") },
        { path: "/register", component: () => import("../views/Register-screen.vue")},
        { path: "/sign-in", component: () => import("../views/SignIn-screen.vue")},
        { path: "/feed", component: () => import("../views/Feed-screen.vue")},
    ],
});

export default router;