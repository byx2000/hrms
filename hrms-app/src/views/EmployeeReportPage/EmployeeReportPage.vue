<template>
  <div>
    <el-row>
      <el-col :span="12">
        <!--员工年龄人数统计-->
        <div id="age-chart-bar"></div>
      </el-col>
      <el-col :span="12">
        <!--员工年龄分布-->
        <div id="age-chart-pie"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <!--员工性别分布-->
        <div id="gender-chart-pie"></div>
      </el-col>
      <el-col :span="12">
        <!--员工类型分布-->
        <div id="type-chart-pie"></div>
      </el-col>
    </el-row>
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
    LegendComponent 
} from 'echarts/components'
import {
    CanvasRenderer
} from 'echarts/renderers'

echarts.use(
    [ TitleComponent, TooltipComponent, GridComponent, BarChart, PieChart, CanvasRenderer, LegendComponent ]
)

import { 
  getAgeReport, getTypeReport
} from '../../network/EmployeeReport.js'

export default {
  data() {
    return {
      ageReportData: {},
      genderReportData: {},
      typeReportData: {}
    }
  },
  computed: {
    ageLabels() {
      return this.ageReportData.map(e => e.label)
    },
    maleCountValues() {
      return this.ageReportData.map(e => e.maleCount)
    },
    femaleCountValues() {
      return this.ageReportData.map(e => e.femaleCount)
    },
    agePieData() {
      let data = []
      for (let item of this.ageReportData) {
        data.push({
          name: item.label,
          value: item.maleCount + item.femaleCount
        })
      }
      return data
    },
    genderPieData() {
      return [
      {
        name: '男',
        value: this.ageReportData.map(e => e.maleCount).reduce((x,y) => x+y)
      },
      {
        name: '女',
        value: this.ageReportData.map(e => e.femaleCount).reduce((x,y) => x+y)
      }]
    }
  },
  created() {
    getAgeReport().then(res => {
      this.ageReportData = res.data
      this.drawAgeChartBar()
      this.drawAgeChartPie()
      this.drawGenderChartPie()
    })

    getTypeReport().then(res => {
      this.typeReportData = res.data
      this.drawTypeChartPie()
    })
  },
  methods: {
    drawAgeChartBar() {
      if (this.ageChartBar !== null && this.ageChartBar !== undefined && this.ageChartBar !== '') {
        this.ageChartBar.dispose()
      }
      this.ageChartBar = echarts.init(document.getElementById('age-chart-bar'))
      this.ageChartBar.setOption({
        title: {
          text: '员工年龄人数统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['男', '女']
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: this.ageLabels
        },
        series: [
          {
            name: '男',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.maleCountValues
          },
          {
            name: '女',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.femaleCountValues
          }
        ]        
      })
    },
    drawAgeChartPie() {
      if (this.ageChartPie !== null && this.ageChartPie !== undefined && this.ageChartPie !== '') {
        this.ageChartPie.dispose()
      }
      this.ageChartPie = echarts.init(document.getElementById('age-chart-pie'))
      this.ageChartPie.setOption({
        title: {
          text: '员工年龄分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          x: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: this.agePieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label : {
              formatter: '{d}%',
              position: 'inner'
            }
          }
        ]
      })
    },
    drawGenderChartPie() {
      if (this.genderChartPie !== null && this.genderChartPie !== undefined && this.genderChartPie !== '') {
        this.genderChartPie.dispose()
      }
      this.genderChartPie = echarts.init(document.getElementById('gender-chart-pie'))
      this.genderChartPie.setOption({
        title: {
          text: '员工性别分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: this.genderPieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label : {
              formatter: '{b}({d}%)',
              position: 'inner'
            }
          }
        ]
      })      
    },
    drawTypeChartPie() {
      if (this.typeChartPie !== null && this.typeChartPie !== undefined && this.typeChartPie !== '') {
        this.typeChartPie.dispose()
      }
      this.typeChartPie = echarts.init(document.getElementById('type-chart-pie'))
      this.typeChartPie.setOption({
        title: {
          text: '员工类型分布',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            data: [
              {value: this.typeReportData.internCount, name: '实习生'},
              {value: this.typeReportData.fullTimeCount, name: '正式员工'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label : {
              formatter: '{b}({c}人)',
              position: 'inner'
            }
          }
        ]
      })      
    }    
  }
}
</script>

<style scoped>
#age-chart-bar {
  width: 100%;
  height: 400px;
}

#age-chart-pie {
  width: 100%;
  height: 400px;
}

#gender-chart-pie {
  width: 100%;
  height: 400px;
}

#type-chart-pie {
  width: 100%;
  height: 400px;
}
</style>