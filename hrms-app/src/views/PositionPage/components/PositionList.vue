<!--
  员工列表
-->

<template>
  <div>
    <el-table :data="posList" border style="width: 100%">
      <el-table-column prop="posNo" label="职位编号" width="150"/>
      <el-table-column prop="name" label="职位名称" width="150"/>
      <el-table-column prop="deptName" label="部门" width="180"/>
      <el-table-column prop="deptNo" label="部门编号" width="180"/>
      <el-table-column prop="numEmployees" label="员工人数" width="180" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="onDetailClick(scope.row.posNo)">详情</el-button>
          <el-button size="mini" type="warning" @click="onEditClick(scope.row.posNo)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDeleteClick(scope.row.posNo)">删除</el-button>
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
    posList: {
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
    onDetailClick(posNo) {
      this.$emit('onDetailClick', posNo)
    },
    onEditClick(posNo) {
      this.$emit('onEditClick', posNo)
    },
    onDeleteClick(posNo) {
      this.$emit('onDeleteClick', posNo)
    }
  }
}
</script>