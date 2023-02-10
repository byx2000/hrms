<template>
  <el-dialog :title="title" :visible.sync="isOpen" width="60%" :before-close="beforeClose" @open="onOpen">
    <div id="chart1" class="chart"/>
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
// 引入图例组件
import { LegendComponent } from 'echarts/components'

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, LineChart, CanvasRenderer, LegendComponent]
)

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    title() {
      return '员工 ' + this.item.empNo + ' 的考勤详情'
    },
    xLabels() {
      let labels = []
      for (let d of this.item.data) {
        labels.push(d.date)
      }
      return labels
    },
    arriveTimes() {
      let times = []
      for (let d of this.item.data) {
        times.push(new Date('2000-01-28 ' + d.arriveTime))
      }
      return times
    },
    leaveTimes() {
      let times = []
      for (let d of this.item.data) {
        times.push(new Date('2000-01-28 ' + d.leaveTime))
      }
      return times
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
        this.drawChart1()
      })
    },
    drawChart1() {
      if (this.chart1 !== null && this.chart1 !== undefined && this.chart1 !== '') {
        this.chart1.dispose()
      }
      this.chart1 = echarts.init(document.getElementById('chart1'))
      this.chart1.setOption({
        title: {
          text: '最近一周考勤时间',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.xLabels
        },
        yAxis: {
          type: 'time',
          splitLine: {
            show: true
          },
          inverse: true
        },
        series: [{
          name: '到达时间',
          data: this.arriveTimes,
          type: 'line',
          label: {
            show: true,
            formatter(params) {
              let date = params.data
              return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
            }
          }
        },
        {
          name: '离开时间',
          data: this.leaveTimes,
          type: 'line',
          label: {
            show: true,
            formatter(params) {
              let date = params.data
              return date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
            }
          }
        }],
        legend:{
          show: true,
          data: ['到达时间', '离开时间'],
          x: 'center',
          y: 'bottom'
        }
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