<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { contractApi } from '@/api/user'

// 图表实例引用
const chartRef = ref(null)
let chartInstance = null

// 数据加载状态
const loading = ref(false)

// BRC20代币数据
const tokenData = ref({
  totalSupply: '21,000,000',
  holders: '12,345',
  transactions: '98,765',
  price: '0.0023'
})

/**
 * 初始化图表配置
 * @returns {Object} ECharts配置项
 */
const getChartOption = () => {
  return {
    title: {
      text: 'BRC20 Token 交易数据',
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
      data: ['交易量', '价格'],
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
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: [
      {
        type: 'value',
        name: '交易量',
        position: 'left'
      },
      {
        type: 'value',
        name: '价格',
        position: 'right'
      }
    ],
    series: [
      {
        name: '交易量',
        type: 'bar',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '价格',
        type: 'line',
        yAxisIndex: 1,
        data: [0.002, 0.0022, 0.0021, 0.0023, 0.0025, 0.0024, 0.0023]
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

/**
 * 获取BRC20代币数据
 */
const fetchTokenData = async () => {
  try {
    loading.value = true
    // 这里添加实际的API调用
    // const res = await getBrc20Data()
    // tokenData.value = res.data
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

const fetchBrc20List = async () => {
  try {
    loading.value = true
    const res = await contractApi.getSupportCoins()
    tableData.value = res.data
  } catch (error) {
    console.error('获取 BRC20 列表失败:', error)
    ElMessage.error('获取 BRC20 列表失败')
  } finally {
    loading.value = false
  }
}

// 生命周期钩子
onMounted(() => {
  fetchTokenData()
  initChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<template>
  <div class="brc20-container">
    <!-- 数据概览卡片 -->
    <el-row :gutter="20" class="data-overview">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>总供应量</span>
            </div>
          </template>
          <div class="card-value">{{ tokenData.totalSupply }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>持有人数</span>
            </div>
          </template>
          <div class="card-value">{{ tokenData.holders }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>交易次数</span>
            </div>
          </template>
          <div class="card-value">{{ tokenData.transactions }}</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>当前价格</span>
            </div>
          </template>
          <div class="card-value">{{ tokenData.price }} BTC</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表展示 -->
    <el-card class="chart-card">
      <div ref="chartRef" class="chart-container" v-loading="loading" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.brc20-container {
  padding: 20px;

  .data-overview {
    margin-bottom: 20px;

    .el-card {
      .card-header {
        font-size: 14px;
        color: var(--el-text-color-secondary);
      }

      .card-value {
        font-size: 24px;
        font-weight: bold;
        color: var(--el-text-color-primary);
        text-align: center;
        margin-top: 10px;
      }
    }
  }

  .chart-card {
    .chart-container {
      height: 400px;
      width: 100%;
    }
  }
}
</style>