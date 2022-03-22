<template>
  <div class="layout-container">
    <layout-head></layout-head>
    <div class="layout-main">
      <left-nav></left-nav>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import layoutHead from "./components/layout-head/index.vue";
import leftNav from "./components/left-nav";
export default {
  components: {
    layoutHead,
    leftNav,
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .layout-main {
    overflow: hidden;
    flex: 1 1 auto;
    display: flex;
    .content {
      min-width: 500px;
      flex: 1 1 auto;
      overflow-y: auto;
    }
  }
}
</style>
