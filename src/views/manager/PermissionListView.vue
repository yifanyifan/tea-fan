<script>
import { permissionList, addAdmin, updateAdmin, deletePermission, permissionAll, addPermission } from '@/api/user'

import { routes } from '@/router/index.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { now } from 'lodash'
import { ref, onMounted } from 'vue'

export default {
    setup() {
        // 表格数据
        const tableData = ref([])
        // 加载状态
        const loading = ref(false)

        // 对话框控制
        const dialogVisible = ref(false)
        const dialogTitle = ref('添加权限')
        const formRef = ref(null)

        // 表单数据
        const formData = ref({
            name: '',
            code: '',
            type: 'menu',
            parentId: 0,
            path: '',
            icon: '',
            sort: 0
        })

        // 表单验证规则
        const rules = {
            name: [
                { required: true, message: '请输入权限名称', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '请输入权限编码', trigger: 'blur' },
                { pattern: /^[A-Z_]+$/, message: '只能包含大写字母和下划线', trigger: 'blur' }
            ],
            type: [
                { required: true, message: '请选择权限类型', trigger: 'change' }
            ]
        }

        /**
         * 获取权限列表
         */
        const fetchPermissionList = async () => {
            try {
                loading.value = true
                // const res = await getPermissionList()
                // tableData.value = res.data
            } catch (error) {
                console.error('获取权限列表失败:', error)
                ElMessage.error('获取权限列表失败')
            } finally {
                loading.value = false
            }
        }

        /**
         * 处理添加/编辑权限
         * @param {Object} row - 行数据（编辑时传入）
         */
        const handleEdit = (row = null) => {
            dialogTitle.value = row ? '编辑权限' : '添加权限'
            if (row) {
                formData.value = { ...row }
            } else {
                formData.value = {
                    name: '',
                    code: '',
                    type: 'menu',
                    parentId: 0,
                    path: '',
                    icon: '',
                    sort: 0
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
                // const api = formData.value.id ? updatePermission : addPermission
                // await api(formData.value)
                ElMessage.success(`${dialogTitle.value}成功`)
                dialogVisible.value = false
                fetchPermissionList()
            } catch (error) {
                console.error('提交失败:', error)
                ElMessage.error('提交失败')
            }
        }

        /**
         * 处理删除权限
         * @param {number} id - 权限ID
         */
        const handleDelete = async (id) => {
            try {
                await ElMessageBox.confirm('确认删除该权限吗？', '提示', {
                    type: 'warning'
                })
                // await deletePermission(id)
                ElMessage.success('删除成功')
                fetchPermissionList()
            } catch (error) {
                if (error !== 'cancel') {
                    console.error('删除失败:', error)
                    ElMessage.error('删除失败')
                }
            }
        }

        // 页面加载时获取数据
        onMounted(fetchPermissionList)

        return {
            tableData,
            loading,
            dialogVisible,
            dialogTitle,
            formRef,
            formData,
            rules,
            fetchPermissionList,
            handleEdit,
            submitForm,
            handleDelete
        }
    }
}
</script>

<template>
    <div class="permission-list">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>权限列表</span>
                    <el-button type="primary" @click="handleEdit()">
                        添加权限
                    </el-button>
                </div>
            </template>

            <el-table
                v-loading="loading"
                :data="tableData"
                border
                row-key="id"
                :tree-props="{ children: 'children' }"
            >
                <el-table-column prop="name" label="权限名称" />
                <el-table-column prop="code" label="权限编码" />
                <el-table-column prop="type" label="类型" width="100">
                    <template #default="{ row }">
                        <el-tag :type="row.type === 'menu' ? 'primary' : 'success'">
                            {{ row.type === 'menu' ? '菜单' : '按钮' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="path" label="路径" />
                <el-table-column prop="icon" label="图标" width="100">
                    <template #default="{ row }">
                        <el-icon v-if="row.icon">
                            <component :is="row.icon" />
                        </el-icon>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序" width="100" />
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
                <el-form-item label="权限名称" prop="name">
                    <el-input
                        v-model="formData.name"
                        placeholder="请输入权限名称"
                    />
                </el-form-item>
                <el-form-item label="权限编码" prop="code">
                    <el-input
                        v-model="formData.code"
                        placeholder="请输入权限编码"
                        :disabled="!!formData.id"
                    />
                </el-form-item>
                <el-form-item label="权限类型" prop="type">
                    <el-radio-group v-model="formData.type">
                        <el-radio label="menu">菜单</el-radio>
                        <el-radio label="button">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上级权限" prop="parentId">
                    <el-tree-select
                        v-model="formData.parentId"
                        :data="tableData"
                        :props="{
                            label: 'name',
                            children: 'children'
                        }"
                        check-strictly
                        default-expand-all
                        placeholder="请选择上级权限"
                    />
                </el-form-item>
                <el-form-item
                    v-if="formData.type === 'menu'"
                    label="路径"
                    prop="path"
                >
                    <el-input
                        v-model="formData.path"
                        placeholder="请输入路径"
                    />
                </el-form-item>
                <el-form-item
                    v-if="formData.type === 'menu'"
                    label="图标"
                    prop="icon"
                >
                    <el-input
                        v-model="formData.icon"
                        placeholder="请输入图标名称"
                    />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input-number
                        v-model="formData.sort"
                        :min="0"
                        :max="999"
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
.permission-list {
    padding: 20px;

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
