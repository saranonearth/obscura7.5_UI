<template>
  <div>
    <div v-if="User.group === null">
      <h2 class="text-mobile">
        You do not have any team. Either create one or join one from home.
      </h2>

      <div class="create-team-form">
        <label class="team-label" for="teamName">Choose a team avatar.</label>
        <div class="avatar-holder">
          <div v-for="img in images" :key="img.name">
            <img
              @click="avatarSelect(img.name)"
              :src="getImageUrl(img.name)"
              alt="pro-image"
              :class="
                image === img.name ? 'avatar-list selected' : 'avatar-list'
              "
            />
          </div>
        </div>
        <form @submit.prevent="createTeam">
          <div>
            <label class="team-label" for="teamName">Team Name</label>
            <br />
            <input type="text" v-model="teamName" maxlength="25" required />
          </div>
          <div>
            <label class="team-label" for="bio">Bio</label>
            <br />
            <input type="text" v-model="bio" required />
          </div>
          <div>
            <label class="team-label" for="uniqueKey">Unique Key</label>
            <br />
            <input type="text" v-model="uniqueKey" required />
          </div>
          <button class="m-b" type="submite">Create Team</button>
        </form>
      </div>
    </div>
    <div v-if="Team !== null">
      <h2 v-if="loading">Fetching team details...</h2>
      <div v-if="!loading" class="team-details">
        <div class="left">
          <div>
            <p class="page-title">Your Team</p>
          </div>
          <div class="team-cont">
            <div class="t-left">
              <p class="profile page-title-sub">
                Requests to join your team.
                <span class="bio sm">[Only admin can accept requests.]</span>
              </p>
              <p class="bio" v-if="invLength() === false">No requests.</p>
              <div v-for="i in Invitations" :key="i.player.gameName">
                <div class="invitation">
                  <div>
                    <img :src="i.player.image" alt="i-player-img" />
                  </div>
                  <div class="holder-i">
                    <div class="i-name">
                      <div>
                        <p class="i-p-name">{{ i.player.gameName }}</p>
                      </div>
                      <div class="bio">
                        <p>{{ i.player.uniqueKey }}</p>
                      </div>
                    </div>
                    <div v-if="isAdmin(User.id)" class="i-accept">
                      <div class="accept">Accept</div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="page-title-sub">Members</p>
              <div class="team-members">
                <div
                  class="member card-d pd-l"
                  v-for="m in sort(Team.members)"
                  :key="m.player.id"
                >
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
                <h3 class="lvl-solved">
                  Levels Solved: {{ Team.levelsSolved }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TeamMember from "./TeamMember";
import { images } from "../proimg";
export default {
  name: "Dteam",
  data() {
    return {
      User: this.$store.getters.user,
      Team: this.$store.getters.team,
      teamName: "",
      uniqueKey: "",
      bio: "",
      image: "1",
      Invitations: this.$store.getters.invitations
    };
  },
  props: ["loading"],
  components: {
    TeamMember
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    images() {
      return images;
    },
    team() {
      return this.$store.getters.team;
    },
    invitations() {
      return this.$store.getters.invitations;
    }
  },
  watch: {
    user(value) {
      this.User = value;
    },
    team(value) {
      this.Team = value;
    },
    invitations(value) {
      this.Invitations = value;
    }
  },
  methods: {
    sort(members) {
      return members.slice().sort(function(a, b) {
        return a.levelsSolved > b.levelsSolved ? 1 : -1;
      });
    },
    invLength() {
      if (this.Invitations.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    isAdmin(id) {
      if (this.Team.teamAdmin === id) return true;
      else return false;
    },
    avatarSelect(value) {
      this.image = value;
      console.log(value);
    },
    getImageUrl(value) {
      return require(`../images/avatars/${value}.png`);
    },
    createTeam() {
      const payload = {
        teamName: this.teamName,
        image: this.image,
        uniqueKey: this.uniqueKey,
        bio: this.bio
      };
      this.$store.dispatch("CREATE_TEAM", payload);
      this.teamName = "";
      this.uniqueKey = "";
      this.bio = "";
      this.image = "";
    }
  }
};
</script>

<style></style>
