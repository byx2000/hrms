<!--
  标题栏
-->

<template>
  <div class="title">
    <el-row type="flex" align="middle" justify="space-between">
      <el-row type="flex" align="middle">
        <img src="../../public/image/logo.png" width="40" height="40"/>
        <h2>欢迎使用HRMS人事管理系统</h2>
      </el-row>
      <user-info/>
    </el-row>
  </div>
</template>

<script>
import UserInfo from './UserInfo'

export default {
  components: { UserInfo }
}
</script>

<style scoped>
.title {
  padding-left: 40px;
  padding-right: 40px;
  height: 68px;
  background: white;
  border-bottom: 1px solid #e6e6e6;
}

.title el-row {
  height: 68px;
}

.title h2 {
  height: 68px;
  margin: 0;
  margin-left: 20px;
  line-height: 68px;
}
</style>