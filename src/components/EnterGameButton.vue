<template>
  <div>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
    >
      Enter Game
    </g-signin-button>
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
      console.log(googleUser);
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    }
  }
};
</script>

<style></style>
