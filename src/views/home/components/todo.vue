<template>
  <div class="todo">
    <div class="todo-head">
      <i
        class="el-icon-s-flag"
        :style="`color:${mapColor[todoData.level]}; margin-right:10px`"
      />
      <span
        v-if="todoData.completed === 0"
        class="choose-btn"
        @click="handleToggle"
      >
        <i class="el-icon-check" style="color: #67c23a" />
      </span>
    </div>
    <div class="todo-text" :class="{ completed: todoData.completed === 1 }">
      {{ todoData.name }}
    </div>
    <div class="todo-btns">
      <el-button
        v-if="todoData.completed === 0"
        type="primary"
        plain
        size="small"
        @click="handleEdit"
        >编辑</el-button
      >
      <el-popover v-else v-model="visible" placement="top" width="200">
        <p>确定要重置该任务吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">
            取消
          </el-button>
          <el-button type="primary" size="mini" @click="handleBackout">
            确定
          </el-button>
        </div>
        <el-button slot="reference" type="primary" plain size="small">
          撤消
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todoData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      mapColor: {
        1: "#909399",
        2: "#E6A23C",
        3: "#F56C6C",
      },
    };
  },
  methods: {
    handleToggle() {
      this.$emit("toggle", this.todoData);
    },
    handleEdit() {
      this.$emit("edit");
    },
    handleBackout() {
      this.visible = false;
      this.$emit("toggle", this.todoData);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  width: 80%;
  min-width: 400px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: #666;
  padding-bottom: 5px;
  border-bottom: 1px solid #999;
  margin-bottom: 20px;
  .todo-head {
    display: flex;
    align-items: center;
    .choose-btn {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 1px solid #666;
      margin-right: 10px;
      .el-icon-check {
        display: none;
      }
      &:hover .el-icon-check {
        display: inline;
      }
    }
  }
  .todo-text {
    flex: 1 1 auto;
    &.completed {
      text-decoration: line-through;
    }
  }
}
</style>
