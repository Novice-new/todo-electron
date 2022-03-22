import axios from "../utils/request";

export function addUser(data) {
  return axios.post("/api/user", data);
}

export function getUserInfo(id) {
  return axios.get(`/api/user/${id}`);
}

export function login(data) {
  return axios.post("/api/user/login", data);
}

export function editUser({ id, ...data }) {
  return axios.patch(`/api/user/${id}`, data);
}
