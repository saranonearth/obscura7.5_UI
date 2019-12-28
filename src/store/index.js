import Vue from "vue";
import Vuex from "vuex";
import {
  Auth,
  getUser
} from "../graphql";
import {
  apolloClient
} from "../main";
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    levels: [],
    isAuth: false,
    loading: true,
    token: localStorage.getItem("nara$obscura") || null,
    currentLevel: null
  },
  getters: {
    isAuth: state => state.isAuth,
    loading: state => state.loading,
    user: state => state.user
  },
  actions: {
    AUTH: async (context, token) => {
      try {
        const res = await apolloClient.mutate({
          mutation: Auth,
          variables: {
            token
          }
        });
        console.log(res);
        context.commit("AUTH", res.data.auth.token);
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
    GET_USER: async ({
      commit
    }) => {
      try {
        const res = await apolloClient.query({
          query: getUser
        });
        console.log(res)
        commit("GET_USER", res);
        commit("MAIN_LOADING");
        router.push("/dashboard");
      } catch (error) {
        commit("MAIN_LOADING");
        commit("LOGOUT");
        router.push("/");
      }
    },
    LOGOUT: ({
      commit
    }) => {
      commit("LOGOUT")
    }
  },
  mutations: {
    AUTH: (state, payload) => {
      localStorage.setItem("nara$obscura", payload);
      state.token = payload;
      state.isAuth = true;
    },
    GET_USER: (state, payload) => {
      state.user = payload.data.getGamePlayer;
      state.isAuth = true;
    },
    LOGOUT: state => {
      localStorage.removeItem("nara$obscura");
      state.isAuth = false;
      state.user = null;
      state.toke = null;
      state.levels = [];
      state.currentLevel = null;
      state.loading = false;
      router.push('/')
    },
    MAIN_LOADING: state => {
      state.loading = false;
    }
  }
});

export default store;