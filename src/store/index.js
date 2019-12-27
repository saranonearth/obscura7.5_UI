import Vue from 'vue'
import Vuex from 'vuex'
import {
  Auth
} from '../graphql'
import {
  apolloClient
} from '../main'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    levels: [],
    isAuth: true,
    token: localStorage.getItem('nara$obscura') || null,
    currentLevel: null
  },
  getters: {
    isAuth: state => state.isAuth
  },
  actions: {
    AUTH: async (context, token) => {

      try {
        const res = await apolloClient.mutate({
          mutation: Auth,
          variables: {
            token
          }
        })
        console.log(res)
        context.commit('AUTH', res.data.auth.token)
        router.push('/dashboard')
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    AUTH: (state, payload) => {
      console.log("MUTATED")
      localStorage.setItem('nara$obscura', payload);
      state.token = payload;
      state.isAuth = true;
    }
  }
})