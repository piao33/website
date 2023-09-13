<template>
    <div class="about">
        <img :src="item.img" alt="" v-for="item in about_list">
    </div>
</template>
<script setup>
import img1 from '@/assets/img/gywm1.png';
import img2 from '@/assets/img/gywm2.png';
import img3 from '@/assets/img/gywm3.png';
import { reactive } from 'vue';

    let about_list = reactive([
        {img: img1},
        {img: img2},
        {img: img3},
    ])
</script>
<style lang="less" scoped>
    .about{
        .max1280();
        .marginAuto();
        img{
            width: 100%;
            vertical-align: top;
            margin: 24px 0;
        }
    }
</style>
