<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  :to="{ path: '/app' }"><i class="el-icon-menu"></i> 用户权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>授权</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-input placeholder="请输入内容" v-model="searchName">
            <el-button slot="append" icon="search" @click="doSearch"></el-button>
        </el-input>

        
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column prop="loginName" label="用户工号" width="150">
            </el-table-column>
            <el-table-column prop="realName" label="用户姓名" width="150">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" type="danger" icon="delete"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row> 
            <el-button type="primary" @click="doSubmit">确认</el-button>
            <el-button @click="doCancel">返回</el-button>
        </el-row>
    </div>
</template>

<script>
    import {requestUserAuthSearch} from '../../api/axiosapi';
    import {requestUserAuthHadPermission} from '../../api/axiosapi';
    import {requestUserAuthUpdate} from '../../api/axiosapi';
  export default {
    data() {
        return {
            loginName: '',
            tableData: []
        };
    },
    created(){
        this.getData();
    },
    methods: {
        getData(){
            let self = this;
            var params = {id: this.$route.query.id};
            requestUserAuthHadPermission(params).then(result => {
                if (result.code !== 200) {
                    this.$message({
                        message: result.msg,
                        type: 'error'
                    });
                } else {
                    self.tableData = result.data;
                }
            });
        },
        handleDelete(index, row) {
            let self = this;
            self.tableData.splice(index, 1);
        },

        doSubmit() {
            let self = this;
            let loginNameList = new Array();
            self.tableData.forEach(function(item) {
                loginNameList.push(item.loginName);
            });
            let params = {permissionId: this.$route.query.id, loginNameList: loginNameList};
          
          requestUserAuthUpdate(params).then(result => {
              console.log(result);

              if (result.code !== 200) {
                  this.$message.error(result.msg);
              } else {
                  this.$message.success("授权成功");
                  this.$router.push({path: '/permission'});
              }
          });
      },
      doCancel() {
          this.$router.push({path: '/permission'});
      },
      doSearch() {
          let self = this;
          let params = {searchName: self.searchName};
            requestUserAuthSearch(params).then(result => {
                if (result.code !== 200) {
                    this.$message.error(result.msg);
                } else {
                    if (result.data == null) {
                        this.$message.warning('没有找到该用户');
                        return;
                    }
                    self.tableData.push(result.data);
                }
            });
      }
          
     }
  };
</script>


<style>

  .el-row {
      margin-top: 20px;
  }
</style>