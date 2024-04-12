<script>
// 在项目中 万物皆模块
import zfb from "../assets/zfb.png";
import { Fold,Expand } from "@element-plus/icons-vue"
//@ 代表是 src 路径
import AsideCom from "@/components/AsideCom.vue";
import BreadCrumbCom from "@/components/BreadCrumbCom.vue";
// import { getUserAll } from '@/api/user'
// import { mapMutations } from 'vuex'

export default {
  //数据属性
  data () {
    return {
      // url: zfb
    }
  },
  // 生命周期函数
  mounted() {
    //用户未登录
    // if(!this.$store.state.userInfo.loginStatus){
      // this.$router.push('/login');
    // }
    //加载用户权限
    // getUserAll().then(res => {
    //   if(res.code != '200') {
    //     console.log(res);
    //     ElMessage.error(res.msg)
    //     return
    //   } else {
    //     //修改数据
    //     this.updateUserAll(res.data);
    //     //将 userAll 存到本地
    //     localStorage.setItem('userAll', JSON.stringify(res.data));
    //   }
    // })
  },
  //计算属性
  computed: {

  },
  //注册组件
  // components: {
  //   Fold,
  //   Expand,
  //   AsideCom,
  //   BreadCrumbCom
  // },
  methods: {
    //...mapMutations(['updateUserAll']),
    // setCount () {
    //   this.$store.dispatch('addnumActions', 5)
    // },
    // logout() {
    //   //清除本地存储
    //   localStorage.clear();
    //   this.$router.push("/login");
    // }
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧侧边栏 -->
      <!-- <el-aside>
        <div class="logo-box"> -->
          <!-- <el-image style="width: 152px; height: 32px;" :src="url" /> -->
          <!-- <h2 class="manage-title">一币封神</h2> -->
        <!-- </div>
      </el-aside> -->

      <!-- 右侧侧边栏 -->
      <el-container>
        <!-- <el-header>
          <el-icon size="30" @click="collapse = !collapse">
            <component :is="headerLeft"></component>
          </el-icon>
          <span>欢迎 {{ $store.state.userInfo.adminname }} <button @click="logout">退出</button></span>
        </el-header> -->

        <!-- 主体内容 -->
        <el-main>
          <BreadCrumbCom/>
          <!-- {{ $store.state.userInfo }}
          <br/>
          Main
          {{ $store.state.count }}
          <button @click="setCount">修改全局状态的方法</button> -->
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<!-- lang="scss" 定义样式是使用 sass 写的-->
<style lang="scss" scoped>
  .el-container {
    background-color: #f8f9fa;

    .el-aside {
      background-color: #d0edff;
      //直接将计算属性的值拿过来
      width: v-bind(asideWidth);
      /* overflow: hidden; */
      transition: all 0.1s;

      .logo-box {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;

        .el-image {
          //margin-right: 10px;
          margin-right: v-bind(logoWidth);
        }
        
        .manage-title {
          font-size: 16px;
        }
      }
    }
  }

  .el-header {
    background-color: #ced4da;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>