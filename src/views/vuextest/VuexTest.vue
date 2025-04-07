<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  name: 'VuexTest',
  
  data() {
    return {
      // 本地数据
      localCount: 0
    }
  },

  computed: {
    // 从 Vuex 映射状态
    ...mapState({
      count: state => state.count,
      userInfo: state => state.userInfo
    }),
    // 从 Vuex 映射 getter
    ...mapGetters(['doubleCount'])
  },

  methods: {
    // 从 Vuex 映射 mutations
    ...mapMutations(['updateCount']),

    /**
     * 同步增加计数
     * @param {number} amount - 增加的数量
     */
    handleIncrement(amount = 1) {
      this.updateCount(this.count + amount)
    },

    /**
     * 异步增加计数
     * @param {number} amount - 增加的数量
     */
    async handleIncrementAsync(amount = 1) {
      try {
        // 模拟异步操作
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.updateCount(this.count + amount)
        ElMessage.success('异步增加成功')
      } catch (error) {
        ElMessage.error('操作失败')
      }
    },

    /**
     * 重置计数
     */
    handleReset() {
      this.updateCount(0)
      ElMessage.info('计数已重置')
    }
  }
}
</script>

<template>
  <div class="vuex-test">
    <el-card class="test-card">
      <template #header>
        <div class="card-header">
          <span>Vuex 状态管理测试</span>
          <el-tag type="info">
            当前用户: {{ userInfo.adminname || '未登录' }}
          </el-tag>
        </div>
      </template>

      <!-- 状态展示区域 -->
      <el-descriptions :column="1" border>
        <el-descriptions-item label="当前计数">
          {{ count }}
        </el-descriptions-item>
        <el-descriptions-item label="双倍计数">
          {{ doubleCount }}
        </el-descriptions-item>
      </el-descriptions>

      <!-- 操作按钮区域 -->
      <div class="button-group">
        <el-row :gutter="20" justify="center">
          <el-col :span="24" class="text-center">
            <el-button-group>
              <el-button
                type="primary"
                :icon="Plus"
                @click="handleIncrement(1)"
              >
                增加 1
              </el-button>
              <el-button
                type="success"
                :icon="Plus"
                @click="handleIncrement(5)"
              >
                增加 5
              </el-button>
            </el-button-group>
          </el-col>

          <el-col :span="24" class="text-center margin-top">
            <el-button-group>
              <el-button
                type="warning"
                :icon="Timer"
                @click="handleIncrementAsync(1)"
              >
                异步增加 1
              </el-button>
              <el-button
                type="danger"
                :icon="Timer"
                @click="handleIncrementAsync(5)"
              >
                异步增加 5
              </el-button>
            </el-button-group>
          </el-col>

          <el-col :span="24" class="text-center margin-top">
            <el-button
              type="info"
              :icon="RefreshRight"
              @click="handleReset"
            >
              重置计数
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.vuex-test {
  padding: 20px;

  .test-card {
    max-width: 600px;
    margin: 0 auto;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .button-group {
      margin-top: 20px;

      .text-center {
        text-align: center;
      }

      .margin-top {
        margin-top: 15px;
      }

      .el-button-group {
        .el-button {
          margin: 0;
          
          &:not(:last-child) {
            margin-right: -1px;
          }
        }
      }
    }
  }
}
</style>