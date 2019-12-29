<template>
  <div>
    <form @submit.prevent="onNext(gamename)">
      <label for="gamename">What's gonna be your game name?</label>
      <br />
      <input type="text" v-model="gamename" required />
      <br />
      <button type="submit">Next →</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "GetGameName",
  data() {
    return {
      gamename: ""
    };
  },
  methods: {
    onNext(gamename) {
      this.$emit("game-Name", gamename);
    }
  }
};
</script>

<style>
</style>