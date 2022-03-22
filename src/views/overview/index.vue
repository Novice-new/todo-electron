<template>
  <div class="overview">
    <header>
      <el-date-picker
        v-model="value"
        type="month"
        placeholder="选择月份"
        style="margin: 10px"
        value-format="yyyy-MM"
        @change="handleTimeChange"
      />
      <div class="text">{{ value }}</div>
    </header>
    <el-calendar v-model="arrange">
      <template slot="dateCell" slot-scope="{ data }">
        <div class="date-item" @click="toDetail(data.day)">
          <p class="date">{{ data.day.split("-").slice(1).join("-") }}</p>
          <!-- <div v-if="todoList[data.day]" class="date-info">
            <p class="total">任务总数: {{ todoList[data.day].total }}</p>
            <p class="completed">已完成: {{ todoList[data.day].completed }}</p>
            <p class="active">待做: {{ todoList[data.day].active }}</p>
          </div>
          <div v-else style="margin-top: 10px">暂无任务</div>-->
          <div v-if="todoList[data.day]" class="date-info">
            <p
              class="todo-name"
              v-for="item in todoList[data.day].todos"
              :key="item.id"
            >{{item.name}}</p>
            <p class="todo-name" v-if="todoList[data.day].overNum">+{{todoList[data.day].overNum}}</p>
          </div>
          <div v-else style="margin-top: 10px">暂无任务哦</div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import { getMonthTodo } from "@/api/todo";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      value: moment().format("YYYY-MM"),
      todoInfo: [],
      arrange: moment().format(),
    };
  },
  computed: {
    ...mapGetters(["user"]),
    todoList() {
      const result = {};
      const showNum = 3;
      this.todoInfo.forEach((todo) => {
        const { _id, ...data } = todo;
        if (data.todos.length > showNum) {
          data.overNum = data.todos.length - showNum;
          data.todos = data.todos.slice(0, showNum);
        }
        result[_id] = data;
      });
      return result;
    },
    curMonth() {
      return moment(this.value).format("YYYY-MM");
    },
  },
  created() {
    this.getMonthTodo();
  },
  methods: {
    toDetail(date) {
      this.$router.push({ path: "/home", query: { date } });
    },
    getMonthTodo() {
      const params = {
        userId: this.user._id,
        time: this.value,
      };
      getMonthTodo(params).then((res) => {
        this.todoInfo = res.data;
      });
    },
    handleTimeChange() {
      this.arrange = this.value;
      this.getMonthTodo();
    },
  },
};
</script>

<style lang="scss" scoped>
.overview {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    .text {
      font-size: 20px;
      margin: 10px;
    }
  }
}
.date-item {
  font-size: 14px;
  height: 100%;
  color: #666;
  .todo-name {
    background: #999;
    padding: 0 5px;
    margin: 2px 0;
    border-radius: 5px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p {
    margin: 0;
    &.date {
      font-size: 16px;
      color: #000;
    }
  }
}
</style>
<style lang="scss">
.el-calendar__header {
  padding: 0 !important;
}

.el-calendar__button-group {
  display: none !important;
}

.el-calendar__title {
  display: none !important;
}

.el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  padding: 8px;
  height: 120px !important;
}
.el-calendar-table td.is-today {
  color: #000;
}
</style>
