/**
 * 与职位报表相关的网络请求
 */

import request from './request'

// 获取职位员工人数报表
export function getPositionEmployeeCountReport(deptId) {
  return request({
    url: '/report/position/employee-count',
    method: 'post',
    data: { deptId }
  })
}