<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref(null)
const loading = ref(false)

// 表单数据
const formData = ref({
  name: '',
  category: '',
  price: 0,
  stock: 0,
  description: '',
  images: [],
  status: 1
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入产品名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择产品分类', trigger: 'change' }
  ],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { type: 'number', min: 0, message: '价格必须大于等于0', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入库存', trigger: 'blur' },
    { type: 'number', min: 0, message: '库存必须大于等于0', trigger: 'blur' }
  ]
}

/**
 * 处理图片上传成功
 * @param {Object} response - 上传响应结果
 */
const handleUploadSuccess = (response) => {
  formData.value.images.push(response.data)
  ElMessage.success('上传成功')
}

/**
 * 处理图片上传之前的验证
 * @param {File} file - 上传的文件
 */
const beforeUpload = (file) => {
  const isImage = /^image\//.test(file.type)
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  return true
}

/**
 * 提交表单
 */
const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true
    // await addProduct(formData.value)
    ElMessage.success('添加成功')
    router.push('/pro/list')
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error('提交失败')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="add-pro">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>添加产品</span>
          <el-button @click="router.push('/pro/list')">返回列表</el-button>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="产品名称" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入产品名称"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="产品分类" prop="category">
          <el-select v-model="formData.category" placeholder="请选择分类">
            <el-option label="分类1" value="1" />
            <el-option label="分类2" value="2" />
          </el-select>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input-number
            v-model="formData.price"
            :precision="2"
            :step="0.1"
            :min="0"
          />
        </el-form-item>

        <el-form-item label="库存" prop="stock">
          <el-input-number
            v-model="formData.stock"
            :min="0"
            :precision="0"
          />
        </el-form-item>

        <el-form-item label="产品图片">
          <el-upload
            action="/api/upload"
            list-type="picture-card"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            multiple
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="产品描述">
          <el-input
            v-model="formData.description"
            type="textarea"
            rows="4"
            placeholder="请输入产品描述"
          />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="formData.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submitForm">
            提交
          </el-button>
          <el-button @click="router.push('/pro/list')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.add-pro {
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.el-upload--picture-card) {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
}
</style>