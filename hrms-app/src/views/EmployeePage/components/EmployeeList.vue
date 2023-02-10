<!--
  员工列表
-->

<template>
  <div>
    <el-table :data="empList" border style="width: 100%">
      <el-table-column prop="empNo" label="工号" width="150"/>
      <el-table-column prop="name" label="姓名" width="150"/>
      <el-table-column prop="contact" label="联系方式" width="180"/>
      <el-table-column prop="deptName" label="部门" width="180"/>
      <el-table-column prop="posName" label="职位" width="180"/>
      <el-table-column label="类型" width="150">
        <template slot-scope="scope">
          {{typeDesc(scope.row.type)}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="onDetailClick(scope.row.empNo)">详情</el-button>
          <el-button size="mini" type="warning" @click="onEditClick(scope.row.empNo)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDeleteClick(scope.row.empNo)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getEmployeeTypeDescription } from '../../../common/common.js'

export default {
  data() {
    return {
      currentEmp: {}
    }
  },
  props: {
    empList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    typeDesc(type) {
      return getEmployeeTypeDescription(type)
    },
    onDetailClick(empNo) {
      this.$emit('onDetailClick', empNo)
    },
    onEditClick(empNo) {
      this.$emit('onEditClick', empNo)
    },
    onDeleteClick(empNo) {
      this.$emit('onDeleteClick', empNo)
    }
  }
}
</script>