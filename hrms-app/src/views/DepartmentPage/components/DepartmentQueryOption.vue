<!--
  部门搜索条件选项
-->

<template>
  <el-row class="input" type="flex" justify="space-between">
    <el-input class="width-200" v-model="options.deptNo" placeholder="部门编号" clearable/>
    <el-input class="width-200" v-model="options.name" placeholder="部门名称" clearable/>
    <el-input class="width-200" v-model="options.managerEmpNo" placeholder="部门经理工号" clearable/>
    <el-input class="width-200" v-model="options.managerName" placeholder="部门经理名称" clearable/>
    <el-button type="primary" @click="onSearchClick">
      <i class="fa fa-search" aria-hidden="true"></i>
      <span>搜索</span>
    </el-button>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    options: {
      type: Object,
      default(){
        return {
          deptNo: '',
          name: '',
          managerEmpNo: '',
          managerName: '',
        }
      }
    }
  },
  methods: {
    onSearchClick() {
      this.$emit('onSearchClick', this.options)
    }
  }
}
</script>

<style scoped>
.fa {
  margin-right: 5px;
}

.width-200 {
  width: 200px;
}

.input {
  margin-bottom: 30px;
}
</style>