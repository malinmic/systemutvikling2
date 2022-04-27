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
import AllListingView from "../views/AllListingView.vue"
import CreateListingView from "../views/CreateListingView.vue"
import AcceptBorrowRequest from "../views/AcceptBorrowRequest.vue"

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
    {
        path: "/acceptBorrowRequest",
        name: "acceptBorrowRequest",
        component: AcceptBorrowRequest,
    },
    {
        path: "/search/:searchstring",
        name: "searchlisting",
        component: LandingPage,
    },
    {
        path: "/listingView",
        name: "AllListingView",
        component: AllListingView,
    },
]
const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
