<template>
  <el-table
    class="leaders-table"
    :data="leaders"
    style="width: 100%"
    empty-text="Пока что нет лидеров"
    v-loading="loading"
  >
    <el-table-column prop="name" label="Ник"></el-table-column>
    <el-table-column
      prop="words"
      label="Слов"
      width="100"
      align="right"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getLeaders");
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    leaders() {
      return this.$store.getters.getLeaders;
    }
  }
};
</script>

<style scoped>
.leaders-table {
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
