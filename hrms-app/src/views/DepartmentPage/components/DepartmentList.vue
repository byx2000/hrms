<!--
  部门列表
-->
<template>
  <div>
    <el-table :data="deptList" border style="width: 100%">
      <el-table-column prop="deptNo" label="部门编号" width="150"/>
      <el-table-column prop="name" label="部门名称" width="150"/>
      <el-table-column prop="managerName" label="部门经理" width="150">
        <template slot-scope="scope">
          {{scope.row.managerName==undefined?'未分配':scope.row.managerName}}
        </template>
      </el-table-column>
      <el-table-column prop="managerEmpNo" label="部门经理工号" width="180">
        <template slot-scope="scope">
          {{scope.row.managerEmpNo==undefined?'未分配':scope.row.managerEmpNo}}
        </template>
      </el-table-column>
      <el-table-column prop="managerContact" label="联系方式" width="180">
        <template slot-scope="scope">
          {{scope.row.managerContact==undefined?'未分配':scope.row.managerContact}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="onDetailClick(scope.row.deptNo)">详情</el-button>
          <el-button size="mini" type="warning" @click="onEditClick(scope.row.deptNo)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDeleteClick(scope.row.deptNo)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDept: {}
    }
  },
  props: {
    deptList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    onDetailClick(deptNo) {
      this.$emit('onDetailClick', deptNo)
    },
    onEditClick(deptNo) {
      this.$emit('onEditClick', deptNo)
    },
    onDeleteClick(deptNo) {
      this.$emit('onDeleteClick', deptNo)
    }
  }
}
</script>