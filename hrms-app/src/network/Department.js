/**
 * 与部门相关的网络请求
 */

import request from './request'

// 获取所有部门选项
export function getAllDepartmentSelection() {
  return request({
    url: '/department/selection',
    method: 'post'
  })
}

// 查询部门列表
export function queryDepartment(options) {
  return request({
    url: '/department/list',
    method: 'post',
    data: options
  })
}

// 获取部门详情
export function getDepartmentDetail(deptNo) {
  return request({
    url: '/department/detail',
    method: 'post',
    data: { deptNo }
  })
}

// 更新部门信息
export function updateDepartment(dept) {
  return request({
    url: '/department/update',
    method: 'post',
    data: dept
  })
}

// 删除部门
export function deleteDepartment(deptNo) {
  return request({
    url: '/department/delete',
    method: 'post',
    data: { deptNo }
  })
}

// 添加部门
export function addDepartment(dept) {
  return request({
    url: '/department/insert',
    method: 'post',
    data: dept
  })
}