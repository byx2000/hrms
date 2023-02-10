<!--
  管理系统主页
-->

<template>
  <div class="holder">
    <div class="title-bar-holder">
      <title-bar class="title-bar"/>
    </div>
    <nav-bar class="nav-bar"/>
    <div class="page-content-holder">
      <router-view class="page-content"/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import TitleBar from './components/TitleBar'

export default {
  components: { NavBar, TitleBar }
}
</script>

<style>
.title-bar-holder{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
}

.nav-bar {
  /*width: 180px;*/
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 69px;
  left: 0;
}

.nav-bar .el-menu-item {
  padding-left: 40px !important;
}

.nav-bar .el-submenu__title {
  padding-left: 40px !important;
}

.page-content-holder {
  margin-left: 220px;
  margin-top: 100px;
  margin-right: 40px;
}
</style>