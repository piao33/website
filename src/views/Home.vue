<template>
    <div class="homepage">
        <Swiper
            class="home-swiper"
            :modules="modules"
            :slides-per-view="1"
            :space-between="50"
            :pagination="{ clickable: true }"
            :navigation="{ clickable: true }"
            :loop="true"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
        >
            <swiper-slide v-for="(item, index) in swiper_list" :key="index">
                <div class="swiper-item">
                    <img object-fit="cover" :src="item.img_path" alt="banner img">
                </div>
            </swiper-slide>
        </Swiper>
        <img src="@/assets/img/sy5.png" alt="荣誉" class="rongyu">
        <h2 class="title">为建设具有中国特色国际领先的能源互联网企业而奋斗</h2>
        <div class="energy">
            <div class="energy-img">
                <p>公示公告</p>
                <span>国家电网公司司歌《光明之路》2023/01/10</span>
                <img src="@/assets/img/sy8.png" alt="">
            </div>
            <div class="energy-text">
                <p>
                    <span>e起节电”共享绿色低碳美好生活</span>
                    习近平总书记在 党的二十大报告中指出，“实施全面节约战略，推进各类 资源节约集约利用”。国家电网有限公司深入贯彻落实全 面节约战略，结合我国居民用电特点，发挥网上国网平台 优势，创新开展居民“e起节电”活动，引导全社会科学 用电、节约用电、合理用电，有效带动全社会节能降碳提 效，推动形成绿色低碳的生产生活方式，营造勤俭节约、 合理用能的社会风尚。
                </p>
                <p>
                    <span>王月鹏：兢兢业业扎根带电作业一线</span>
                    王月鹏，国网北 京昌平供电公司线缆运检中心配电不停电作业室班长，曾 获得全国劳动模范、国家电网配网不停电作业专业首席专 家称号。他深耕带电作业领域25年，带领团队研发11项国 家级专利，发表论文13篇，出版著作1部，编写规程、标 准及作业指导书15项。
                </p>
            </div>
        </div>
        <h2 class="special-title">专题专栏</h2>
        <div class="special">
            <div class="special-img">
                <img src="@/assets/img/ztzl1.png" alt="">
            </div>
            <div class="special-text">
                <span>一线风采</span>
                <p>吉林松原公司：靠前服务保障农产品出口用电2023- 09-08 </p>
                <p>河北雄安公司：实现数字人民币电网业务场景全覆 盖2023-09-07 </p>
                <p>安徽宿州公司：精准对接重点项目用电需求2023-09- 06</p>
                <p>浙江丽水公司：数智手段提升办电服务质效2023-09- 05</p>
                <p>辽宁朝阳公司：启动“龙鸟展翼”青年人才培养引 领工程2023-09-04</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { reactive } from 'vue';
import img1 from '@/assets/img/sw1.png'
import img2 from '@/assets/img/sw2.png'
import img3 from '@/assets/img/sw3.png'

    let modules = reactive([Navigation, Pagination, Scrollbar, A11y]);
    let swiper_list = reactive([
        // {img_path: import('@/assets/img/sw1.png')},
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
            --swiper-navigation-color: @black;/* 单独设置按钮颜色 */
            --swiper-navigation-size: 50px;/* 设置按钮大小 */

            .swiper-item{
                height: 100%;
                img{
                    height: 100%;
                    vertical-align: top;
                }
            }
        }
        .rongyu{
            vertical-align: top;
            width: 100%;
            .max1280();
        }
        .title{
            font-size: 24px;
            margin: 12px;
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
                p{
                    margin-bottom: 50px;
                    color: @gray;
                    text-align: left;
                    span{
                        font-size: 20px;
                        color: @black;
                    }
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
