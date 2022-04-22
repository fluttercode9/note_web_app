import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import bootstrap from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/SignIn-screen.vue") },
        { path: "/register", component: () => import("../views/Register-screen.vue") },
        { path: "/sign-in", component: () => import("../views/SignIn-screen.vue") },
        { path: "/home", component: () => import("../views/home-screen.vue") },
        {
            path: "/feed", component: () => import("../views/Feed-screen.vue"),
            meta: {
                requiresAuth: true,
            }
        },
    ],
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next()
        } else {
            next("/");
            alert("no access");
        }

    } else {
        next();
    }
});
export default router;