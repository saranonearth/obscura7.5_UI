<template>
  <div>
    <div class="left">
      <img :src="player.image" :alt="player.gameName" />
      <p class="mem-name">{{ player.gameName }}</p>
      <p class="admin" v-if="admin">Admin🍭</p>
      <div class="border-top">
        <p class="sm-d">No of Levels Solved: &nbsp; {{ member.levelsSolved }}</p>
        <p class="bio">Solved levels:</p>
        <p class="bio">{{ solvedLevels }}</p>
      </div>
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

<style></style>
