<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

// 图表实例引用
const chartRef = ref(null)
let chartInstance = null

/**
 * 初始化图表配置
 * @returns {Object} ECharts配置项
 */
const getChartOption = () => {
  return {
    title: {
      text: '销售数据统计',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['销售额', '订单量'],
      top: '30px'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: [
      {
        type: 'value',
        name: '销售额',
        position: 'left'
      },
      {
        type: 'value',
        name: '订单量',
        position: 'right'
      }
    ],
    series: [
      {
        name: '销售额',
        type: 'line',
        smooth: true,
        data: [3000, 2800, 3500, 5000, 4800, 6000],
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: '订单量',
        type: 'bar',
        yAxisIndex: 1,
        data: [150, 130, 180, 240, 220, 280],
        itemStyle: {
          color: '#67C23A'
        }
      }
    ]
  }
}

/**
 * 初始化图表
 */
const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption(getChartOption())
}

/**
 * 处理窗口大小变化
 */
const handleResize = () => {
  chartInstance?.resize()
}

// 生命周期钩子
onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<template>
  <div class="echarts-view">
    <el-card class="chart-card">
      <template #header>
        <div class="card-header">
          <span>基础图表示例</span>
        </div>
      </template>
      <div ref="chartRef" class="chart-container" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.echarts-view {
  padding: 20px;

  .chart-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chart-container {
      height: 400px;
      width: 100%;
    }
  }
}
</style>