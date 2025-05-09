/**
 * 认领模块
 * @module claim
 */

/**
 * 认领信息接口
 * @typedef {Object} ClaimState
 * @property {string} name - 认领名称
 * @property {number} age - 认领年龄
 * @property {string} sex - 认领性别
 * @property {string} status - 认领状态
 * @property {string} [description] - 认领描述
 */

export default {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 模块状态
   * @returns {ClaimState} 认领状态对象
   */
  state() {
    return {
      name: '高举',
      age: 20,
      sex: '中',
      status: 'pending',
      description: ''
    }
  },

  /**
   * 状态修改方法
   */
  mutations: {
    /**
     * 更新认领信息
     * @param {ClaimState} state - 状态对象
     * @param {Partial<ClaimState>} payload - 更新的认领信息
     */
    updateClaim(state, payload) {
      Object.assign(state, payload)
    },

    /**
     * 更新认领状态
     * @param {ClaimState} state - 状态对象
     * @param {string} status - 新的状态
     */
    updateStatus(state, status) {
      state.status = status
    },

    /**
     * 更新认领描述
     * @param {ClaimState} state - 状态对象
     * @param {string} description - 新的描述
     */
    updateDescription(state, description) {
      state.description = description
    }
  },

  /**
   * 异步操作
   */
  actions: {
    /**
     * 异步提交认领
     * @param {Object} context - 上下文对象
     * @param {Function} context.commit - 提交mutation的方法
     * @param {ClaimState} context.state - 状态对象
     * @param {Partial<ClaimState>} payload - 认领信息
     */
    async submitClaim({ commit, state }, payload) {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        commit('updateClaim', { ...payload, status: 'submitted' })
        return true
      } catch (error) {
        console.error('提交认领失败:', error)
        return false
      }
    }
  },

  /**
   * 计算属性
   */
  getters: {
    /**
     * 获取认领完整信息
     * @param {ClaimState} state - 状态对象
     * @returns {string} 认领完整信息
     */
    getClaimInfo: state => `${state.name} - ${state.age}岁 - ${state.sex} - ${state.status}`,

    /**
     * 判断认领是否已提交
     * @param {ClaimState} state - 状态对象
     * @returns {boolean} 是否已提交
     */
    isSubmitted: state => state.status === 'submitted'
  }
}