<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'

// 路由实例
const router = useRouter()

// 表单引用
const formRef = ref(null)
// 加载状态
const loading = ref(false)

// 表单数据
const bannerForm = reactive({
  title: '',
  imageUrl: '',
  link: '',
  sort: 0,
  status: 1
})

// 表单验证规则
const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  imageUrl: [
    { required: true, message: '请上传图片', trigger: 'change' }
  ],
  sort: [
    { required: true, message: '请输入排序号', trigger: 'blur' },
    { type: 'number', message: '排序号必须为数字' }
  ]
}

/**
 * 图片上传成功回调
 * @param {Object} response - 上传响应结果
 */
const handleUploadSuccess = (response) => {
  if (response.code === 200) {
    bannerForm.imageUrl = response.data
    ElMessage.success('图片上传成功')
  } else {
    ElMessage.error(response.message || '上传失败')
  }
}

/**
 * 图片上传前的校验
 * @param {File} file - 上传的文件对象
 * @returns {boolean} 是否通过校验
 */
const beforeUpload = (file) => {
  // 文件类型校验
  const isImage = /^image\/(jpeg|png|gif|jpg)$/.test(file.type)
  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  
  // 文件大小校验（2MB）
  const isLt2M = file.size / 1024 / 1024 < 2
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
    
    // 调用添加Banner接口
    // const res = await addBanner(bannerForm)
    
    ElMessage.success('添加成功')
    router.push('/banner/list')
  } catch (error) {
    console.error('提交表单错误:', error)
    ElMessage.error(error.message || '提交失败')
  } finally {
    loading.value = false
  }
}

/**
 * 重置表单
 */
const resetForm = () => {
  formRef.value?.resetFields()
  bannerForm.imageUrl = ''
}
</script>

<template>
  <div class="banner-add">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>添加轮播图</span>
          <el-button @click="router.push('/banner/list')">返回列表</el-button>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="bannerForm"
        :rules="rules"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="标题" prop="title">
          <el-input 
            v-model="bannerForm.title"
            placeholder="请输入标题"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="图片" prop="imageUrl">
          <el-upload
            class="banner-uploader"
            :action="`${import.meta.env.VITE_API_URL}/upload`"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            accept="image/*"
          >
            <img
              v-if="bannerForm.imageUrl"
              :src="bannerForm.imageUrl"
              class="banner-image"
            >
            <el-icon v-else class="banner-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">建议尺寸：750x350像素，最大2MB</div>
        </el-form-item>

        <el-form-item label="链接" prop="link">
          <el-input 
            v-model="bannerForm.link"
            placeholder="请输入链接地址"
          />
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input-number 
            v-model="bannerForm.sort"
            :min="0"
            :max="999"
          />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="bannerForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submitForm">
            提交
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.banner-add {
  padding: 20px;

  .form-card {
    max-width: 800px;
    margin: 0 auto;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .banner-uploader {
    :deep(.el-upload) {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary);
      }
    }
  }

  .banner-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    line-height: 178px;
  }

  .banner-image {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: cover;
  }

  .upload-tip {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    margin-top: 8px;
  }
}
</style>