<template>
  <div>
    <h2>Hey there, welcome!</h2>
    <img class="onboard-image" :src="image" alt="profile-image" />
    <h4 class="on-gamename">{{gameName}}</h4>
    <br />
    <button @click="next">Play →</button>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  props: ["image", "gameName"],
  methods: {
    next() {
      this.$emit("nextmove");
    }
  }
};
</script>

<style>
</style>