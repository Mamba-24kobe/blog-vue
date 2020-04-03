"use strict";

import Vue from 'vue';
import axios from "axios";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.VUE_APP_URL || "/web",
  timeout: 20 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

let loading = null //定义loading变量

let startLoading = () => {    //使用Element loading-start 方法
    loading = Vue.prototype.$loading({
      lock: true,
      text: '拼命加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
    })
}
let endLoading = () => {    //使用Element loading-close 方法
    loading.close()
}
// 以服务的方式调用的全屏 Loading 是单例的：若在前一个全屏 Loading 关闭前再次调用全屏 Loading，
// 并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例
// 所以注释以下方法

//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
// let needLoadingRequestCount = 0
// export function showFullScreenLoading() {
//     if (needLoadingRequestCount === 0) {
//         startLoading()
//     }
//     needLoadingRequestCount++
// }

// export function tryHideFullScreenLoading() {
//     if (needLoadingRequestCount <= 0) return
//     needLoadingRequestCount--
//     if (needLoadingRequestCount === 0) {
//         endLoading()
//     }
// }

const _axios = axios.create(config);
_axios.interceptors.request.use(
  function(config) {
    startLoading()
    // Do something before request is sent
    return config;
  },
  function(error) {
    endLoading()
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    endLoading()
    // Do something with response data
    return response;
  },
  function(error) {
    endLoading()
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  console.log(options)
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
