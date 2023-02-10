<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="50%" :before-close="beforeClose" @open="onOpen">
    <div id="main" class="chart"></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onOkClick" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import {
    LineChart
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
    CanvasRenderer
} from 'echarts/renderers'

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer]
)

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default: {}
    },
    salaries: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    title() {
      return '员工 ' + this.item.empNo + ' 的薪资详情'
    },
    xLabels() {
      let labels = []
      for (let s of this.salaries) {
        labels.push(s.time)
      }
      return labels
    },
    yValues() {
      let values = []
      for (let s of this.salaries) {
        values.push(s.salary)
      }
      return values
    }
  },
  methods: {
    onOkClick() {
      this.$emit('onClose')
    },
    beforeClose() {
      this.$emit('onClose')
    },
    onOpen() {
      this.$nextTick(() => {
        this.drawChart()
      })
    },
    drawChart() {
      if (this.chart !== null && this.chart !== undefined && this.chart !== '') {
        this.chart.dispose()
      }
      this.chart = echarts.init(document.getElementById('main'))
      this.chart.setOption({
        title: {
          text: '薪资变化曲线',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.xLabels
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.yValues,
          type: 'line',
          label: {
            show: true
          }
        }]
      })
    }
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
}
</style>