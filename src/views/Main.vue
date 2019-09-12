<template>
  <div>
    <el-dialog
      :visible.sync="dialog"
      width="320px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <strong class="dialog-title"
        >Эй, {{ nickname }}, хочешь продолжить с последнего слова?</strong
      >

      <div class="dialog-footer">
        <el-button class="go-btn" @click="dialog = false"
          >Начать заново</el-button
        >
        <el-button type="primary" class="go-btn" @click="continueGame"
          >Продолжить</el-button
        >
      </div>
    </el-dialog>

    <template v-if="stage === 'beforeGame'">
      <h1>Знаешь ли ты все топ 100 английских слов?</h1>
      <p>Введи свой никнейм для участия в топе</p>
      <el-input placeholder="Твой никнейм" v-model="nickname"></el-input>
      <span class="error" v-show="error"
        >Оставь свой никнейм. Без этого никуда.</span
      >
      <el-button type="primary" class="go-btn" @click="goGame"
        >Погнали!</el-button
      >
    </template>

    <template v-else-if="stage === 'afterGame'">
      <h2>{{ resultWords }}</h2>
      <div v-if="unknownWords" class="unknown-words">
        <p>Слова, которые ты не знал</p>
        <ul>
          <li v-for="word in unknownWords" :key="word">{{ word }}</li>
        </ul>
      </div>
      <el-button type="primary" class="go-btn" @click="goToLeaders"
        >Перейти к списку лидеров</el-button
      >
    </template>

    <Card
      v-else
      class="card"
      v-for="card in cardsFlow"
      :key="card.word"
      :card="card"
    />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  components: {
    Card
  },
  data() {
    return {
      nickname: "",
      error: false,
      dialog: false
    };
  },
  created: function() {
    if (localStorage.getItem("started") && this.stage !== "game") {
      this.nickname = localStorage.getItem("nickname");
      this.dialog = true;
    }
  },
  computed: {
    cardsFlow() {
      return this.$store.getters.cardsFlow;
    },
    stage() {
      return this.$store.getters.stage;
    },
    knownWords() {
      return this.$store.getters.knownWords;
    },
    unknownWords() {
      return this.$store.getters.unknownWords;
    },
    resultWords() {
      return this.knownWords === 100
        ? "Ты действительно знал слово «Pecuniary»?"
        : this.knownWords === 99
        ? "Слово «Pecuniary» подвело, разве не так?"
        : this.knownWords >= 80
        ? "Неплохо, хотя надо лучше"
        : "Маловато для таких-то слов";
    }
  },
  methods: {
    goGame() {
      if (this.nickname.trim().length === 0) {
        this.error = true;
        return;
      }

      this.$store.commit("SET_STAGE", "game");
      this.$store.commit("SET_LOCAL");
      this.$store.commit("SET_NICKNAME", this.nickname);
    },
    continueGame() {
      this.dialog = false;
      this.$store.commit("SET_NICKNAME", this.nickname);
      this.$store.commit("GET_LOCAL");
    },
    goToLeaders() {
      this.$router.push({ name: "leaders" });
    }
  },
  watch: {
    cardsFlow() {
      if (this.cardsFlow.length === 0) {
        this.$store.dispatch("addLeader");
        this.$store.commit("SET_STAGE", "afterGame");

        localStorage.removeItem("started");
        localStorage.removeItem("words");
        localStorage.removeItem("known");
        localStorage.removeItem("unknown");
        localStorage.removeItem("nickname");
      }
    }
  }
};
</script>

<style scoped>
.go-btn {
  margin-top: 1rem;
  width: 100%;
}

.error {
  color: #f56c6c;
  display: block;
  padding-top: 0.5rem;
}

.card {
  outline: none;
  position: absolute;
  width: 100%;
}

.card:nth-child(2) {
  transform: scale(0.97);
  top: 106px;
  z-index: -1;
  margin-bottom: 18px;
}

.card:nth-child(3) {
  transform: scale(0.94);
  top: 121px;
  z-index: -2;
}

.unknown-words ul {
  max-height: 234px;
  overflow-y: auto;
}

.dialog-title {
  font-size: 1.5em;
  word-break: normal;
}
</style>
