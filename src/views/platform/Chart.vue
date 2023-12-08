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
                <span>{{ handleNum(32821) }}</span>
            </li>
            <li>
                <p>今日上链</p>
                <span>{{ handleNum(1821) }}</span>
            </li>
            <li>
                <p>区块总高度</p>
                <span>{{ handleNum(837232) }}</span>
            </li>
            <li>
                <p>节点数</p>
                <span>{{ handleNum(81) }}</span>
            </li>
            <li>
                <p>交易数</p>
                <span>{{ handleNum(821) }}</span>
            </li>
            <li>
                <p>交易成功率</p>
                <span>{{ handleNum(100) }}%</span>
            </li>
        </ul>
        <div class="total-box">
            <div class="left-box">
                <div class="chartbox">
                    <div class="linebox">
                        <div class="card-title">上链数据统计</div>
                        <el-radio-group text-color="#fff" fill="#2aa4f1" v-model="lineMode" label="" size="default"
                            class="radio">
                            <el-radio-button label="day">日</el-radio-button>
                            <el-radio-button label="month">月</el-radio-button>
                        </el-radio-group>
                        <div id="line"></div>
                    </div>
                    <div class="piebox">
                        <div class="card-title">数据来源统计</div>
                        <div id="pie"></div>
                    </div>
                </div>
                <div class="tablebox">
                    <div class="table table2">
                        <div class="card-title">历史上链数据统计</div>
                        <div id="bar"></div>
                    </div>
                    <div class="table table1">
                        <div class="card-title">上链数据明细</div>

                        <el-table ref="table2ref" :data="tableData2" class="tb-con"
                            :header-cell-style="{ backgroundColor: 'transparent' }"
                            :header-row-style="{ backgroundColor: 'transparent' }"
                            :row-style="{ backgroundColor: 'transparent' }" cell-class-name="cellClassName">
                            <el-table-column prop="height" label="区块高度" />
                            <el-table-column prop="hash" label="256哈希" />
                            <el-table-column prop="deal" label="交易" />
                            <el-table-column prop="createTime" label="生成时间" width="200" />
                        </el-table>
                    </div>

                </div>
            </div>
            <div class="right-box">
                <div class="card-title">数据来源排名</div>
                <el-table ref="table1ref" :data="tableData1" class="tb-con"
                    :header-cell-style="{ backgroundColor: 'transparent' }"
                    :header-row-style="{ backgroundColor: 'transparent' }" :row-style="{ backgroundColor: 'transparent' }"
                    cell-class-name="cellClassName">
                    <el-table-column prop="type" label="类型" />
                    <el-table-column prop="num" label="上链数量" />
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
let myBarChart = null
let timer = null
let lineMode = ref('month')
let localDate = ref(null)
let table1ref = ref(null)
let table2ref = ref(null)

