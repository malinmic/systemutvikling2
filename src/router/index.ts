import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from "vue-router"

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
        path: "/user/edit",
        name: "edituser",
        component: () =>
            import(
                /* webpackChunkName: "edit-user" */ "@/views/EditUserView.vue"
            ),
    },
    {
        path: "/request/accept",
        name: "acceptborrowrequest",
        component: () =>
            import(
                /* webpackChunkName: "accept-request" */ "@/views/AcceptBorrowRequestView.vue"
            ),
    },
    {
        path: "/listings",
        name: "alllistingview",
        component: () =>
            import(
                /* webpackChunkName: "all-listing" */ "../views/AllListingView.vue"
            ),
    },
    {
        path: "/listings/search/:searchstring",
        name: "listingsearch",
        component: () =>
            import(
                /* webpackChunkName: "search-listing" */ "../views/SearchListingView.vue"
            ),
    },
    {
        path: "/my-listings",
        name: "personallistingview",
        component: () =>
            import(
                /* webpackChunkName: "personal-listing" */ "../views/PersonalListingView.vue"
            ),
    },
    {
        path: "/listing/create",
        name: "createlisting",
        component: () =>
            import(
                /* webpackChunkName: "create-listing" */ "@/views/CreateListingView.vue"
            ),
    },
    {
        path: "/listing/:id",
        props: true,
        name: "detailedlisting",
        component: () =>
            import(
                /* webpackChunkName: "detailed-listing" */ "../views/DetailedListingView.vue"
            ),
    },
    {
        path: "/listing/:id/edit",
        props: true,
        name: "editlisting",
        component: () =>
            import(
                /* webpackChunkName: "edit-listing" */ "../views/EditListingView.vue"
            ),
    },
]
const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
