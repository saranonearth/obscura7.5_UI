<template>
  <div>
    <div v-if="User.group === null">
      <h2 class="text-mobile">You do not have any team. Either create one or join one from home.</h2>

      <div class="create-team-form">
        <label class="team-label" for="teamName">Choose a team avatar.</label>
        <div class="avatar-holder">
          <div v-for="img in images" :key="img.name">
            <img class="avatar-list" :src="getImgUrl(img.name)" alt="pro-image" />
          </div>
        </div>
        <form @submit.prevent="createTeam">
          <div>
            <label class="team-label" for="teamName">Team Name</label>
            <br />
            <input type="text" v-model="teamName" required />
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
  </div>
</template>

<script>
import { images } from "../proimg";
export default {
  name: "Dteam",
  data() {
    return {
      User: this.$store.getters.user,
      teamName: "",
      uniqueKey: "",
      bio: "",
      image: ""
    };
  },
  mounted() {
    if (this.$store.getters.user.group !== null) {
      console.log("HEY");
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    images() {
      return images;
    }
  },
  watch: {
    user(value) {
      this.User = value;
    }
  },
  methods: {
    getImgUrl(img) {
      return require(`../images/avatars/${img}.png`);
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

<style>
</style>