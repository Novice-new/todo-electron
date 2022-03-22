import { getTodoList } from "@/api/todo";
import moment from "moment";

const getDefaultState = () => {
  return {
    time: moment().format("YYYY-MM-DD"),
    curTodos: [],
    todayTodos: [],
  };
};

const state = getDefaultState();

const mutations = {
  SET_TIME: (state, payload) => {
    state.time = payload;
  },
  SET_TODAY: (state, payload) => {
    state.todayTodos = payload;
  },
  SET_TODOS: (state, payload) => {
    state.curTodos = payload;
  },
};
const actions = {
  // 更新TODOS
  updateTodos({ state, commit, rootGetters }, payload) {
    if (!rootGetters.user) return;
    const params = {
      userId: rootGetters.user._id,
      time: state.time,
    };
    const { isToday = false, isSelectDay = false } = payload;
    // 如果是今天且今天日期不是选中日期则改变参数中的日期更新今天的todo列表
    if (isToday && !isSelectDay) {
      params.time = moment().format("YYYY-MM-DD");
      getTodoList(params).then((res) => {
        commit("SET_TODAY", res.data);
      });
    } else {
      // 其他情况无需对time修改直接使用当前选中时间请求
      getTodoList(params).then((res) => {
        commit("SET_TODOS", res.data);
        // 如果选中时间也是今天时间时还需更新今天的todo列表
        if (isToday) {
          commit("SET_TODAY", res.data);
        }
      });
    }

  },
  shouldUpdate({ state, dispatch }, todoTime = moment().format("YYYY-MM-DD")) {
    // 根据传入的时间（默认为今天）更新对应列表
    const isToday = todoTime === moment().format("YYYY-MM-DD");
    const isSelectDay = todoTime === state.time;
    if (isToday || isSelectDay) {
      dispatch("updateTodos", { isSelectDay, isToday });
    } else {
      return;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
