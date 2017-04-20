<template>
    <el-row>
        <el-col :span="12">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option label="雷锋网" value="leiphone.com"></el-option>
                        <el-option label="百度百家" value="baijia.baidu.com"></el-option>
                        <el-option label="开发者头条" value="toutiao.io"></el-option>
                    </el-select>
                    <el-button style="float: right;" type="primary" @click="getArticles">领取任务</el-button>
                </div>
                <div class="list-group">
                    <div v-for="(item,index) in articles" class="text item">
                        <span>{{index+1}}</span>
                        <a :href="item.href" target="_blank">{{item.title}}</a>
                    </div>
                </div>
                <div>
                    <el-button type="primary" @click="finish">完成</el-button>
                </div>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-form label-width="100px" class="form">
                <el-form-item label="查看已标注词">
                    <router-link to="words">查看已标注词</router-link>
                </el-form-item>
                <el-form-item label="雷锋网">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="percent[0]" class="progress"></el-progress>
                </el-form-item>
                <el-form-item label="百度百家">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="percent[1]" class="progress"></el-progress>
                </el-form-item>
                <el-form-item label="开发者头条">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="percent[2]" class="progress"></el-progress>
                </el-form-item>
                <el-form-item label="主题词" required>
                    <el-input class="input" v-model="key"></el-input>
                    <el-button type="primary" @click="getWord">提交</el-button>
                </el-form-item>
                <el-form-item label="已有标签">
                    <div>
                        <el-tag v-for="item in tags" type="primary">{{item.tag}}</el-tag>
                    </div>
                </el-form-item>
                <el-form-item label="标签添加" required>
                    <el-input class="input" v-model="tag"></el-input>
                    <el-button type="primary" @click="addTag">提交</el-button>
                </el-form-item>
                <el-form-item>
                    <a target="_blank" :href="'https://www.baidu.com/s?wd='+key">百度搜索</a>
                    <a target="_blank" :href="'http://baike.baidu.com/item/'+key">百科搜索</a>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default{
        data() {
            return {
                value: 'leiphone.com',
                articles: [],
                key: null,
                word: null,
                tag: null,
                progress: {
                    'leiphone.com': [0,1],
                    'baijia.baidu.com': [0,1],
                    'toutiao.io': [0,1]
                }
            }
        },
        computed: {
            tags: function () {
                if (this.word != null) {
                    return this.word.tags;
                }
                return [];
            },
            user: function () {
                return this.$store.state.user;
            },
            percent:function () {
                var arr=[];
                for(var key in this.progress){
                    if(this.progress[key][1]==0){
                        arr.push(0);
                    }else{
                        arr.push(this.progress[key][0]/this.progress[key][1]*100);
                    }
                }
                return arr;
            }
        },
        methods: {
            getArticles: function () {
                var vm = this;
                axios.post('article_list', {source: this.value})
                        .then(function (response) {
                            vm.articles = response.data;
                            if(vm.articles.length==0){
                                vm.$message.error('已经没有任务了');
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            vm.$message.error('拉取任务失败');
                        })
            },
            getWord: function () {
                var vm = this;
                axios.get('word/search/' + this.key)
                        .then(function (response) {
                            vm.word = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            addTag: function () {
                var vm = this;
                axios.post('tag', {tag: this.tag, user_id: this.user.id, word_id: this.word.id})
                        .then(function (response) {
                            console.log(response.data);
                            if (response.data == true) {
                                vm.word.tags.push({tag: vm.tag});
                                vm.tag = null;
                            } else {
                                vm.$message.error('添加失败');
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            vm.$message.error('添加失败');
                        });
            },
            finish: function () {
                Vue.set(this.progress[this.value],0,this.progress[this.value][0]+this.articles.length);
                this.articles = [];
            },
            getUser: function () {
                if (this.$store.state.user == null) {
                    var vm = this;
                    axios.get('user/get/' + sessionStorage.userId)
                            .then(function (response) {
                                vm.$store.commit('setUser', response.data);
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                }
            },
            getProgress:function () {
                var vm=this;
                axios.get('article_list')
                        .then(function (response) {
                            for(var key in vm.progress){
                                vm.progress[key]=response.data[key];
                            }
                        })
            }
        },
        mounted: function () {
            this.getUser();
            this.getProgress();
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
        margin: 0 auto;
    }

    .list-group {
        max-height: 500px;
        overflow-y: auto;
    }

    .form {
        max-width: 480px;
        padding: 15px;
        margin: 0 auto;
    }

    .input {
        max-width: 300px;
    }

    .progress {
        margin: 9px auto;
    }
</style>