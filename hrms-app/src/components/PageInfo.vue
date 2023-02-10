<!--
  显示分页信息
-->

<template>
  <el-row type="flex" align="middle">
    <h3>共 {{pageInfo.total}} 条记录</h3>
    <h3 class="margin-left-20">共 {{pageInfo.pages}} 页</h3>
    <h3 class="margin-left-20">当前第 {{pageInfo.pageNum}} 页</h3>
  </el-row>
</template>

<script>
export default {
  props: {
    pageInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 0;
}

.margin-left-20 {
  margin-left: 20px;
}
</style>