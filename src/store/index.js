// src/store/index.js
// import a from "tea-cll"
import { createStore } from "vuex"
// 导入数据持久化操作的创建函数
import createPersistedState from "vuex-persistedstate"

//导入状态模块
import student from './student'
import counter from './modules/counter'

// 定义全局状态的实例
const store = createStore({
    // 严格模式，在生产环境中不要打开
    strict: process.env.NODE_ENV !== 'production',
    //定义全局状态有哪些
    state () {
        //全局状态
        return {
            count: 0,
            // 放用户信息的对象
            userInfo: {
                loginStatus: false,
                adminname: ''
            },
            userAll: null,
            //记录当前的路由路径
            currentPath: '/',
            list: ['q','w','e','r']
        }
    },
    // 唯一修改数据的方法
    mutations: {
        // 更新计数
        updateCount(state, value) {
            state.count = value
        },
        // 更新用户信息
        updateUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        // 更新用户权限
        updateUserAll(state, userAll) {
            state.userAll = userAll
        },
        //修改路由路径的方法
        updateCurrentPath(state, value) {
            state.currentPath = value;
        }
    },
    // 异步修改数据的地方
    actions: {
        // 异步操作示例
        async incrementAsync({ commit, state }, amount) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            commit('updateCount', state.count + amount)
        }
    },
    // 是 vuex 中的计算属性（可以认为是 store 的计算属性）
    getters: {
        //state 就是全局状态
        getListCount(state) {
            return state.list.length * 10
        },
        doubleCount: state => state.count * 2
    },
    // 状态模块
    modules: {
        student,
        counter
    },
    // vuex配置插件
    plugins: [
        // 创建持久化对象
        createPersistedState({
            // 需要持久化的状态
            paths: ['count', 'userInfo', 'userAll']
        })
    ]
})

// 导出创建好的实例
export default store