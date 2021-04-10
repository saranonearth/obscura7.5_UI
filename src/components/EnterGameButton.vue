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

export default {
  name: "EnterGameButton",
  data() {
    return {
      googleSignInParams: {
        client_id: process.env.VUE_APP_GKEY
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      console.log(googleUser);
      const token = googleUser.tc.id_token;
      this.$store.dispatch("AUTH", token);
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    }
  }
};
</script>

<style></style>
