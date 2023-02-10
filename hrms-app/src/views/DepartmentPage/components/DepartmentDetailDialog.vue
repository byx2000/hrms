<!--
  部门详情对话框
-->

<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="30%" :before-close="beforeClose">
    <div>
      <el-table style="width: 100%" :show-header="false" :data="data">
        <el-table-column width="100">
          <template slot-scope="scope">
            <div class="item">{{scope.row.item}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="value"/>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onOkClick" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    dept: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    title() {
      return this.dept.deptNo + ' 的详情'
    },
    data() {
      return [
        { item: '部门名称', value: this.dept.name },
        { item: '描述', value: this.dept.desc },
        { item: '部门经理信息', value: this.dept.managerName },
      ]
    }
  },
  methods: {
    onOkClick() {
      this.$emit('onClose')
    },
    beforeClose() {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>
.item {
  font-weight: bold;
}
</style>