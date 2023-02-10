<!--
  插入员工对话框
-->

<template>
  <el-dialog title="添加职位" :visible.sync="isOpen" width="40%" :before-close="beforeClose" @open="onOpen">

    <el-form label-width="80px" label-position="left" :rules="rules" :model="pos" ref="form">

      <el-form-item label="职位名称" prop="name">
        <el-input v-model="pos.name"/>
      </el-form-item>

      <el-form-item label="部门" prop="deptId">
        <el-select style="margin-right: 20px;" v-model="pos.deptId" @change="onDeptChange">
          <el-option v-for="(item, i) in deptOptions" :key="i" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      
      <el-form-item label="描述">
        <el-input type="textarea" :rows="3" v-model="pos.desc"/>
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
      pos: {
        name: '',
        deptId: null,
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ]
      },
      deptOptions: [],
      posOptions: []
    }
  },
  methods: {
    beforeClose() {
      this.$emit('onClose')
    },
    onOkClick() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('onOk', this.pos)
        }
      })
    },
    onCancelClick() {
      this.$emit('onClose')
    },
    onOpen() {
      getAllDepartmentSelection().then(res => {
        this.deptOptions = res.data
        getAllPositionSelection(res.data[0].id).then(res => {
          this.posOptions = res.data
        })
      })
    },
    onDeptChange(deptId) {
      getAllPositionSelection(deptId).then(res => {
        this.posOptions = res.data
        this.pos.posId = null
      })
    }
  }
}
</script>