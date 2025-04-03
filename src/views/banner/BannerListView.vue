<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

// 路由实例
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

/**
 * 获取轮播图列表
 */
const fetchBannerList = async () => {
  try {
    loading.value = true
    // 调用获取列表接口
    // const res = await getBannerList({
    //   page: pagination.value.currentPage,
    //   size: pagination.value.pageSize
    // })
    // tableData.value = res.data.list
    // pagination.value.total = res.data.total
  } catch (error) {
    console.error('获取列表失败:', error)
    ElMessage.error('获取列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 处理删除操作
 * @param {number} id - 轮播图ID
 */
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确认删除该轮播图吗？', '提示', {
      type: 'warning'
    })
    // 调用删除接口
    // await deleteBanner(id)
    ElMessage.success('删除成功')
    fetchBannerList()
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
    // 调用更新接口
    // await updateBannerStatus({
    //   id: row.id,
    //   status: row.status
    // })
    ElMessage.success('状态更新成功')
  } catch (error) {
    console.error('状态更新失败:', error)
    ElMessage.error('状态更新失败')
    row.status = !row.status
  }
}

/**
 * 处理排序变更
 * @param {Object} row - 行数据
 */
const handleSortChange = async (row) => {
  try {
    // 调用更新接口
    // await updateBannerSort({
    //   id: row.id,
    //   sort: row.sort
    // })
    ElMessage.success('排序更新成功')
  } catch (error) {
    console.error('排序更新失败:', error)
    ElMessage.error('排序更新失败')
    fetchBannerList()
  }
}

// 页面加载时获取数据
onMounted(fetchBannerList)
</script>

<template>
  <div class="banner-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>轮播图列表</span>
          <el-button type="primary" @click="router.push('/banner/add')">
            添加轮播图
          </el-button>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="title" label="标题" min-width="150" />
        
        <el-table-column label="图片" width="200">
          <template #default="{ row }">
            <el-image
              :src="row.imageUrl"
              :preview-src-list="[row.imageUrl]"
              fit="cover"
              class="banner-image"
            />
          </template>
        </el-table-column>

        <el-table-column prop="link" label="链接" min-width="200" show-overflow-tooltip />

        <el-table-column label="排序" width="120">
          <template #default="{ row }">
            <el-input-number
              v-model="row.sort"
              :min="0"
              :max="999"
              @change="handleSortChange(row)"
            />
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="fetchBannerList"
          @current-change="fetchBannerList"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.banner-list {
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .banner-image {
    width: 100px;
    height: 60px;
    border-radius: 4px;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>