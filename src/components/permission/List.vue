<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 用户权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="plus" @click="handleAdd">创建</el-button>
            <el-input v-model="select_word" placeholder="请输入搜索内容" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="code" label="权限代码" width="120">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="150">
            </el-table-column>
            <el-table-column prop="desc" label="描述" width="200">
            </el-table-column>
            <el-table-column prop="createLoginName" label="创建人工号" width="150">
            </el-table-column>
            <el-table-column prop="createRealName" label="创建人姓名" width="150">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200" :formatter="dateFormatter">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" icon="edit"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    
                    <el-button size="small" type="primary" icon="plus"
                            @click="handleAuth(scope.$index, scope.row)">授权</el-button>

                    <el-button size="small" type="danger" icon="delete"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="cur_page"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="limit"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {requestPermissionList} from '../../api/axiosapi';
    import moment from 'moment';
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                total: 0,
                limit: 10,
                select_cate: '',
                select_word: ''
            }
        },
        created(){
            this.getData();
        },
        
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.limit = val;
                this.getData();
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                var params = {searchName: self.select_word, page: self.cur_page, limit: self.limit};
                requestPermissionList(params).then(result => {
                    console.log(result);
                    if (result.code !== 200) {
                        this.$message({
                            message: result.msg,
                            type: 'error'
                        });
                    } else {
                        self.tableData = result.data.list;
                        self.total = result.data.total;
                    }
                });
            },
            search(){
                this.getData();
            },
            dateFormatter(row, column) {
                var date = row[column.property]; 
                if (date == undefined) {  
                    return "";  
                }  
                return moment(date).format("YYYY-MM-DD HH:mm:ss");  
                // return date;
            },
            handleAuth(index, row) {
                this.$router.push({
                    path: '/permission/auth',
                    query: {id: row.id}
                });
            }, 
            handleEdit(index, row) {
                // this.$router.push({
                //     path: '/app/edit',
                //     query: {appId: row.appId}
                // });
                this.$message.warning('暂不可使用');
            },
            handleDelete(index, row) {
                this.$message.warning('暂不可使用');

                // let self = this;
                // let params = {appId: row.appId};
                // this.$confirm('此操作将永久删除该应用, 是否继续?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     requestDeleteApp(params).then(result => {
                //     if (result.code !== 200) {
                //         this.$message.error(result.msg);
                //     } else {
                //         self.tableData.splice(index, 1);
                //         this.$message.success("删除应用成功");
                //     }
                // });
                // }).catch(() => {
                //     this.$message({
                //         type: 'info',
                //         message: '您已取消删除'
                //     });          
                // });
            },
            handleAdd() {
                // this.$router.push({path: '/app/add'});
                this.$message.warning('暂不可使用');
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>