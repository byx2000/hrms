<!--
  考勤管理
-->

<template>
  <div v-loading.fullscreen.lock="loading">
    <attendance-query-option @onSearchClick="onSearchClick"/>
    <el-divider></el-divider>
    <el-row type="flex" justify="space-between" align="middle" class="page">
      <page-info :pageInfo="pageInfo"/>
      <page-switch 
        class="page-switch" 
        :pageInfo="pageInfo" 
        @onCurrentPageChange="onCurrentPageChange" 
        @onPageSizeChange="onPageSizeChange"/>
    </el-row>
    <attendance-list 
      :list="pageInfo.list"
      @onDetailClick="onDetailClick"/>
    <el-row type="flex" justify="center">
      <page-switch 
        class="page-switch-bottom" 
        :pageInfo="pageInfo" 
        @onCurrentPageChange="onCurrentPageChange" 
        @onPageSizeChange="onPageSizeChange"/>
    </el-row>
    <attendance-detail-dialog 
      :isOpen="isAttendanceDetailOpen"
      :item="currentItem"
      @onClose="isAttendanceDetailOpen = false"/>
  </div>
</template>

<script>
import { getAttendanceList, getLatestWeekAttendance } from '../../network/Attendance.js'
import AttendanceQueryOption from './components/AttendanceQueryOption'
import AttendanceList from './components/AttendanceList'
import PageInfo from '../../components/PageInfo'
import PageSwitch from '../../components/PageSwitch'
import AttendanceDetailDialog from './components/AttendanceDetailDialog'

export default {
  components: { AttendanceQueryOption, AttendanceList, PageInfo, PageSwitch, AttendanceDetailDialog },
  data() {
    return {
      loading: false,
      query: {
        date: '2021-05-12',
        empNo: '',
        empName: '',
        type: 0,
        pageSize: 20,
        currentPage: 1
      },
      pageInfo: {},
      isAttendanceDetailOpen: false,
      currentItem: {}
    }
  },
  created() {
    this.refreshAttendanceData(this.query)
  },
  methods: {
    refreshAttendanceData(query) {
      this.loading = true
      getAttendanceList(query).then(res => {
        this.pageInfo = res.data
        this.loading = false
      })
    },
    onSearchClick(query) {
      query.pageSize = this.query.pageSize
      query.currentPage = 1
      this.query = query
      this.refreshAttendanceData(this.query)
    },
    onCurrentPageChange(currentPage) {
      this.query.currentPage = currentPage
      this.refreshAttendanceData(this.query)
    },
    onPageSizeChange(pageSize) {
      this.query.pageSize = pageSize
      this.query.currentPage = 1
      this.refreshAttendanceData(this.query)
    },
    onDetailClick(item) {
      this.currentItem = item
      getLatestWeekAttendance(item.empId).then(res => {
        item.data = res.data
        this.isAttendanceDetailOpen = true
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