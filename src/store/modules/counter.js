// 计数器模块
export default {
  // 开启命名空间
  namespaced: true,

  // 状态
  state: {
    count: 0
  },

  // getter
  getters: {
    doubleCount: state => state.count * 2
  },

  // mutation
  mutations: {
    // 增加计数
    increment(state, amount) {
      state.count += amount
    }
  },

  // action
  actions: {
    // 异步增加计数
    incrementAsync({ commit }, amount) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('increment', amount)
          resolve()
        }, 1000)
      })
    }
  }
} 