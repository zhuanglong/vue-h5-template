import request from '@/utils/request';

// 登陆
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  });
}

// 用户信息
export function getUserInfo(data) {
  return request({
    url: '/user/userinfo',
    method: 'post',
    data
    // hideLoading: true
  });
}
