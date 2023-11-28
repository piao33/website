<template> 
    <mNav :dark="true"></mNav>
    <div class="login">
        <div class="content">
            <div class="beauty">
                <p>
                    吉林省电力公司<br>
                    区块链平台
                </p>
                <img src="@/assets/img/xnyy.jpg" alt="">
            </div>
            <div class="login-box">
                <ul class="nav">
                    <li>
                        <el-button style="width: 100%;" :type="loginType=='login' ? 'primary' : 'default'" @click="changeLoginType('login')">登录</el-button>
                    </li>
                    <li>
                        <el-button style="width: 100%;" :type="loginType=='signin' ? 'primary' : 'default'" @click="changeLoginType('signin')">注册</el-button>
                    </li>
                </ul>
                <el-form :model="form" ref="ruleForm" label-width="110px" :rules="rules" class="login-form">
                    <el-form-item label="用户类型：" prop="userType">
                        <el-select key="userType" v-model="form.userType" @change="changeUserType" placeholder="请选择用户类型" style="width: 100%">
                            <el-option label="个人" value="person" />
                            <el-option label="公司" value="company" />
                        </el-select>
                    </el-form-item>
                    <!-- 增加 企业法人 和 组织代码  -->
                    <el-form-item prop="companyName" label="公司名称：" v-if="form.userType == 'company'">
                        <el-input key="companyName" v-model="form.companyName" />
                    </el-form-item>
                    <el-form-item prop="legalPerson" label="企业法人：" v-if="!isLoginType && form.userType == 'company'">
                        <el-input key="legalPerson" v-model="form.legalPerson" />
                    </el-form-item>
                    <el-form-item prop="creditCode" label="企业代码：" v-if="!isLoginType && form.userType == 'company'">
                        <el-input key="creditCode" v-model="form.creditCode" />
                    </el-form-item>
                    <el-form-item prop="name" label="用户名称：" v-if="!isLoginType">
                        <el-input key="name" v-model="form.name" />
                    </el-form-item>
                    <!-- <el-form-item label="姓名：" v-if="!isLoginType">
                        <el-input v-model="form.nickName" />
                    </el-form-item> -->
                    <el-form-item prop="telNumber" label="手机号：">
                        <el-input key="telNumber" name="telphone" v-model="form.telNumber" autocomplete="on"/>
                    </el-form-item>
                    <el-form-item prop="code" label="验证码：" v-if="!isLoginType">
                        <el-col :span="14">
                            <el-input key="code" v-model="form.code" />
                        </el-col>
                        <el-col :span="8" :offset="2">
                            <el-button :disabled="!canSendCode" style="width: 100%;" type='default' @click="startCountDown">{{ isCounting ? `${countDown}S` : '发送验证码'}}</el-button>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="password" label="密码：">
                        <el-input key="password" v-model="form.password" type="password"/>
                    </el-form-item>

                    <el-form-item  prop="againPassword" label="确认密码：" v-if="!isLoginType">
                        <el-input key="againPassword" v-model="form.againPassword" type="password"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100%;" type="primary" @click="onSubmit">{{ loginType=='login' ? '登录' : '注册'}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useUserStore } from '@/stores/user';
    import { storeToRefs } from 'pinia';
    import { computed, ref, reactive } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { loginApi, signInApi} from '@/api/user'

    const store = useUserStore()
    const {setUser} = store

    let router = useRouter()
    let route = useRoute()

    let isLoginType = computed(()=>{
        return loginType.value === 'login';
    })
    let isTelNumber = computed(()=>{
        return !isNaN(form.value.telNumber) && form.value.telNumber.length == 11
    })

    let loginType = ref('login')
    const changeLoginType = (val)=>{
        loginType.value = val
        let userType = form.value.userType
        ruleForm.value.resetFields()
        form.value.userType = userType
    }

    // form表单校验提交
    let form = ref({
        userType: 'person',
        name: '',
        // nickName: '',
        companyName: '',
        legalPerson: '',
        creditCode: '',
        telNumber: '',
        code: '',
        password: '',
        againPassword: '',
    })

    const rules = reactive({
        name: [
            { required: true, message: '请输入用户名称', trigger: 'change' },
            { max: 10, message: '用户名长度限制10个字', trigger: 'blur' },
        ],
        companyName: [
            {required: true, message: '请输入公司名称', trigger: 'change'},
            { max: 20, message: '公司名长度限制20个字', trigger: 'blur' },
        ],
        legalPerson: [
            {required: true, message: '请输入法人姓名', trigger: 'change'},
            {max: 10, message: '法人姓名限制10个字', trigger: 'blur' },
        ],
        creditCode: [
            { required: true, pattern: new RegExp('^[0-9a-zA-Z]*$', 'gi'), message: '请输入企业代码', trigger: 'change'},
        ],
        telNumber: [
            { required: true, pattern: /^\d{11}$/, message: '请输入11位数字', trigger: 'change'},
        ],
        code: [
            { required: true, pattern: new RegExp('^[0-9]{4}$'), message: '请输入4位数字验证码', trigger: 'change'},
        ],
        password: [
            { required: true,pattern: new RegExp('^[a-zA-Z0-9]{8,16}$'), message: '密码长度限制 8-16 位，支持数字和字母', trigger: 'change'},
        ],
        againPassword: [
            { required: true,pattern: new RegExp('^[a-zA-Z0-9]{8,16}$'), message: '密码长度限制 8-16 位，支持数字和字母', trigger: 'change'},
            {
                validator(rule, value, callbacck) {
                    return value === form.value.password
                },
                trigger: 'blur',
                message: '两次输入的密码不一致，请确认'
            },
        ]
    })
    const ruleForm = ref()
    const onSubmit = async () => {
        let formRef = ruleForm.value
        if (!formRef) return
        await formRef.validate((valid, fields) => {
            if (valid) {
                if(loginType.value == 'login') {
                    login()
                }else{
                    signin();
                }
            }
        })
    }

    async function signin() {
        let {code, msg, data} = await signInApi({
            userType: form.value.userType === 'person' ? 1 : 2, 
            userPwd: form.value.password,
            userName: form.value.name,
            companyName: form.value.companyName,
            legalPerson: form.value.legalPerson,
            creditCode: form.value.creditCode,
            status: 0,
            tel: form.value.telNumber
        })
        if(code == 200) {
            ElMessage({
                message: '注册提交申请成功,请等待审核',
                type: 'success',
            })
        }else{
            ElMessage({
                message: msg || '注册失败，请重试',
                type: 'error',
            })
        }
    }
    async function login() {
        let {code, msg, tel, token, userName} = await loginApi({
            userPwd: form.value.password,
            tel: form.value.telNumber,
            userType: form.value.userType === 'person' ? 1 : 2, 
            companyName: form.value.userType === 'person' ? '' : form.value.companyName, 
        })
        if(code == 200) {
            ElMessage({
                message: '登录成功',
                type: 'success',
            })
            setUser({tel, token, userName})
            jump()
        }else{
            ElMessage({
                message: msg || '登录失败，请重试',
                type: 'error',
            })
        }
    }
    
    function jump() {
        if(route?.query?.returnUrl){
            let path = decodeURIComponent(route.query.returnUrl);
            router.push(path);
        }else {
            router.push('/platform')
        }
    }

    // 发送验证码
    let isCounting = ref(false)
    let timer = null
    let countDown = ref(5)
    let canSendCode = computed(()=>{
        return isTelNumber.value && !isCounting.value
    })
    let startCountDown = ()=>{
        isCounting.value = true
        ElMessage({
            message: '验证码发送成功',
            type: 'success',
        })
        calcCount()
    }
    function calcCount() {
        countDown.value--
        if(countDown.value < 0) {
            isCounting.value = false
            countDown.value = 5
            clearTimeout(timer);
        }else{
            timer = setTimeout(calcCount, 1000);
        }
    }

    let changeUserType = (val) =>{
        ruleForm.value.resetFields();
        form.value.userType = val
    }
</script>
<style lang="less" scoped>
    .login{
        width: 100%;
        background: url(@/assets/img/login-bg2.jpg) center / cover no-repeat;
        height: 100vh;
        margin-top: @nav-height-minus;
        // background: linear-gradient(#fff, @green);
        // display: flex;
        // justify-content: center;
        overflow: hidden;
    }
    .content{
        display: flex;
        // align-items: center;
        justify-content: flex-end;
        height: auto;
        width: 100%;
        .max1280();
        .marginAuto();
        margin-top: 160px;
    }
    .beauty{
        display: none;
        // display: flex;
        margin-right: 40px;
        p{
            font-size: 32px;
            font-weight: 600;
            color: #fff;
        }
        img{
            width: 200px;
            vertical-align: top;
        }
    }
    .login-box{
        background: linear-gradient(to right, #fff, #b3bac1);
        // background: radial-gradient(closest-side, #fff, #b7b7c2);
        padding: 34px 34px 16px 0;
        border-radius: 8px;
    }
    .nav{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0 20px 120px;
        li{
            width: 100px;
            margin: 0 12px;
        }
    }
    .login-form{
        width: 500px;
    }
</style>
