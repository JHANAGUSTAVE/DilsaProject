import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// import i18n from '@/lang/lang'
// import {sendRequest , sendFile} from "@/store/transactionParser";

Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
            //this.dispatch("callSplashInOut", { token: payload.token })
            // this.dispatch("callUsers", { token: payload.token, user: payload.user_id })
            //this.dispatch("callWidgetDisplay", { token: payload.token, user_id: payload.user_id })
            // this.dispatch("callOperators", { token: payload.token })
        },
        
        resetState(state) {
            state.user = null
        }
    },
    actions: {
        
        callUsers({ commit }, payload) {
            commit;
            payload
            // let param = {...payload };
            // sendRequest(this, commit, "callUsers", "user", param)
        },
    },
    getters: {
        user(state) {
            return state.user
        },
    },
    strict: true,
    // plugins: [createPersistedState({
    //     key: 'dilsa'
    // })]
})