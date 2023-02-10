<!--
  员工详情对话框
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
import { getEmployeeGenderDescription, getEmployeeTypeDescription } from '../../../common/common.js'

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    emp: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    title() {
      return '员工 ' + this.emp.empNo + ' 的详情'
    },
    data() {
      return [
        { item: '工号', value: this.emp.empNo },
        { item: '姓名', value: this.emp.name },
        { item: '性别', value: getEmployeeGenderDescription(this.emp.gender) },
        { item: '年龄', value: this.emp.age },
        { item: '联系方式', value: this.emp.contact },
        { item: '部门', value: this.emp.deptName},
        { item: '职位', value: this.emp.posName},
        { item: '类型', value: getEmployeeTypeDescription(this.emp.type)},
        { item: '描述', value: this.emp.desc }
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