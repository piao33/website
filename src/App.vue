<script setup>
import { RouterView } from 'vue-router'
import navVue from '@/components/nav.vue';
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

<template>
    <navVue></navVue>
    <div class="content">
        <router-view v-slot="{ Component }">
            <keep-alive :include="keepAliveRouters">
                <component :is="Component" ></component>
            </keep-alive>
        </router-view>
    </div>
</template>

<style scoped>
    .content{
        width: 100%;
    }
</style>