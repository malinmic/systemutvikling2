/* eslint-disable */
import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from "vue-router"
import LandingPage from "../views/LandingPage.vue"
import EditUserView from "../views/EditUserView.vue"
import CreateUserView from "../views/CreateUserView.vue"
import CreateListingView from "../views/CreateListingView.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "landingpage",
        component: LandingPage,
    },
    {
        path: "/createUser",
        name: "createUser",
        component: CreateUserView,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    {
        path: "/editUser",
        name: "editUser",
        component: EditUserView,
    },
    {
        path: "/createListing",
        name: "createlisting",
        component: CreateListingView,
    },
    {
        path: "/faq",
        name: "faq",
        component: () =>
            import(/* webpackChunkName: "faq" */ "../views/FaqView.vue"),
    },
]

const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
