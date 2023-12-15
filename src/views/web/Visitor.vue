<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="keepAliveRouters">
            <component :is="Component" ></component>
        </keep-alive>
    </router-view>
</template>
<script setup>
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router';

const router = useRouter();

function calcKeepAliveRouters() {
    let arr = [];
    router.getRoutes().forEach(item => {
        if(item?.meta?.keepAlive) {
            arr.push(item.meta.componentName);
        }
    })
    return arr;
}
let keepAliveRouters = calcKeepAliveRouters();  
</script>
<style lang="less" scoped>
   
</style>
