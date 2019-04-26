<template>
    <div class="personMsg">
        <div class="header">新增仪器</div>
        <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="150px">
            <el-form-item label="名 称：" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="阈 值：" prop="alertValue">
                <el-input v-model.number="form.alertValue"></el-input>
            </el-form-item>
            <el-form-item label="仪器描述：" prop="desc">
                <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="最小可能值：" prop="min">
                <el-input v-model.number="form.min"></el-input>
            </el-form-item>
            <el-form-item label="最大可能值：" prop="max">
                <el-input v-model.number="form.max"></el-input>
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
                form: {//添加仪器表单
                    name: '',
                    alertValue: '',
                    desc: '',
                    min: '',
                    max: '',
                },
                rules: {//修改信息验证规则
                    name: [{required: true, message: '请输入仪器名称', trigger: 'blur'}],
                    alertValue: [
                        {required: true, message: '请设置阈值', trigger: 'blur'},
                        {type: 'number', message: '阈值必须为数字值', trigger: 'blur'}
                    ],
                    desc: [{required: true, message: '请对仪器进行描述', trigger: 'blur'}],
                    min: [
                        {required: true, message: '请输入最小可能值', trigger: 'blur'},
                        {type: 'number', message: '最小可能值必须为数字值', trigger: 'blur'}
                    ],
                    max: [
                        {required: true, message: '请输入最大可能值', trigger: 'blur'},
                        {type: 'number', message: '最大可能值必须为数字值'}
                    ],
                }
            }
        },
        methods: {
            resetForm(formName) {
                //重置修改信息的表单
                this.$refs[formName].resetFields();
            },
            confirmInfo(formName) {
                //提交修改信息
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = this.$qs.stringify({
                            "name": this.form.name,
                            "alertValue": this.form.alertValue,
                            "depict": this.form.depict,
                            "min": this.form.min,
                            "max": this.form.max,
                        });
                        this.$post("/appliance/add", data)
                            .then((res) => {
                                this.resetForm('form');
                                this.$success("新增仪器成功")
                            })
                            .catch(function (err) {
                                this.$fail("新增仪器失败")
                            });
                    }
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


