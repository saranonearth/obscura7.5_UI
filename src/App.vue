<template>
  <div>
    <div class="loading-screen" v-if="isLoading">
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
  mounted() {
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
