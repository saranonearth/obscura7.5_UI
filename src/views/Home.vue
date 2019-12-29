<template>
  <div>
    <div class="red-bar"></div>
    <div class="container">
      <div class="title-button">
        <div>
          <img src="../images/logo.png" alt="yo" />
        </div>
        <div>
          <h1 class="title">ObscurA 7.5</h1>
        </div>
        <div>
          <EnterGameButton />
        </div>
      </div>
    </div>
    <div class="home-footer mobile-footer-home">
      <div class="footer-content">
        Developed by
        <span class="gawds">gawds</span>
      </div>
    </div>
  </div>
</template>

<script>
import EnterGameButton from "../components/EnterGameButton.vue";
export default {
  name: "Home",
  components: {
    EnterGameButton
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },
  watch: {
    isAuth(value) {
      if (value === true) {
        this.$router.push("/dashboard");
      }
    }
  }
};
</script>

<style></style>
