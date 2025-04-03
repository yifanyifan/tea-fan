<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

// 图表实例引用
const chartRef = ref(null)
let chartInstance = null

// 预定义数据集
const datasets = {
  sales: {
    title: '商品销量统计',
    xData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    yData: [5, 20, 36, 10, 10, 20]
  },
  electronics: {
    title: '电器销量统计',
    xData: ['冰箱', '彩电', '洗衣机', '空调', 'VCD', 'DVD'],
    yData: [1000, 150, 5888, 3500, 50, 550]
  },
  fruits: {
    title: '水果销量统计',
    xData: ['草莓', '榴莲', '柠檬', '橙子', '苹果', '圣女果'],
    yData: [100, 80, 200, 500, 99, 666]
  }
}

/**
 * 获取图表配置
 * @param {string} type - 图表类型
 * @param {string} datasetKey - 数据集键名
 * @returns {Object} ECharts配置项
 */
const getChartOption = (type = 'line', datasetKey = 'sales') => {
  const dataset = datasets[datasetKey]
  return {
    title: {
      text: dataset.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {},
        dataView: {},
        restore: {},
        dataZoom: {},
        magicType: {
          type: ['line', 'bar', 'stack']
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dataset.xData,
      axisLabel: {
        rotate: 30
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '销量',
      type: type,
      data: dataset.yData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }
}

/**
 * 切换图表类型和数据集
 * @param {string} type - 图表类型
 * @param {string} datasetKey - 数据集键名
 */
const changeChart = (type, datasetKey = 'sales') => {
  if (!chartInstance) return
  chartInstance.setOption(getChartOption(type, datasetKey))
}

/**
 * 处理窗口大小变化
 */
const handleResize = () => {
  chartInstance?.resize()
}

// 生命周期钩子
onMounted(() => {
  // 初始化图表实例
  chartInstance = echarts.init(chartRef.value)
  // 设置默认图表
  changeChart('line')
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  // 清理事件监听和图表实例
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<template>
  <div class="echarts-show">
    <!-- 图表控制按钮组 -->
    <div class="chart-controls">
      <el-card>
        <div class="button-group">
          <el-button @click="changeChart('line')" type="primary">
            折线图
          </el-button>
          <el-button @click="changeChart('bar')" type="success">
            柱状图
          </el-button>
          <el-button @click="changeChart('pie')" type="warning">
            饼图
          </el-button>
          <el-button @click="changeChart('scatter')" type="info">
            散点图
          </el-button>
        </div>

        <div class="dataset-group">
          <el-button @click="changeChart('line', 'electronics')" type="danger">
            电器销量
          </el-button>
          <el-button @click="changeChart('pie', 'fruits')" type="primary">
            水果销量
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 图表容器 -->
    <el-card class="chart-card">
      <div ref="chartRef" class="chart-container" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.echarts-show {
  padding: 20px;

  .chart-controls {
    margin-bottom: 20px;

    .button-group,
    .dataset-group {
      margin-bottom: 15px;
      
      .el-button {
        margin-right: 10px;
        
        &:last-child {
          margin-right: 0;
        }
      }
    }

    .dataset-group {
      margin-bottom: 0;
    }
  }

  .chart-card {
    .chart-container {
      height: 500px;
      width: 100%;
    }
  }
}
</style>