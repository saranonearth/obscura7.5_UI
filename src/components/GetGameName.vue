<template>
  <div>
    <label for="gamename">What's gonna be your game name?</label>
    <br />
    <input type="text" v-model="gamename" />
    <br />
    <button @click="onNext(gamename)">Next →</button>
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