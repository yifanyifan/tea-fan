<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userApi, roleApi } from '@/api/user'
import { routes } from '@/router/index.js'
import { now } from 'lodash'

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
  status: ''
})

// 表单对话框
const dialogVisible = ref(false)
const dialogTitle = ref('添加管理员')
const formRef = ref(null)
const formData = ref({
  username: '',
  password: '',
  realName: '',
  phone: '',
  email: '',
  roleIds: [],
  status: 1
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  roleIds: [
    { type: 'array', required: true, message: '请选择角色', trigger: 'change' }
  ]
}

/**
 * 获取管理员列表
 */
const fetchAdminList = async () => {
  try {
    loading.value = true
    const res = await userApi.getList()
    tableData.value = res.data
  } catch (error) {
    console.error('获取管理员列表失败:', error)
    ElMessage.error('获取管理员列表失败')
  } finally {
    loading.value = false
  }
}

const fetchRoleList = async () => {
  try {
    const res = await roleApi.getAll()
    roleOptions.value = res.data
  } catch (error) {
    console.error('获取角色列表失败:', error)
    ElMessage.error('获取角色列表失败')
  }
}

/**
 * 处理添加/编辑
 * @param {Object} row - 行数据（编辑时传入）
 */
const handleEdit = async (row = null) => {
  dialogTitle.value = row ? '编辑管理员' : '添加管理员'
  if (row) {
    const roleRes = await roleApi.getRoles(row.id)
    formData.value = { 
      ...row,
      roles: roleRes.data.map(role => role.id)
    }
  } else {
    formData.value = {
      username: '',
      password: '',
      realName: '',
      phone: '',
      email: '',
      roleIds: [],
      status: 1
    }
  }
  dialogVisible.value = true
}

/**
 * 提交表单
 */
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    const api = formData.value.id ? userApi.update : userApi.add
    await api(formData.value)
    ElMessage.success(`${dialogTitle.value}成功`)
    dialogVisible.value = false
    fetchAdminList()
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error('提交失败')
  }
}

/**
 * 处理删除
 * @param {number} id - 管理员ID
 */
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确认删除该管理员吗？', '提示', {
      type: 'warning'
    })
    await userApi.delete(id)
    ElMessage.success('删除成功')
    fetchAdminList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

// 页面加载时获取数据
onMounted(fetchAdminList)
</script>

<template>
  <div class="manager-list">
    <!-- 搜索区域 -->
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="用户名">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            clearable
            @keyup.enter="fetchAdminList"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchAdminList">查询</el-button>
          <el-button @click="searchForm = {}">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据表格 -->
    <el-card>
      <template #header>
        <div class="card-header">
          <span>管理员列表</span>
          <el-button type="primary" @click="handleEdit()">
            添加管理员
          </el-button>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="realName" label="姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="roles" label="角色" min-width="150">
          <template #default="{ row }">
            <el-tag
              v-for="role in row.roles"
              :key="role.id"
              size="small"
              style="margin-right: 5px"
            >
              {{ role.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
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
          @size-change="fetchAdminList"
          @current-change="fetchAdminList"
        />
      </div>
    </el-card>

    <!-- 表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            :disabled="!!formData.id"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="formData.id ? [] : rules.password"
        >
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="formData.realName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select
            v-model="formData.roleIds"
            multiple
            placeholder="请选择角色"
          >
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.name"
              :value="role.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="formData.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.manager-list {
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
