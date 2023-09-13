<template>
    <div class="product">
        <ul class="product-list">
            <li v-for="(item,index) in product_list" :key="index">
                <img :src="item.img" object-fit="cover" alt="product">
            </li>
        </ul>
    </div>
</template>
<script setup>
import img1 from '@/assets/img/lsdt.png';
import img2 from '@/assets/img/rzzl.png';
import img3 from '@/assets/img/rzzs.png';
import img4 from '@/assets/img/szbq.png';
import img5 from '@/assets/img/szzf.png';
import img6 from '@/assets/img/jr.png';
import { reactive } from 'vue';

    let product_list = reactive([
        {img: img1},
        {img: img2},
        {img: img3},
        {img: img4},
        {img: img5},
        {img: img6},
    ])
</script>
<style lang="less" scoped>
    .product{
        width: 100%;
        .max1280();
        margin: 0 auto;
        .product-list{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            li{
                width: 30%;
                margin: 18px 0;
                img{
                    vertical-align: top;
                    width: 100%;height: 300px;
                }
            }
        }
    }
</style>
  