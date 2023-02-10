import Vue from 'vue'
import VueRouter from 'vue-router'

const EmployeePage = () => import('../views/EmployeePage/EmployeePage.vue')
const DepartmentPage = () => import('../views/DepartmentPage/DepartmentPage.vue')
const PositionPage = () => import('../views/PositionPage/PositionPage.vue')
const SalaryPage = () => import('../views/SalaryPage/SalaryPage.vue')
const AttendancePage = () => import('../views/AttendancePage/AttendancePage.vue')
const LoginPage = () => import('../views/LoginPage/LoginPage.vue')
const Hrms = () => import('../HrmsHome.vue')
const EmployeeReportPage = () => import('../views/EmployeeReportPage/EmployeeReportPage.vue')
const DepartmentReportPage = () => import('../views/DepartmentReportPage/DepartmentReportPage.vue')
const PositionReportPage = () => import('../views/PositionReportPage/PositionReportPage.vue')
const SalaryReportPage = () => import('../views/SalaryReportPage/SalaryReportPage.vue')
const AttendanceReportPage = () => import('../views/AttendanceReportPage/AttendanceReportPage.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/hrms'
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/hrms',
    component: Hrms,
    children: [
      {
        path: '/',
        redirect: 'employee'
      },
      {
        path: 'employee',
        component: EmployeePage
      },
      {
        path: 'department',
        component: DepartmentPage
      },
      {
        path: 'position',
        component: PositionPage
      },
      {
        path: 'salary',
        component: SalaryPage
      },
      {
        path: 'attendance',
        component: AttendancePage
      },
      {
        path: 'report/employee',
        component: EmployeeReportPage
      },
      {
        path: 'report/department',
        component: DepartmentReportPage
      },
      {
        path: 'report/position',
        component: PositionReportPage
      },
      {
        path: 'report/salary',
        component: SalaryReportPage
      },
      {
        path: 'report/attendance',
        component: AttendanceReportPage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 解决重复点击路由的报错问题
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
