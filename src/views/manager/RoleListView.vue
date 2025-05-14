<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { roleApi, permissionApi } from '@/api/user'
import { routes } from '@/router/index.js'
import { now } from 'lodash'

// 表格数据
const tableData = ref([])
// 加载状态
const loading = ref(false)

// 对话框控制
const dialogVisible = ref(false)
const dialogTitle = ref('添加角色')
const formRef = ref(null)

// 表单数据
const formData = ref({
                id: '',
                name: '',
  code: '',
  description: '',
            permissions: []
})

// 权限树数据
const permissionTree = ref([])

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入角色编码', trigger: 'blur' },
    { pattern: /^[A-Z_]+$/, message: '只能包含大写字母和下划线', trigger: 'blur' }
  ]
}

/**
 * 获取角色列表
 */
const fetchRoleList = async () => {
  try {
    loading.value = true
    const res = await roleApi.getList()
    tableData.value = res.data
  } catch (error) {
    console.error('获取角色列表失败:', error)
    ElMessage.error('获取角色列表失败')
  } finally {
    loading.value = false
  }
}

/**
 * 获取权限树数据
 */
const fetchPermissionTree = async () => {
  try {
    const res = await permissionApi.getTree()
    permissionTree.value = res.data
  } catch (error) {
    console.error('获取权限树失败:', error)
    ElMessage.error('获取权限树失败')
  }
}

/**
 * 处理添加/编辑角色
 * @param {Object} row - 行数据（编辑时传入）
 */
const handleEdit = async (row = null) => {
  dialogTitle.value = row ? '编辑角色' : '添加角色'
  await fetchPermissionTree()
  
  if (row) {
    formData.value = { ...row }
  } else {
    formData.value = {
                id: '',
                name: '',
      code: '',
      description: '',
      permissions: []
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
    const api = formData.value.id ? roleApi.update : roleApi.add
    await api(formData.value)
    ElMessage.success(`${dialogTitle.value}成功`)
    dialogVisible.value = false
    fetchRoleList()
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error('提交失败')
  }
}

/**
 * 处理删除角色
 * @param {number} id - 角色ID
 */
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确认删除该角色吗？', '提示', {
      type: 'warning'
    })
    await roleApi.delete(id)
    ElMessage.success('删除成功')
    fetchRoleList()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败')
    }
  }
}

// 页面加载时获取数据
onMounted(fetchRoleList)
</script>

<template>
  <div class="role-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>角色列表</span>
          <el-button type="primary" @click="handleEdit()">
            添加角色
          </el-button>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="code" label="角色编码" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              @click="handleDelete(row.id)"
              :disabled="row.code === 'ADMIN'"
            >
              删除
            </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

    <!-- 表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      destroy-on-close
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入角色名称"
          />
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input
            v-model="formData.code"
            placeholder="请输入角色编码"
            :disabled="!!formData.id"
          />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="formData.description"
            type="textarea"
            placeholder="请输入描述"
          />
                </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-tree
            ref="permissionTreeRef"
            :data="permissionTree"
            show-checkbox
            node-key="id"
            :props="{
              label: 'name',
              children: 'children'
            }"
            v-model:checked-keys="formData.permissions"
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
.role-list {
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
