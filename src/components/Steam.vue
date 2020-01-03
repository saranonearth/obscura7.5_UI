<template>
  <div>
    <div v-if="InviteMsg !==null " class="alert">
      <p>{{InviteMsg}}</p>
    </div>
    <div v-if="loading">
      <h1>loading...</h1>
    </div>
    <div v-else>
      <div v-if="!loading" class="team-details">
        <div class="left">
          <div>
            <p class="page-title">Team</p>
          </div>
          <div class="team-cont">
            <div class="t-left">
              <p class="page-title-sub">Members</p>
              <div class="team-members">
                <div class="member card-d pd-l" v-for="m in sort(Team.members)" :key="m.player.id">
                  <TeamMember :admin="isAdmin(m.player.id)" :member="m" />
                </div>
              </div>
            </div>
            <div class="t-right">
              <p class="profile page-title-sub">Profile</p>
              <div class="card-d">
                <div>
                  <img class="team-img" :src="getImageUrl(Team.image)" alt />
                </div>
                <h1 class="name-team">{{ Team.teamName }}</h1>
                <p class="bio">{{ Team.bio }}</p>
                <div v-if="!isAlreadyInATeam" class="t-center-i">
                  <button class="in-btn" @click="sentInvite(Team.id)">Send request to join</button>
                </div>
                <h3 class="lvl-solved">Levels Solved: {{ Team.levelsSolved }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TeamMember from "../components/TeamMember";
export default {
  name: "Steam",
  props: ["showteam"],
  components: {
    TeamMember
  },
  data() {
    return {
      Team: this.$store.getters.showTeam,
      loading: true,
      InviteMsg: this.$store.getters.inviteMsg
    };
  },
  async created() {
    await this.$store.dispatch("GET_GAME_TEAM", {
      teamId: this.showteam,
      showTeam: true
    });
    this.loading = false;
  },
  computed: {
    team() {
      return this.$store.getters.showTeam;
    },
    invitemsg() {
      return this.$store.getters.inviteMsg;
    },
    isAlreadyInATeam() {
      return this.$store.getters.user.group !== null;
    }
  },
  watch: {
    team(value) {
      this.Team = value;
    },
    invitemsg(value) {
      this.InviteMsg = value;
    }
  },
  methods: {
    getImageUrl(value) {
      return require(`../images/avatars/${value}.png`);
    },
    sort(members) {
      return members.slice().sort(function(a, b) {
        return a.levelsSolved > b.levelsSolved ? 1 : -1;
      });
    },
    isAdmin(id) {
      if (this.Team.teamAdmin === id) return true;
      else return false;
    },
    async sentInvite(teamId) {
      await this.$store.dispatch("SEND_INVITE", teamId);
    }
  },
  destroyed() {
    this.$store.commit("REMOVE_SHOW_TEAM");
    this.$store.commit("REMOVE_INVITE_MSG");
  }
};
</script>

<style>
</style>