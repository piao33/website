<template>
    <div class="service">
        <h2>定价原则</h2>
        <p class="desc">我们为您提供了针对60多种云服务的定价策略和方法。通过包年包月、按量付费、资源包等多种定价方 式，使您能够根据您的业务需求选择预算，满足您不同业务、使用场景对成本节约需求。</p>
        <ul class="price-rule">
            <li v-for="(item, index) in price_rule_list" :key="index">
                <img :src="item.img" alt="">
                <p>{{ item.title }}</p>
                <span>{{ item.text }}</span>
            </li>
        </ul>
        <h2>产品服务详情</h2>
        <ul class="service-box">
            <li v-for="(item, index) in service_list">
                <div class="button" :class="{'active': choose_index == index}" @click="chooseService(index)">{{item.name}}</div>
                <div class="img-list" v-show="choose_index == index">
                    <img :src="imgitem" alt="" v-for="imgitem in item.img_list">
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import img1 from '@/assets/img/fwdj1.png';
import img2 from '@/assets/img/fwdj2.png';
import img3 from '@/assets/img/fwdj3.png';
import img4 from '@/assets/img/cpdj5.png';
import img5 from '@/assets/img/cpdj6.png';
import img6 from '@/assets/img/cpdj7.png';
import img7 from '@/assets/img/cpdj8.png';
import img8 from '@/assets/img/txjs1.png';
import img9 from '@/assets/img/txjs2.png';
import img10 from '@/assets/img/txjs3.png';

import { reactive, ref } from 'vue';

    let choose_index = ref(0);
    let service_list = reactive([
        {name: '热门产品', img_list: [img4, img5, img6, img7]},
        {name: '弹性计算', img_list: [img8, img9, img10,]},
        {name: '数据库', img_list: [img4, img5, img6, img7]},
        {name: '存储与CDN', img_list: [img8, img9, img10,]},
        {name: '大规模计算', img_list: [img4, img5, img6, img7]},
        {name: '云盾', img_list: [img8, img9, img10,]},
        {name: '应用服务', img_list: [img4, img5, img6, img7]},
        {name: '互联网中间件', img_list: [img8, img9, img10,]},
        {name: '移动服务', img_list: [img4, img5, img6, img7]},
    ])
    let price_rule_list = reactive([
        {img: img1, text: '您可以通过包年包月付费提前预留资源，同时享 受极大的价格优惠，帮您最大程度节省支出； 或者选择按量付费服务，仅在您使用期间计费， 为您提供更灵活选择。', title: '两种付费方式帮您最大程度节省支出'},
        {img: img2, text: '阿里云采用阶梯定价原则，您的业务越大，在阿 里云上的成本会越低； 使用量越大，计费单价越低；使用时间越长，折 扣越多，最高优惠力度可达30%。', title: '使用越多越便宜'},
        {img: img3, text: '若您初次使用云产品，可享产品首购折 扣、一定使用量免费等优惠服务； 阿里云新产品发布，您还有机会获得免 费体验名额，0成本体验最新云计算成果', title: '低成本云上服务初体验'},
    ])
    function chooseService(index) {

        this.choose_index = index;
    }
</script>
<style lang="less" scoped>
    .service{
        .max1280();
        .marginAuto();
        h2{
            font-size: 28px;
            text-align: center;
            color: @green;
            &:nth-of-type(2){
                margin-top: 60px;
            }
        }
        .desc{
            margin: 20px 0 0;
        }
        .price-rule{
            margin: 64px 0 32px;
            display: flex;
            justify-content: space-between;
            li{
                width: 32%;
                text-align: center;
                img{
                    width: 300px;height: 150px;
                    vertical-align: top;
                }
                p{
                    font-size: 20px;
                    margin: 18px 0;
                }
                span{
                    font-size: 16px; 
                    color: @gray;
                }
            }
        }
        .service-box{
            display: flex;
            position: relative;
            margin-top: 24px;
            li{
                border-right: 1px solid green;
                &:nth-last-child(1){
                    border:none;
                }
                .button{
                    padding: 0 24px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .active{
                    color: @green;
                    // font-size: 16px;
                    font-weight: 500;
                    transform: scale(1.2);
                    transform-origin: center;
                    transition: all 0.3s;
                }
                .img-list{
                    position: absolute;
                    left:0;
                    top: 40px;
                    width: 100%;
                    img{
                        width: 190px;height: 170px;
                        vertical-align: top;
                        margin: 0 12px;
                    }
                }
            }
        }
    }
</style>
  