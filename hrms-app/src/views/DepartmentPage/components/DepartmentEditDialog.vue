<!--
  部门信息编辑对话框
-->

<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="40%" :before-close="beforeClose">
    <el-form label-width="80px" label-position="left" :rules="rules" :model="dept" ref="form">

      <el-row type="flex" justify="space-between">
        <el-col :span="11">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="dept.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="经理工号" prop="managerEmpNo">
            <el-input v-model.number="dept.managerEmpNo"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="描述">
        <el-input type="textarea" :rows="3" v-model="dept.desc"/>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancelClick">取 消</el-button>
      <el-button @click="onOkClick" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAllDepartmentSelection } from '../../../network/Department.js'
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
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        managerEmpNo: [
            {require: true, message: '请输入经理工号', trigger:'blur'}
        ]
      }
    }
  },
  computed: {
    title() {
      return '编辑部门： ' + this.dept.deptNo
    }
  },
  methods: {
    beforeClose() {
      this.$emit('onClose')
    },
    onOkClick() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('onOk', this.dept)
        }
      })
    },
    onCancelClick() {
      this.$emit('onClose')
    },
    /*onOpen() {
      getAllDepartmentSelection().then(res => {
        this.deptOptions = res.data
      })
    },
    /*onDeptChange(deptId) {
      getAllPositionSelection(deptId).then(res => {
        this.posOptions = res.data
        this.emp.posId = null
      })
    }*/
  }
}
</script>