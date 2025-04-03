<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'
import { Upload } from '@element-plus/icons-vue'

// 表格数据
const tableData = ref([])
// 表格列
const columns = ref([])
// 上传加载状态
const loading = ref(false)

/**
 * 处理文件上传
 * @param {File} file - 上传的文件对象
 */
const handleUpload = (file) => {
  // 验证文件类型
  const isExcel = /\.(xlsx|xls|csv)$/.test(file.name.toLowerCase())
  if (!isExcel) {
    ElMessage.error('只能上传Excel文件!')
    return false
  }

  loading.value = true
  
  // 读取文件
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result)
      const workbook = XLSX.read(data, { type: 'array' })
      
      // 获取第一个工作表
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      
      // 转换为JSON数据
      const jsonData = XLSX.utils.sheet_to_json(firstSheet)
      
      // 设置表格数据
      tableData.value = jsonData
      
      // 设置表格列
      if (jsonData.length > 0) {
        columns.value = Object.keys(jsonData[0]).map(key => ({
          prop: key,
          label: key
        }))
      }

      ElMessage.success('导入成功')
    } catch (error) {
      console.error('导入失败:', error)
      ElMessage.error('导入失败')
    } finally {
      loading.value = false
    }
  }

  reader.readAsArrayBuffer(file)
  return false // 阻止自动上传
}
</script>

<template>
  <div class="excel-import">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Excel导入示例</span>
        </div>
      </template>

      <!-- 上传区域 -->
      <div class="upload-area">
        <el-upload
          class="excel-uploader"
          accept=".xlsx,.xls,.csv"
          :auto-upload="false"
          :show-file-list="false"
          :before-upload="handleUpload"
        >
          <template #trigger>
            <el-button :loading="loading" type="primary">
              <el-icon><Upload /></el-icon>
              选择文件
            </el-button>
          </template>
          <template #tip>
            <div class="upload-tip">
              只能上传 xlsx/xls/csv 文件
            </div>
          </template>
        </el-upload>
      </div>

      <!-- 数据预览表格 -->
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        border
        style="width: 100%; margin-top: 20px"
      >
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
.excel-import {
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .upload-area {
    text-align: center;
    padding: 20px 0;

    .upload-tip {
      color: var(--el-text-color-secondary);
      font-size: 12px;
      margin-top: 10px;
    }
  }
}
</style>