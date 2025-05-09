/**
 * 学生模块
 * @module student
 */

/**
 * 学生信息接口
 * @typedef {Object} StudentState
 * @property {string} name - 学生姓名
 * @property {number} age - 学生年龄
 * @property {string} sex - 学生性别
 */

export default {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 模块状态
   * @returns {StudentState} 学生状态对象
   */
  state() {
    return {
      name: '高举',
      age: 20,
      sex: '中'
    }
  },

  /**
   * 状态修改方法
   */
  mutations: {
    /**
     * 更新学生信息
     * @param {StudentState} state - 状态对象
     * @param {Partial<StudentState>} payload - 更新的学生信息
     */
    updateStudent(state, payload) {
      Object.assign(state, payload)
    },

    /**
     * 更新学生姓名
     * @param {StudentState} state - 状态对象
     * @param {string} name - 新的姓名
     */
    updateName(state, name) {
      state.name = name
    },

    /**
     * 更新学生年龄
     * @param {StudentState} state - 状态对象
     * @param {number} age - 新的年龄
     */
    updateAge(state, age) {
      state.age = age
    }
  },

  /**
   * 异步操作
   */
  actions: {
    /**
     * 异步更新学生信息
     * @param {Object} context - 上下文对象
     * @param {Function} context.commit - 提交mutation的方法
     * @param {StudentState} context.state - 状态对象
     * @param {Partial<StudentState>} payload - 更新的学生信息
     */
    async updateStudentAsync({ commit, state }, payload) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      commit('updateStudent', payload)
    }
  },

  /**
   * 计算属性
   */
  getters: {
    /**
     * 获取学生完整信息
     * @param {StudentState} state - 状态对象
     * @returns {string} 学生完整信息
     */
    getStudentInfo: state => `${state.name} - ${state.age}岁 - ${state.sex}`,

    /**
     * 判断是否成年
     * @param {StudentState} state - 状态对象
     * @returns {boolean} 是否成年
     */
    isAdult: state => state.age >= 18
  }
}