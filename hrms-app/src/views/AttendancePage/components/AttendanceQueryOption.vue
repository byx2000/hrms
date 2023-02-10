<template>
  <el-row type="flex" align="middle">
    <el-date-picker 
      class="input" 
      type="date" 
      format="yyyy-MM-dd" 
      value-format="yyyy-MM-dd" 
      placeholder="选择日期" 
      v-model="date"
      :picker-options="pickerOptions"/>
    <el-input class="input" placeholder="员工工号" v-model="empNo" clearable/>
    <el-input class="input" placeholder="员工姓名" v-model="empName" clearable/>
    <el-select class="input" v-model="type">
      <el-option label="全部" :value="0"/>
      <el-option label="迟到" :value="1"/>
      <el-option label="早退" :value="2"/>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= new Date('2021-04-11') || time.getTime() >= new Date("2021-05-12")
        }
      },
      date: '2021-05-12',
      empNo: '',
      empName: '',
      type: 0
    }
  },
  methods: {
    onSearchClick() {
      this.$emit('onSearchClick', {
        date: this.date,
        empNo: this.empNo,
        empName: this.empName,
        type: this.type
      })
    }
  }
}
</script>

<style scoped>
.input {
  width: 200px;
  margin-right: 20px;
}

.fa {
  margin-right: 5px;
}
</style>