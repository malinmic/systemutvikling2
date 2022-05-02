import { createStore } from "vuex"
import { AlertMessage } from "@/types/IfcAlertInterface"

export interface Module1State {
    userAvatarPath: string
    token: string
    username: string
    firstname: string
    lastname: string
    email: string
    phonenumber: number
    zipcode: number
    city: string
    alerts: AlertMessage[]
}

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
        alerts: [] as AlertMessage[],
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
        alerts(state) {
            return state.alerts
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
        ADD_ALERT(state, alert) {
            state.alerts.push(alert)
        },
        REVOKE_ALERT(state) {
            state.alerts.pop()
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
        postAlert(context, { message, type, title }) {
            const alert: AlertMessage = {
                message: message,
                type: type,
                title: title,
            }

            context.commit("ADD_ALERT", alert)

            setTimeout(() => {
                context.commit("REVOKE_ALERT")
            }, 3000)
        },
    },
    modules: {},
})
