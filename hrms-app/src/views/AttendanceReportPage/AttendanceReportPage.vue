<template>
  <div v-loading.fullscreen.lock="loading">
    <el-row>
      <div id="attendance-pie"></div>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    BarChart, PieChart, ScatterChart, LineChart
} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    CalendarComponent,
    DatasetComponent,
    DataZoomComponent 
} from 'echarts/components'
import {
    CanvasRenderer
} from 'echarts/renderers'

echarts.use(
    [ TitleComponent, TooltipComponent, GridComponent, BarChart, PieChart, CanvasRenderer, LegendComponent, ScatterChart, CalendarComponent, LineChart, DatasetComponent, DataZoomComponent ]
)

import { getLatestMonthAttendanceReport } from '../../network/AttendanceReport.js'

export default {
  data() {
    return {
      attendanceData: [],
      loading: false
    }
  },
  computed: {
    dates() {
      let result = this.attendanceData.map(e => e.date)
      result.splice(0, 0, '日期')
      return result
    },
    normals() {
      let result = this.attendanceData.map(e => e.normalCount + Math.round(Math.random() * 1000))
      result.splice(0, 0, '正常')
      return result
    },
    arriveLates() {
      let result = this.attendanceData.map(e => e.arriveLateCount + Math.round(Math.random() * 1000))
      result.splice(0, 0, '迟到')
      return result
    },
    leaveEarlys() {
      let result = this.attendanceData.map(e => e.leaveEarlyCount + Math.round(Math.random() * 1000))
      result.splice(0, 0, '早退')
      return result
    }
  },
  created() {
    this.loading = true
    getLatestMonthAttendanceReport().then(res => {
      this.loading = false
      this.attendanceData = res.data
      this.drawAttendancePie()
    })
  },
  methods: {
    drawAttendancePie() {
      if (this.attendancePie !== null && this.attendancePie !== undefined && this.attendancePie !== '') {
        this.attendancePie.dispose()
      }
      this.attendancePie = echarts.init(document.getElementById('attendance-pie'))
      this.attendancePie.setOption({
        title: {
          text: '最近一个月员工考勤情况'
        },
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            this.dates,
            this.normals,
            this.arriveLates,
            this.leaveEarlys
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {gridIndex: 0},
        grid: {top: '55%'},
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 25
          },
          {
            type: 'inside',
            //realtime: true,
            start: 0,
            end: 25
          }
        ],
        series: [
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
          {
            type: 'pie',
            id: 'pie',
            radius: '35%',
            center: ['50%', '30%'],
            emphasis: {focus: 'data'},
            label: {
              formatter: '{b}: {@2021-04-12}人 ({d}%)'
            },
            encode: {
              itemName: '日期',
              value: '2021-04-12',
              tooltip: '2021-04-12'
            }
          }
        ]        
      })

      this.attendancePie.on('updateAxisPointer', event => {
        let xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          let dimension = xAxisInfo.value + 1
          this.attendancePie.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#attendance-pie {
  width: 100%;
  height: 600px;
}
</style>