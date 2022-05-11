<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/fire.png" alt="" />
                <span>森林火灾三维展示系统</span>
            </div>
            <el-button type="info" @click="logout()">退出</el-button>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse()">|||</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu
                    active-text-color="#409BFF"
                    background-color="#333744"
                    text-color="#fff"
                    unique-opened
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                    :default-active="activePath"
                >
                    <!-- 一级菜单 -->
                    <el-submenu
                        :index="item.id + ''"
                        v-for="item in menulist"
                        :key="item.id"
                    >
                        <!-- 一级菜单的模板区域 -->
                        <template #title>
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{ item.authName }}</span>
                        </template>
                        <!-- 二级菜单 -->
                        <el-menu-item
                            :index="'/' + subItem.path"
                            v-for="subItem in item.children"
                            :key="subItem.id"
                            @click="saveNavState('/' + subItem.path)"
                        >
                            <template #title>
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{ subItem.authName }}</span>
                            </template></el-menu-item
                        >
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { ref, reactive } from 'vue';
export default {
    created() {
        this.getMenuList();
        this.activePath = window.sessionStorage.getItem('activePath');
    },
    data() {
        return {
            // 左侧菜单数据
            menulist: [],
            iconsObj: {
                125: 'iconfont icon-user',
                103: 'iconfont icon-tijikongjian',
                101: 'iconfont icon-shangpin',
                102: 'iconfont icon-danju',
                145: 'iconfont icon-baobiao',
            },
            // 是否折叠
            isCollapse: false,
            // 被激活的链接地址
            activePath: '',
        };
    },
    methods: {
        logout() {
            window.sessionStorage.removeItem('token');
            this.$router.push('/login');
            this.$message.success('成功退出');
        },
        // 获取所有的菜单
        async getMenuList() {
            const { data: res } = await this.$http.get('menus');
            if (res.meta.status != 200)
                return this.$message.error(res.mate.msg);
            this.menulist = res.data;
        },
        // 点击按钮，切换菜单的折叠与展开
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        // 保存链接的激活状态
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath);
            this.activePath = activePath;
        },
    },
};
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
}

.el-header {
    height: 100px !important;
    background-color: #135455;
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    align-items: center;
    color: #fff;
    font-size: 30px;
    > div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
        img {
            height: 90px;
            padding: 0 30px;
        }
    }
}

.el-aside {
    background-color: #333744;
    .el-menu {
        border-right: none;
    }
}

.el-main {
    background-color: #eaedf1;
}

.iconfont {
    margin-right: 20px;
}

.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    color: #fff;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
}
</style>
