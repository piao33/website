<template>
    <div class="homepage">
        <Swiper
            class="home-swiper"
            :modules="modules"
            :slides-per-view="1"
            :space-between="50"
            :pagination="{ clickable: true }"
            :navigation="{ clickable: true }"
            loop
            :speed="800"
            :autoplay="{
                delay: 3000,
                disableOnInteraction: false,
            }"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <swiper-slide v-for="(item, index) in swiper_list" :key="index">
                <div class="swiper-item">
                    <img :src="item.rcPath" :alt="item.rcTitle">
                </div>
            </swiper-slide>
        </Swiper>
        <div class="content">

            <p class="title" :title="notice.title">{{notice.title}}</p>
            <div class="energy">
                <div class="energy-img">
                    <img :src="notice.coverImage" alt="">
                </div>
                <div class="energy-text">
                    <div v-html="notice.contentHtml"></div>
                </div>
            </div>
            <p class="title" :title="special.title">{{special.title}}</p>
            <div class="energy">
                <div class="energy-img">
                    <img :src="special.coverImage" alt="">
                </div>
                <div class="energy-text">
                    
                    <div v-html="special.contentHtml"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue'
import { safeHtml } from '@/utils';
import { getBannerApi, getNoticeApi, getSpecialApi }  from '@/api/home';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/controller';

import { reactive, ref } from 'vue';

    let swiper_list = ref([])
    let notice = ref({})
    let special = ref({})

    async function getBanner() {
        let {rows} = await getBannerApi();
        swiper_list.value = rows
    }
    getBanner();

    async function getSpecial() {
        let {data} = await getSpecialApi();
        data.contentHtml = safeHtml(data.contentHtml)
        special.value = data
    }
    getSpecial();

    async function getNotice() {
        let {data} = await getNoticeApi();
        data.contentHtml = safeHtml(data.contentHtml)
        notice.value = data
    }
    getNotice();
    
    let modules = reactive([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    function onSwiper(e) {

    }
    function onSlideChange(e) {

    }

</script>

<style lang="less" scoped>
    .homepage{
        text-align: center;
        .content{
            .max1280();
            margin: 20px auto 0;
            .title{
                font-size: 20px;
                color: @green;
                margin-bottom: 16px;
                width: 50%;
                .one-line-ellipsis();
            }
        }
        .home-swiper{
            height: 500px;
            margin-top: @nav-height-minus;

            --swiper-theme-color: @green;/* 设置Swiper风格 */
            --swiper-navigation-color: #fff;/* 单独设置按钮颜色 */
            --swiper-navigation-size: 50px; /* 设置按钮大小 */
            --swiper-pagination-color: #fff;

            .swiper-item{
                height: 100%;
                img{
                    height: 100%;
                    width: 100%;
                    vertical-align: top;
                    object-fit: cover;
                }
            }
        }
        .energy{
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            margin-bottom: 24px;
            .energy-text{
                margin-left: 20px;
                flex-shrink: 1;
                text-align: left;
                color: @gray;
            }
            .energy-img{
                flex-shrink: 0;
                width: 50%;
                p{
                    font-size: 20px;
                }
                img{
                    width: 100%;
                    vertical-align: top;
                }
            }
        }
    }
</style>
