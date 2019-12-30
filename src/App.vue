<template>
  <div>
    <div class="loading-screen" v-if="isLoading">
      <div class="center">
        <div class="loader"></div>
      </div>
      <h2>Fetching User ...</h2>
    </div>
    <div else>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("GET_USER");
  },
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style></style>
