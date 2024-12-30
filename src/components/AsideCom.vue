<!-- 菜单 -->
<script>
    import { Avatar } from "@element-plus/icons-vue"
    import { mapState } from 'vuex'

    export default {
        data () {
            return {
                // 写死的菜单数据
                menuList: [
                    {
                        id: 1,
                        name: "首页",
                        url: "home",
                        submenus: []
                    },
                    {
                        id: 2,
                        name: "用户管理",
                        url: "user",
                        submenus: [
                            { id: 1, name: "查看用户", url: "view" },
                            { id: 2, name: "添加用户", url: "add" }
                        ]
                    },
                    {
                        id: 3,
                        name: "设置",
                        url: "settings",
                        submenus: [
                            { id: 1, name: "系统设置", url: "system" },
                            { id: 2, name: "权限管理", url: "permissions" }
                        ]
                    },
                    {
                        id: 4,
                        name: "合约概览",
                        url: "banner",
                        submenus: [
                        {
                            id: 1,
                            name: "合约概览图",
                            url: "bannerlist"
                        }
                        ]
                    },
                    {
                        id: 5,
                        name: "BRC20",
                        url: "brc20",
                        submenus: [
                        {
                            id: 1,
                            name: "BRC20列表",
                            url: "inscriptionslist"
                        },
                        {
                            id: 2,
                            name: "BRC20列表",
                            url: "brc20list"
                        }
                        ]
                    }
                ],
                currentPath: 'home'  // 当前选中的菜单项
            }
        },
        computed: {
            // ...mapState(['currentPath', 'userAll'])
            // 计算属性，返回过滤后的菜单
            filteredMenuList() {
                return this.menuList.map(item => {
                    // 只返回有子菜单的项
                    return {
                        ...item,
                        submenus: item.submenus.filter(child => child) // 确保子菜单项不为空
                    };
                }).filter(item => item.submenus.length > 0 || item.submenus.length === 0); // 可以根据需要过滤没有子菜单的项
            }
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
        <!-- 通过计算属性渲染菜单 -->
        <el-menu-item v-for="(item, index) in filteredMenuList" :key="item.id" :index="item.url">
            <span>{{ item.name }}</span>
        </el-menu-item>

        <el-sub-menu v-for="(item, index) in filteredMenuList" :key="item.id" :index="item.url">
            <template #title>
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>{{ item.name }}</span>
            </template>
            <!-- 子菜单项 -->
            <el-menu-item v-for="(child, idx) in item.submenus" :key="child.id" :index="`/${item.url}/${child.url}`">
                {{ child.name }}
            </el-menu-item>
        </el-sub-menu>
        <!-- <el-menu-item>首页</el-menu-item> -->
        <!-- <el-sub-menu v-for="item in userAll.menuList" :key="item.id" :index="item.url">
            <template #title>
                <el-icon>
                    <Avatar/>
                </el-icon>
                <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="child in item.submenus" :key="child.url" :index="`/${item.url}/${child.url}`">
                {{ child.name }}
            </el-menu-item>
        </el-sub-menu> -->
    </el-menu>
</template>