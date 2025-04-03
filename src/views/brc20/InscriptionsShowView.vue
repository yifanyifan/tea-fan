<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 表格数据
const tableData = ref([])
// 加载状态
const loading = ref(false)
// 分页配置
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 搜索条件
const searchForm = ref({
  inscriptionId: '',
  type: '',
  status: ''
})

/**
 * 获取铭文列表数据
 */
const fetchInscriptionsList = async () => {
  try {
    loading.value = true
    // 这里添加实际的API调用
    // const res = await getInscriptionsList({
    //   page: pagination.value.currentPage,
    //   size: pagination.value.pageSize,
    //   ...searchForm.value
    // })
    // tableData.value = res.data.list
    // pagination.value.total = res.data.total
  } catch (error) {
    console.error('获取数据失败:', error)
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

/**
 * 处理搜索
 */
const handleSearch = () => {
  pagination.value.currentPage = 1
  fetchInscriptionsList()
}

/**
 * 重置搜索条件
 */
const resetSearch = () => {
  searchForm.value = {
    inscriptionId: '',
    type: '',
    status: ''
  }
  handleSearch()
}

/**
 * 查看铭文详情
 * @param {string} id - 铭文ID
 */
const viewDetail = (id) => {
  window.open(`https://ordinals.com/inscription/${id}`, '_blank')
}

// 页面加载时获取数据
onMounted(fetchInscriptionsList)
</script>

<template>
  <div class="inscriptions-container">
    <!-- 搜索表单 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="铭文ID">
          <el-input
            v-model="searchForm.inscriptionId"
            placeholder="请输入铭文ID"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchForm.type" placeholder="请选择类型" clearable>
            <el-option label="Deploy" value="deploy" />
            <el-option label="Mint" value="mint" />
            <el-option label="Transfer" value="transfer" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="已确认" value="confirmed" />
            <el-option label="待确认" value="pending" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据表格 -->
    <el-card>
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="inscriptionId" label="铭文ID" min-width="180" />
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="ticker" label="Ticker" width="100" />
        <el-table-column prop="amount" label="数量" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'confirmed' ? 'success' : 'warning'">
              {{ row.status === 'confirmed' ? '已确认' : '待确认' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              @click="viewDetail(row.inscriptionId)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="fetchInscriptionsList"
          @current-change="fetchInscriptionsList"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.inscriptions-container {
  padding: 20px;

  .search-card {
    margin-bottom: 20px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }

  :deep(.el-tag) {
    width: 60px;
    text-align: center;
  }
}
</style>