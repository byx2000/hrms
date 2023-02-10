<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="empNo" label="员工工号" width="180"/>
    <el-table-column prop="empName" label="员工姓名" width="180"/>
    <el-table-column prop="date" label="日期" width="180"/>
    <el-table-column label="类型" width="180">
      <template slot-scope="scope">
        {{scope.row.type == 0 ? '出勤' : '退勤'}}
      </template>
    </el-table-column>
    <el-table-column prop="time" label="时间" width="180"/>
    <el-table-column label="状态" width="180">
      <template slot-scope="scope">
        <!-- <span :class="getStateClass(scope.row.type, scope.row.time)">
          {{getState(scope.row.type, scope.row.time)}}
        </span> -->
        <el-tag v-if="getState(scope.row.type, scope.row.time) === 0" type="success">正常</el-tag>
        <el-tag v-if="getState(scope.row.type, scope.row.time) === 1" type="danger">迟到</el-tag>
        <el-tag v-if="getState(scope.row.type, scope.row.time) === 2" type="danger">早退</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="onDetailClick(scope.row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    getState(type, time) {
      if (type === 0) {
        return time > '09:00' ? 1 : 0
      } else {
        return time < '17:00' ? 2 : 0
      }
    },
    getStateClass(type, time) {
      if (type === 0) {
        return time > '09:00' ? 'red' : 'green'
      } else {
        return time < '17:00' ? 'red' : 'green'
      }
    },
    onDetailClick(emp) {
      this.$emit('onDetailClick', emp)
    }
  }
}
</script>

<style scoped>
.green {
  color: #23c284;
}

.red {
  color: red;
}
</style>