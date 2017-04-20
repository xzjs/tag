<template>
    <el-table
            :data="words"
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
</template>

<script>
    export default{
        data:function () {
            return{
                words:[]
            }
        },
        methods:{
            getWords:function () {
                var vm=this;
                axios.get('word')
                        .then(function (response) {
                            vm.words=response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            }
        },
        mounted:function () {
            this.getWords();
        }
    }
</script>