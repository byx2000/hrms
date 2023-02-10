<!--
  登录页
-->

<template>
  <div class="container">
    <el-form class="login-form">
      <h1 class="title">欢迎使用HRMS</h1>
      <el-form-item>
        <el-input placeholder="请输入用户名" v-model="username"/>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="请输入密码" show-password v-model="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" @click="onLoginClick">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { CODE_SUCCESS } from '../../common/const.js'
import { login } from '../../network/User.js'

export default {
  data() {
    return {
      username: 'admin',
      password: '123456'
    }
  },
  methods: {
    onLoginClick() {
      login(this.username, this.password).then(res => {
        if (res.code !== CODE_SUCCESS) {
          this.$message.error('用户名或密码错误')
        } else {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style scoped>
body {
  margin: 0 !important;
}

.container {
  width: 100%;
  height: 100vh;
  background-image:url(../../../public/login-background.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.title {
  text-align: center;
}

.login-form {
  width: 300px;
  height: fit-content;
  margin: auto;
  position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.login-button {
  width: 100%;
  margin-bottom: 50px;
}
</style>