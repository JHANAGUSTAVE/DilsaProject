import Vue from 'vue'
import Vuex from 'vuex'
import {request} from './api'
import createPersistedState from 'vuex-persistedstate'
// import i18n from '@/lang/lang'

import {sendRequest } from "./transactionParser";

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
        setProducts(state, payload) {
            state.products = payload
            console.info(state.products)

            

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
        callProducts({ commit }) {
            commit;
            
            // let param = {...payload };
            // sendRequest(this, commit, "callUsers", "user", param)
            request.get("/products/", {})
            .then(response => {
                //saving the data in the vuex store
                const {data} = response;
                sendRequest(this, commit, "callProducts", data);
            })
            .catch(error => {
                // commit('setLoading', false, {root:true})
                try{
                    var response = error.response.data;
                    if (response.error) {
                        commit('setError', response.error_message, {root:true})
                    }
                }catch (err){
                    commit('setError', err.message, {root:true})
                }
            });
        },
    },
    getters: {
        user(state) {
            return state.user
        },
        products(state) {
            return state.products
        },
    },
    strict: true,
    plugins: [createPersistedState({
        key: 'dilsa'
    })]
})