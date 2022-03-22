import { login } from "@/api/user";

const getDefaultState = () => {
  return {
    userInfo: null,
  };
};

const state = getDefaultState();

const mutations = {
  RESET_USER: (state) => {
    state.userInfo = null;
  },
  SET_USER: (state, payload) => {
    state.userInfo = payload;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then((response) => {
          const { data } = response;
          if (!data) {
            reject("用户不存在");
          }
          commit("SET_USER", data);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve) => {
      commit("RESET_USER");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
