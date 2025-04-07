import * as XLSX from 'xlsx'
import { ElMessage } from 'element-plus'

/**
 * Excel工具类
 */
const excelUtils = {
  /**
   * 导出数据到Excel文件
   * @param {Object} options - 导出配置项
   * @param {Array} options.data - 要导出的数据数组
   * @param {string} options.fileName - 文件名（不含扩展名）
   * @param {Array} options.header - 表头配置 [{label: '显示名', prop: '字段名'}]
   * @param {string} options.sheetName - 工作表名称
   */
  exportToExcel({ data, fileName = 'export', header = [], sheetName = 'Sheet1' }) {
    try {
      // 创建工作簿
      const wb = XLSX.utils.book_new()

      // 处理数据
      const processedData = data.map(item => {
        const newItem = {}
        header.forEach(({ label, prop }) => {
          newItem[label] = item[prop]
        })
        return newItem
      })

      // 创建工作表
      const ws = XLSX.utils.json_to_sheet(processedData)

      // 设置列宽
      const colWidth = header.map(() => ({ wch: 15 }))
      ws['!cols'] = colWidth

      // 添加工作表到工作簿
      XLSX.utils.book_append_sheet(wb, ws, sheetName)

      // 导出文件
      XLSX.writeFile(wb, `${fileName}.xlsx`)
      ElMessage.success('导出成功')
    } catch (error) {
      console.error('导出Excel失败:', error)
      ElMessage.error('导出失败')
    }
  },

  /**
   * 读取Excel文件
   * @param {File} file - Excel文件对象
   * @returns {Promise<Array>} 解析后的数据数组
   */
  readExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result)
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = XLSX.utils.sheet_to_json(firstSheet)
          resolve(jsonData)
        } catch (error) {
          reject(new Error('Excel文件解析失败'))
        }
      }

      reader.onerror = () => reject(new Error('文件读取失败'))
      reader.readAsArrayBuffer(file)
    })
  },

  /**
   * 验证Excel文件
   * @param {File} file - 要验证的文件
   * @returns {boolean} 是否为有效的Excel文件
   */
  validateExcel(file) {
    const types = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    return types.includes(file.type)
  }
}

export default excelUtils 