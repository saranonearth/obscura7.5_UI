<template>
  <div>
    <h1 v-if="loading">Loading...</h1>
    <h1 v-else>{{leveldata.data}} {{index}}</h1>
  </div>
</template>

<script>
export default {
  name: "level",
  data() {
    return {
      leveldata: this.$store.getters.levelData.find(
        l => l.id === this.levelcontent.level
      ),
      loading: true
    };
  },
  async created() {
    if (
      this.$store.getters.levelData.find(l => l.id === this.levelcontent.level)
    ) {
      this.leveldata = this.$store.getters.levelData.find(
        l => l.id === this.levelcontent.level
      );
      this.loading = false;
    } else {
      console.log("2");
      await this.$store.dispatch("GET_LEVEL", this.levelcontent.level);
      this.leveldata = this.$store.getters.levelData.find(
        l => l.id === this.levelcontent.level
      );
      this.loading = false;
    }
  },
  props: ["levelcontent", "index"]
};
</script>

<style>
</style>