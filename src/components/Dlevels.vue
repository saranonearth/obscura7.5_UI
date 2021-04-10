<template>
  <div>
    <div>
      <p class="your-team">Levels</p>
    </div>

    <div class="loading-l" v-if="loading">
      <h2>Fetching levels...</h2>
    </div>
    <div v-if="!loading">
      <div v-if="isNoTeam">
        <h2>You need to be in a team to play.</h2>
      </div>
       <div v-else-if="isDone" class="center-win">
        <h2>You have finished the game🔥🎉</h2>
      </div>
      <div v-else class="levels-container">
        <div
          @click="handleClick(level,index)"
          class="level"
          v-for="(level, index) in levels"
          :key="level.level"
        >
          <div>{{index}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dlevels",
  props: ["loading"],
  data() {
    return {
      Levels: [],
      isNoTeam: this.$store.getters.user.group ? false : true,
    };
  },
  computed: {
    levels() {
      return this.$store.getters.levels;
    },
  },
  watch: {
    levels(values) {
      this.Levels = values;
    },
  },
  methods: {
    handleClick(leveldata, index) {
      this.$emit("level-selected", { leveldata, index });
    },
    isDone() {
      const LevelData = this.$store.getters.levelData;
      const index = this.levels.length-1;

      return LevelData[index].data==="dang";

      }
  }
};
</script>

<style>
</style>