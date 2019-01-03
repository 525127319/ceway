<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  :to="{ path: '/app' }"><i class="el-icon-menu"></i> 应用</el-breadcrumb-item>
                <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="应用名称" prop="appName">
                <el-input v-model="form.appName"></el-input>
            </el-form-item>
            <el-form-item label="应用图标" prop="appIcon">
                <el-select v-model="form.appIcon" placeholder="请选择图标">
                    <el-option label="日期图标" value="el-icon-date"></el-option>
                    <el-option label="APP应用图标" value="el-icon-menu"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="appId">
                <el-input v-model="form.appId" :readonly="true"></el-input>
            </el-form-item>
  
            <el-form-item label="appSecret">
                <el-input v-model="form.appSecret" :readonly="true"></el-input>
            </el-form-item>

            <el-form-item label="是否激活">
                <el-switch on-value="1" off-value="0" v-model="form.enabled"></el-switch>
            </el-form-item>

            <el-form-item label="创建人工号">
                <el-input v-model="form.createLoginName" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="创建人姓名">
                <el-input v-model="form.createRealName" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="创建时间">
                <el-input v-model="form.createTime" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {requestAppDetail} from '../../api/axiosapi';

    import {requestSubmitEditApp} from '../../api/axiosapi';
  export default {
    data() {
      return {
        form: {
          appName: '',
          appIcon: '',
          appId: '',
          appSecret: '',
          enabled: 1,
          createLoginName: '',
          createRealName: '',
          createTime: ''
        },
        rules: {
          appName: [
            { required: true, message: '请输入应用名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          appIcon: [
            { required: true, message: '请选择应用图标', trigger: 'change' }
          ]
        }
      }
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            let self = this;
            var params = {appId: this.$route.query.appId};
            requestAppDetail(params).then(result => {
                console.log(result);
                if (result.code !== 200) {
                    this.$message({
                        message: result.msg,
                        type: 'error'
                    });
                } else {
                    self.form = result.data;
                }
            });
        },
        onSubmit(formName) {
            let self = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = self.form;
                    requestSubmitEditApp(params).then(result => {
                        console.log(result);
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
                            this.$router.push({path: '/app'});
                        }
                    });


                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onCancel() {
            this.$router.push({path: '/app'});
        }
    }
  }
</script>