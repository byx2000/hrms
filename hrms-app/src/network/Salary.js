/**
 * 与薪资相关的网络请求
 */

import request from './request'

// 获取薪资列表
export function getSalaryList(query) {
  return request({
    url: '/salary/list',
    method: 'post',
    data: query
  })
}

// 获取员工薪资列表
export function getEmployeeSalaryList(empId) {
  return request({
    url: '/salary/query',
    method: 'post',
    data: { empId }
  })
}

// 调整薪资
export function adjustSalary(data) {
  return request({
    url: '/salary/insert',
    method: 'post',
    data: data
  })
}