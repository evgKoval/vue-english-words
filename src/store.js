import Vue from "vue";
import Vuex from "vuex";

import db from "@/firebase";

import words from "./words.js";
shuffle(words);

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stage: "beforeGame",
    cards: words,
    knownWords: 0,
    unknownWords: [],
    nickname: "",
    leaders: [],
    loading: true
  },
  mutations: {
    SET_STAGE(state, stage) {
      state.stage = stage;
    },
    SHIFT_CARD(state) {
      state.cards.shift();
      localStorage.setItem("words", JSON.stringify(state.cards));
    },
    KNOWN_CARD: function(state) {
      state.knownWords++;
      localStorage.setItem("known", state.knownWords);
    },
    UNKNOWN_CARD: function(state, word) {
      state.unknownWords.push(word);
      localStorage.setItem("unknown", JSON.stringify(state.unknownWords));
    },
    SET_LOCAL() {
      localStorage.setItem("started", true);
    },
    GET_LOCAL: function(state) {
      state.cards = JSON.parse(localStorage.getItem("words"));
      state.knownWords = localStorage.getItem("known");
      state.unknownWords = JSON.parse(localStorage.getItem("unknown")) || [];
      state.stage = "game";
    },
    SET_NICKNAME(state, nickname) {
      state.nickname = nickname;
      localStorage.setItem("nickname", nickname);
    },
    FETCH_LEADERS: function(state, leaders) {
      state.leaders = leaders;
      state.loading = false;
    }
  },
  actions: {
    getLeaders({ commit }) {
      db.collection("leaders")
        .get()
        .then(querySnapshot => {
          let tempLeaders = [];
          querySnapshot.forEach(doc => {
            const data = {
              name: doc.data().name,
              words: doc.data().words
            };
            tempLeaders.push(data);
          });

          const tempLeadersSorted = tempLeaders.sort((a, b) => {
            return b.words - a.words;
          });

          commit("FETCH_LEADERS", tempLeadersSorted);
        });
    },
    addLeader({ state }) {
      db.collection("leaders").add({
        name: state.nickname,
        words: state.knownWords
      });
    }
  },
  getters: {
    stage(state) {
      return state.stage;
    },
    cardsFlow(state) {
      return state.cards.slice(0, 3);
    },
    knownWords(state) {
      return state.knownWords;
    },
    unknownWords(state) {
      return state.unknownWords;
    },
    getLeaders(state) {
      return state.leaders;
    },
    loading(state) {
      return state.loading;
    }
  }
});

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
