/**
 * 与员工相关的网络请求
 */

import request from './request'

// 查询员工列表
export function queryEmployee(options) {
  return request({
    url: '/employee/list',
    method: 'post',
    data: options
  })
}

// 获取员工详情
export function getEmployeeDetail(empNo) {
  return request({
    url: '/employee/detail',
    method: 'post',
    data: { empNo }
  })
}

// 更新员工信息
export function updateEmployee(emp) {
  return request({
    url: '/employee/update',
    method: 'post',
    data: emp
  })
}

// 删除员工
export function deleteEmployee(empNo) {
  return request({
    url: '/employee/delete',
    method: 'post',
    data: { empNo }
  })
}

// 添加员工
export function addEmployee(emp) {
  return request({
    url: '/employee/insert',
    method: 'post',
    data: emp
  })
}