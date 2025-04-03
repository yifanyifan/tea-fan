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

// 搜索表单
const searchForm = ref({
  username: '',
  phone: '',
  status: ''
})

/**
 * 获取用户列表
 */
const fetchUserList = async () => {
  try {
    loading.value = true
    // const res = await getUserList({
    //   ...searchForm.value,
    //   page: pagination.value.currentPage,
    //   size: pagination.value.pageSize
    // })
    // tableData.value = res.data.list
    // pagination.value.total = res.data.total
  } catch (error) {
    console.error('获取用户列表失败:', error)
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 处理搜索
 */
const handleSearch = () => {
  pagination.value.currentPage = 1
  fetchUserList()
}

/**
 * 重置搜索条件
 */
const resetSearch = () => {
  searchForm.value = {
    username: '',
    phone: '',
    status: ''
  }
  handleSearch()
}

/**
 * 处理状态变更
 * @param {Object} row - 行数据
 */
const handleStatusChange = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确认${row.status === 1 ? '禁用' : '启用'}该用户吗？`,
      '提示',
      {
        type: 'warning'
      }
    )
    // await updateUserStatus({
    //   id: row.id,
    //   status: row.status === 1 ? 0 : 1
    // })
    ElMessage.success('操作成功')
    fetchUserList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('操作失败:', error)
      ElMessage.error('操作失败')
    }
    row.status = row.status === 1 ? 0 : 1 // 恢复状态
  }
}

// 页面加载时获取数据
onMounted(fetchUserList)
</script>

<template>
  <div class="user-list">
    <!-- 搜索区域 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="用户名">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model="searchForm.phone"
            placeholder="请输入手机号"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="0" />
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
          <span>用户列表</span>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip />
        <el-table-column prop="balance" label="余额" width="120">
          <template #default="{ row }">
            {{ row.balance?.toFixed(2) }}
          </template>
        </el-table-column>
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
        <el-table-column prop="registerTime" label="注册时间" width="180" />
        <el-table-column prop="lastLoginTime" label="最后登录" width="180" />
      </el-table>

      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="fetchUserList"
          @current-change="fetchUserList"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.user-list {
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