let tableData1 = ref([
    { type: '营销', num: '3234' },
    { type: '财务', num: '534' },
    { type: '电子交易', num: '2433' },
    { type: '物资', num: '2234' },
    { type: '新能源', num: '342' },
    { type: '碳排放', num: '334' },
    { type: '其他', num: '1234' },
])
let tableData2 = ref([
    { height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32' },
    { height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32' },
    { height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32' },
    { height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32' },
    { height: 123, hash: '51F61H7', deal: '12', createTime: '2023-11-30 12:23:32' },
])

const table1Scroll = new Scroll()
const table2Scroll = new Scroll()

onMounted(async () => {
    initLine();
    initPie();
    initBar();
    getDate();
    timer = setInterval(() => {
        getDate()
    }, 500);

    table1Scroll.scroll(table1ref.value.$refs.bodyWrapper)
    table2Scroll.scroll(table2ref.value.$refs.bodyWrapper)
})

onUnmounted(() => {
    myLineChart && myLineChart.dispose();
    myLineChart = null;
    myPieChart && myPieChart.dispose();
    myPieChart = null;
    myBarChart && myBarChart.dispose();
    myBarChart = null;


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
const handleNum = (num) =>{
    return num.toLocaleString()
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
            top: 60,
            bottom: 30,
            right: 30,
            // containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        color: ['#2aa4f1', '#476d9e'],
        yAxis: {
            type: 'value',
            axisLine: {
                show: true
            },
            splitLine: {
                show: false,
                lineStyle: {
                    type: 'dashed',
                    color: ['#ccc'],
                }
            }
        },
        series: [
            {
                name: '123',
                data: [150, 230, 424, 218, 135, 147, 260],
                type: 'line',
                smooth: true,
                areaStyle: { color: 'rgba(255,255,255,0.1)' },
            },
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
        legend: {
            orient: 'vertical',
            right: 10,
            y: 'center',
            textStyle: {
                color: '#b3b3b3'
            },
            itemGap: 10,
            itemWidth: 10,
            itemHeight: 10,
            itemStyle: {
                borderWidth: 0,
            },
        },
        grid: {
            left: '3%',
            right: 100,
            top: '10%',
            bottom: "2%",
            // containLabel: true
        },
        // color: ['#FEBA63', '#5099BC', '#A1D8D3', '#80C687', '#285960', '#9287E7', '#FF7C7C'],
        color: ['#74529e', '#da8f3c', '#447cb7', '#be4868', '#4dc892', '#efbb43', '#ccedf1'],
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#123a6c',
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
                    show: true
                },
                data: [
                    { value: 98, name: '新能源云' },
                    { value: 1735, name: '碳排放' },
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

function initBar() {
    let chartDom = document.getElementById('bar');
    myBarChart = $echarts.init(chartDom);
    let option = {
        color: ['#74529e', '#26a0c9', '#44cb90', '#d2bd7a'],
        tooltip: {},
        legend: {
            data: ['类型1', '类型2', '类型3', '类型4'],
            textStyle: {
                color: '#b3b3b3'
            },
            right: 10,
            itemWidth: 10,
            itemHeight: 10
        },

        calculable: true,
        grid: {
            left: '3%',
            right: '3%',
            bottom: "20",
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: ['统计1', '统计2', '统计3', '统计4', '统计5', '统计6', '统计7'],
                "axisLabel": {
                    interval: 0
                },
                axisLine: {
                    lineStyle: {
                        color: '#ffffff',
                        width: 1,//这里是为了突出显示加上的
                    }
                },

            }
        ],
        dataZoom: [{
            type: 'slider',
            show: true, //flase直接隐藏图形
            xAxisIndex: [0],
            left: '9%', //滚动条靠左侧的百分比
            bottom: -5,
            height: 15,
            start: 0,//滚动条的起始位置
            end: 50
        }],
        yAxis: [
            {
                splitLine: {
                    lineStyle: {
                        color: '#21242b',
                    }
                },
                type: 'value',
            }
        ],
        series: [
            {
                name: '类型1',
                type: 'bar',
                barGap: 0.2,
                data: [320, 332, 310, 200, 222, 40, 300]
            },
            {
                name: '类型2',
                type: 'bar',
                data: [130, 182, 30, 50, 122, 20, 30]
            },
            {
                name: '类型3',
                type: 'bar',
                data: [320, 82, 220, 250, 322, 50, 10]
            },
            {
                name: '类型4',
                type: 'bar',
                data: [100, 182, 120, 100, 22, 100, 30]
            }
        ]
    };
    myBarChart.setOption(option);
}
</script>

<style lang="less" scoped>
:deep(.el-table__inner-wrapper::before) {
    height: 0;
}

:deep(.el-table th.el-table__cell.is-leaf) {
    border-bottom: 1px solid #2d2d2a !important;
}

:deep(.cellClassName) {
    border-bottom: 1px solid #2d2d2a !important;
    color: #b3b3b3;
}

:deep(.el-radio-button__inner):hover {
    color: #2aa4f1;
}

.chart-content {
    background-color: #0d325f;
    min-height: 100vh;
}

nav {
    padding: 6px 14px 0 14px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .navbtn {
        color: #b3b3b3;
        cursor: pointer;
        padding: 3px 8px;
        display: flex;
        align-items: center;

        img {
            width: 20px;
            height: 20px;
            vertical-align: top;
            margin-right: 4px;
        }

        &:hover {
            color: #2aa4f1a3;
        }

        &:active {
            color: #2aa4f1;
        }
    }

    .backbtn {
        display: flex;
        align-items: center;
    }

    .gobtn {
        img {
            transform-origin: center;
            transform: rotate(180deg)
        }
    }

    .info {
        text-align: center;
        display: flex;
        align-items: center;
        color: #2aa4f1;
        font-weight: 600;

        .title {
            font-size: 26px;
        }

        .account {
            margin-left: 12px;
            text-align: left;
            width: 185px;

            .time {
                display: inline-block;
                white-space: nowrap;
                text-align: left;
                font-size: 18px;
            }

        }
    }
}

.card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 20px 0;

    li {
        width: 16%;
        height: 120px;
        text-align: center;
        color: #fff;
        background-color: #123a6c;
        text-align: left;
        font-family: Arial, Helvetica, sans-serif;
        padding-left: 14px;

        p {
            font-size: 14px;
            margin-top: 16px;
            color: #b3b3b3;
            font-weight: 500;
        }

        span {
            display: inline-block;
            font-weight: 600;
            color: #fff;
            font-size: 32px;
            margin-top: 12px;
            font-family: math;
        }
    }
}

.total-box {
    display: flex;
}

.left-box {
    flex: 1;
}

.right-box {
    width: 360px;
    background-color: #123a6c;
    margin: 14px 14px 14px 0;
    position: relative;
}

.chartbox {
    display: flex;
    padding: 14px 14px 0 14px;
    align-items: center;
}

.card-title {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 15px;
    font-weight: 700;
    color: #b3b3b3;
    z-index: 100;
    line-height: 16px;
}

.linebox {
    height: 350px;
    width: 60%;
    margin-right: 14px;
    background-color: #123a6c;
    position: relative;
}

.radio {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 10;
}

.piebox {
    flex: 1;
    height: 350px;
    background-color: #123a6c;
    overflow: hidden;
    position: relative;
}

#line {
    height: 100%;
}

#pie {
    height: 100%;
}

#bar {
    height: 100%;
}

.tablebox {
    display: flex;
    padding: 14px;
    align-items: center;
}

.table {
    height: 350px;
    background-color: #123a6c;
    position: relative;
    overflow: hidden;
}

.tb-con {
    height: 100%;
    padding-top: 34px;
    background-color: transparent;
}

.table1 {
    margin-left: 14px;
    flex: 1;
}

.table2 {
    width: 60%;
}
</style>
  