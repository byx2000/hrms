<!--
  用户信息
-->

<template>
  <el-row type="flex" align="middle">
    <el-avatar :size="40" :src="defaultAvatarUrl"></el-avatar>
    <p class="username">{{username}}</p>
    <el-button type="danger" size="small" @click="logout">
      <i class="fa fa-sign-out" aria-hidden="true"></i>
      注销
    </el-button>
  </el-row>
</template>

<script>
import { CODE_SUCCESS } from '../common/const.js'
import { getCuurentUser, logout } from '../network/User.js'

export default {
  data() {
    return {
      defaultAvatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      username: ''
    }
  },
  created() {
    getCuurentUser().then(res => {
      if (res.code !== CODE_SUCCESS) {
        this.$router.push('/login')
      } else {
        this.username = res.data.username
      }
    })
  },
  methods: {
    logout() {
      logout().then(res => {
        this.$router.push('/login')
        this.$message.success('注销成功，请重新登录')
      })
    }
  }
}
</script>

<style scoped>
.username {
  margin: 0;
  margin-left: 20px;
  margin-right: 20px;
  font-weight: bold;
}
</style>