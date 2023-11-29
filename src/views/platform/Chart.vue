<template>
    <div class="chart-content">
        <nav>
            <div class="backbtn navbtn" @click="goBack">
                <img src="@/assets/svg/back.svg" alt="">
                返回
            </div>
            <div class="info">
                <p class="title">区块链平台数据监测</p>
                <p class="time"> 2023-11-29 14:34:32</p>
            </div>
            <div class="gobtn navbtn" @click="goBackend">
                <img src="@/assets/svg/back.svg" alt="">
                跳转去后台
            </div>
        </nav>
        <ul class="card">
            <li>
                <p>上链总计</p>
                <span>328</span>
            </li>
            <li>
                <p>今日上链</p>
                <span>328</span>
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
                <div id="line"></div>
            </div>
            <div class="piebox">
                <div id="pie"></div>
            </div>
        </div>
        <div class="tablebox">
            <div class="table table1">

            </div>
            <div class="table table2">

            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import {useUserStore} from '@/stores/user'

    const store = useUserStore()
    const router = useRouter()
    const $echarts = inject('$echarts')

    let myLineChart = ref(null)
    let myPieChart = ref(null)

    onMounted(()=>{
        initLine();
        initPie();
    })
    
    const goBackend = () => {
        window.open('http://192.168.1.22/index')
    }
    const goBack = () => {
        router.back(1)
    }

    function initLine() {
        let chartDom = document.getElementById('line');
        myLineChart.value = $echarts.init(chartDom);
        let option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            grid: {
                left: 40,
                top:60,
                bottom: 30,
                right: 30
            },
            color: ['#FBAC08'],
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
                }
            ]
        };

        myLineChart.value.setOption(option);

    }

    function initPie() {
        let chartDom = document.getElementById('pie');
        myPieChart.value = $echarts.init(chartDom);
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
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#ccc',
                    borderWidth: 1
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

        myPieChart.value.setOption(option);

    }
</script>

<style lang="less" scoped>
    .chart-content{
        background-color: #0C0C0C;
        min-height: 100vh;
    }

    nav{
        height: 30px;
        background-color: #044474;
        .navbtn{
            position: absolute;
            color: #BCBCBB;
            cursor: pointer;
            height: 20px;
            line-height: 20px;
            img{
                width: 20px;height: 20px;
                vertical-align: top;
                margin-right: 4px;
            }
            &:hover{
                color: #A4E4BC;
            }
            &:active{
                color: #048C04;
            }
        }
        .backbtn{
            left:10px;
            top: 5px;
            
            display: flex;
            align-items: center;
        }
        .gobtn{
            right: 10px;
            top: 5px;
            img{
                transform-origin: center;
                transform: rotate(180deg)
            }
        }
        .info{
            margin: 0 auto ;
            color: #BCBCBB;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 30px;
            .title{
                font-size: 18px;
                margin-right: 12px;
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
            background-color: #D9BEF7;
            // display: flex;
            // align-items: center;
            // justify-content: center;
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
            &:nth-child(2){
                background-color: #A894E8;
            }
            &:nth-child(3){
                background-color: #7779EA;
            }
            &:nth-child(4){
                background-color: #5D82F4;
            }
        }
    }
    .chartbox{
        display: flex;
        padding: 20px 20px 0 20px;
        align-items: center;
    }
    .linebox{
        height: 400px; 
        width: 60%;
        margin-right: 20px;
        background-color: #474544;
        border-radius: 8px;
    }
    .piebox{
        flex:1;
        height: 400px;
        background-color: #474544;
        border-radius: 8px;
        overflow: hidden;
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
        height: 300px; 
        background-color: #474544;
        border-radius: 8px;
    }
    .table1{
        margin-right: 20px;
        flex:1;
    }
    .table2{
        width: 60%;
    }
</style>
  