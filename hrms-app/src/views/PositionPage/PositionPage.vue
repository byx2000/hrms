<!--
  员工管理页
-->

<template>
  <div v-loading.fullscreen.lock="loading">
    <Position-query-option @onSearchClick="onSearchClick"/>
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
          <span>添加职位</span>
        </el-button>
      </el-row>
    </el-row>
    <Position-list 
      :posList="pageInfo.list" 
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
    <Position-detail-dialog 
      :pos="currentPos" 
      :isOpen="isDetailDialogOpen" 
      @onClose="isDetailDialogOpen = false"/>
    <Position-edit-dialog 
      :pos="currentPos"
      :isOpen="isEditDialogOpen"
      @onClose="isEditDialogOpen = false"
      @onOk="onEditOk"/>
    <Position-insert-dialog
      :isOpen="isInsertDialogOpen"
      @onClose="isInsertDialogOpen = false"
      @onOk="onAddOk"/>
  </div>
</template>

<script>
import { queryPosition, getPositionDetail, updatePosition, deletePosition, addPosition } from '../../network/Position.js'
import { CODE_EMPNO_EXIST, CODE_SUCCESS } from '../../common/const.js'
import PositionQueryOption from './components/PositionQueryOption'
import PositionList from './components/PositionList'
import PageInfo from '../../components/PageInfo'
import PageSwitch from '../../components/PageSwitch'
import PositionDetailDialog from './components/PositionDetailDialog'
import PositionEditDialog from './components/PositionEditDialog'
import PositionInsertDialog from './components/PositionInsertDialog'

export default {
  components: { PositionQueryOption, PositionList, PageInfo, PageSwitch, PositionDetailDialog, PositionEditDialog, PositionInsertDialog },
  data() {
    return {
      loading: false,
      options: {
        pageSize: 20,
        currentPage: 1
      },
      pageInfo: {},
      currentPos: {},
      isDetailDialogOpen: false,
      isEditDialogOpen: false,
      isInsertDialogOpen: false
    }
  },
  created() {
    this.refreshPositionData(this.options)
  },
  methods: {
    refreshPositionData(options) {
      this.loading = true
      queryPosition(options).then(res => {
        this.pageInfo = res.data
        this.loading = false
      })
    },
    onSearchClick(options) {
      options.pageSize = this.options.pageSize
      this.options = options
      this.options.currentPage = 1
      this.refreshPositionData(options)
    },
    onCurrentPageChange(currentPage) {
      this.options.currentPage = currentPage
      this.refreshPositionData(this.options)
    },
    onPageSizeChange(pageSize) {
      this.options.pageSize = pageSize
      this.options.currentPage = 1
      this.refreshPositionData(this.options)
    },
    onDetailClick(posNo) {
      getPositionDetail(posNo).then(res => {
        console.log(res.data);
        this.currentPos = res.data
        this.isDetailDialogOpen = true
      })
    },
    onEditClick(posNo) {
      getPositionDetail(posNo).then(res => {
        this.currentPos = res.data
        this.isEditDialogOpen = true
      })
    },
    onDeleteClick(posNo) {
      this.$confirm('是否删除职位 ' + posNo + ' ？', '删除职位', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePosition(posNo).then(res => {
          if (res.code === CODE_SUCCESS) {
            this.$message.success('删除成功！')
            this.refreshPositionData(this.options)
          } else {
            this.$message.success('删除失败！')
          }
        })
      }).catch(() => {
        
      })
    },
    onEditOk(pos) {
      this.isEditDialogOpen = false
      updatePosition(pos).then(res => {
        if (res.code === CODE_SUCCESS) {
          this.$message.success('更新成功！')
          this.refreshPositionData(this.options)
        } else {
          this.$message.error('更新失败！')
        }
      })
    },
    onAddClick() {
      this.isInsertDialogOpen = true
    },
    onAddOk(pos) {
      this.isInsertDialogOpen = false
      addPosition(pos).then(res => {
        if (res.code === CODE_SUCCESS) {
          this.$message.success('添加成功！')
          this.refreshPositionData(this.options)
        } else if (res.code === CODE_EMPNO_EXIST) {
          this.$message.error('职位编号已存在：' + res.data)
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