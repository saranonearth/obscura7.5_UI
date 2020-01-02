<template>
  <div>
    <div class="home-cont">
      <div class="h-left">
        <div class="left">
          <h1 class="page-title">Home</h1>
          <p class="color2 m-t-2">For clues and updates follow us on</p>
          <div class="social-icons m-t-3">
            <div class="v-center">
              <img class="so-icon fa" src="../images/facebook.svg" alt="fb-logo" />
            </div>
            <div>
              <img class="so-icon p-3" src="../images/twitter.svg" alt="fb-logo" />
            </div>
            <div>
              <img class="so-icon p-3" src="../images/instagram.svg" alt="fb-logo" />
            </div>
          </div>
          <h2 v-if="isTeam" class="page-title-sub">Team Members</h2>
          <div class="h-team-members">
            <div v-for="m in team && team.members" :key="m.player.id" class="memberi">
              <img class="h-pro-img" :src="m.player.image" alt="team-player-image" />
              <p class="text-center">{{m.player.gameName}}</p>
            </div>
          </div>
          <h2 class="page-title-sub">Leaderboard</h2>
          <div>
            <div class="leader-board">
              <div class="table-row">
                <div class="table-item">Team</div>
                <table class="item">Levels solved</table>
              </div>
              <div v-for="team in Leaderboard" :key="team.id" class="table-row">
                <div class="table-item lb-team">
                  <div>
                    <img class="l-image" :src="getImageUrl(team.image)" alt="team-pro-image" />
                  </div>
                  <div class="p-4 v-center">{{team.teamName}}</div>
                </div>
                <table class="item">{{team.levelsSolved}}</table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="h-right no-mobile">
        <div
          class="fb-page"
          data-href="https://www.facebook.com/obscuranitkkr/"
          data-tabs="timeline"
          data-width="400"
          data-height="1000"
          data-small-header="true"
          data-adapt-container-width="true"
          data-hide-cover="true"
          data-show-facepile="true"
        >
          <blockquote cite="https://www.facebook.com/obscuranitkkr/" class="fb-xfbml-parse-ignore">
            <a
              href="https://www.facebook.com/obscuranitkkr/"
            >Loading ObscurA NIT Kurukshetra Facebook Timeline. If it is still not showing disable your browser "Tracking" settings.</a>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dhome",
  data() {
    return {
      Leaderboard: this.$store.getters.leaderboard
    };
  },
  computed: {
    team() {
      return this.$store.getters.team;
    },
    isTeam() {
      if (this.$store.getters.team === null) return false;
      else return true;
    },
    leaderboard() {
      return this.$store.getters.leaderboard;
    }
  },
  watch: {
    leaderboard(value) {
      this.Leaderboard = value;
    }
  },
  methods: {
    getImageUrl(value) {
      return require(`../images/avatars/${value}.png`);
    }
  }
};
</script>

<style>
</style>