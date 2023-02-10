<!--
  侧边栏导航
-->

<template>
  <el-menu :default-active="$route.path" router>
    <el-menu-item index="/hrms/employee">
      <i class="fa fa-address-card" aria-hidden="true"></i>
      <span slot="title">员工管理</span>
    </el-menu-item>
    <el-menu-item index="/hrms/department">
      <i class="fa fa-users" aria-hidden="true"></i>
      <span slot="title">部门管理</span>
    </el-menu-item>
    <el-menu-item index="/hrms/position">
      <i class="fa fa-desktop" aria-hidden="true"></i>
      <span slot="title">职位管理</span>
    </el-menu-item>
    <el-menu-item index="/hrms/salary">
      <i class="fa fa-credit-card" aria-hidden="true"></i>
      <span slot="title">薪资管理</span>
    </el-menu-item>
    <el-menu-item index="/hrms/attendance">
      <i class="fa fa-calendar" aria-hidden="true"></i>
      <span slot="title">考勤管理</span>
    </el-menu-item>
    <el-submenu index>
      <template slot="title">
        <i class="fa fa-line-chart" aria-hidden="true"></i>
        <span slot="title">报表中心</span>
      </template>
      <el-menu-item index="/hrms/report/employee"><span class="subitem">员工报表</span></el-menu-item>
      <el-menu-item index="/hrms/report/department"><span class="subitem">部门报表</span></el-menu-item>
      <el-menu-item index="/hrms/report/position"><span class="subitem">职位报表</span></el-menu-item>
      <el-menu-item index="/hrms/report/salary"><span class="subitem">薪资报表</span></el-menu-item>
      <el-menu-item index="/hrms/report/attendance"><span class="subitem">考勤报表</span></el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<style scoped>
.fa {
  margin-right: 10px;
}

.subitem {
  padding-left: 23px;
}
</style>