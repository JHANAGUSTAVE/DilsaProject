import Vue from 'vue'
import Vuex from 'vuex'
import {request} from './api'
import createPersistedState from 'vuex-persistedstate'
// import i18n from '@/lang/lang'

// import {sendRequest } from "./transactionParser";

Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload 
            localStorage.setItem("token", state.user.token);
            // localStorage.removeItem("token")
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
        setPublicProducts(state, payload) {
            state.publicProducts = payload
        },
        setUsers(state, payload) {
            state.users = payload
        },
        setPromotions(state, payload) {
            state.promotions = payload
        },
        
        resetState(state) {
            state.user = null;
        },
        setError(state) {
            state.error = 'error';
        }
    },
    actions: {
        callProducts({ commit, state }) {
            commit;
            
            // let param = {...payload };
            request.defaults.headers.get['Authorization'] = "Bearer " + state.user?.token;
            request.get("/products/")
            .then(response => {
                //saving the data in the vuex store
                const {data} = response;
                commit('setProducts', data)
            })
            .catch(error => {
                // commit('setLoading', false, {root:true})
                try{
                    var response = error.response.data;
                    if (response.error) {
                        commit('setError', response.error_message)
                    }
                }catch (err){
                    commit('setError', err.message)
                }
            });
        },
        callUsers({ commit, state }) {
            commit;
            
            // let param = {...payload };
            request.defaults.headers.get['Authorization'] = "Bearer " + state.user?.token;
            request.get("/users/")
            .then(response => {
                //saving the data in the vuex store
                const {data} = response;
                commit('setUsers', data)
            })
            .catch(error => {
                // commit('setLoading', false, {root:true})
                try{
                    var response = error.response.data;
                    if (response.error) {
                        commit('setError', response.error_message)
                    }
                }catch (err){
                    commit('setError', err.message)
                }
            });
        },
        callPromotions({ commit, state }) {
            commit;
            
            // let param = {...payload };
            request.defaults.headers.get['Authorization'] = "Bearer " + state.user?.token;
            request.get("/promotions/")
            .then(response => {
                //saving the data in the vuex store
                const {data} = response;
                commit('setPromotions', data)
            })
            .catch(error => {
                // commit('setLoading', false, {root:true})
                try{
                    var response = error.response.data;
                    if (response.error) {
                        commit('setError', response.error_message)
                    }
                }catch (err){
                    commit('setError', err.message)
                }
            });
        },
        callPublicProducts({ commit }) {
            commit;
            
            // let param = {...payload };
            // sendRequest(this, commit, "callUsers", "user", param)
            request.get("/public-products/", {})
            .then(response => {
                //saving the data in the vuex store
                const {data} = response;
                commit('setPublicProducts', data)
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
        login({commit}, payload){
            request.post('/login', payload).then(response => {
                const { data } = response;
                console.log(data);
                commit('setUser', data);
            }).catch(error => {
                console.log(error);
            });
        },
        logout({commit}){
            commit('resetState');
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        token(state) {
            return state.user.token
        },
        products(state) {
            return state.products
        },
        publicProducts(state) {
            return state.publicProducts
        },
    },
    strict: true,
    plugins: [createPersistedState({
        key: 'dilsa'
    })]
})