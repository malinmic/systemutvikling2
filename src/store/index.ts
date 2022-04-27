import { createStore } from "vuex"

export default createStore({
    state: {
        userAvatarPath: "",
        token: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: -1,
        zipcode: -1,
        city: "",
    },
    getters: {
        token(state) {
            return state.token
        },
        isLoggedIn(state) {
            return state.token != ""
        },
        fullName(state) {
            return state.firstname + " " + state.lastname
        },
        email(state) {
            return state.email
        },
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USERNAME(state, username) {
            state.username = username
        },
        SET_FIRSTNAME(state, firstname) {
            state.firstname = firstname
        },
        SET_LASTNAME(state, lastname) {
            state.lastname = lastname
        },
        SET_EMAIL(state, email) {
            state.email = email
        },
        SET_PHONENUMBER(state, phonenumber) {
            state.phonenumber = phonenumber
        },
        SET_ZIPCODE(state, zipcode) {
            state.zipcode = zipcode
        },
        SET_CITY(state, city) {
            state.city = city
        },
    },
    actions: {
        setToken(context, { token }) {
            context.commit("SET_TOKEN", token)
        },
        setUserInfo(
            context,
            { username, firstname, lastname, email, phonenumber, zipcode, city }
        ) {
            context.commit("SET_USERNAME", username),
                context.commit("SET_FIRSTNAME", firstname),
                context.commit("SET_LASTNAME", lastname),
                context.commit("SET_EMAIL", email),
                context.commit("SET_PHONENUMBER", phonenumber),
                context.commit("SET_ZIPCODE", zipcode),
                context.commit("SET_CITY", city)
        },
    },
    modules: {},
})
