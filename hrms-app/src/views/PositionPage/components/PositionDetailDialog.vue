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
  computed: {
    title() {
      console.log(this.pos)
      return '职位 ' + this.pos.posNo + ' 的详情'
    },
    data() {
      return [
        { item: '职位编号', value: this.pos.posNo },
        { item: '职位名称', value: this.pos.name },
        { item: '职位描述', value: this.pos.desc },
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