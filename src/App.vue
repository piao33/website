<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navVue from './components/nav.vue';

</script>

<template>
    <navVue></navVue>
    <div class="content">
        <RouterView />
    </div>
</template>

<style scoped>
    .content{
        width: 100%;
    }
</style>