import Vue from "vue";
import Vuex from "vuex";
import {
  Auth,
  Onboard,
  getUser,
  createTeam
} from "../graphql";
import {
  apolloClient
} from "../main";
import config from '../config.json'
import jwt from 'jsonwebtoken'


Vue.use(Vuex);

const token = localStorage.getItem("nara$obscura") || '';
const tokenData = token ? jwt.verify(token, config.JWTKEY) : null
const firstTime = tokenData ? tokenData.firstTime : true

const store = new Vuex.Store({
  state: {
    user: null,
    levels: [],
    isAuth: false,
    firstTime: firstTime,
    loading: true,
    token: localStorage.getItem("nara$obscura") || null,
    currentLevel: null,
    team: null
  },
  getters: {
    isAuth: state => state.isAuth,
    loading: state => state.loading,
    user: state => state.user,
    firstTime: state => state.firstTime,
    team: state => state.team,
    curLevel: state => state.curLevel
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
        console.log('AUTH', res);
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
        console.log('ON BOARD', res)
        commit("ON_BOARD", res.data.onBoard)
      } catch (error) {
        console.log(error)
      }
    },
    CREATE_TEAM: async ({
      commit
    }, {
      teamName,
      bio,
      uniqueKey,
      image
    }) => {
      try {

        const res = await apolloClient.mutate({
          mutation: createTeam,
          variables: {
            teamName,
            bio,
            uniqueKey,
            image
          }
        })
        console.log('CREATE TEAM', res)
        commit("CREATE_TEAM", res.data.createTeam);
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    AUTH: (state, payload) => {
      localStorage.setItem("nara$obscura", payload);
      const tokenData = jwt.verify(payload, config.JWTKEY)
      state.token = payload;
      state.isAuth = true;
      console.log("AUTH FS", tokenData.firstTime)
      state.firstTime = tokenData.firstTime

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
      state.user = payload.player
      state.firstTime = false
      localStorage.removeItem('nara$obscura')
      localStorage.setItem('nara$obscura', payload.token)
    },
    CREATE_TEAM: (state, payload) => {
      state.team = payload;
      state.currentLevel = payload.curlevel;
      state.user.group = payload.id;
    }
  }
});

export default store;