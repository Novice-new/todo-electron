<template>
  <div class="dashboard-container">
    <el-date-picker
      v-model="time"
      type="month"
      placeholder="选择月"
      value-format="yyyy-MM"
      style="margin: 20px 0"
    />
    <todo-chart :time="time" :title="chartTitle" />
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import TodoChart from "./components/todoChart.vue";

export default {
  name: "Dashboard",
  components: {
    TodoChart,
  },
  data() {
    return {
      time: moment().format("YYYY-MM"),
    };
  },
  computed: {
    ...mapGetters(["user"]),
    chartTitle() {
      const month = moment(this.time).month() + 1;
      return `${month}月已完成任务概览`;
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
