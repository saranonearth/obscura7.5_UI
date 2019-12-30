<template>
  <h1>{{leveldata.data}}</h1>
</template>

<script>
export default {
  name: "level",
  data() {
    return {
      leveldata: this.$store.getters.levelData.find(
        l => l.id === this.levelcontent.level
      )
    };
  },
  props: ["levelcontent", "index"]
};
</script>

<style>
</style>