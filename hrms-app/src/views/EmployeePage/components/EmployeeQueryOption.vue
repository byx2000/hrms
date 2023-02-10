<!--
  员工搜索条件选项
-->

<template>
  <el-row class="input" type="flex" justify="space-between">
    <el-input class="width-200" v-model="options.empNo" placeholder="工号" clearable/>
    <el-input class="width-200" v-model="options.name" placeholder="姓名" clearable/>
    <el-input class="width-200" v-model="options.deptName" placeholder="部门" clearable/>
    <el-input class="width-200" v-model="options.posName" placeholder="职位" clearable/>
    <el-select class="width-200" v-model="options.type">
      <el-option label="全部" :value="-1"/>
      <el-option label="实习生" :value="0"/>
      <el-option label="正式员工" :value="1"/>
    </el-select>
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
      empTypeOptions: [
        { text: '全部', value: -1 },
        { text: '实习生', value: 0 },
        { text: '正式员工', value: 1 }
      ]
    }
  },
  props: {
    options: {
      type: Object,
      default(){
        return {
          empNo: '',
          name: '',
          deptName: '',
          posName: '',
          type: -1,
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