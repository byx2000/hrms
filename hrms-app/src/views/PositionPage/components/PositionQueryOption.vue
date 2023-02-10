<!--
  员工搜索条件选项
-->

<template>
  <el-row class="input" type="flex" justify="space-between">
    <el-input class="width-200" v-model="options.posNo" placeholder="职位编号" clearable/>
    <el-input class="width-200" v-model="options.name" placeholder="职位名称" clearable/>
    <el-input class="width-200" v-model="options.deptName" placeholder="所属部门" clearable/>
    <el-input class="width-200" v-model="options.deptNo" placeholder="所属部门编号" clearable/>
    <el-button type="primary" @click="onSearchClick">
      <i class="fa fa-search" aria-hidden="true"></i>
      <span>查询</span>
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
          posNo: '',
          name: '',
          deptName: '',
          deptNo: '',
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