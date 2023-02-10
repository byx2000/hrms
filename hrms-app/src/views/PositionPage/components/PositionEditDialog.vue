<!--
  员工信息编辑对话框
-->

<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="40%" :before-close="beforeClose" @open="onOpen">
    <el-form label-width="80px" label-position="left" :rules="rules" :model="pos" ref="form">

      <el-form-item label="职位名称" prop="name">
        <el-input v-model="pos.name"/>
      </el-form-item>

      <el-form-item label="部门" prop="deptId">
        <el-select style="margin-right: 20px;" v-model="pos.deptId" @change="onDeptChange">
          <el-option v-for="(item, i) in deptOptions" :key="i" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      
      <el-form-item label="职位描述">
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
    },
    pos: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      deptOptions: [],
      posOptions: [],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值'}
        ],
        contact: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择员工类型', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        posId: [
          { required: true, message: '请选择职位', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    title() {
      return '编辑职位 ' + this.pos.posNo
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
      })
      getAllPositionSelection(this.pos.posId).then(res => {
        this.posOptions = res.data
      })
    },
    onDeptChange(posId) {
      getAllPositionSelection(posId).then(res => {
        this.posOptions = res.data
        this.pos.posId = null
      })
    }
  }
}
</script>