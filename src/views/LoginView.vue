<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import md5 from 'md5'
import loginFn from '@/api/user'

export default {
  name: 'LoginView',

  setup() {
    const router = useRouter()
    const store = useStore()

    // 表单数据
    const loginForm = reactive({
      username: '',
      password: ''
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
      ]
    }

    // 表单引用
    const formRef = ref(null)
    // 加载状态
    const loading = ref(false)

    /**
     * 测试登录方法
     */
    const handleTestLogin = () => {
      // 模拟登录成功
      router.push('/')
      // 更新用户登录状态
      store.commit('updateUserInfo', {
        loginStatus: true,
        adminname: 'yifan'
      })
      // 更新用户权限
      store.commit('updateUserAll', {
        menuList: [
          {
            id: '1',
            url: 'banner',
            name: '合约',
            submenus: [
              {
                id: '2',
                url: 'bannerlist',
                name: '多空比'
              }
            ]
          }
        ]
      })
      ElMessage.success('登录成功')
    }

    /**
     * 正式登录方法
     */
    const handleLogin = async () => {
      if (!formRef.value) return

      try {
        await formRef.value.validate()
        loading.value = true

        // 调用登录接口
        const res = await loginFn({
          username: loginForm.username,
          password: md5(loginForm.password)
        })

        if (res.code === '200') {
          // 更新用户信息
          store.commit('updateUserInfo', res.data)
          // 保存 token
          localStorage.setItem('token', res.data.token)
          // 跳转到首页
          router.push('/')
          ElMessage.success('登录成功')
        } else {
          ElMessage.error(res.msg || '登录失败')
        }
      } catch (error) {
        console.error('登录失败:', error)
        ElMessage.error('登录失败')
      } finally {
        loading.value = false
      }
    }

    return {
      loginForm,
      rules,
      formRef,
      loading,
      handleTestLogin,
      handleLogin
    }
  }
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2 class="login-title">系统登录</h2>
      </template>

      <el-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            show-password
            placeholder="请输入密码"
            :prefix-icon="Lock"
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <div class="button-group">
          <el-button
            type="primary"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
          <el-button
            type="success"
            @click="handleTestLogin"
          >
            测试登录
          </el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dbe4ff;
  background-image: linear-gradient(45deg, #dbe4ff 0%, #f8f9fa 100%);

  .login-card {
    width: 400px;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    .login-title {
      text-align: center;
      margin: 0;
      color: #333;
      font-size: 24px;
    }

    :deep(.el-form-item) {
      margin-bottom: 20px;

      .el-form-item__label {
        padding-bottom: 8px;
      }

      .el-input__wrapper {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
    }

    .button-group {
      display: flex;
      gap: 16px;
      margin-top: 30px;

      .el-button {
        flex: 1;
        height: 40px;
      }
    }
  }
}
</style>
