<template>
    <mNav></mNav>
    <div class="bg-banner"></div>
    <div class="about">
        <div class="box comp-desc">
            <p class="title">公司介绍</p>
            <p class="desc">2020年12月国网吉林省电力有限公司完成国网吉林堆栈从链建设，实现吉林节点部署，完成整体基础服务设施建设，首次实现数据上链；2023年6月完成国网链三期部署，目前需要做整体资源迁移，同时基础服务平台目前正在结合财务数据、新能源云数据、碳排放交易数据等。欢迎国网业务需求部门，根据己方建设需求对接区块链应用平台。</p>
        </div>

        <div class="box comp-block">
            <p class="title">区块链上链流程</p>
            <el-steps 
                finish-status="process" 
                :active="5"
                style="margin-top: 20px"
                :align-center="true"
            >
                <el-step title="申请部门" ><slot>abc</slot></el-step>
                <el-step title="区块链小组"><slot>abc</slot></el-step>
                <el-step title="业务审核通过" ><slot>abc</slot></el-step>
                <el-step space="30%" title="国网吉林省电力有限公司信息通信公司"><slot>abc</slot></el-step>
                <el-step title="吉林数字化工作部"><slot>abc</slot></el-step>
            </el-steps>
        </div>
        
        <div class="box comp-culture">
            <p class="title">联系方式</p>
            <p class="contact"><img src="@/assets/svg/tel.svg" alt="">电话：18514647678</p>
            <p class="contact"><img src="@/assets/svg/email.svg" alt="">邮箱：cht610@126.com</p>
        </div>


        <div class="box file-download">
            <p class="title">附件下载</p>
            <p class="abox"><a href="/download/附件1.国网区块链电子数据存证平台接入审批单.pdf" download="国网区块链电子数据存证平台接入审批单.pdf">附件1.国网区块链电子数据存证平台接入审批单</a></p>
            <p class="abox"><a href="/download/附件2.国网吉林省电力有限公司信息通信公司数据安全承诺书.pdf" download="国网吉林省电力有限公司信息通信公司数据安全承诺书.pdf">附件2.国网吉林省电力有限公司信息通信公司数据安全承诺书</a></p>
            <p class="abox"><a href="/download/附件3.国家电网有限公司网络安全承诺书（国网区块链科技(北京)有限公司）.pdf" download="国家电网有限公司网络安全承诺书（国网区块链科技(北京)有限公司）.pdf">附件3.国家电网有限公司网络安全承诺书（国网区块链科技(北京)有限公司）</a></p>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';

    
</script>
<style lang="less" scoped>
    .bg-banner{
        width: 100%;
        height: 400px;
        background: url(@/assets/img/about.jpg) 0 -400px  no-repeat;
        // background: url(@/assets/img/about1.jpg) 0 -100px  no-repeat;
        margin-top: @nav-height-minus;
        opacity: 0.9;
    }
    .about{
        .max1280();
        .marginAuto();
        :deep(.el-step__title) {
            font-size:14px;
            line-height: 24px;
            margin-top: 8px;
        }
        .title{
            font-size: 20px;
            color: @green;
        }
        .box{
            margin: 0px 0 24px;
        }
        .comp-desc{
            
            .desc{
                line-height: 24px;
                // text-indent: 2em;
                padding-left: 24px;
            }
        }
        .comp-culture{

            span{
                line-height: 24px;
            }
            .contact{
                margin-left: 24px;
                display: flex;
                align-items: center;
                img{
                    vertical-align: top;
                    margin-right: 4px;
                }
            }
        }
        .file-download{
            .abox{
                padding: 0 24px;
            }
            a{
                color: @gray;
                margin: 24px 0 0;
                &:hover{
                    color: @green;
                }
            }
        }
    }
</style>
