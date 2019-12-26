import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    levels: [],
    isAuth: false,
    token: null,
    currentLevel: null
  },
  mutations: {},
  actions: {},
  modules: {}
})