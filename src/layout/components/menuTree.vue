<template>
  <div class="menu">
    <template
      v-if="
        hasOneShowChild(route) &&
        (!onlyChild.children || !onlyChild.children.length)
      "
    >
      <el-menu-item
        v-if="!onlyChild.hidden"
        :index="resolvePath(onlyChild.path)"
      >
        <i :class="onlyChild.meta.icon"></i>
        <span slot="title">{{ onlyChild.meta.title }}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else>
      <template slot="title">
        <i :class="route.meta.icon"></i>
        <span slot="title">{{ route.meta.title }}</span>
      </template>
      <menu-tree
        v-for="child in route.children"
        :key="child.path"
        :route="child"
        :basePath="resolvePath(child.path)"
      ></menu-tree>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "MenuTree",
  props: ["route", "basePath"],
  data() {
    return {
      onlyChild: {},
    };
  },
  methods: {
    hasOneShowChild(parent) {
      //拿取子路由
      const children = parent.children || [];
      // 遍历子路由
      const showChild = children.filter((child) => {
        if (child.hidden) {
          return false;
        } else {
          this.onlyChild = child;
          return true;
        }
      });
      // 如果子路由只有一个展示
      if (showChild.length === 1) {
        return true;
      }
      // 如果子路由没有展示直接展示当前路由
      if (showChild.length === 0) {
        this.onlyChild = parent;
        return true;
      }

      return false;
    },
    resolvePath(path) {
      if (!this.route.children || this.route.length === 0) {
        return this.basePath;
      } else if (path[0] === "/") {
        return path;
      } else {
        const reg = /\/+/;
        return `${this.basePath}/${path}`.replace(reg, "/");
      }
    },
  },
};
</script>
