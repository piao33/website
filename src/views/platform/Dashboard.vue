<template>
    <mNav></mNav>
    <ul class="dashboard">
        <li @click="clickAccount" v-loading="dialogLoading">
            <div class="cont">
                <div class="info">
                    <p class="title">账户信息功能介绍</p>
                    <p class="desc">账户信息中展示以下信息：</p>
                    <p class="content">账户信息：基本账户信息，如商户号；联系信息，如手机号；企业信息与经营信息，如营业执照；</p>
                </div>
                <img src="@/assets/svg/account.svg" alt="">
            </div>
        </li>
        <li class="bigData" @click="clickData">
            <div class="cont">
                <img src="@/assets/svg/bigdata.svg" alt="">
                <div class="info">
                    <p class="title">大数据的应用场景</p>
                    <p class="desc">随着大数据的发展，大数据技术已经广泛应用在众多行业</p>
                    <p class="content">比如仓储物流、电商零售、汽车、电信、生物医学、人工智能、智慧城市等等领域，包括在疫情防控战中，大数据技术也发挥了重要的作用。</p>
                </div>
            </div>
        </li>
        <li>
            <div class="cont">
                <div class="info">
                    <p class="title">XXXXXXX</p>
                    <p class="desc">XXXXXXXXXXXXXXXXXXXXXXXXX</p>
                    <p class="content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                </div>
                <img src="@/assets/svg/unknow.svg" alt="">
            </div>
        </li>
    </ul>

    <el-dialog
        v-model="dialogVisible"
        title="账户信息修改"
        width="30%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @close="resetForm"
    >
        <el-form :model="form" ref="ruleForm" label-width="110px" :rules="rules" class="login-form">
            <el-form-item prop="companyName" label="公司名称：" v-if="form.companyName">
                <el-input v-model="form.companyName" disabled/>
            </el-form-item>
            <el-form-item prop="name" label="用户名称：">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="手机号：">
                <el-input v-model="form.telNumber" disabled/>
            </el-form-item>

            <el-form-item prop="password" label="原密码：">
                <el-input v-model="form.password" type="password"/>
            </el-form-item>

            <el-form-item  prop="newPassword" label="新密码：">
                <el-input v-model="form.newPassword" type="password"/>
            </el-form-item>

            <el-form-item  prop="againPassword" label="确认密码：">
                <el-input v-model="form.againPassword" type="password"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="validateForm">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
    import { onActivated, reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { getUserApi, editUserApi }  from '@/api/user';
    import {useUserStore} from '@/stores/user'

    const store = useUserStore()
    
    let message = null;
    let clickData = ()=>{
        if(message) return;
        message = ElMessage({message: '敬请期待'})
        setTimeout(() => {
            message.close();
            message = null;
        }, 3000);
    }

    // form表单校验提交
    let form = ref({
        userType: 'person',
        name: '',
        companyName: '',
        telNumber: '',
        password: '',
        newPassword: '',
        againPassword: ''
    })
    const rules = reactive({
        name: [
            { required: true, message: '请输入用户名称', trigger: 'change' },
            { max: 10, message: '用户名长度限制10个字', trigger: 'blur' },
        ],
        password: [
            { required: true,pattern: new RegExp('^[a-zA-Z0-9]{8,16}$'), message: '密码长度限制 8-16 位，支持数字和字母', trigger: 'blur'},
            {
                validator(rule, value, callbacck) {
                    return value === apiUserInfo.value.userPwd
                },
                trigger: 'blur',
                message: '原始密码输入错误，请确认'
            },
        ],
        newPassword: [
            { required: true, pattern: new RegExp('^[a-zA-Z0-9]{8,16}$'), message: '密码长度限制 8-16 位，支持数字和字母', trigger: 'blur'},
        ],
        againPassword: [
            { required: true, pattern: new RegExp('^[a-zA-Z0-9]{8,16}$'), message: '密码长度限制 8-16 位，支持数字和字母', trigger: 'blur'},
            {
                validator(rule, value, callbacck) {
                    return value === form.value.newPassword
                },
                trigger: 'blur',
                message: '两次输入的密码不一致，请确认'
            },
        ]
    })
    let dialogVisible = ref(false)
    let apiUserInfo = ref({})
    let dialogLoading = ref(false)
    let clickAccount = ()=>{
       getUserInfo()
    }

    async function getUserInfo() {
        dialogLoading.value = true;
        let {code, msg, data} = await getUserApi({
            tel: store.user.tel
        })
        dialogVisible.value = true;
        dialogLoading.value = false;
        if(code == 200) {
            apiUserInfo.value = data;
            form.value.name = data.userName
            form.value.telNumber = data.tel
            form.value.companyName = data.companyName
        }else {
            ElMessage({
                message: msg || '请求失败，请重试',
                type: 'error',
            })
        }
    }
    let ruleForm = ref()
    let validateForm = async ()=>{
        let formRef = ruleForm.value
        if (!formRef) return
        await formRef.validate((valid, fields) => {
            if (valid) {
                editUserInfo()
            }
        })
    }
    let resetForm = ()=>{
        ruleForm.value.resetFields();
    }
    async function editUserInfo() {
        let {code, msg} = await editUserApi({
            userName: form.value.name,
            userPwd: form.value.newPassword,
            userId: apiUserInfo.value.userId,
        })
        dialogVisible.value = false
        if(code == 200) {
            ElMessage({
                message: '更新成功',
                type: 'success',
            })
            store.setUser({name: form.value.name, userPwd: form.value.newPassword})
        }else {
            ElMessage({
                message: msg || '修改失败，请重试',
                type: 'error',
            })
        }
    }

</script>

<style lang="less" scoped>
    .dashboard{
        // .max1280();
        // .marginAuto();
        height: calc(100vh - @nav-height);
        li{
            height: 33.333%;
            background: #fff;
            &:nth-child(odd) {
                background: #f9f9f9;
                .info{
                    width: 500px;
                    margin: 0 200px 0 -40px;
                }
            }
            overflow: hidden;
            .cont{
                .max1280();
                .marginAuto();
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                img{
                    width: 180px;
                    vertical-align: top;
                }
                transform-origin: center;
                transition: all 0.4s;
                cursor: pointer;
                position: relative;
                z-index: 20;
                &:hover{
                    transform: scale(1.02)
                }
            }
            .info{
                width: 500px;
                margin:0 -40px 0 200px;
            }
            .title{
                font-size: 18px;
                margin-bottom: 8px;
                font-weight: 600;
            }
            .desc{
                color: #ccc;
                line-height: 24px;
                margin-bottom: 6px;
            }
            .content{
                line-height: 24px;
                word-wrap:break-word;
            }
        }
    }
</style>
  