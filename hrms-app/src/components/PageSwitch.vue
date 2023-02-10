<!--
  页面切换控件
-->

<template>
  <el-pagination 
    background
    layout="sizes, prev, pager, next"
    :current-page="pageInfo.pageNum"
    :page-count="pageInfo.pages"
    :page-sizes="[20, 50, 80, 100]"
    :page-size="pageInfo.pageSize"
    @current-change="onCurrentPageChange"
    @size-change="onPageSizeChange">
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    onCurrentPageChange(currentPage) {
      this.$emit('onCurrentPageChange', currentPage)
      window.scrollTo(0, 0)
    },
    onPageSizeChange(pageSize) {
      this.$emit('onPageSizeChange', pageSize)
      window.scrollTo(0, 0)
    }
  }
}
</script>