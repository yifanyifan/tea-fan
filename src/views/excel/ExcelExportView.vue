<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'

// 表格数据
const tableData = ref([
  {
    date: '2024-04-01',
    name: '商品A',
    price: 100,
    count: 10,
    total: 1000
  },
  {
    date: '2024-04-02',
    name: '商品B',
    price: 200,
    count: 5,
    total: 1000
  }
])

// 表格列配置
const columns = [
  { prop: 'date', label: '日期' },
  { prop: 'name', label: '商品名称' },
  { prop: 'price', label: '单价' },
  { prop: 'count', label: '数量' },
  { prop: 'total', label: '总价' }
]

/**
 * 导出Excel文件
 * @param {string} fileName - 文件名
 */
const exportToExcel = (fileName = 'export') => {
  try {
    // 创建工作簿
    const wb = XLSX.utils.book_new()
    
    // 将数据转换为工作表
    const ws = XLSX.utils.json_to_sheet(tableData.value)
    
    // 设置列宽
    const colWidth = columns.map(() => ({ wch: 15 }))
    ws['!cols'] = colWidth

    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    
    // 导出文件
    XLSX.writeFile(wb, `${fileName}.xlsx`)
    
    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败')
  }
}

/**
 * 导出选中行数据
 * @param {Array} selection - 选中的行数据
 */
const exportSelected = (selection) => {
  if (selection.length === 0) {
    ElMessage.warning('请选择要导出的数据')
    return
  }
  
  try {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(selection)
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, 'selected_data.xlsx')
    
    ElMessage.success('导出成功')
  } catch (error) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败')
  }
}
</script>

<template>
  <div class="excel-export">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Excel导出示例</span>
          <div class="button-group">
            <el-button type="primary" @click="exportToExcel('全部数据')">
              导出全部
            </el-button>
            <el-button
              type="success"
              @click="exportSelected($refs.table?.getSelectionRows() || [])"
            >
              导出选中
            </el-button>
          </div>
        </div>
      </template>

      <el-table
        ref="table"
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="selection => $refs.table.selection = selection"
      >
        <el-table-column type="selection" width="55" />
        
        <el-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
        />
      </el-table>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.excel-export {
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button-group {
      .el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>