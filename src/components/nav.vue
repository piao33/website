<template>
    <nav :style="{'background': dark ? 'transparent' : 'rgba(255,255,255,0.5)'}">
        <div class="nav-box">
            <div class="logo-box">
                <img src="@/assets/svg/logo.svg" alt="logo" @click="$router.push('home')">
                <span>国网吉林省电力有限公司-区块链应用平台</span>
            </div>
            <div class="menu-box">
                <div class="menu-item" v-for="(menu_item, index) in menu" :key="index" :style="{'color': dark ? '#fff' : '#495060'}">
                    <RouterLink class="link" :class="{'active': $route.name == menu_item.routerName}" :to="menu_item.path">{{ menu_item.name }}</RouterLink>
                </div>
                <div class="options">
                    <img class="menu-button" @click="clickMenu" src="@/assets/img/Menu.png" alt="菜单">
                    <ul class="menu-item-option" v-show="show_menu">
                        <li  v-for="(menu_item, index) in menu" :key="index">
                            <RouterLink @click="clickMenu" class="link" :class="{'active': $route.name == menu_item.routerName}" :to="menu_item.path">{{ menu_item.name }}</RouterLink>
                        </li>
                    </ul>
                </div>
                <div class="login-box" @click="login" v-if="!isLogin">
                    登录 / 注册
                </div>
                <!-- <div v-else class="user-box">
                    <span>{{ user.name }}</span> <el-button @click="logout" type="text">退出</el-button>
                </div> -->
                <el-dropdown class="user-box" trigger="click" v-else>
                    <span class="el-dropdown-link">
                        {{ user.userName }}, 你好！
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"></path></svg>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="jumpPlatform">个人信息</el-dropdown-item>
                            <el-dropdown-item @click="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { RouterLink, useRouter, useRoute, routerKey } from 'vue-router';
    import { reactive, ref } from 'vue';
    import { useUserStore } from '@/stores/user';
    import { storeToRefs } from 'pinia';
    import { logoutApi }  from '@/api/user';
    
    
    const store = useUserStore()
    const {user, isLogin} = storeToRefs(store)

    const props = defineProps({
        dark: {
            type: Boolean,
            default: false,
        }
    })
    let router = useRouter()
    let route = useRoute()
    let show_menu = ref(false);
    let menu = reactive([
        {id: 1, name: '首页', path: '/web/home', routerName: 'home'},
        {id: 2, name: '产品服务', path: '/web/product', routerName: 'product'},
        {id: 3, name: '新闻动态', path: '/web/news', routerName: 'news'},
        {id: 4, name: '区块链特色', path: '/web/blockChain', routerName: 'blockChain'},
        {id: 5, name: '关于我们', path: '/web/about', routerName: 'about'},
    ])

    function login() {
        router.push('/web/login')
    }
    function clickMenu() {
        show_menu.value = !show_menu.value;
    }

    let logout = async ()=>{
        await logoutApi({tel: store.user.tel})
        store.clearUser()
        if(route.meta?.needLogin) {
            router.push('/web/login')
        }
    }
    let jumpPlatform = ()=>{
        router.push('/platform')
    }
</script>

<style lang="less" scoped>

    nav {
        width: 100%;
        position: relative;
        z-index: 100;
        // background-color: rgba(255,255,255,0.5);
    }
    .nav-box{
        .max1280();
        .marginAuto();
        width: 100%;
        height: @nav-height;
        display: flex;
        
        justify-content: space-between;
    }
    .logo-box{
        flex-shrink:0;
        height: 100%;
        color: @green-active;
        display: flex;
        align-items: center;
        font-size: 24px;
        img{
            width: @nav-height;
            cursor: pointer;
        }
    }
    .menu-box{
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-right: 24px;
        .options{
            position: relative;
            .menu-button{
                display: none;
                width: 30px;height: 30px;
                vertical-align: top;
                cursor: pointer;
            }
            .menu-item-option{
                display: none;
                position: absolute;
                left: 0;
                top: 40px;
                width: 100px;
                background: #fff;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                border-radius: 4px;
                padding: 8px;
                box-shadow: gray 0 0 3px;
                li{
                    margin: 8px 4px;
                    a{
                        flex-basis: 100%;
                        color: @black;
                    }
                }
            }
        }
        .menu-item{
            padding: 0 16px;
            font-size: 14px;
            text-align: center;
            color: @black;
            .link{
                color: inherit;
                &:hover{
                    color: @green;
                }
            }
        }
        .active{
            // font-size: 16px;
            transform-origin: center;
            display: inline-block;
            transform: scale(1.1);
            transition: all 0.3s;
            color: @green-active!important;
            font-weight: 500;
        }
    }
    .login-box{
        height: 20px;
        padding: 10px 12px;
        margin-left: 22px;
        box-sizing: content-box;
        line-height: 20px;  
        border-radius: 6px;
        background-color: @green;
        color: #fff;
        cursor: pointer;
        font-weight: 500;
        flex-shrink: 0;
        &:hover{
            background-color: @green-active;
        }
        &:active{
            animation: buttonAni 0.2s linear;
        }
        @keyframes buttonAni {
            0%{
                transform: scale(1);
            }
            40%{
                transform: scale(0.9);
            }
            100%{
                transform: scale(1);
            }
        }
    }
    .user-box{
        .el-dropdown-link {
            cursor: pointer;
            color: var(--el-color-primary);
            display: flex;
            align-items: center;
            outline: none;
            svg{
                width: 1em;height: 1em;
            }
        }
    }
    @media screen and (width <= 768px){
        .logo-box span{
            display: none;
        }
        nav .nav-box .menu-box .menu-item{
            padding: 0 10px;
        }
    }
    @media screen and (width <= 600px){

        nav .nav-box .menu-box .menu-item{
            display: none;
        }
        nav .nav-box .menu-box .options .menu-button{
            display: block;
        }
    }
</style>