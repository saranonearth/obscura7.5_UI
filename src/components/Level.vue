<template>
  <div>
    <div v-if="answerMsg !==null " class="alert">
      <p>{{answerMsg}}</p>
    </div>
    <h1 v-if="loading">Loading...</h1>
    <h1 v-else>Level {{index}}</h1>
    <div class="level-container">
      <div>{{leveldata.data}}</div>
      <input type="text" v-model="answer" required />
      <br />
      <div v-if="checking">Checking...</div>
      <div v-else>
        <button @click="checkAnswer">Submit →</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "level",
  data() {
    return {
      answer: null,
      leveldata: this.$store.getters.levelData.find(
        l => l.id === this.levelcontent.level
      ),
      loading: true,
      checking: false,
      answerMsg: this.$store.getters.answerMsg
    };
  },
  computed: {
    AnswerMsg() {
      return this.$store.getters.answerMsg;
    }
  },
  watch: {
    AnswerMsg(value) {
      this.answerMsg = value;

      if (value === "Correct Answer" || value === "Level Already Solved") {
        setTimeout(() => {
          this.$emit("changeLevelView");
        }, 1800);
      }
    }
  },
  methods: {
    async checkAnswer() {
      console.log(this.answer, this.leveldata.rlevelNo);
      if (this.answer) {
        this.checking = true;
        await this.$store.dispatch("CHECK_ANSWER", {
          answer: this.answer,
          levelNo: this.leveldata.rlevelNo
        });
        this.checking = false;
        this.answer = null;
      } else {
        console.log("Null Answer");
      }
    }
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