<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  :to="{ path: '/service' }"><i class="el-icon-date"></i> 微服务</el-breadcrumb-item>
                <el-breadcrumb-item>创建</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="微服务名称" prop="serviceName">
                <el-input v-model="form.serviceName"></el-input>
            </el-form-item>
            <el-form-item label="微服务代码" prop="serviceCode">
                <el-input v-model="form.serviceCode" placeholder="请填写项目名"></el-input>
            </el-form-item>

            <el-form-item label="微服务描述">
                <el-input type="textarea" v-model="form.serviceDesc"></el-input>
            </el-form-item>

            <el-form-item label="是否激活">
                <el-switch on-value="1" off-value="0" v-model="form.enabled"></el-switch>
            </el-form-item>
        
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {requestSubmitAddService} from '../../api/axiosapi';
  export default {
    data() {
      return {
        form: {
          serviceName: '',
          serviceCode: '',
          serviceDesc: '',
          enabled: '1'
        },
        rules: {
          serviceName: [
            { required: true, message: '请输入应用名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          serviceCode: [
            { required: true, message: '请选择应用图标', trigger: 'change' },
            { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
        //this.getData();
    },
    methods: {
        onSubmit(formName) {
            let self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var params = self.form;
                    requestSubmitAddService(params).then(result => {
                        if (result.code !== 200) {
                            this.$message({
                                message: result.msg,
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: result.msg,
                                type: 'success'
                            });
                            this.$router.push({path: '/service'});
                        }
                    });

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onCancel() {
            this.$router.push({path: '/service'});
        }
    }
  }
</script>