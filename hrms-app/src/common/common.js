/**
 * 公共方法
 */

// 获取员工性别描述 
export function getEmployeeGenderDescription(gender) {
  return gender == 0 ? '男' : '女'
}

// 获取员工类型描述
export function getEmployeeTypeDescription(type) {
  return type == 0 ? '实习生' : '正式员工'
}