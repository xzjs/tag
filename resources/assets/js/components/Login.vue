<template>
    <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="form">
        <el-form-item label="用户名" prop="name">
            <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
            <el-input v-model="user.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('user')">登录</el-button>
            <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    export default {
        data() {
            return {
                user: {
                    name: '',
                    pwd: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var vm=this;
                        axios.post('user/login', this.user)
                                .then(function (response) {
                                    console.log(response.data);
                                    if (response.data != false) {
                                        vm.$store.commit('setUser',response.data);
                                        vm.$router.push('main');
                                    } else {
                                        vm.$message.error('登录失败，用户名或密码错误');
                                    }
                                })
                                .catch(function (response) {
                                    console.log(response);
                                });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .form{
        max-width:330px;
        padding: 15px;
        margin: 0 auto;
    }
</style>