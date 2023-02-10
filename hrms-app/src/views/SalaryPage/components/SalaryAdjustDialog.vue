<template>
  <el-dialog 
    :title="title" 
    :visible.sync="isOpen" 
    width="30%" 
    :before-close="beforeClose" 
    @open="onOpen">
    <el-form 
      label-width="100px" 
      label-position="top" 
      :model="form"
      @submit.native.prevent>
      <el-form-item label="薪资调整为" prop="salary">
        <el-slider v-model="form.salary" :min="2000" :max="25000" show-input/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancelClick">取 消</el-button>
      <el-button @click="onOkClick" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    title() {
      return '调整员工 ' + this.item.empNo + ' 薪资'
    }
  },
  methods: {
    beforeClose() {
      this.$emit('onClose')
    },
    onOkClick() {
      this.$emit('onOk', this.form.salary)
    },
    onCancelClick() {
      this.$emit('onClose')
    },
    onOpen() {
      this.form = {
        salary: this.item.salary
      }
    }
  }
}
</script>