<template>
  <div class="layout-head">
    <div class="left">
      <i class="el-icon-s-home" @click="toHome" />
      <el-autocomplete
        size="small"
        v-model="name"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入任务名称"
        suffix-icon="el-icon-search"
        @select="handleSelect"
      />
      <el-popover popper-class="pop-todos" placement="bottom" width="300" trigger="hover">
        <template v-if="activeTodos.length">
          <div
            class="pop_todo"
            v-for="(todo, index) in activeTodos"
            :key="todo._id"
            style="
              color: #303133;
              font-size: 14px;
              line-height: 20px;
              margin: 5px 0;
              padding: 5px;
            "
          >{{ index + 1 }}、{{ todo.name }}</div>
        </template>
        <div v-else>任务都完成了，快去创建一个吧</div>
        <div slot="reference" style="margin-left: 20px; font-size: 16px">
          <el-badge :value="activeTodos.length" class="item">
            <el-button size="small" type="text" style="color:#fff">今日待做</el-button>
          </el-badge>
        </div>
      </el-popover>
    </div>
    <div class="right">
      <el-button
        style="margin-right: 10px"
        class="add-btn"
        type="plain"
        size="small"
        @click="handleAddTodo('addDialog')"
      >添加任务</el-button>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-s-custom" style="font-size: 20px; color: #fff" />
          <i class="el-icon-arrow-down el-icon--right" style="color: #fff"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <todo-dialog ref="addDialog" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TodoDialog from "@/components/todoDialog.vue";
import { getTodoList } from "@/api/todo";

export default {
  components: {
    TodoDialog,
  },
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapGetters(["user", "todayTodos"]),
    activeTodos() {
      return this.todayTodos.filter((todo) => todo.completed === 0);
    },
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (queryString.trim() === "") cb([]);
      const params = {
        userId: this.user._id,
        name: queryString.trim(),
        completed: 0,
      };
      getTodoList(params).then((res) => {
        console.log(res);
        const result = res.data.map((item) => ({ ...item, value: item.name }));
        cb(result);
      });
    },
    handleAddTodo(refName) {
      this.$refs[refName].show();
    },
    handleSelect(item) {
      const { time } = item;
      const query = { date: time };
      this.$router.push({ path: "/myDay/index", query });
      this.name = "";
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$store.dispatch("user/logout").then(() => {
          this.$message.success("退出成功");
          this.$router.push("/login");
        });
      }
    },
    toHome() {
      if (this.$route.name === "Home") return;
      this.$router.push({ path: "/home" });
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-head {
  flex: 0;
  box-sizing: border-box;
  padding: 10px 50px;
  width: 100%;
  background-color: #409eff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    .el-icon-s-home {
      cursor: pointer;
      color: #fff;
      font-size: 20px;
      padding: 3px;
      margin-right: 10px;
      border-radius: 3px;
      &:hover {
        background-color: #95c8fc;
      }
    }
  }
}
</style>
