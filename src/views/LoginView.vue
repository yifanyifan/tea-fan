<script>
import { ElMessage } from 'element-plus'
import md5 from 'md5'
import axios from 'axios'
// 导入数据请求的方法
import { loginFn } from '@/api/user'

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'LoginView',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  // computed: {
  //   ...mapState(['count'])
  // },
  methods: {
    //将mutation里的函数映射到组件, 以便在该组件中直接使用
    // ...mapMutations(['updateUserInfo']),
    submitFormTea() {
      // this.$router.push('/')
      //更新用户登录状态
      // loginStatus = {"loginStatus": true}
      // this.$store.commit('updateUserInfo', loginStatus);
    },
    // submitForm() {
    //   //登录
    //   loginFn({
    //     username: this.username,
    //     password: this.password
    //   }).then(res => {
    //     if(res.code != '200') {
    //       //未注册
    //       ElMessage.error(res.msg)
    //       return
    //     } else {
    //       //第一种修改数据的方法
    //       //this.$store.commit('updateUserInfo', res.data);
    //       // 第二种修改数据的方法
    //       this.updateUserInfo(res.data);
    //       localStorage.setItem('token', res.data.token);
    //       this.$router.push('/')
    //     }
    //   })
    // }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="form-wrap">
      <h2 class="header">封神登录</h2>
      <el-input v-model="username" placeholder="请输入账号" />
      <el-input class="psw" show-password type="password" v-model="password" @keyup.enter="submitForm" placeholder="请输入密码" />
      <el-button type="success" @click="submitFormTea">登录</el-button>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  background-color: #dbe4ff;

  .form-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 360px;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 15px;
    padding: 32px 32px 20px;

    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .psw {
      margin-top: 10px;
    }
    .el-button {
      width: 100%;
      margin-top: 10px;
    } 
  }
}
</style>
