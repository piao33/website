<template>
    <div class="about">
        <img class="banner" src="@/assets/img/about3.jpg" alt="">
        <div class="box comp-desc">
            <p class="title">公司介绍</p>
            <span>2020年12月国网吉林省电力有限公司完成国网吉林堆栈从链建设，实现吉林节点部署，完成整体基础服务设施建设，首次实现数据上链；2023年6月完成国网链三期部署，目前需要做整体资源迁移，同时基础服务平台目前正在结合财务数据、新能源云数据、碳排放交易数据等。欢迎国网业务需求部门，根据己方建设需求对接区块链应用平台。</span>
        </div>
        
        <div class="box comp-culture">
            <p class="title">企业文化</p>
            <p class="contact"><img src="@/assets/svg/tel.svg" alt="">电话：18514647678</p>
            <p class="contact"><img src="@/assets/svg/email.svg" alt="">邮箱：cht610@126.com</p>
        </div>

        <div class="box comp-block">
            <p class="title">上链流程</p>
            <el-steps 
                finish-status="process" 
                :active="5"
                style="margin-top: 20px"

                :align-center="true"
            >
                <el-step title="申请部门" icon="el-icon-s-order"></el-step>
                <el-step icon="el-icon-film" title="区块链小组"></el-step>
                <el-step icon="el-icon-s-check" title="业务审核通过" ></el-step>
                <el-step icon="el-icon-office-building" title="国网吉林省电力有限公司信息通信公司"></el-step>
                <el-step icon="el-icon-menu" title="吉林数字化工作部"></el-step>
            </el-steps>
        </div>

        <div class="box file-download">
            <p class="title">附件下载</p>
            <p class=""><a href="/download/附件1.国网区块链电子数据存证平台接入审批单.pdf" download="国网区块链电子数据存证平台接入审批单.pdf">附件1.国网区块链电子数据存证平台接入审批单</a></p>
            <p class=""><a href="/download/附件2.国网吉林省电力有限公司信息通信公司数据安全承诺书.pdf" download="国网吉林省电力有限公司信息通信公司数据安全承诺书.pdf">附件2.国网吉林省电力有限公司信息通信公司数据安全承诺书</a></p>
            <p class=""><a href="/download/附件3.国家电网有限公司网络安全承诺书（国网区块链科技(北京)有限公司）.pdf" download="国家电网有限公司网络安全承诺书（国网区块链科技(北京)有限公司）.pdf">附件3.国家电网有限公司网络安全承诺书（国网区块链科技(北京)有限公司）</a></p>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';

    
</script>
<style lang="less" scoped>
    .about{
        .max1280();
        .marginAuto();
        .banner{
            height: 350px;
            object-fit: cover;
            vertical-align: top;
            width: 100%;
        }
        .title{
            font-size: 20px;
            color: @green;
        }
        .box{
            margin: 24px 0 6px;
        }
        .comp-desc{
            
            span{
                line-height: 24px;
            }
        }
        .comp-culture{

            span{
                line-height: 24px;
            }
            .contact{
                margin-left: 12px;
                display: flex;
                align-items: center;
                img{
                    vertical-align: top;
                    margin-right: 4px;
                }
            }
        }
        .comp-block{

        }
    }
</style>
