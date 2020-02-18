<template>
  <div>
    <div class="sidebar no-mobile">
      <div class="flex-sidebar">
        <div class="s-container">
          <div>
            <div style="text-align:center;">
              <img :src="user && user.image" alt="profileimage" class="d-proimage" />
              <p class="color">{{user && user.gameName}}</p>
            </div>
          </div>
          <div class="center">
            <img @click="clickHome" class="s-icon" src="../images/home.svg" alt="home" />
            Home
          </div>
          <div @click="clickTeam" class="center">
            <img class="s-icon" src="../images/group.svg" alt="game-team" />
            <p>Team</p>
          </div>
          <div class="center">
            <img @click="clickLevels" class="s-icon" src="../images/levels.svg" alt="levels" />
            Levels
          </div>
          <div class="center">
            <img
              @click="clickDevelopers"
              class="s-icon"
              src="../images/team.svg"
              alt="obscura-team"
            />
            <p>Team ObscurA</p>
          </div>
        </div>
      </div>
    </div>
    <div class="top-bar">
      <div class="top-bar-flex">
        <div class="v-center d-title">
          <img src="../images/w-logo.png" class="w-logo" alt="topbar-logo" />
          <div class="v-center p-3">ObscurA 7.5</div>
        </div>
        <div @click="handleSignout" class="flex">
          <div class="no-desktop top-profile">
            <div>
              <img :src="user && user.image" alt="profileimage" class="d-proimage" />
            </div>
          </div>
          <div class="v-center p-4">
            <img class="logout-icon" src="../images/logout.svg" alt="logout" />
          </div>
        </div>
      </div>
    </div>
    <div class="m-sidebar no-desktop">
      <div class="m-flex-sidebar">
        <div>
          <img @click="clickHome" class="s-icon" src="../images/home.svg" alt="home" />
        </div>
        <div>
          <img @click="clickTeam" class="s-icon" src="../images/group.svg" alt="game-team" />
        </div>
        <div>
          <img class="s-icon" @click="clickLevels" src="../images/levels.svg" alt="levels" />
        </div>
        <div>
          <img @click="clickDevelopers" class="s-icon" src="../images/team.svg" alt="obscura-team" />
        </div>
      </div>
    </div>
    <div class="main">
      <div class="d-container">
        <div class="view-holder">
          <div v-if="view ==='home'">
            <Dhome @show-team="showteam" />
          </div>
          <div v-else-if="view ==='levels'">
            <Dlevels @level-selected="leveldata" :loading="loading" />
          </div>
          <div v-else-if="view ==='developers'">
            <Ddevelopers />
          </div>
          <div v-else-if="view ==='team'">
            <Dteam :loading="loading" />
          </div>
          <div v-else-if="view ==='level'">
            <Level :levelcontent="selLevel" @changeLevelView="clickLevels" :index="index" />
          </div>
          <div v-else-if="view ==='showteam'">
            <Steam :showteam="showTeamid" />
          </div>
          <div v-else>
            <h6>Gawdsh...</h6>
            <p>Error 404</p>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="d-footer-content">
          <div class="home-footer">
            <div class="footer-content">
              Developed by
              <span class="gawds">gawds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dlevels from "../components/Dlevels";
import Dhome from "../components/Dhome";
import Ddevelopers from "../components/Ddevelopers";
import Dteam from "../components/Dteam";
import Level from "../components/Level";
import Steam from "../components/Steam";
export default {
  name: "Dashboard",
  data() {
    return {
      view: "home",
      User: null,
      loading: true,
      selLevel: null,
      index: null,
      showTeamid: null
    };
  },
  methods: {
    handleSignout() {
      this.$store.dispatch("LOGOUT");
    },
    clickHome() {
      this.view = "home";
    },
    clickDevelopers() {
      this.view = "developers";
    },
    clickTeam() {
      this.view = "team";
    },
    clickLevels() {
      this.view = "levels";
    },
    leveldata(e) {
      this.selLevel = e.leveldata;
      this.index = e.index;
      this.view = "level";
    },
    showteam(e) {
      this.showTeamid = e;
      console.log(this.showTeamid);
      this.view = "showteam";
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    user() {
      return this.$store.getters.user;
    },
    firsttime() {
      return this.$store.getters.firstTime;
    }
  },
  async created() {
    await this.$store.dispatch("GET_USER");
    console.log("FIRST TIME", this.$store.getters.firstTime);
    if (this.$store.getters.firstTime === true) {
      this.$router.push("/onboard");
    }

    if (this.$store.getters.user.group !== null) {
      console.log("HERE1");
      this.$store.dispatch("PUSH_INVITE", this.$store.getters.user.group);
      await this.$store.dispatch("GET_LEVELS");
    }
    if (this.$store.getters.user.group === null) {
      console.log("PT");
      this.$store.dispatch("PUSH_TEAM", this.$store.getters.user.id);
    }
    if (this.$store.getters.user.group !== null) {
      await this.$store.dispatch("GET_GAME_TEAM", {
        teamId: this.$store.getters.group,
        showTeam: false
      });
      await this.$store.dispatch("GET_INVITATIONS");
      this.loading = false;
    }

    await this.$store.dispatch("GET_ALL_TEAMS", 0);
    this.loading = false;
  },
  watch: {
    isAuth(value) {
      if (value === false) {
        this.$router.push("/");
      }
    },
    user(value) {
      this.User = value;
    },
    firsttime(value) {
      if (value === true) {
        this.$router.push("/onboard");
      }
    }
  },
  components: {
    Dlevels,
    Dhome,
    Dteam,
    Ddevelopers,
    Level,
    Steam
  }
};
</script>

<style></style>
