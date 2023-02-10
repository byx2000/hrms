<template>
  <div>
    <el-form>
      <el-form-item label="选择部门">
        <el-select v-model="selectedDeptId" @change="onSelectChange">
          <el-option v-for="item in deptData" :key="item.id" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div id="employee-count-chart-bar"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    BarChart
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    DataZoomComponent 
} from 'echarts/components'
import {
    CanvasRenderer
} from 'echarts/renderers'

echarts.use(
    [ TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer, LegendComponent, DataZoomComponent ]
)

import { getAllDepartmentSelection } from '../../network/Department.js'
import { getPositionEmployeeCountReport } from '../../network/PositionReport.js'

export default {
  data() {
    return {
      deptData: [],
      empCountData: [],
      selectedDeptId: -1
    }
  },
  computed: {
    labels() {
      return this.empCountData.map(e => e.posName)
    },
    values() {
      return this.empCountData.map(e => e.empCount)
    }
  },
  created() {
    getAllDepartmentSelection().then(res => {
      this.deptData = res.data
      this.selectedDeptId = this.deptData[0].id
      return getPositionEmployeeCountReport(this.selectedDeptId)
    }).then(res => {
      this.empCountData = res.data
      this.drawChart()
    })
  },
  methods: {
    onSelectChange() {
      getPositionEmployeeCountReport(this.selectedDeptId).then(res => {
        this.empCountData = res.data
        this.drawChart()
      })
    },
    drawChart() {
      if (this.chart !== null && this.chart !== undefined && this.chart !== '') {
        this.chart.dispose()
      }
      this.chart = echarts.init(document.getElementById('employee-count-chart-bar'))
      this.chart.setOption({
        title: {
          text: '职位人数统计',
          subtext: '鼠标滚轮或点击缩放',
          left: 'center'
        },
        xAxis: {
          data: this.labels,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 40
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 40
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b0}: {c0}人'
        },
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#83bff6'},
                  {offset: 0.5, color: '#188df0'},
                  {offset: 1, color: '#188df0'}
                ]
              )
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.7, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                  ]
                )
              }
            },
            data: this.values,
            label: {
              show: true,
              position: 'insideTop',
              color: '#fff'
            }
          }
        ]
      })
      let zoomSize = 6
      this.chart.on('click', params => {
        this.chart.dispatchAction({
          type: 'dataZoom',
          startValue: this.labels[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue: this.labels[Math.min(params.dataIndex + zoomSize / 2, this.values.length - 1)]
        })
      })
    }
  }
}
</script>

<style scoped>
#employee-count-chart-bar {
  width: 100%;
  height: 550px;
}
</style>