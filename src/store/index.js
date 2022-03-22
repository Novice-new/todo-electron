import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./modules/user";
import todo from "./modules/todo";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    todo,
  },
  getters,
});

export default store;
