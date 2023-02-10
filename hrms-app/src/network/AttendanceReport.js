/**
 * 与考勤报表相关的网络请求
 */

import request from './request'

// 获取最近一个月考勤报表
export function getLatestMonthAttendanceReport() {
  return request({
    url: '/report/attendance/latest-month',
    method: 'post'
  })
}