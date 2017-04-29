<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-table
                        :data="paginate.data"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="词"
                            width="180">
                    </el-table-column>
                    <el-table-column label="标签">
                        <template scope="scope">
                            <el-tag type="primary" v-for="item in scope.row.tags">{{item.tag}}</el-tag>
                            <!--<el-tag type="primary">标签三</el-tag>-->
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row type="flex" justify="space-around">
            <el-col :span="10">
                <el-pagination class="pagination"
                               @current-change="handleCurrentChange"
                               :current-page="paginate.current_page"
                               :page-size="20"
                               layout="total, prev, pager, next"
                               :total="paginate.total">
                </el-pagination>
            </el-col>
        </el-row>

    </div>

</template>

<script>
    export default{
        data: function () {
            return {
                paginate: {data: []},
                total: 0,
                page: 1
            }
        },
        methods: {
            getWords: function () {
                var vm = this;
                axios.get('word', {
                    params: {
                        page: this.page
                    }
                })
                        .then(function (response) {
                            vm.paginate = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            handleCurrentChange: function (val) {
                this.page = val;
                this.getWords();
            }
        },
        mounted: function () {
            this.getWords();
        }
    }
</script>

<style scoped>
    .pagination {
        margin: 10px auto;
    }
</style>