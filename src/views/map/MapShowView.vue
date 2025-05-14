<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
// 引入中国地图数据
import { registerMap } from 'echarts'
import chinaJson from '@/assets/map/china.json'
registerMap('china', chinaJson)

// 图表实例引用
const chartRef = ref(null)
let chartInstance = null

// 加载状态
const loading = ref(false)

// 地图数据
const mapData = ref([
  { name: '北京', value: 199 },
  { name: '上海', value: 299 },
  { name: '广东', value: 399 },
  { name: '深圳', value: 299 },
  // 可以添加更多数据...
])

/**
 * 获取地图配置项
 * @returns {Object} ECharts配置项
 */
const getChartOption = () => {
  return {
    title: {
      text: '全国数据分布图',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    visualMap: {
      min: 0,
      max: 500,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['#e0ffff', '#006edd']
      }
    },
    series: [
      {
        name: '数据量',
        type: 'map',
        map: 'china',
        roam: true, // 开启缩放和平移
        emphasis: {
          label: {
            show: true
          },
          itemStyle: {
            areaColor: '#66ccff'
          }
        },
        data: mapData.value
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
 * 更新图表数据
 * @param {Array} data - 新的数据数组
 */
const updateChartData = (data) => {
  if (!chartInstance) return
  
  mapData.value = data
  chartInstance.setOption({
    series: [{
      data: data
    }]
  })
}

/**
 * 获取地图数据
 */
const fetchMapData = async () => {
  try {
    loading.value = true
    // 这里添加实际的API调用
    // const res = await getMapData()
    // updateChartData(res.data)
  } catch (error) {
    console.error('获取地图数据失败:', error)
    ElMessage.error('获取地图数据失败')
  } finally {
    loading.value = false
  }
}

/**
 * 处理窗口大小变化
 */
const handleResize = () => {
  chartInstance?.resize()
}

/**
 * 处理地图点击事件
 * @param {Object} params - 点击事件参数
 */
const handleMapClick = (params) => {
  if (params.name) {
    ElMessage.info(`点击了${params.name}，数据量：${params.value || 0}`)
  }
}

// 生命周期钩子
onMounted(() => {
  initChart()
  // 添加点击事件监听
  chartInstance?.on('click', handleMapClick)
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
  // 获取数据
  fetchMapData()
})

onBeforeUnmount(() => {
  // 移除事件监听
  chartInstance?.off('click')
  window.removeEventListener('resize', handleResize)
  // 销毁图表实例
  chartInstance?.dispose()
})
</script>

<template>
  <div class="map-show">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>地图展示</span>
          <el-button-group>
            <el-button type="primary" @click="fetchMapData">
              刷新数据
            </el-button>
            <el-button
              type="success"
              @click="chartInstance?.dispatchAction({
                type: 'restore'
              })"
            >
              重置视图
            </el-button>
          </el-button-group>
        </div>
      </template>

      <div
        ref="chartRef"
        class="chart-container"
        v-loading="loading"
        element-loading-text="加载中..."
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.map-show {
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chart-container {
    height: 600px;
    width: 100%;
  }

  :deep(.el-card__body) {
    padding: 10px;
  }
}
</style>