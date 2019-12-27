<template>
  <div>
    <g-signin-button
      class="enter-button"
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
    >Enter Game</g-signin-button>
  </div>
</template>

<script>
import config from "../config.json";
export default {
  name: "EnterGameButton",
  data() {
    return {
      googleSignInParams: {
        client_id: config.GKEY
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      const token = googleUser.Zi.id_token;
      this.$store.dispatch("AUTH", token);
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    }
  }
};
</script>

<style></style>
