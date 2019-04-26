<template>
    <div class="personMsg">
        <div class="header">修改个人信息</div>
        <el-form :model="form" ref="form" label-position="right" label-width="100px">
            <el-form-item label="用户名：">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="电 话：">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮 箱：">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="密 码：">
                <el-input v-model="form.pass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：">
                <el-input v-model="form.repass"></el-input>
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button @click="resetForm('form')">重置</el-button>
            <el-button type="primary" @click="confirmInfo('form')">确 定</el-button>
        </div>
    </div>
</template>

<script>
    import littleHeader from '../components/everyPage_header.vue'

    export default {
        components: {littleHeader},
        data() {
            return {
                everyHeader: {
                    title: '>>机构个人信息',
                    src: '/src/images/icon1.png',
                },
                form: {//修改信息表单
                    name: '',
                    phone: '',
                    email: '',
                    pass: '',
                    repass: '',
                },
            }
        },
        methods: {
            resetForm(formName) {
                //重置修改信息的表单
                this.$refs[formName].resetFields();
            },
            confirmInfo(formName) {
                //提交修改信息
                let data = {};
                if (this.form.name) {
                    data.name = this.form.name;
                }
                if (this.form.phone) {
                    data.phone = this.form.phone;
                }
                if (this.form.email) {
                    data.email = this.form.email;
                }
                if (this.form.pass) {
                    if (this.form.repass === '') {
                        this.$message("请确认密码");
                        return;
                    }
                    if (this.form.pass !== this.form.repass) {
                        this.$message("两次输入密码不一致");
                        return;
                    }
                    data.pass = this.form.pass;
                }
                this.$post("/change", this.$qs.stringify(data))
                    .then((res) => {
                        this.resetForm('form');
                        this.$success("修改个人信息成功")
                    })
                    .catch((err) => {
                        this.$fail("修改个人信息失败")
                    });

            },
        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    $everyHeaderHeight: 90px; //引入的公共header组件的高度

    $paddingLeft: 40px; //整体padding-left的长度

    $headerHeight: 30px; //header的高度
    $headerFontSize: 23px; //header的字体大小
    $headerLetterSpacing: 1.5px; //header的字间距

    .personMsg {
        padding: 0 $paddingLeft;
        .header {
            height: $headerHeight;
            line-height: $headerHeight;
            letter-spacing: $headerLetterSpacing;
            font-size: $headerFontSize;
            margin: 40px 0 0 0;
        }
        .el-form {
            margin: 30px auto;
            width: 500px;
        }
        .footer {
            text-align: center;
            .el-button {
                width: 90px;
            }
            .el-button:nth-child(1) {
                margin-left: 60px;
            }
            .el-button:nth-child(2) {
                margin-left: 120px;
            }
        }
    }

</style>


