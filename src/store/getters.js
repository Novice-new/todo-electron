const getters = {
  user: (state) => state.user.userInfo,
  todayTodos: (state) => state.todo.todayTodos,
  curTodos: (state) => state.todo.curTodos,
  time: (state) => state.todo.time,
};
export default getters;
