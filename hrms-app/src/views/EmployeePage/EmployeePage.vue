<!--
  员工管理页
-->

<template>
  <div v-loading.fullscreen.lock="loading">
    <employee-query-option @onSearchClick="onSearchClick"/>
    <el-divider></el-divider>
    <el-row type="flex" justify="space-between" align="middle" class="page">
      <page-info :pageInfo="pageInfo"/>
      <el-row type="flex" align="middle">
        <page-switch 
          class="page-switch" 
          :pageInfo="pageInfo" 
          @onCurrentPageChange="onCurrentPageChange" 
          @onPageSizeChange="onPageSizeChange"/>
        <el-button type="success" class="add-button" @click="onAddClick">
          <i class="fa fa-plus" aria-hidden="true"></i>
          <span>添加员工</span>
        </el-button>
      </el-row>
    </el-row>
    <employee-list 
      :empList="pageInfo.list" 
      @onDetailClick="onDetailClick"
      @onEditClick="onEditClick"
      @onDeleteClick="onDeleteClick"/>
    <el-row type="flex" justify="center">
      <page-switch 
        class="page-switch-bottom" 
        :pageInfo="pageInfo" 
        @onCurrentPageChange="onCurrentPageChange" 
        @onPageSizeChange="onPageSizeChange"/>
    </el-row>
    <employee-detail-dialog 
      :emp="currentEmp" 
      :isOpen="isDetailDialogOpen" 
      @onClose="isDetailDialogOpen = false"/>
    <employee-edit-dialog 
      :emp="currentEmp"
      :isOpen="isEditDialogOpen"
      @onClose="isEditDialogOpen = false"
      @onOk="onEditOk"/>
    <employee-insert-dialog
      :isOpen="isInsertDialogOpen"
      @onClose="isInsertDialogOpen = false"
      @onOk="onAddOk"/>
  </div>
</template>

<script>
import { queryEmployee, getEmployeeDetail, updateEmployee, deleteEmployee, addEmployee } from '../../network/Employee.js'
import { CODE_EMPNO_EXIST, CODE_SUCCESS } from '../../common/const.js'
import EmployeeQueryOption from './components/EmployeeQueryOption'
import EmployeeList from './components/EmployeeList'
import PageInfo from '../../components/PageInfo'
import PageSwitch from '../../components/PageSwitch'
import EmployeeDetailDialog from './components/EmployeeDetailDialog'
import EmployeeEditDialog from './components/EmployeeEditDialog'
import EmployeeInsertDialog from './components/EmployeeInsertDialog'

export default {
  components: { EmployeeQueryOption, EmployeeList, PageInfo, PageSwitch, EmployeeDetailDialog, EmployeeEditDialog, EmployeeInsertDialog },
  data() {
    return {
      loading: false,
      options: {
        pageSize: 20,
        currentPage: 1
      },
      pageInfo: {},
      currentEmp: {},
      isDetailDialogOpen: false,
      isEditDialogOpen: false,
      isInsertDialogOpen: false
    }
  },
  created() {
    this.refreshEmployeeData(this.options)
  },
  methods: {
    refreshEmployeeData(options) {
      this.loading = true
      queryEmployee(options).then(res => {
        this.pageInfo = res.data
        this.loading = false
      })
    },
    onSearchClick(options) {
      options.pageSize = this.options.pageSize
      this.options = options
      this.options.currentPage = 1
      this.refreshEmployeeData(options)
    },
    onCurrentPageChange(currentPage) {
      this.options.currentPage = currentPage
      this.refreshEmployeeData(this.options)
    },
    onPageSizeChange(pageSize) {
      this.options.pageSize = pageSize
      this.options.currentPage = 1
      this.refreshEmployeeData(this.options)
    },
    onDetailClick(empNo) {
      getEmployeeDetail(empNo).then(res => {
        this.currentEmp = res.data
        this.isDetailDialogOpen = true
      })
    },
    onEditClick(empNo) {
      getEmployeeDetail(empNo).then(res => {
        this.currentEmp = res.data
        this.isEditDialogOpen = true
      })
    },
    onDeleteClick(empNo) {
      this.$confirm('是否删除员工 ' + empNo + ' ？', '删除员工', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEmployee(empNo).then(res => {
          if (res.code === CODE_SUCCESS) {
            this.$message.success('删除成功！')
            this.refreshEmployeeData(this.options)
          } else {
            this.$message.success('删除失败！')
          }
        })
      }).catch(() => {
        
      })
    },
    onEditOk(emp) {
      this.isEditDialogOpen = false
      updateEmployee(emp).then(res => {
        if (res.code === CODE_SUCCESS) {
          this.$message.success('更新成功！')
          this.refreshEmployeeData(this.options)
        } else {
          this.$message.error('更新失败！')
        }
      })
    },
    onAddClick() {
      this.isInsertDialogOpen = true
    },
    onAddOk(emp) {
      this.isInsertDialogOpen = false
      addEmployee(emp).then(res => {
        if (res.code === CODE_SUCCESS) {
          this.$message.success('添加成功！')
          this.refreshEmployeeData(this.options)
        } else if (res.code === CODE_EMPNO_EXIST) {
          this.$message.error('工号已存在：' + res.data)
        } else {
          this.$message.error('添加失败！')
        }
      })
    }
  }
}
</script>

<style scoped>
.page {
  margin-bottom: 20px;
}

.page-switch {
  margin-left: 20px;
}

.page-switch-bottom {
  margin-top: 20px;
  margin-bottom: 20px;
}

.add-button {
  margin-left: 20px;
}

.fa {
  margin-right: 5px;
}
</style>