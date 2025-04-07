<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

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

// 搜索表单
const searchForm = ref({
  name: '',
  category: '',
  status: ''
})

/**
 * 获取产品列表
 */
const fetchProductList = async () => {
  try {
    loading.value = true
    // const res = await getProductList({
    //   ...searchForm.value,
    //   page: pagination.value.currentPage,
    //   size: pagination.value.pageSize
    // })
    // tableData.value = res.data.list
    // pagination.value.total = res.data.total
  } catch (error) {
    console.error('获取产品列表失败:', error)
    ElMessage.error('获取产品列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 处理搜索
 */
const handleSearch = () => {
  pagination.value.currentPage = 1
  fetchProductList()
}

/**
 * 重置搜索条件
 */
const resetSearch = () => {
  searchForm.value = {
    name: '',
    category: '',
    status: ''
  }
  handleSearch()
}

/**
 * 处理删除产品
 * @param {number} id - 产品ID
 */
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确认删除该产品吗？', '提示', {
      type: 'warning'
    })
    // await deleteProduct(id)
    ElMessage.success('删除成功')
    fetchProductList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

/**
 * 处理状态变更
 * @param {Object} row - 行数据
 */
const handleStatusChange = async (row) => {
  try {
    // await updateProductStatus({
    //   id: row.id,
    //   status: row.status
    // })
    ElMessage.success('状态更新成功')
  } catch (error) {
    console.error('状态更新失败:', error)
    ElMessage.error('状态更新失败')
    row.status = !row.status // 恢复状态
  }
}

// 页面加载时获取数据
onMounted(fetchProductList)
</script>

<template>
  <div class="pro-list">
    <!-- 搜索区域 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="产品名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入产品名称"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item label="产品分类">
          <el-select v-model="searchForm.category" placeholder="请选择分类" clearable>
            <el-option label="分类1" value="1" />
            <el-option label="分类2" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="上架" :value="1" />
            <el-option label="下架" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据表格 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <span>产品列表</span>
          <el-button type="primary" @click="router.push('/pro/add')">
            添加产品
          </el-button>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="产品名称" min-width="150" />
        <el-table-column prop="category" label="产品分类" width="120" />
        <el-table-column prop="price" label="价格" width="120">
          <template #default="{ row }">
            ¥{{ row.price?.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100" />
        <el-table-column prop="sales" label="销量" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="router.push(`/pro/edit/${row.id}`)">
              编辑
            </el-button>
            <el-button type="danger" link @click="handleDelete(row.id)">
              删除
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
          @size-change="fetchProductList"
          @current-change="fetchProductList"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.pro-list {
  padding: 20px;

  .search-card {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>