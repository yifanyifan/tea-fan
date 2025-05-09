/**
 * Vuex Store 主文件
 * @module store
 */

// src/store/index.js
// import a from "tea-cll"
import { createStore } from "vuex"
// 导入数据持久化操作的创建函数
import createPersistedState from "vuex-persistedstate"

//导入状态模块
import student from './student'
import counter from './modules/counter'
import claim from './claim'

/**
 * 用户信息接口
 * @typedef {Object} UserInfo
 * @property {boolean} loginStatus - 登录状态
 * @property {string} adminname - 管理员名称
 */

/**
 * 全局状态接口
 * @typedef {Object} RootState
 * @property {number} count - 计数器
 * @property {UserInfo} userInfo - 用户信息
 * @property {Object|null} userAll - 用户权限信息
 * @property {string} currentPath - 当前路由路径
 * @property {string[]} list - 列表数据
 */

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
        /**
         * 更新计数
         * @param {RootState} state - 状态对象
         * @param {number} value - 新的计数值
         */
        updateCount(state, value) {
            state.count = value
        },
        /**
         * 更新用户信息
         * @param {RootState} state - 状态对象
         * @param {UserInfo} userInfo - 新的用户信息
         */
        updateUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        /**
         * 更新用户权限
         * @param {RootState} state - 状态对象
         * @param {Object} userAll - 新的用户权限信息
         */
        updateUserAll(state, userAll) {
            state.userAll = userAll
        },
        /**
         * 更新当前路由路径
         * @param {RootState} state - 状态对象
         * @param {string} value - 新的路由路径
         */
        updateCurrentPath(state, value) {
            state.currentPath = value;
        }
    },
    // 异步修改数据的地方
    actions: {
        /**
         * 异步增加计数
         * @param {Object} context - 上下文对象
         * @param {Function} context.commit - 提交mutation的方法
         * @param {RootState} context.state - 状态对象
         * @param {number} amount - 增加的数量
         */
        async incrementAsync({ commit, state }, amount) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            commit('updateCount', state.count + amount)
        }
    },
    // 是 vuex 中的计算属性（可以认为是 store 的计算属性）
    getters: {
        /**
         * 获取列表计数
         * @param {RootState} state - 状态对象
         * @returns {number} 列表长度乘以10
         */
        getListCount(state) {
            return state.list.length * 10
        },
        /**
         * 获取计数的两倍
         * @param {RootState} state - 状态对象
         * @returns {number} 计数的两倍
         */
        doubleCount: state => state.count * 2
    },
    // 状态模块
    modules: {
        student,
        counter,
        claim
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