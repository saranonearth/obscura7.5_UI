import Vue from "vue";
import Vuex from "vuex";
import {
  Auth,
  Onboard,
  getUser
} from "../graphql";
import {
  apolloClient
} from "../main";



Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    levels: [],
    isAuth: false,
    firstTime: localStorage.getItem("firstTime") || true,
    loading: true,
    token: localStorage.getItem("nara$obscura") || null,
    currentLevel: null
  },
  getters: {
    isAuth: state => state.isAuth,
    loading: state => state.loading,
    user: state => state.user,
    firstTime: state => state.firstTime
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

      } catch (error) {
        commit("MAIN_LOADING");
        commit("LOGOUT");

      }
    },
    LOGOUT: ({
      commit
    }) => {
      commit("LOGOUT")

    },
    ONBOARD: async ({
      commit
    }, {
      gameName,
      uniqueKey,
      image
    }) => {
      try {
        const res = await apolloClient.mutate({
          mutation: Onboard,
          variables: {
            gameName,
            uniqueKey,
            image
          }
        })
        console.log(res)
        localStorage.setItem('firstTime', false)
        commit("ON_BOARD", res.data.onBoard)
      } catch (error) {
        console.log(error)
      }
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
      state.token = null;
      state.levels = [];
      state.currentLevel = null;
      state.loading = false;

    },
    MAIN_LOADING: state => {
      state.loading = false;
    },
    ON_BOARD: (state, payload) => {
      state.user = payload
      state.firstTime = false
    }
  }
});

export default store;