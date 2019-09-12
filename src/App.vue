<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      router
    >
      <el-menu-item index="/" :route="{ name: 'main' }"
        >Соревноваться</el-menu-item
      >
      <el-menu-item index="/leaders" :route="{ name: 'leaders' }"
        >Список лидеров</el-menu-item
      >
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path
    };
  },
  watch: {
    $route(newValue) {
      this.activeIndex = newValue.path;
    }
  }
};
</script>

<style>
* {
  transition: 0.12s;
}

body {
  background: url("assets/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

#app {
  max-width: 540px;
  margin: auto;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  position: relative;
}

.el-menu {
  margin-bottom: 30px;
}

.text-center {
  text-align: center;
}

.el-card__body {
  display: flex;
  flex-direction: column;
  min-height: 480px;
  justify-content: space-between;
}

.el-dialog .el-dialog__header {
  padding: 0;
}

.el-button + .el-button {
  margin-left: 0;
}

@media screen and (max-width: 1099px) {
  body {
    background: none;
  }
}
</style>
