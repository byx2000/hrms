<!--
  员工信息编辑对话框
-->

<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="40%" :before-close="beforeClose" @open="onOpen">
    <el-form label-width="80px" label-position="left" :rules="rules" :model="emp" ref="form">

      <el-row type="flex" justify="space-between">
        <el-col :span="11">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="emp.name"/>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="emp.age"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="space-between">
        <el-col :span="11">
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="emp.gender">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="类型" prop="type">
            <el-select v-model="emp.type">
              <el-option label="实习生" :value="0"/>
              <el-option label="正式员工" :value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="联系方式" prop="contact">
        <el-input v-model="emp.contact"/>
      </el-form-item>

      <el-row type="flex" justify="space-between">
        <el-col :span="11">
          <el-form-item label="部门" prop="deptId">
            <el-select style="margin-right: 20px;" v-model="emp.deptId" @change="onDeptChange">
              <el-option v-for="(item, i) in deptOptions" :key="i" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="职位" prop="posId">
            <el-select v-model="emp.posId">
              <el-option v-for="(item, i) in posOptions" :key="i" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-form-item label="描述">
        <el-input type="textarea" :rows="3" v-model="emp.desc"/>
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
    emp: {
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
      return '编辑员工 ' + this.emp.empNo
    }
  },
  methods: {
    beforeClose() {
      this.$emit('onClose')
    },
    onOkClick() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('onOk', this.emp)
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
      getAllPositionSelection(this.emp.deptId).then(res => {
        this.posOptions = res.data
      })
    },
    onDeptChange(deptId) {
      getAllPositionSelection(deptId).then(res => {
        this.posOptions = res.data
        this.emp.posId = null
      })
    }
  }
}
</script>