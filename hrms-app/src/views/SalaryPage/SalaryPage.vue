<!--
  薪资管理页
-->

<template>
  <div v-loading.fullscreen.lock="loading">
    <salary-query-option @onSearchClick="onSearchClick"/>
    <el-divider></el-divider>
    <el-row type="flex" justify="space-between" align="middle" class="page">
      <page-info :pageInfo="pageInfo"/>
      <page-switch 
        class="page-switch" 
        :pageInfo="pageInfo" 
        @onCurrentPageChange="onCurrentPageChange" 
        @onPageSizeChange="onPageSizeChange"/>
    </el-row>
    <salary-list 
      :salaries="pageInfo.list"
      @onDetailClick="onDetailClick"
      @onAdjustClick="onAdjustClick"/>
    <el-row type="flex" justify="center">
      <page-switch 
        class="page-switch-bottom" 
        :pageInfo="pageInfo" 
        @onCurrentPageChange="onCurrentPageChange" 
        @onPageSizeChange="onPageSizeChange"/>
    </el-row>
    <salary-detail-dialog 
      :isOpen="isSalaryDetailDialogOpen" 
      :item="currentItem" 
      :salaries="currentEmployeeSalaryList"
      @onClose="isSalaryDetailDialogOpen = false"/>
    <salary-adjust-dialog
      :isOpen="isSalaryAdjustDialogOpen"
      :item="currentItem"
      @onClose="isSalaryAdjustDialogOpen = false"
      @onOk="onAdjustSalaryOk"/>
  </div>
</template>

<script>
import { getSalaryList, getEmployeeSalaryList, adjustSalary } from '../../network/Salary.js'
import SalaryQueryOption from './components/SalaryQueryOption'
import PageInfo from '../../components/PageInfo'
import PageSwitch from '../../components/PageSwitch'
import SalaryList from './components/SalaryList'
import SalaryDetailDialog from './components/SalaryDetailDialog'
import SalaryAdjustDialog from './components/SalaryAdjustDialog'
import { CODE_SUCCESS } from '../../common/const.js'

export default {
  components: { SalaryQueryOption, PageInfo, PageSwitch, SalaryList, SalaryDetailDialog, SalaryAdjustDialog },
  data() {
    let now = new Date()
    let year = now.getFullYear().toString()
    let month = (now.getMonth() + 1).toString().padStart(2, '0')
    let date = now.getDate().toString().padStart(2, '0')

    return {
      loading: false,
      query: {
        time: year + "-" + month + "-" + date,
        empNo: '',
        empName: '',
        pageSize: 20,
        currentPage: 1,
        orderBy: 'empNo',
        isDesc: false
      },
      pageInfo: {},
      isSalaryDetailDialogOpen: false,
      isSalaryAdjustDialogOpen: false,
      currentItem: {},
      currentEmployeeSalaryList: []
    }
  },
  created() {
    this.refreshSalaryData(this.query)
  },
  methods: {
    refreshSalaryData(query) {
      this.loading = true
      getSalaryList(query).then(res => {
        this.pageInfo = res.data
        this.loading = false
      })
    },
    onSearchClick(query) {
      query.pageSize = this.query.pageSize
      query.currentPage = this.query.currentPage
      this.query = query
      this.refreshSalaryData(this.query)
    },
    onCurrentPageChange(currentPage) {
      this.query.currentPage = currentPage
      this.refreshSalaryData(this.query)
    },
    onPageSizeChange(pageSize) {
      this.query.pageSize = pageSize
      this.query.currentPage = 1
      this.refreshSalaryData(this.query)
    },
    onDetailClick(item) {
      getEmployeeSalaryList(item.empId).then(res => {
        this.currentEmployeeSalaryList = res.data
        this.currentItem = item
        this.isSalaryDetailDialogOpen = true
      })
    },
    onAdjustClick(item) {
      this.currentItem = item
      this.isSalaryAdjustDialogOpen = true
    },
    onAdjustSalaryOk(salary) {
      adjustSalary({
        empId: this.currentItem.empId,
        salary: salary
      }).then(res => {
        if (res.code === CODE_SUCCESS) {
          this.$message.success('薪资调整成功！')
        } else {
          this.$message.error('薪资调整失败！')
        }
        this.isSalaryAdjustDialogOpen = false
        this.refreshSalaryData(this.query)
      })
    }
  }
}
</script>

<style scoped>
.page {
  margin-bottom: 20px;
}

.page-switch-bottom {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>