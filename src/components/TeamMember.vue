<template>
  <div>
    <div>
      <p class="admin" v-if="admin">Admin🍭</p>
      <img :src="player.image" :alt="player.gameName" />
      <p class="mem-name">{{player.gameName}}</p>
      <p>No of Levels Solved: &nbsp; {{member.levelsSolved}}</p>
      <p>Solved levels</p>
      <p>{{solvedLevels}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamMember",
  props: ["member", "admin"],
  computed: {
    player() {
      return this.member.player;
    },
    solvedLevels() {
      return this.member.solvedLevels.map(a => a.levelNo);
    }
  }
};
</script>

<style>
</style>