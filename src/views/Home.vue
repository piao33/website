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
                    <img :src="item.img_path" alt="banner img">
                </div>
            </swiper-slide>
        </Swiper>
        <h2 class="title">为建设具有中国特色国际领先的能源互联网企业而奋斗</h2>
        <div class="energy">
            <div class="energy-img">
                <p>公示公告</p>
                <img src="@/assets/img/sytpleft1.png" alt="">
            </div>
            <div class="energy-text">
                <span>e起节电”共享绿色低碳美好生活</span>
                <p>
                    习近平总书记在 党的二十大报告中指出，“实施全面节约战略，推进各类 资源节约集约利用”。国家电网有限公司深入贯彻落实全 面节约战略，结合我国居民用电特点，发挥网上国网平台 优势，创新开展居民“e起节电”活动，引导全社会科学 用电、节约用电、合理用电，有效带动全社会节能降碳提 效，推动形成绿色低碳的生产生活方式，营造勤俭节约、 合理用能的社会风尚。
                </p>
            </div>
        </div>
        <div class="energy">
            <div class="energy-img">
                <p>专题专栏</p>
                <img src="@/assets/img/sytpleft1.png" alt="">
            </div>
            <div class="energy-text">
                <span>e起节电”共享绿色低碳美好生活</span>
                <p>
                    习近平总书记在 党的二十大报告中指出，“实施全面节约战略，推进各类 资源节约集约利用”。国家电网有限公司深入贯彻落实全 面节约战略，结合我国居民用电特点，发挥网上国网平台 优势，创新开展居民“e起节电”活动，引导全社会科学 用电、节约用电、合理用电，有效带动全社会节能降碳提 效，推动形成绿色低碳的生产生活方式，营造勤俭节约、 合理用能的社会风尚。
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/controller';

import { reactive } from 'vue';
import img1 from '@/assets/img/sylb1.jpg'
import img2 from '@/assets/img/sylb2.jpg'
import img3 from '@/assets/img/sylb3.jpg'


    let modules = reactive([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
    let swiper_list = reactive([
        {img_path: img1},
        {img_path: img2},
        {img_path: img3},
    ])
    function onSwiper(e) {

    }
    function onSlideChange(e) {

    }

</script>

<style lang="less" scoped>
    .homepage{
        text-align: center;
        h2{
            color: @green;
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
        .title{
            font-size: 24px;
            margin: 24px 12px 12px;
        }
        .energy{
            font-size: 16px;
            .max1280();
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            align-items: end;
            .energy-text{
                margin-left: 20px;
                flex-shrink: 1;
                text-align: left;
                p{
                    color: @gray;
                }
                span{
                    font-size: 20px;
                    color: @black;
                }
            }
            .energy-img{
                flex-shrink: 0;
                width: 40%;
                p{
                    font-size: 20px;
                }
                img{
                    margin-top: 20px;
                    width: 100%;
                    vertical-align: top;
                }
            }
        }
        .special-title{
            font-size: 24px;
            margin-top: 50px;
        }
        .special{
            font-size: 16px;
            .max1280();
            margin: 10px auto 30px;
            display: flex;
            justify-content: flex-start;
            align-items: end;
            
            .special-text{
                margin-left: 20px;
                flex-shrink: 1;
                text-align: left;
                span{
                    font-size: 20px;
                }
                p{
                    color: @gray;
                    text-align: left;
                    margin:12px 0;
                }
            }
            .special-img{
                flex-shrink: 0;
                width: 40%;
                img{
                    margin-top: 20px;
                    width: 100%;
                    vertical-align: top;
                }
            }
        }
    }
</style>
