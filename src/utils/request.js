import axios from "axios";
import { Message } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: "http://10.219.108.117:3000/", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // config.headers = Object.assign({}, config.headers, { "Content-Type": "application/x-www-form-urlencoded" })
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(res.msg || "请求失败");
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
