/* eslint-disable */
import {
    createRouter,
    createWebHistory,
    Router,
    RouteRecordRaw,
} from "vue-router"
import LandingPage from "../views/LandingPage.vue"
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
    path: "/createListing",
    name: "createlisting",
    component: CreateListingView,
  },
]

const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
