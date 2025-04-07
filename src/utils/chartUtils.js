import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'

/**
 * 图表工具类
 */
const chartUtils = {
  /**
   * 初始化图表实例
   * @param {HTMLElement} dom - 图表容器元素
   * @param {Object} options - 图表配置项
   * @returns {echarts.EChartsType|null} 图表实例
   */
  initChart(dom, options) {
    try {
      const chart = echarts.init(dom)
      chart.setOption(options)
      return chart
    } catch (error) {
      console.error('图表初始化失败:', error)
      ElMessage.error('图表初始化失败')
      return null
    }
  },

  /**
   * 获取基础图表配置
   * @param {Object} customOptions - 自定义配置项
   * @returns {Object} 合并后的配置项
   */
  getBaseOptions(customOptions = {}) {
    const baseOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {},
          dataZoom: {},
          restore: {}
        }
      }
    }

    return {
      ...baseOptions,
      ...customOptions
    }
  },

  /**
   * 更新图表配置
   * @param {echarts.EChartsType} chart - 图表实例
   * @param {Object} options - 新的配置项
   * @param {boolean} merge - 是否合并配置
   */
  updateChart(chart, options, merge = true) {
    if (!chart) return
    try {
      chart.setOption(options, { notMerge: !merge })
    } catch (error) {
      console.error('图表更新失败:', error)
      ElMessage.error('图表更新失败')
    }
  },

  /**
   * 调整图表大小
   * @param {echarts.EChartsType} chart - 图表实例
   */
  resizeChart(chart) {
    if (!chart) return
    chart.resize()
  },

  /**
   * 销毁图表实例
   * @param {echarts.EChartsType} chart - 图表实例
   */
  disposeChart(chart) {
    if (!chart) return
    chart.dispose()
  }
}

export default chartUtils 