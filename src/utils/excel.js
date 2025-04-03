import * as XLSX from 'xlsx'

/**
 * 导出数据到Excel文件
 * @param {Array} data - 要导出的数据
 * @param {string} fileName - 文件名
 * @param {Array} columns - 列配置
 */
export const exportToExcel = (data, fileName, columns) => {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data)
  
  // 设置列宽
  if (columns) {
    ws['!cols'] = columns.map(() => ({ wch: 15 }))
  }
  
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, `${fileName}.xlsx`)
}

/**
 * 读取Excel文件数据
 * @param {File} file - Excel文件
 * @returns {Promise} 解析后的数据
 */
export const readExcelFile = (file) => {
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
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
} 