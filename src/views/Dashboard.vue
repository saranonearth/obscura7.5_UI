<template>
  <div>
    <div class="red-bar fix"></div>
    <div class="sidebar no-mobile">
      <div class="flex-sidebar">
        <div class="s-container">
          <div>
            <div style="text-align:center;">
              <img :src="user && user.image" alt="profileimage" class="d-proimage" />
              <p>{{User && user.gameName}}</p>
            </div>
          </div>
          <div class="center">
            <img @click="clickHome" class="s-icon" src="../images/home.png" alt="home" />
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
    <div class="m-sidebar no-desktop">
      <div class="m-flex-sidebar">
        <div>
          <img @click="clickHome" class="s-icon" src="../images/home.png" alt="home" />
        </div>
        <div>
          <img @click="clickTeam" class="s-icon" src="../images/group.svg" alt="game-team" />
        </div>
        <div>
          <img @click="clickLevels" class="s-icon" src="../images/levels.svg" alt="levels" />
        </div>
        <div>
          <img @click="clickDevelopers" class="s-icon" src="../images/team.svg" alt="obscura-team" />
        </div>
      </div>
    </div>
    <div class="main">
      <div class="d-container">
        <div class="top-bar">
          <div class="no-desktop" style="text-align:center;">
            <img :src="User && User.image" alt="profileimage" class="d-proimage" />
            <p>{{User && User.gameName}}</p>
          </div>
          <div @click="handleSignout">
            <img class="logout-icon" src="../images/logout.png" alt="logout" />
          </div>
        </div>
        <h3 class="d-title">Obscura 7.5</h3>
        <div class="view-holder">
          <div v-if="view ==='home'">
            <Dhome />
          </div>
          <div v-else-if="view ==='levels'">
            <Dlevels />
          </div>
          <div v-else-if="view ==='developers'">
            <Ddevelopers />
          </div>
          <div v-else-if="view ==='team'">
            <Dteam />
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
export default {
  name: "Dashboard",
  data() {
    return {
      view: "home",
      User: null
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
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.$store.dispatch("GET_USER");
    if (this.$store.getters.firstTime === true) {
      this.$router.push("/onboard");
    }
  },
  watch: {
    isAuth(value) {
      if (value === false) {
        this.$router.push("/");
      }
    },
    user(value) {
      this.User = value;
    }
  },
  components: {
    Dlevels,
    Dhome,
    Dteam,
    Ddevelopers
  }
};
</script>

<style></style>
