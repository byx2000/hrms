<template>
  <div>
    <div id="employee-count-chart"></div>
    <div id="position-count-chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    BarChart, PieChart
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
    [ TitleComponent, TooltipComponent, GridComponent, BarChart, PieChart, CanvasRenderer, LegendComponent, DataZoomComponent ]
)

import {
  getDepartmentEmployeeCountReport, getDepartmentPositionCountReport
} from '../../network/DepartmentReport.js'

export default {
  data() {
    return {
      employeeCountReportData: [],
      positionCountReportData: []
    }
  },
  computed: {
    deptNameLabels1() {
      return this.employeeCountReportData.map(e => e.deptName)
    },
    deptNameLabels2() {
      return this.positionCountReportData.map(e => e.deptName)
    },
    employeeCountvalues() {
      return this.employeeCountReportData.map(e => e.empCount)
    },
    positionCountValues() {
      return this.positionCountReportData.map(e => e.posCount)
    }
  },
  created() {
    getDepartmentEmployeeCountReport().then(res => {
      this.employeeCountReportData = res.data
      this.drawEmployeeCountChart()
    })

    getDepartmentPositionCountReport().then(res => {
      this.positionCountReportData = res.data
      this.drawPositionCountChart()
    })
  },
  methods: {
    drawEmployeeCountChart() {
      if (this.employeeCountChart !== null && this.employeeCountChart !== undefined && this.employeeCountChart !== '') {
        this.employeeCountChart.dispose()
      }
      this.employeeCountChart = echarts.init(document.getElementById('employee-count-chart'))
      this.employeeCountChart.setOption({
        title: {
          text: '部门人数统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 50
          },
          {
            type: 'inside',
            start: 0,
            end: 50
          }
        ],
        xAxis: {
            type: 'category',
            data: this.deptNameLabels1
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.employeeCountvalues,
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            }
        }]        
      })
    },
    drawPositionCountChart() {
      if (this.positionCountChart !== null && this.positionCountChart !== undefined && this.positionCountChart !== '') {
        this.positionCountChart.dispose()
      }
      this.positionCountChart = echarts.init(document.getElementById('position-count-chart'))
      this.positionCountChart.setOption({
        title: {
          text: '部门职位数统计',
          left: 'center'
        },
        color: '#91cc75',
        tooltip: {
          trigger: 'item'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 50
          },
          {
            type: 'inside',
            start: 0,
            end: 50
          }
        ],
        xAxis: {
            type: 'category',
            data: this.deptNameLabels2
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.positionCountValues,
            type: 'bar',
            label: {
              show: true,
              position: 'top'
            }
        }]        
      })
    }
  }
}
</script>

<style scoped>
#employee-count-chart {
  width: 100%;
  height: 400px;
}

#position-count-chart {
  width: 100%;
  height: 400px;
  margin-top: 20px;
}
</style>