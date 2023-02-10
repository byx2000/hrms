<template>
  <el-row type="flex" align="middle">
    <el-date-picker 
      class="input" 
      type="date" 
      format="yyyy-MM-dd" 
      value-format="yyyy-MM-dd" 
      placeholder="选择日期" 
      v-model="time"
      :picker-options="pickerOptions"/>
    <el-input class="input" placeholder="员工工号" v-model="empNo" clearable/>
    <el-input class="input" placeholder="员工姓名" v-model="empName" clearable/>
    <el-select class="input" v-model="orderBy">
      <el-option label="按员工编号排序" :value="'empNo'"/>
      <el-option label="按薪资排序" :value="'salary'"/>
    </el-select>
    <el-switch class="margin-right-20"
      v-model="isDesc"
      active-text="降序"
      inactive-text="升序">
    </el-switch>
    <el-button type="primary" @click="onSearchClick">
      <i class="fa fa-search" aria-hidden="true"></i>
      <span>查询</span>
    </el-button>
  </el-row>
</template>

<script>
export default {
  data() {
    let now = new Date()
    let year = now.getFullYear().toString()
    let month = (now.getMonth() + 1).toString().padStart(2, '0')
    let date = now.getDate().toString().padStart(2, '0')

    return {
      time: year + "-" + month + "-" + date,
      empNo: '',
      empName: '',
      orderBy: 'empNo',
      isDesc: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  methods: {
    onSearchClick() {
      this.$emit('onSearchClick', {
        time: this.time,
        empNo: this.empNo,
        empName: this.empName,
        orderBy: this.orderBy,
        isDesc: this.isDesc
      })
    }
  }
}
</script>

<style scoped>
.margin-right-20 {
  margin-right: 20px;
}

.input {
  width: 200px;
  margin-right: 20px;
}

.fa {
  margin-right: 5px;
}
</style>