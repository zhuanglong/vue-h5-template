import axios from 'axios';
import store from '@/store';
import { Toast } from 'vant';
import { baseApi } from '@/config';

const service = axios.create({
  baseURL: baseApi,
  withCredentials: true,
  timeout: 3000
});

// request 拦截器
service.interceptors.request.use(
  config => {
    // 默认开启 loading
    if (!config.hideLoading) {
      Toast.loading({
        duration: 0,
        forbidClick: true
      });
    }
    // 请求头设置 token
    if (store.getters.token) {
      config.headers['X-Token'] = '';
    }
    return config;
  },
  error => {
    console.log('=== request err === ' + error);
    return Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    Toast.clear();
    const res = response.data;
    if (res.status && res.status !== 200) {
      // 登陆超时，重新登陆
      if (res.status === 401) {
        store.dispatch('Logout').then(() => {
          location.reload();
        });
      }
      return Promise.reject(res);
    } else {
      return Promise.resolve(res);
    }
  },
  error => {
    Toast.clear();
    console.log('=== response err === ' + error);
    return Promise.reject(error);
  }
);

export default service;
