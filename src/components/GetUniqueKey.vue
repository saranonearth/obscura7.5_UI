<template>
  <div>
    <form @submit.prevent="onNext(uk)">
      <label for="uniquekey">A line about your self.</label>
      <br />
      <input type="text" v-model="uk" required />
      <br />
      <button>Next →</button>
    </form>
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