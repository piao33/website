<template>
    <div class="product">
        <ul class="product-list">
            <li v-for="(item,index) in product_list" :key="index">
                <img :src="item.img" alt="product">
                <p class="title">{{ item.title }}</p>
                <span>{{ item.desc }}</span>
            </li>
        </ul>
    </div>
</template>
<script setup>
import img1 from '@/assets/img/szjr.jpg';
import img2 from '@/assets/img/rzzl.jpeg';
import img3 from '@/assets/img/jrmy.jpeg';
import img4 from '@/assets/img/zsfw.jpeg';
import img5 from '@/assets/img/szbq.jpg';
import img6 from '@/assets/img/szzf.jpeg';
import img7 from '@/assets/img/xnyy.jpg';
import img8 from '@/assets/img/tpfjk.jpg';
import img9 from '@/assets/img/ywhf.jpg';

import { reactive } from 'vue';

    let product_list = reactive([
        {img: img7, title: '新能源云', desc: '新能源云顺应能源革命与数字革命相融并进的趋势，充分考虑了中国能源资源禀赋特点和电网枢纽平台作用，将新一代信息技术与新能源全产业链、全价值链、全生态圈的业务深度融合，聚集全数据要素，提高整体资源配置能力，打造中国特色国际领先的新能源数字经济平台。'},
        {img: img8, title: '碳排放监控', desc: '通过综合观测、结合数值模拟、 统计分析等手段,获取温室气 体排放强度、环境中浓度、生 态系统碳汇等碳源汇状况及其 变化趋势信息，为应对气候变 化研究和管理提供服务支撑。'},
        {img: img9, title: '源网荷储', desc: '随着构建新型电力系统步伐加快，以风电、 光伏为代表的新能源在能源系统结构中比 重不断提升，但其波动性、间歇性和随机 性特点也给电网稳定运行带来挑战。而 “源网荷储”可促进供需两侧精准匹配， 最大化利用清洁能源，有效解决清洁能源 消纳及其产生的电网波动性等问题，提高 电力系统综合效率。'},
        {img: img1, title: '金融', desc: '利用区块链将资金、凭证等资产 融资租赁 数字化，打通企业经营中资产效 率低下环节，提升信用能力的同 贸易金融 时提高金融机构的风险控制，为企业提'},
        {img: img2, title: '融资租赁', desc: '将租赁公司的租赁商品进行链上记录 和流转，使得资产真实性被认可，获 得更好的资方融资，缓解租赁企业的 资金需求。'},
        {img: img3, title: '贸易金融', desc: '以区块链技术为基础，联合跨境贸 易平台、国内外银行、供应链服务 商等建立数字化国际贸易和金融服 务平台。'},
        {img: img4, title: '认证及证书服务', desc: '围绕区块链技术体系的学习、认 证考试服务，以及全链路隐私加 密保护，链上存证的一站式证书 颁发、管理、核验等全周期服务。'},
        {img: img5, title: '数字版权', desc: '依托于区块链和AI技术，解决了文化产业中最痛的“保护”和“商业化”两大命题，打通了版权保护产业全链路。'},
        {img: img6, title: '数字政府', desc: '基于区块链的数据可信共享和协同，提高各级政府治理工作的协作效率和 服务创新、推动政府数据开放共享， 助力可信“数字政府”建设。'},
    ])
</script>
<style lang="less" scoped>
    .product{
        width: 100%;
        .max1280();
        margin: 0 auto;
        .product-list{
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            flex-wrap: wrap;
            li{
                width: 30%;
                margin-bottom: 40px;
                img{
                    vertical-align: top;
                    width: 100%;
                    height: 220px;
                    border-radius: 6px;
                    box-shadow: #ccc 0 0 2px;
                    object-fit: cover;
                }
                p{
                    font-size: 18px;
                    font-weight: 500;
                    margin: 12px 0 8px;
                }
            }
        }
    }
</style>
  