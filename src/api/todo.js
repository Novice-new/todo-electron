import axios from "../utils/request";

// 添加todo
export function addTodo(data) {
  return axios.post("/api/todo", data);
}

// 根据筛选条件查询todo
export function getTodoList(params) {
  return axios.get(`/api/todo/list`, { params });
}

// 删除tood
export function deleteTodo(id) {
  return axios.delete(`/api/todo/${id}`);
}

// 编辑todo
export function editTodo({ _id, ...data }) {
  return axios.post(`/api/todo/edit/${_id}`, data);
}

// 获取当月每天todo信息
export function getMonthTodo(params) {
  return axios.get("/api/todo/month/list", { params });
}

// 获取某个todo的详细信息
export function getTodoDetail(id) {
  return axios.get(`/api/todo/${id}`);
}

export function getTodoChart(params) {
  return axios.get("/api/todo/month/chart", { params });
}
