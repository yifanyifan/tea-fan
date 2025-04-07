<script>
// 在项目中 万物皆模块
import zfb from "../assets/zfb.png";
import { Fold,Expand } from "@element-plus/icons-vue"
//@ 代表是 src 路径
import AsideCom from "@/components/AsideCom.vue";
// import BreadCrumbCom from "@/components/BreadCrumbCom.vue";
// import { getUserAll } from '@/api/user'
import { mapMutations } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default {
  name: 'HomeView',
  //数据属性
  data () {
    return {
      url: zfb
    }
  },
  // 生命周期函数
  mounted() {
    //用户未登录
    if(!this.$store.state.userInfo.loginStatus) {
      this.$router.push('/login');
    }
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
  components: {
    // Fold,
    // Expand,
    AsideCom,
    // BreadCrumbCom
  },
  methods: {
    // ...mapMutations(['updateUserAll']),
    // setCount () {
    //   this.$store.dispatch('addnumActions', 5)
    // },
    logout() {
      //清除本地存储
      localStorage.clear();
      this.$router.push("/login");
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    
    // 侧边栏折叠状态
    const collapse = ref(false)
    
    // 计算属性：侧边栏宽度
    const asideWidth = computed(() => collapse.value ? '64px' : '200px')
    // 计算属性：logo 右边距
    const logoWidth = computed(() => collapse.value ? '0px' : '10px')
    // 计算属性：头部图标
    const headerLeft = computed(() => collapse.value ? Expand : Fold)

    /**
     * 检查登录状态
     */
    const checkLoginStatus = () => {
      if (!store.state.userInfo.loginStatus) {
        router.push('/login')
      }
    }

    /**
     * 退出登录
     */
    const handleLogout = () => {
      // 清除本地存储
      localStorage.clear()
      // 重置 Vuex 状态
      store.commit('updateUserInfo', {
        loginStatus: false,
        adminname: ''
      })
      store.commit('updateUserAll', null)
      // 跳转到登录页
      router.push('/login')
      ElMessage.success('已退出登录')
    }

    // 生命周期钩子
    onMounted(() => {
      checkLoginStatus()
    })

    return {
      url,
      collapse,
      asideWidth,
      logoWidth,
      headerLeft,
      handleLogout
    }
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧侧边栏 -->
      <el-aside :width="asideWidth">
        <div class="logo-box">
          <el-image style="width: 152px; height: 32px;" :src="url" />
        </div>

        <!-- 菜单，使用自定义组件,collapse 用来判断是否收起侧边栏的值 -->
        <AsideCom :collapse="collapse"/>
      </el-aside>

      <!-- 右侧侧边栏 -->
      <el-container>
        <el-header>
          <el-icon size="30" @click="collapse = !collapse">
            <component :is="headerLeft"></component>
          </el-icon>
          <span>欢迎 {{ $store.state.userInfo.adminname }} <button @click="handleLogout">退出</button></span>
        </el-header>

        <!-- 主体内容 -->
        <el-main>
          <BreadCrumbCom/>
          <!-- <br/>
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