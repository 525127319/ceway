<template>
    <div class="login-wrap">
        <div class="ms-title">认证中心管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {requestLogin} from '../../api/axiosapi';
    import {requestLoginAuth} from '../../api/axiosapi';

    import AxiosConfig from '../../common/axiosConfig.js'

    export default {
        data: function(){
            return {
                logining: false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {

                        self.logining = true;
                        var loginParams = { loginName: self.ruleForm.username, password: self.ruleForm.password, appId: "test-ceway-vbT6e", appSecret: "BSwlRH4omEmstHJzuOMbSIOtrdAtmw0KoutkYp0arm92dYLWnWPrsuuG6FdvqA7k"};
                        var loginAuthParams = {loginName: self.ruleForm.username};
                        requestLoginAuth(loginAuthParams).then(result1 => {
                            let { msg, code, data } = result1;
                            if (code !== 200) {
                                this.$message({
                                    message: msg,
                                    type: 'error'
                                });
                                self.logining = false;
                                return false;
                            }

                            requestLogin(loginParams).then(result => {
                                console.log(result);
                                self.logining = false;
                                //NProgress.done();
                                let { msg, code, data } = result;
                                if (code !== 200) {
                                    this.$message({
                                        message: msg,
                                        type: 'error'
                                    });
                                    return false;
                                } else {

                                    sessionStorage.setItem('access-user', self.ruleForm.username);
                                    sessionStorage.setItem('access-token', 'Bearer '+data);
                                    let pathRedirect = this.$route.query.redirect;
                                    if (pathRedirect) {
                                        this.$router.push({ path: this.$route.query.redirect });
                                    } else {
                                        this.$router.push({ path: '/readme' });
                                    }
                                    
                                }
                            });
                        });
   
                    } else {
                        self.logining = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>