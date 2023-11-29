<template>
    chart
    <el-button @click="goBackend">跳转去后台</el-button>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import {useUserStore} from '@/stores/user'

    const store = useUserStore()
    const router = useRouter()
    
    const goBackend = () => {
        window.open('http://192.168.1.22/index')
    }

</script>

<style lang="less" scoped>
    
</style>
  