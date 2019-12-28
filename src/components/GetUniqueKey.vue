<template>
  <div>
    <label for="uniquekey">Unique Key</label>
    <br />
    <input type="text" v-model="uk" />
    <br />
    <button @click="onNext(uk)">Next →</button>
  </div>
</template>

<script>
export default {
  name: "GetUniqueKey",
  data() {
    return {
      uk: ""
    };
  },
  methods: {
    onNext(uk) {
      this.$emit("u-k", uk);
    }
  }
};
</script>

<style>
</style>