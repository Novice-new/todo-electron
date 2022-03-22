<template>
  <div class="left-nav">
    <el-menu
      router
      :default-active="activePath"
      class="slide-bar"
      background-color="#FAFAFA"
      text-color="#202020"
      active-text-color="#333"
    >
      <menu-tree
        v-for="route in routes"
        :key="route.path"
        :route="route"
        :basePath="route.path"
      ></menu-tree>
    </el-menu>
  </div>
</template>

<script>
import menuTree from "../menuTree.vue";
export default {
  components: {
    menuTree,
  },
  data() {
    return {
      routes: [],
      activePath: "/dashboard",
    };
  },
  watch: {
    $route() {
      this.activePath = this.$route.path;
    },
  },
  created() {
    this.routes = this.$router.options.routes;
    this.activePath = this.$route.path;
  },
};
</script>

<style lang="scss">
.el-menu {
  height: 100% !important;
  width: 150px;
  box-sizing: border-box;
  .el-menu-item {
    color: #202020;
    &:hover {
      background-color: #ececec !important;
    }
    &.is-active {
      background-color: #ececec !important;
    }
  }
}
</style>
