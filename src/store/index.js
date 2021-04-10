import Vue from "vue";
import Vuex from "vuex";
import {
  Auth,
  Onboard,
  getUser,
  createTeam,
  getGameTeam,
  getinvitations,
  getLevels,
  getLevel,
  getAllTeams,
  sendInvite,
  acceptInvite,
  checkAnswer,
  pushInvite,
  pushTeam,
} from "../graphql";
import {
  apolloClient
} from "../main";
import jwt from "jsonwebtoken";

Vue.use(Vuex);

const token = localStorage.getItem("nara$obscura") ? localStorage.getItem("nara$obscura") : null;

const tokenData = token ? jwt.verify(token, process.env.VUE_APP_JWTS) : null;

const firstTime = tokenData ? tokenData.firstTime : null;

console.log("TOKEN DATA", firstTime);
const lvldata = JSON.parse(localStorage.getItem("lvld"));

const store = new Vuex.Store({
  state: {
    user: null,
    levels: [],
    isAuth: false,
    firstTime: firstTime,
    loading: true,
    token: localStorage.getItem("nara$obscura") || null,
    currentLevel: null,
    team: null,
    invitations: [],
    levelData: lvldata || [],
    leaderboard: [],
    showTeam: null,
    inviteMsg: null,
    answerMsg: null
  },
  getters: {
    isAuth: state => state.isAuth,
    loading: state => state.loading,
    user: state => state.user,
    firstTime: state => state.firstTime,
    team: state => state.team,
    curLevel: state => state.curLevel,
    group: state => (state.user ? state.user.group : null),
    invitations: state => state.invitations,
    levels: state => state.levels,
    levelData: state => state.levelData,
    leaderboard: state => state.leaderboard,
    showTeam: state => state.showTeam,
    inviteMsg: state => state.inviteMsg,
    answerMsg: state => state.answerMsg
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
        console.log("AUTH", res);
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
        console.log(res);
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
      commit("LOGOUT");
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
        });
        console.log("ON BOARD", res);
        commit("ON_BOARD", res.data.onBoard);
      } catch (error) {
        console.log(error);
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
        });
        console.log("CREATE TEAM", res);
        commit("CREATE_TEAM", res.data.createTeam);
        store.dispatch("GET_LEVELS");
        store.dispatch("GET_ALL_TEAMS");
        store.dispatch("GET_INVITATIONS");
      } catch (error) {
        console.log(error);
      }
    },
    GET_GAME_TEAM: async ({
      commit
    }, {
      teamId,
      showTeam
    }) => {
      try {
        const res = await apolloClient.query({
          query: getGameTeam,
          variables: {
            teamId
          }
        });
        console.log("CREATE_GAME_TEAM", res);
        if (showTeam === true) {
          return commit("SHOW_TEAM", res.data.getGameTeam);
        }
        commit("GET_GAME_TEAM", res.data.getGameTeam);
      } catch (error) {
        console.log(error);
      }
    },
    GET_INVITATIONS: async ({
      commit
    }) => {
      try {
        const res = await apolloClient.query({
          query: getinvitations
        });
        console.log(res);
        commit("GET_INVITATIONS", res.data.getTeamInvitations);
      } catch (error) {
        console.log(error);
      }
    },
    GET_LEVELS: async ({
      commit
    }) => {
      try {
        const res = await apolloClient.query({
          query: getLevels
        });
        console.log("GET_LEVELS", res);
        commit("GET_LEVELS", res.data.getTeamLevels);
      } catch (error) {
        console.log(error);
      }
    },
    GET_LEVEL: async ({
      commit
    }, levelId) => {
      console.log(levelId);
      try {
        const res = await apolloClient.query({
          query: getLevel,
          variables: {
            levelId
          }
        });
        console.log("GET_LEVEL", res);

        if (localStorage.getItem("lvld")) {
          const localData = localStorage.getItem("lvld");
          const levelData = JSON.parse(localData);
          const newLevelData = [
            ...levelData,
            {
              ...res.data.getLevel
            }
          ];
          localStorage.removeItem("lvld");
          localStorage.setItem("lvld", JSON.stringify(newLevelData));
          commit("GET_LEVEL", res.data.getLevel);
        } else {
          let newLevelData = [{
            ...res.data.getLevel
          }];
          localStorage.setItem("lvld", JSON.stringify(newLevelData));
          commit("GET_LEVEL", res.data.getLevel);
        }
      } catch (error) {
        console.log(error);
      }
    },
    GET_ALL_TEAMS: async ({
      commit
    }, skip) => {
      try {
        const res = await apolloClient.query({
          query: getAllTeams,
          variables: {
            skip
          }
        });
        console.log(res);
        commit("GET_TEAMS", {
          skip,
          data: res.data.getAllTeams
        });
      } catch (error) {
        console.log(error);
      }
    },
    SEND_INVITE: async ({
      commit
    }, teamId) => {
      try {
        console.log("HERE");
        const res = await apolloClient.mutate({
          mutation: sendInvite,
          variables: {
            teamId
          }
        });
        console.log(res);
        commit("SEND_INVITE", res.data.sendInvite);
      } catch (error) {
        console.log("hereee");
        console.log(JSON.stringify(error.message));
      }
    },
    ACCEPT_INVITE: async ({
      commit
    }, {
      inviteId,
      playerId
    }) => {
      try {
        const res = await apolloClient.mutate({
          mutation: acceptInvite,
          variables: {
            inviteId,
            playerId
          }
        });
        console.log("ACCEPT INVITE", res);
        commit("ACCEPT_INVITE", {
          inviteId,
          members: res.data.acceptInvite.members
        });
      } catch (error) {
        console.log(JSON.stringify(error.message));
      }
    },
    CHECK_ANSWER: async ({
      commit
    }, {
      answer,
      levelNo
    }) => {
      try {
        const res = await apolloClient.mutate({
          mutation: checkAnswer,
          variables: {
            levelNo,
            answer
          }
        })
        console.log(res)
        commit("CHECK_ANSWER", {
          newCl: res.data.checkAnswer.newCurlevel,
          msg: res.data.checkAnswer.message
        });
      } catch (error) {
        console.log(error)
      }
    },
    PUSH_INVITE: async ({
      commit
    }, teamId) => {
      try {
        const res = apolloClient.subscribe({
          query: pushInvite,
          variables: {
            teamId
          }
        })

        res.subscribe({
          next(data) {
            console.log("PUSHINVITE", data)
            commit("PUSH_INVITE", data)
          },
          error(err) {
            console.log("ERROR", err)
          }
        })

      } catch (error) {
        console.log(error)
      }
    },
    PUSH_TEAM: ({
      commit
    }, playerId) => {
      try {
        const res = apolloClient.subscribe({
          query: pushTeam,
          variables: {
            playerId
          }


        })
        res.subscribe({
          next(data) {
            console.log("ACCEPT", data)
            commit("PUSH_TEAM", data.data.pushTeam.team)
          },
          error(error) {
            console.log(error)
          }
        })


      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    AUTH: (state, payload) => {
      localStorage.setItem("nara$obscura", payload);
      const tokenData = jwt.verify(payload, process.env.VUE_APP_JWTS);
      state.token = payload;
      state.isAuth = true;
      console.log("AUTH FS", tokenData.firstTime);
      state.firstTime = tokenData.firstTime;
    },
    GET_USER: (state, payload) => {
      state.user = payload.data.getGamePlayer;
      state.isAuth = true;
    },
    LOGOUT: state => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
      state.levels = [];
      state.currentLevel = null;
      state.loading = false;
      localStorage.removeItem("nara$obscura");
      localStorage.removeItem("lvld");
      apolloClient.cache.reset();
    },
    MAIN_LOADING: state => {
      state.loading = false;
    },
    ON_BOARD: (state, payload) => {
      state.user = payload.player;
      state.firstTime = false;
      localStorage.removeItem("nara$obscura");
      localStorage.setItem("nara$obscura", payload.token);
    },
    CREATE_TEAM: (state, payload) => {
      state.team = payload;
      state.currentLevel = payload.curlevel;
      state.user.group = payload.id;
    },
    GET_GAME_TEAM: (state, payload) => {
      state.team = payload;
    },
    GET_INVITATIONS: (state, payload) => {
      state.invitations = payload;
    },
    GET_LEVELS: (state, payload) => {
      state.levels = payload;
    },
    GET_LEVEL: (state, payload) => {
      state.levelData = [
        ...state.levelData,
        {
          ...payload
        }
      ];
    },
    GET_TEAMS: (state, payload) => {
      if (payload.skip === 0) {
        state.leaderboard = payload.data.teams;
      } else {
        state.leaderboard = [...state.leaderboard, ...payload.data.teams];
      }
    },
    SHOW_TEAM: (state, payload) => {
      state.showTeam = payload;
    },
    REMOVE_SHOW_TEAM: state => {
      state.showTeam = null;
    },
    SEND_INVITE: (state, payload) => {
      state.inviteMsg = payload;
      setTimeout(() => {
        state.inviteMsg = null
      }, 3000)
    },
    REMOVE_INVITE_MSG: state => {
      state.inviteMsg = null;
    },
    ACCEPT_INVITE: (state, payload) => {
      const newInvites = state.invitations.filter(
        e => e.id !== payload.inviteId
      );
      state.invitations = newInvites;
      state.team.members = payload.members;
    },
    CHECK_ANSWER: (state, payload) => {
      state.answerMsg = payload.msg
      if (payload.newCl) {
        state.levels = [...state.levels, payload.newCl]

      }
      setTimeout(() => {
        state.answerMsg = null
      }, 3000)
    },
    PUSH_INVITE: (state, payload) => {
      console.log("HERE")
      console.log('PUSHED_INVITE', payload)
      state.invitations = [...state.invitations, {
        ...payload.data.pushInvite.invite
      }]
    },
    PUSH_TEAM: (state, payload) => {
      state.team = payload
      state.invitations = payload.invitations
      state.user.group = payload.id
    }
  }
});

export default store;