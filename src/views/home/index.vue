<template>
  <div class="my-day">
    <header>
      <div class="title">
        <h2 class="main-title">My Day</h2>
        <h3 class="sub-title">{{ dateStr }}</h3>
      </div>
    </header>
    <el-divider />
    <section>
      <div class="head">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="handleTimeChange"
        />
      </div>
      <div v-loading="loading" class="todoList">
        <p class="todo-title">待做任务</p>
        <div class="active-todos">
          <Todo
            v-for="todo in activeTodos"
            :key="todo._id"
            :todo-data="todo"
            @toggle="onToggle"
            @edit="handleEditTodo(todo._id)"
          />
          <div v-if="!activeTodos.length" class="no-todo">任务都完成啦！</div>
        </div>
        <div class="completed-todos">
          <p class="todo-title">已完成任务</p>
          <Todo
            v-for="todo in completedTodos"
            :key="todo._id"
            :todo-data="todo"
            @toggle="onToggle"
            @edit="handleEditTodo(todo._id)"
          />
          <div v-if="!completedTodos.length" class="no-todo">当前没有完成任务！</div>
        </div>
      </div>
    </section>
    <todo-dialog :id="curId" ref="addDialog" :type="dialogType" :time="date" />
  </div>
</template>

<script>
import { editTodo } from "@/api/todo";
import { mapGetters, mapMutations } from "vuex";
import TodoDialog from "@/components/todoDialog.vue";
import Todo from "./components/todo.vue";
import moment from "moment";

export default {
  name: "MyDay",
  components: {
    TodoDialog,
    Todo,
  },
  data() {
    return {
      date: null,
      loading: false,
      // 弹窗类型：add（添加） edit（编辑）
      dialogType: "add",
      curId: "",
      todoStatus: true,
    };
  },
  computed: {
    ...mapGetters(["user", "curTodos"]),
    dateStr() {
      const mapStr = {
        0: "星期日",
        1: "星期一",
        2: "星期二",
        3: "星期三",
        4: "星期四",
        5: "星期五",
        6: "星期六",
      };
      const dateObj = moment(this.date);
      return `${mapStr[dateObj.weekday()]} - ${
        dateObj.month() + 1
      }月${dateObj.date()}日`;
    },
    activeTodos() {
      return this.curTodos
        .filter((todo) => todo.completed === 0)
        .sort((a, b) => b.level - a.level);
    },
    completedTodos() {
      return this.curTodos
        .filter((todo) => todo.completed === 1)
        .sort((a, b) => b.level - a.level);
    },
  },
  created() {
    const { date = moment().format("YYYY-MM-DD") } = this.$route.query;
    this.date = date;
    this.handleTimeChange();
  },
  methods: {
    ...mapMutations("todo", {
      updateTime: "SET_TIME",
    }),
    handleOpenDialog(refName) {
      this.$refs[refName].show();
    },
    handleAddTodo(refName) {
      this.dialogType = "add";
      this.handleOpenDialog(refName);
    },
    handleEditTodo(id) {
      this.dialogType = "edit";
      this.curId = id;
      this.handleOpenDialog("addDialog");
    },
    updateTodoList(time) {
      this.$store.dispatch("todo/shouldUpdate", time);
    },
    onToggle({ _id, completed, time }) {
      const newCompleted = completed ? 0 : 1;
      editTodo({ _id, completed: newCompleted }).then(() => {
        this.updateTodoList();
        const msg = newCompleted === 1 ? "恭喜完成了一个任务" : "重置成功";
        this.updateTodoList(time);
        this.$message.success(msg);
      });
    },
    handleTimeChange() {
      this.updateTime(this.date);
      this.updateTodoList(this.date);
    },
  },
};
</script>

<style lang="scss" scoped>
.no-todo {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 22px;
  color: #909399;
}
.my-day {
  padding: 0 20px;
  header {
    display: flex;
    justify-content: space-between;
    .title {
      color: #666;
      .main-title {
        font-size: 24px;
        margin: 10px 0;
      }
      .sub-title {
        font-size: 16px;
      }
    }
  }
  section {
    .head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .todo-title {
      border-left: 5px solid #409eff;
      padding-left: 3px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      font-weight: 600;
      font-size: 20px;
    }
  }
}
</style>
