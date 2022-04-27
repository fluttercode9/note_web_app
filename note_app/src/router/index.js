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
        // { path: "/home", component: () => import("../views/home-screen.vue") },
        { path: "/add-note", component: () => import("../views/NewNote-screen.vue") },
        { path: "/add-text-note", component: () => import("../views/NewTextNote-screen.vue") },
        
        {
            path: "/home", component: () => import("../views/home-screen.vue"), meta: {
                requiresAuth: true,
            }
        },
       
        {
            path: "/create-photo", component: () => import("../views/CreatePhotoNote-screen.vue"), meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/create-text", component: () => import("../views/NewTextNote-screen.vue"), meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/create-voice", component: () => import("../views/CreateVoiceNote-screen.vue"), meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/notes/:id", name:'note', component: () => import("../views/NoteView-screen.vue"), meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/notes/rec/:id", name:'rec',  component: () => import("../views/RecordingView-screen.vue"), meta: {
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