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
              <p class="text-center">{{ m.player.gameName }}</p>
            </div>
          </div>
          <h2 class="page-title-sub">Leaderboard</h2>
          <div>
            <div class="leader-board">
              <div class="table-row">
                <div class="table-item">
                  <div class="t-center">Rank</div>
                  <div class="p-6">Team</div>
                </div>

                <div class="item">Levels solved</div>
              </div>
              <div v-for="(team, index) in Leaderboard" :key="team.id" class="table-row">
                <div class="table-item lb-team">
                  <div class="v-center j-c">{{ index + 1 }}</div>
                  <div class="p-6">
                    <img class="l-image" :src="getImageUrl(team.image)" alt="team-pro-image" />
                  </div>
                  <div @click="handleShowTeam(team.id)" class="p-4 v-center h">{{ team.teamName }}</div>
                </div>
                <div class="item v-center">{{ team.levelsSolved }}</div>
              </div>
            </div>
            <div class="load-more">
              <div v-if="!loading">
                <button v-if="isMoreTeam() === true" @click="loadMore">Load More</button>
              </div>
              <div v-else>
                <p>Loading...</p>
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
            <a href="https://www.facebook.com/obscuranitkkr/">
              Loading ObscurA NIT Kurukshetra Facebook Timeline. If it is still
              not showing try refreshing or disabling your browser "Tracking"
              settings.
            </a>
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
      Leaderboard: this.$store.getters.leaderboard,
      skip: 10,
      loading: false,
      showTeamId: null
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
    },
    async loadMore() {
      this.loading = true;
      await this.$store.dispatch("GET_ALL_TEAMS", this.skip);
      this.loading = false;
      this.skip = this.skip + 10;
    },
    isMoreTeam() {
      if (this.Leaderboard > 10) {
        return true;
      } else {
        return false;
      }
    },
    handleShowTeam(id) {
      this.showTeamId = id;
      this.$emit("show-team", this.showTeamId);
    }
  },
  mounted() {
    this.$loadScript(
      "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v5.0&appId=342135736713338&autoLogAppEvents=1"
    )
      .then(() => {
        this.$nextTick(() => {
          window.FB.XFBML.parse();
        });
      })
      .catch(() => {
        console.log("SCRIPT LAODING ERROR");
      });
  }
};
</script>

<style></style>
