/**
 * 与用户相关的网络请求
 */

import request from './request'

// 登录
export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: { username, password }
  })
}

// 获取当前用户
export function getCuurentUser() {
  return request({
    url: '/user/current',
    method: 'post'
  })
}

// 注销
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}