<template>
  <el-table :data="salaries" border style="width: 100%">
    <el-table-column prop="empNo" label="员工工号" width="180"/>
    <el-table-column prop="empName" label="员工姓名" width="180"/>
    <el-table-column prop="deptName" label="部门" width="180"/>
    <el-table-column label="薪资" width="180">
      <template slot-scope="scope">
        ￥{{scope.row.salary}}
      </template>
    </el-table-column>
    <el-table-column prop="time" label="时间" width="180"/>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="onDetailClick(scope.row)">详情</el-button>
        <el-button size="mini" type="warning" @click="onAdjustClick(scope.row)">调整薪资</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    salaries: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    onDetailClick(item) {
      this.$emit('onDetailClick', item)
    },
    onAdjustClick(item) {
      this.$emit('onAdjustClick', item)
    }
  }
}
</script>