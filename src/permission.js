import router from "./router";
import store from "./store";

router.beforeEach(async (to, from, next) => {
  // determine whether the user has logged in
  const hasGetUserInfo = store.getters.user;
  if (to.meta.auth) {
    // 需要鉴权
    // 判断是否登录
    if (hasGetUserInfo) {
      next();
    } else {
      next(`/login`);
    }
  } else {
    // 无需鉴权
    if (to.path === "/login" && hasGetUserInfo) {
      // 如果取得是登陆页面并且用户已登陆则跳转到首页
      next({ path: "/" });
    } else {
      next();
    }
  }
});

router.afterEach(() => {});
