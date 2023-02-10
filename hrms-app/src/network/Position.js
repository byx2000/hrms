/**
 * 与职位相关的网络请求
 */

import request from './request'

// 根据部门获取所有职位选项
export function getAllPositionSelection(deptId) {
  return request({
    url: '/position/selection',
    method: 'post',
    data: { deptId }
  })
}

// 查询职位列表
export function queryPosition(options) {
  return request({
    url: '/position/list',
    method: 'post',
    data: options
  })
}

// 获取职位详情
export function getPositionDetail(posNo) {
  return request({
    url: '/position/detail',
    method: 'post',
    data: { posNo }
  })
}

// 更新职位信息
export function updatePosition(pos) {
  return request({
    url: '/position/update',
    method: 'post',
    data: pos
  })
}

// 删除职位
export function deletePosition(posNo) {
  return request({
    url: '/position/delete',
    method: 'post',
    data: { posNo }
  })
}

// 添加职位
export function addPosition(pos) {
  return request({
    url: '/position/insert',
    method: 'post',
    data: pos
  })
}