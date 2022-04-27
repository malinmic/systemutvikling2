/* eslint-disable */
import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from "vue-router"
import LandingPage from "@/views/LandingPageView.vue"
import AcceptBorrowRequest from "../views/AcceptBorrowRequest.vue"
import EditUserView from "../views/EditUserView.vue"
import CreateUserView from "../views/CreateUserView.vue"
import CreateListingView from "../views/CreateListingView.vue"
import EditListingView from "../views/EditListingView.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "landingpage",
        component: () =>
            import(
                /* webpackChunkName: "landing-page" */ "@/views/LandingPageView.vue"
            ),
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "@/views/AboutView.vue"),
    },
    {
        path: "/faq",
        name: "faq",
        component: () =>
            import(/* webpackChunkName: "faq" */ "@/views/FaqView.vue"),
    },
    {
        path: "/user/create",
        name: "createuser",
        component: () =>
            import(
                /* webpackChunkName: "create-user" */ "@/views/CreateUserView.vue"
            ),
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
        path: "/user/edit",
        name: "edituser",
        component: () =>
            import(
                /* webpackChunkName: "edit-user" */ "@/views/EditUserView.vue"
            ),
    },
    {
        path: "/listings",
        name: "AllListingView",
        component: () =>
            import(/* webpackChunkName: "faq" */ "../views/AllListingView.vue"),
    },
    {
        path: "/listing/create",
        name: "createlisting",
        component: () =>
            import(
                /* webpackChunkName: "create-listing" */ "@/views/CreateListingView.vue"
            ),
    },

]
const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
