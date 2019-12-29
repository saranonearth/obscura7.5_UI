<template>
  <div>
    <div class="main no-margin">
      <div class="d-container">
        <div class="top-bar">
          <div @click="handleSignout">
            <img class="logout-icon" src="../images/logout.png" alt="logout" />
          </div>
        </div>
        <h3 class="d-title">Obscura 7.5</h3>
        <div></div>
      </div>
      <div class="onboard-container">
        <div v-if="view==='gamename'">
          <GetGameName @game-Name="gamename" />
        </div>
        <div v-if="view==='unikey'">
          <GetUniqueKey @u-k="uk" />
        </div>
        <div v-if="view==='welcome'">
          <Welcome :image="image" :gameName="gameName" @nextmove="next" />
        </div>
      </div>
    </div>
    <div class="home-footer bottom">
      <div class="footer-content">
        Developed by
        <span class="gawds">gawds</span>
      </div>
    </div>
  </div>
</template>

<script>
import GetGameName from "../components/GetGameName";
import GetUniqueKey from "../components/GetUniqueKey";
import Welcome from "../components/Welcome";

export default {
  name: "Onboard",
  data() {
    return {
      view: "gamename",
      gameName: "",
      uniqueKey: ""
    };
  },
  computed: {
    image() {
      return this.$store.getters.user.image;
    },
    firstTime() {
      return this.$store.getters.firstTime;
    }
  },
  watch: {
    firstTime(value) {
      if (value === false) {
        this.$router.push("/dashboard");
      }
    }
  },
  components: {
    GetGameName,
    GetUniqueKey,
    Welcome
  },
  mounted() {
    if (
      this.$store.getters.user &&
      this.$store.getters.user.firstTime === false
    ) {
      this.$router.push("/");
    }

    this.$store.dispatch("GET_USER");
  },
  methods: {
    handleSignout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push("/");
    },
    gamename(e) {
      this.gameName = e;
      this.view = "unikey";
    },
    uk(e) {
      this.uniqueKey = e;
      this.view = "welcome";
    },
    next() {
      console.log(this.gameName, this.uniqueKey, this.image);
      const payload = {
        gameName: this.gameName,
        uniqueKey: this.uniqueKey,
        image: this.image
      };

      this.$store.dispatch("ONBOARD", payload);
    }
  }
};
</script>

<style>
</style>