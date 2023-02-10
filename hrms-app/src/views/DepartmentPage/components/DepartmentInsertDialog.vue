<!--
  添加部门对话框
-->

<template>
  <el-dialog title="添加部门" :visible.sync="isOpen" width="40%" :before-close="beforeClose" >
    <el-form label-width="80px" label-position="left" :rules="rules" :model="dept" ref="form">

      <el-row type="flex" justify="space-between">
        <el-col :span="11">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="dept.name"/>
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
import { getAllPositionSelection } from '../../../network/Position.js'

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dept: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
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
    }
  }
}
</script>