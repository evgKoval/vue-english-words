<template>
  <transition name="list" mode="out-in">
    <el-card class="text-center">
      <div>
        <div class="box-word">
          <h2>{{ card.word }}</h2>
          <span>{{ card.transcription }}</span>
        </div>
        <div class="box-translate">
          <el-button v-if="!showTranslate" round @click="showTranslate = true">
            <i class="el-icon-view"></i>
            Показать перевод
          </el-button>
          <ul v-show="showTranslate">
            <li v-for="(translated, index) in card.translate" :key="index">
              {{ translated }}
            </li>
          </ul>
        </div>
      </div>

      <div class="box-actions">
        <el-row>
          <el-col :span="12">
            <div
              class="box-action known"
              @click="
                known();
                shift();
              "
            >
              <div>
                <i class="el-icon-back"></i>
                <i class="el-icon-thumb"></i>
              </div>
              Знаю это слово
            </div>
          </el-col>
          <el-col :span="12">
            <div
              class="box-action unknown"
              @click="
                unknown(card.word);
                shift();
              "
            >
              <div>
                <i class="el-icon-thumb"></i>
                <i class="el-icon-right"></i>
              </div>
              Не знаю
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </transition>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showTranslate: false
    };
  },
  methods: {
    shift() {
      this.$store.commit("SHIFT_CARD");
    },
    known() {
      this.$store.commit("KNOWN_CARD");
    },
    unknown(word) {
      this.$store.commit("UNKNOWN_CARD", word);
    }
  }
};
</script>

<style scoped>
.box-word {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ebeef5;
}

.box-word h2 {
  font-size: 32px;
}

.box-translate ul {
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.box-translate li {
  margin-bottom: 0.5rem;
  font-size: 20px;
}

.box-action {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
}

.box-action div {
  font-size: 20px;
  margin-bottom: 1rem;
}

.known {
  color: #67c23a;
}

.known:hover {
  background-color: #f0f9eb;
}

.unknown {
  color: #f56c6c;
}

.unknown:hover {
  background-color: #fef0f0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.18s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
