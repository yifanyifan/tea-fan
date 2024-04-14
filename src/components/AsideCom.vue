<!-- 菜单 -->
<script>
    import { Avatar } from "@element-plus/icons-vue"
    import { mapState } from 'vuex'

    export default {
        data () {
            return {

            }
        },
        computed: {
            ...mapState(['currentPath', 'userAll'])
        },
        props: ['collapse'],
        components: {
            Avatar
        },
        mounted() {
            
        },
    }
</script>

<template>
    <el-menu :default-active="currentPath" :collapse="collapse" router class="el-menu-vertical-demo">
        <el-menu-item>首页</el-menu-item>
        <el-sub-menu v-for="item in userAll.menuList" :key="item.id" :index="item.url">
            <template #title>
                <el-icon>
                    <Avatar/>
                </el-icon>
                <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="child in item.submenus" :key="child.url" :index="`/${item.url}/${child.url}`">
                {{ child.name }}
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>