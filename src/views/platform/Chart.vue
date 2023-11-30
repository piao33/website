<template>
    <div class="chart-content">
        <nav>
            <div class="backbtn navbtn" @click="goBack">
                <img src="@/assets/svg/back.svg" alt="">
                返回
            </div>
            <div class="info">
                <p class="title">区块链平台数据监测</p>
                <p class="account"><span class="time">{{ localDate }}</span></p>
            </div>
            <div class="gobtn navbtn" @click="goBackend">
                <img src="@/assets/svg/back.svg" alt="">
                数据后台
            </div>
        </nav>
        <ul class="card">
            <li>
                <p>上链总计</p>
                <span>328</span>
            </li>
            <li>
                <p>今日上链</p>
                <span>36</span>
            </li>
            <li>
                <p>区块总高度 300</p>
                <span>节点 4 个</span>
            </li>
            <li>
                <p>交易成功率 100%</p>
                <span>交易数 80</span>
            </li>
        </ul>
        <div class="chartbox">
            <div class="linebox">
                <div class="card-title"> XXXXXXXXXXXXXXX折线图</div>
                <el-radio-group text-color="#fff" fill="#FEBA63" v-model="lineMode" label="" size="default" class="radio">
                    <el-radio-button label="day">日</el-radio-button>
                    <el-radio-button label="month">月</el-radio-button>
                </el-radio-group>
                <div id="line"></div>
            </div>
            <div class="piebox">
                <div class="card-title">XXXXXXXXXXXXXXX饼图</div>
                <div id="pie"></div>
            </div>
        </div>
        <div class="tablebox">
            <div class="table table1">
                <div class="card-title"> XXXXXXXXXXXXXXX 表 1</div>
                <el-table 
                    ref="table1ref"
                    :data="tableData1" 
                    class="tb-con" 
                    :header-cell-style="{backgroundColor:'transparent'}" 
                    :header-row-style="{backgroundColor:'transparent'}" 
                    :row-style="{backgroundColor:'transparent'}" 
                    cell-class-name="cellClassName"
                >
                    <el-table-column prop="type" label="类型" />
                    <el-table-column prop="num" label="上链数量" />
                </el-table>
            </div>
            <div class="table table2">
                <div class="card-title"> XXXXXXXXXXXXXXX 表 2</div>
                <el-table 
                    ref="table2ref"
                    :data="tableData2" 
                    class="tb-con"
                    :header-cell-style="{backgroundColor:'transparent'}" 
                    :header-row-style="{backgroundColor:'transparent'}" 
                    :row-style="{backgroundColor:'transparent'}" 
                    cell-class-name="cellClassName"
                >
                    <el-table-column prop="height" label="区块高度" />
                    <el-table-column prop="hash" label="256哈希"/>
                    <el-table-column prop="deal" label="交易"/>
                    <el-table-column prop="createTime" label="生成时间" />
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '@/stores/user'
    import Scroll from '@/utils/tableScroll';

    const store = useUserStore()
    const router = useRouter()
    const $echarts = inject('$echarts')

    let myLineChart = null
    let myPieChart = null
    let timer = null
    let lineMode = ref('month')
    let localDate = ref(null)
    let table1ref = ref(null)
    let table2ref = ref(null)

    let tableData1 = ref([
        {type: '营销', num: '3234'},
        {type: '财务', num: '534'},
        {type: '电子交易', num: '2433'},
        {type: '物资', num: '2234'},
        {type: '新能源', num: '342'},
        {type: '碳排放', num: '334'},
        {type: '其他', num: '1234'},
    ])
    let tableData2 = ref([
        {height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32'},
        {height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32'},
        {height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32'},
        {height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32'},
        {height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32'},
    ])

    const table1Scroll = new Scroll()
    const table2Scroll = new Scroll()

    onMounted(async ()=>{
        initLine();
        initPie();
        getDate();
        timer = setInterval(() => {
            getDate()
        }, 500);

        table1Scroll.scroll(table1ref.value.$refs.bodyWrapper)
        table2Scroll.scroll(table2ref.value.$refs.bodyWrapper)
    })

    onUnmounted(()=>{
        myLineChart && myLineChart.dispose();
        myLineChart = null;
        myPieChart && myPieChart.dispose();
        myPieChart = null;

        table1Scroll.clearScroll()
        table2Scroll.clearScroll()
    })

    function getDate() {
        let d = new Date()
        let year = d.getFullYear()
        let month = (d.getMonth() + 1).toString().padStart(2, '0')
        let day = d.getDate().toString().padStart(2, '0')
        let hour = d.getHours().toString().padStart(2, '0')
        let min = d.getMinutes().toString().padStart(2, '0')
        let sec = d.getSeconds().toString().padStart(2, '0')

        localDate.value = `${year}-${month}-${day} ${hour}:${min}:${sec}`
    }
    
    const goBackend = () => {
        window.open('http://192.168.1.22/index')
    }
    const goBack = () => {
        router.back(1)
    }

    function initLine() {
        let chartDom = document.getElementById('line');
        myLineChart = $echarts.init(chartDom);
        let option = {
            tooltip: {
                trigger: 'axis',
                confine: true,
            },
            grid: {
                left: 40,
                top:60,
                bottom: 30,
                right: 30,
                // containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            color: ['#FBAC08'],
            yAxis: {
                type: 'value',
                axisLine: {
                    show: true
                },
                splitLine: {
                    lineStyle:{
                        type: 'dashed',
                        color: ['#ccc'],
                    }
                }
            },
            series: [
                {
                    name: '123',
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line',
                    stack: 'Total'
                }
            ]
        };

        myLineChart.setOption(option);

    }

    function initPie() {
        let chartDom = document.getElementById('pie');
        myPieChart = $echarts.init(chartDom);
        let option = {
            tooltip: {
                trigger: 'item'
            },
            backgroundColor: '#474544',
            legend: {
                // right: 12,
                bottom: 12,
                left: 'center',
                itemGap: 10,
                itemStyle:{
                    borderWidth: 0,
                },
                textStyle: {
                    color: "#fff"
                }
            },
            grid: {
                left: 0,
                top:0,
                bottom: 0,
                right: 0
            },
            color: ['#FEBA63', '#5099BC', '#A1D8D3', '#80C687', '#285960', '#9287E7', '#FF7C7C'],
            // color: ['#FEBA63', '#5099BC', '#A1D8D3', '#80C687', '#285960', '', ''],
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#474544',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 24,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '新能源云' },
                    { value: 735, name: '碳排放' },
                    { value: 580, name: '财务' },
                    { value: 484, name: '营销' },
                    { value: 300, name: '电力交易' },
                    { value: 240, name: '物资' },
                    { value: 640, name: '其他' }
                ]
                }
            ]
        };

        myPieChart.setOption(option);

    }
</script>

<style lang="less" scoped>
    :deep(.el-table__inner-wrapper::before){
        height: 0;
    }
    :deep(.el-table th.el-table__cell.is-leaf){
        border-bottom: 1px solid #6d6d63!important;
    }
    :deep(.cellClassName){
        border-bottom: 1px solid #6d6d63!important;
        color: #BCBCBB;
    }
    :deep(.el-radio-button__inner):hover{
        color: #f7cb90;
    }
    .chart-content{
        background-color: #0C0C0C;
        min-height: 100vh;
    }

    nav{
        padding: 6px 10px 0 10px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .navbtn{
            color: #BCBCBB;
            cursor: pointer;
            border: 1px solid #FEBA63;
            border-radius: 4px;
            padding: 3px 8px;
            display: flex;
            align-items: center;
            img{
                width: 20px;height: 20px;
                vertical-align: top;
                margin-right: 4px;
            }
            &:hover{
                color: #f7cb90;
            }
            &:active{
                color: #FEBA63;
            }
        }
        .backbtn{
            display: flex;
            align-items: center;
        }
        .gobtn{
            img{
                transform-origin: center;
                transform: rotate(180deg)
            }
        }
        .info{
            color: #BCBCBB;
            text-align: center;
            display: flex;
            align-items: center;
            .title{
                font-size: 22px;
                color: #FEBA63;
            }
            .account{
                margin-left: 12px;
                text-align: left;
                color: #FEBA63;
                width: 185px;
                .time{
                    display: inline-block;
                    white-space: nowrap;
                    text-align: left;
                    font-size: 18px;
                } 
                
            }
        }
    }
    .card{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 20px 0;
        li{
            width: 24%;
            height: 120px;
            border-radius: 8px;
            text-align: center;
            color: #fff;
            p{
                text-align: left;
                font-size: 16px;
                margin-top: 30px;
                margin-left: 12px;
            }
            span{
                font-size: 20px;
            }
            &:nth-child(1){
                // background: linear-gradient(60deg, #1b0a2e, #654887);
                background: linear-gradient(60deg, #FEBA63, #ffd196);
            }
            &:nth-child(2){
                // background: linear-gradient(60deg, #2e205a, #4f3996);
                background: linear-gradient(60deg, #5099BC, #91bccf);
            }
            &:nth-child(3){
                // background: linear-gradient(60deg, #2d2e66, #616298);
                background: linear-gradient(60deg, #285960, #55676b);
            }
            &:nth-child(4){
                // background: linear-gradient(60deg, #1c2952, #324b96);
                background: linear-gradient(60deg, #FF7C7C, #fb9494);
            }
        }
    }
    .chartbox{
        display: flex;
        padding: 20px 20px 0 20px;
        align-items: center;
    }
    .card-title{
        position: absolute;
        left: 20px;top: 10px;
        color: #BCBCBB;
        z-index: 100;
        line-height: 16px;
        &::after{
            content: '';
            position: absolute;
            left: -10px;top:0;
            width: 4px;
            height: 100%;
            background-color: #FEBA63;
        }
    }
    .linebox{
        height: 400px; 
        width: 60%;
        margin-right: 20px;
        background-color: #474544;
        border-radius: 8px;
        position: relative;
    }
    .radio{
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10;
    }
    .piebox{
        flex:1;
        height: 400px;
        background-color: #474544;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
    }
    #line{
        height: 100%;
    }
    #pie{
        height: 100%;
    }

    .tablebox{
        display: flex;
        padding: 20px;
        align-items: center;
    }
    .table{
        height: calc(100vh - 700px); 
        min-height: 300px;
        background-color: #474544;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        .tb-con{
            height: 100%;
            padding-top: 34px;
            background-color: transparent;
        }
    }
    .table1{
        margin-right: 20px;
        flex:1;
    }
    .table2{
        width: 60%;
    }
</style>
  