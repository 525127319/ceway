<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> Token管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="select_word" placeholder="请输入APPID或工号" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="appId" label="appId" width="180">
            </el-table-column>
            <el-table-column prop="loginName" label="工号" width="120">
            </el-table-column>
            <el-table-column prop="token" label="Token">
                
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
    import {requestTokenList} from '../../api/axiosapi';
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
                requestTokenList(params).then(result => {
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