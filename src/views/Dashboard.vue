<template>
  <div>
    <div class="red-bar fix"></div>
    <div class="sidebar no-mobile">
      <div class="flex-sidebar">
        <div class="s-container">
          <div>
            <div style="text-align:center;">
              <img :src="user && user.image" alt="profileimage" class="d-proimage" />
              <p>{{user.gameName}}</p>
            </div>
          </div>
          <div class="center">
            <img class="s-icon" src="../images/home.png" alt="home" />
            Home
          </div>
          <div class="center">
            <img class="s-icon" src="../images/group.svg" alt="game-team" />
            GameTeam
          </div>
          <div class="center">
            <img class="s-icon" src="../images/levels.svg" alt="levels" />
            Levels
          </div>
          <div class="center">
            <img class="s-icon" src="../images/team.svg" alt="obscura-team" />
            Developers
          </div>
        </div>
      </div>
    </div>
    <div class="m-sidebar no-desktop">
      <div class="m-flex-sidebar">
        <div>
          <img class="s-icon" src="../images/home.png" alt="home" />
        </div>
        <div>
          <img class="s-icon" src="../images/group.svg" alt="game-team" />
        </div>
        <div>
          <img class="s-icon" src="../images/levels.svg" alt="levels" />
        </div>
        <div>
          <img class="s-icon" src="../images/team.svg" alt="obscura-team" />
        </div>
      </div>
    </div>
    <div class="main">
      <div class="d-container">
        <div class="top-bar">
          <div class="no-desktop" style="text-align:center;">
            <img :src="user && user.image" alt="profileimage" class="d-proimage" />
            <p>{{user.gameName}}</p>
          </div>
          <div @click="handleSignout">
            <img class="logout-icon" src="../images/logout.png" alt="logout" />
          </div>
        </div>
        <h3 class="d-title">Obscura 7.5</h3>
        <div></div>
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
export default {
  name: "Dashboard",
  data() {
    return {
      view: "home"
    };
  },
  methods: {
    handleSignout() {
      this.$store.dispatch("LOGOUT");
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
    }
  }
};
</script>

<style></style>
