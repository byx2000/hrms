/**
 * 与考勤相关的网络请求
 */

import request from './request'

// 获取考勤列表
export function getAttendanceList(query) {
  return request({
    url: '/attendance/list',
    method: 'post',
    data: query
  })
}

// 获取员工最近一周考勤时间
export function getLatestWeekAttendance(empId) {
  return request({
    url: '/attendance/latest-week',
    method: 'post',
    data: { empId }
  })
}