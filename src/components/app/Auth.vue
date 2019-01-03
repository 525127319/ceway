<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  :to="{ path: '/app' }"><i class="el-icon-menu"></i> 应用</el-breadcrumb-item>
                <el-breadcrumb-item>授权</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        
        <el-transfer
            v-model="value2"
            filterable
            :titles="['可选微服务列表', '已选微服务列表']"
            :button-texts="['到左边', '到右边']"
            @change="handleChange"
            :data="data">
        </el-transfer>

        <el-row> 
            <el-button type="primary" @click="doSubmit">确认</el-button>
            <el-button @click="doCancel">返回</el-button>
        </el-row>
    </div>
</template>

<script>
    import {requestAppAuthServiceList} from '../../api/axiosapi';
    import {requestAppAuthHadServiceList} from '../../api/axiosapi';
    import {requestAppAuthUpdate} from '../../api/axiosapi';
  export default {
    data() {
      const generateData = _ => {
        const alldata = [];
        requestAppAuthServiceList().then(result => {

            if (result.code !== 200) {
                this.$message.error(result.msg);
            } else {
                for (let i = 0; i < result.data.length; i++) {
                    alldata.push({
                        key: result.data[i].id,
                        label: result.data[i].serviceName
                    });
                }
            }
        });
        return alldata;
      };

      const hadServiceData = _ => {
        const haddata = [];
        let params = {appId: this.$route.query.appId};
        requestAppAuthHadServiceList(params).then(result => {

            if (result.code !== 200) {
                this.$message.error(result.msg);
            } else {
                for (let i = 0; i < result.data.length; i++) {
                    haddata.push(result.data[i].id);
                }
            }
        });
        return haddata;
      };
      return {
        data: generateData(),
        value2: hadServiceData()
      };
    },

    methods: {
      handleChange(value, direction, movedKeys) {
        console.log(value);
      },
      doSubmit() {
          let self = this;

          let params = {appId: this.$route.query.appId, serviceList: self.value2};
          
          requestAppAuthUpdate(params).then(result => {
              console.log(result);

              if (result.code !== 200) {
                  this.$message.error(result.msg);
              } else {
                  this.$message.success("授权成功");
                  this.$router.push({path: '/app'});
              }
          });
      },
      doCancel() {
          this.$router.push({path: '/app'});
      }
    }
  };
</script>


<style>

  .el-row {
      margin-top: 20px;
  }
</style>