<!--
  部门管理页
-->
<template>
  <div v-loading.fullscreen.lock="loading">
    <department-query-option @onSearchClick="onSearchClick"/>
    <el-divider></el-divider>
      <el-row type="flex" justify="space-between" align="middle" class="page">
      <page-info :pageInfo="pageInfo"/>
      <el-row type="flex" align="middle">
        <page-switch 
          class="page-switch" 
          :pageInfo="pageInfo" 
          @onCurrentPageChange="onCurrentPageChange" 
          @onPageSizeChange="onPageSizeChange"
          @onDeleteClick="onDeleteClick"/>
        <el-button type="success" class="add-button" @click="onAddClick">
          <i class="fa fa-plus" aria-hidden="true"></i>
          <span>添加部门</span>
        </el-button>
      </el-row>
    </el-row>
    <department-list 
      :deptList="pageInfo.list"
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
    <department-detail-dialog 
      :dept="currentDept" 
      :isOpen="isDetailDialogOpen" 
      @onClose="isDetailDialogOpen = false"/>
    <department-edit-dialog 
      :dept="currentDept"
      :isOpen="isEditDialogOpen"
      @onClose="isEditDialogOpen = false"
      @onOk="onEditOk"/>
    <department-insert-dialog
      :isOpen="isInsertDialogOpen"
      @onClose="isInsertDialogOpen = false"
      @onOk="onAddOk"/>
  </div>
</template>

<script>
import {queryDepartment,getDepartmentDetail,updateDepartment, addDepartment,deleteDepartment} from '../../network/Department.js'
import {CODE_SUCCESS } from '../../common/const.js'
import DepartmentList from './components/DepartmentList'
import DepartmentDetailDialog from './components/DepartmentDetailDialog'
import DepartmentEditDialog from './components/DepartmentEditDialog'
import DepartmentQueryOption from './components/DepartmentQueryOption'
import DepartmentInsertDialog from './components/DepartmentInsertDialog'
import PageInfo from '../../components/PageInfo'
import PageSwitch from '../../components/PageSwitch'

export default {
  components: {DepartmentList, PageInfo, PageSwitch,DepartmentDetailDialog,DepartmentEditDialog,DepartmentInsertDialog,DepartmentQueryOption},
  data() {
    return {
      loading: false,
      options: {
        pageSize: 20,
        currentPage: 1
      },
      pageInfo: {},
      currentDept: {},
      isDetailDialogOpen: false,
      isEditDialogOpen: false,
      isInsertDialogOpen: false
    }
  },
  created() {
    this.refreshDepartmentData(this.options)
  },
  methods: {
    refreshDepartmentData(options) {
      this.loading = true
      queryDepartment(options).then(res => {
        this.pageInfo = res.data
        this.loading = false
      })
    },
    onSearchClick(options) {
      options.pageSize = this.options.pageSize
      this.options = options
      this.options.currentPage = 1
      this.refreshDepartmentData(options)
    },
    onCurrentPageChange(currentPage) {
      this.options.currentPage = currentPage
      this.refreshDepartmentData(this.options)
    },
    onPageSizeChange(pageSize) {
      this.options.pageSize = pageSize
      this.options.currentPage = 1
      this.refreshDepartmentData(this.options)
    },
    onDetailClick(deptNo) {
      getDepartmentDetail(deptNo).then(res => {
        this.currentDept = res.data
        this.isDetailDialogOpen = true
      })
    },
    onEditClick(deptNo) {
      getDepartmentDetail(deptNo).then(res => {
        this.currentDept = res.data
        this.isEditDialogOpen = true
      })
    },
    onDeleteClick(deptNo) {
      this.$confirm('是否删除部门 ' + deptNo + ' ？', '删除部门', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDepartment(deptNo).then(res => {
          if (res.code === CODE_SUCCESS) {
            this.$message.success('删除成功！')
            this.refreshDepartmentData(this.options)
          } else {
            this.$message.success('删除失败！')
          }
        })
      }).catch(() => {
      })
    },
    onEditOk(dept) {
      this.isEditDialogOpen = false
      updateDepartment(dept).then(res => {
        if (res.code === CODE_SUCCESS) {
          this.$message.success('更新成功！')
          this.refreshDepartmentData(this.options)
        } else {
          this.$message.error('更新失败！')
        }
      })
    },
    onAddClick() {
      this.isInsertDialogOpen = true
    },
    onAddOk(dept) {
      this.isInsertDialogOpen = false
      addDepartment(dept).then(res => {
        if (res.code === CODE_SUCCESS) {
          this.$message.success('添加成功！')
          this.refreshDepartmentData(this.options)
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
