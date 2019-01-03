<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 日志管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>     -->
            <el-input v-model="select_word" placeholder="请输入工号或操作来源" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="loginName" label="工号" width="100">
            </el-table-column>
            <el-table-column prop="realName" label="姓名" width="100">
                <template scope="scope">
                      <template v-if="scope.row.realName == null "> 暂无</template>  
                </template>
            </el-table-column>
            <el-table-column prop="operateStatus" label="操作状态" width="100">
                <template scope="scope">
                      <template v-if="scope.row.operateStatus == '1'"> 正常 </template>   
                      <template v-if="scope.row.operateStatus == '0'"> 异常</template>  
                </template>
            </el-table-column>
            <el-table-column prop="operateSource" label="操作来源" width="100">
            </el-table-column>
            </el-table-column>
            <el-table-column prop="requestParam" label="请求参数" width="100">
                <template scope="scope">
                      <template v-if="scope.row.requestParam != null"> 有 </template>   
                      <template v-if="scope.row.requestParam == null "> 无</template>  
                </template>
            </el-table-column>
            </el-table-column>
            <el-table-column prop="responseParam" label="响应结果" width="100">
                <template scope="scope">
                      <template v-if="scope.row.responseParam != null"> 有 </template>   
                      <template v-if="scope.row.responseParam == null "> 无</template>  
                </template>
            </el-table-column>
             
             <el-table-column prop="operateTime" label="操作时间" width="200" :formatter="dateFormatter">
            </el-table-column>

            <el-table-column prop="remoteIp" label="IP地址" width="250">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
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
                :page-sizes="[5, 10, 20, 50]"
                :page-size="limit"
                layout="total, sizes, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {requestLogDelete, requestLogList} from '../../api/axiosapi';
    import moment from 'moment';
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                total: 0,
                limit: 10,
                select_cate: '',
                select_word: '',
                operateStatus:''
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
                var dataParams = {searchName: self.select_word, page: self.cur_page, limit: self.limit};
                console.log(dataParams);
                requestLogList(dataParams).then(result => {
                    if (result.code !== 200) {
                        this.$message({
                            message: result.msg,
                            type: 'error'
                        });
                    } else {
                        self.tableData = result.data.logList;
                        console.log(this.tableDate);
                        self.total = result.data.logTotal;
                        console.log(this.total);
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
                console.log(date);
                return date;
            },
            handleDelete(index, row) {
                let self = this;
                let params = {id: row.id};
                this.$confirm('此操作将永久删除该应用, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    requestLogDelete(params).then(result => {
                    if (result.code !== 200) {
                        this.$message.error(result.msg);
                    } else {
                        self.tableData.splice(index, 1);
                        this.$message.success("删除应用成功");
                    }
                });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '您已取消删除'
                    });          
                });
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