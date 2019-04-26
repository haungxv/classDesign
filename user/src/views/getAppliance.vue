<template>
    <div class="box changeRate">
        <!--处理报警仪器弹出框-->
        <el-dialog title="处理报警仪器" width="500px" :visible.sync="dialogVisible_handle" :before-close="closeDetail_handle">
            <el-form :model="change" :rules="rules_handle" ref="form_handle" label-position="right" label-width="140px">
                <el-form-item label="将当前值修改为：" prop="value">
                    <el-input v-model.number="change.value"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="closeDetail_handle">取 消</el-button>
        <el-button type="primary" @click="handle_sure('form_handle')">确 定</el-button>
      </span>
        </el-dialog>
        <!--修改仪器信息弹出框-->
        <el-dialog title="修改仪器信息" width="600px" :visible.sync="dialogVisible" :before-close="closeDetail">
            <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="120px">
                <el-form-item label="名 称：" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="描 述：" prop="desc">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="阈 值：" prop="alertValue">
                    <el-input v-model.number="form.alertValue"></el-input>
                </el-form-item>
                <el-form-item label="可能最小值：" prop="min">
                    <el-input v-model.number="form.min"></el-input>
                </el-form-item>
                <el-form-item label="可能最大值：" prop="max">
                    <el-input v-model.number="form.max"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="closeDetail">取 消</el-button>
        <el-button type="primary" @click="edit_sure('form')">确 定</el-button>
      </span>
        </el-dialog>

        <div class="content">
            <div class="search">
                <div class="search_title_box">
                    <span class="square"></span>
                    <span class="search_title">仪器管理</span>
                </div>
                <div class="search_box">
                    <el-form :model="inquireForm" ref="inquireForm" :inline="true">
                        <el-form-item>
                            <el-form-item label="名称">
                                <el-input v-model="inquireForm.name" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-button class="search_button" @click="inquire">查询</el-button>
                            <el-button @click="getAll">全部</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-table :data="tableData" border>
                <el-table-column label="仪器名称" align="center" prop="case_id"></el-table-column>
                <el-table-column label="描述" align="center" prop="reporter.name"></el-table-column>
                <el-table-column label="阈值" align="center" prop="reporter.name"></el-table-column>
                <el-table-column label="当前值" align="center" prop="reporter.name"></el-table-column>
                <el-table-column label="是否报警" align="center" prop="case_id"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="editAppliance(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="handleAlert(scope.row)" type="text" size="small">报警处理</el-button>
                        <el-button @click="deleteAppliance(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :page-size="page.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="page.total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    import littleHeader from "../components/everyPage_header.vue";

    export default {
        components: {littleHeader},
        data() {
            return {
                inquireForm: {
                    name: '',
                },

                tableData: [], //表格展示数据
                page: {
                    //分页
                    pageSize: 8, //每页显示的信息数目
                    total: 0, //总共的信息数目
                    currentPage: 1 //当前页数
                },

                dialogVisible: false, //修改仪器信息弹出框
                form: {//修改信息表单
                    name: '',
                    desc: '',
                    alertValue: '',
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
                },

                dialogVisible_handle: false, //修改仪器信息弹出框
                change: {//修改信息表单
                    value: '',
                },
                rules_handle: {//修改信息验证规则
                    value: [
                        {required: true, message: '请输入处理后的值', trigger: 'blur'},
                        {type: 'number', message: '处理后的值必须为数字值'}
                    ],
                }
            };
        },
        methods: {
            handleCurrentChange() {
                //分页
                this.getData(this.page.currentPage, this.page.pageSize);
            },
            inquire() {
                //查询仪器
            },
            getAll() {
                //获取全部仪器
            },
            editAppliance(row) {
                //编辑仪器信息
                this.dialogVisible = true;
                this.form.name = row.name;
                this.form.alertValue = row.alertValue;
                this.form.desc = row.depict;
                this.form.min = row.min;
                this.form.max = row.max;
            },
            edit_sure(formName) {
                //确认修改仪器信息
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                    }
                })
            },
            closeDetail() {
                //关闭修改进度弹出框
                this.dialogVisible = false;
                this.resetForm('form');
            },

            handleAlert(row) {
                //处理报警仪器
                this.dialogVisible_handle = true;
            },
            handle_sure(formName) {
                //确认修改仪器信息
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                    }
                })
            },
            closeDetail_handle() {
                //关闭修改进度弹出框
                this.dialogVisible_handle = false;
                this.resetForm('form_handle');
            },

            deleteAppliance() {
                //删除仪器信息

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
        }
    };
</script>

<style lang="scss" scoped>
    $everyHeaderHeight: 90px; //引入的公共header组件的高度

    $headerHeight: 0px; //header的高度
    $headerFontSize: 25px; //header的字体大小
    $headerLetterSpacing: 2px; //header的字间距

    $buttonBorderColor: #259b24; //按钮边框的颜色
    $buttonBackColor: rgb(37, 155, 36); //按钮中字体的颜色
    $buttonOnBackColor: #1aad19; //按钮点击之后的背景颜色
    $buttonOnColor: white; //按钮点击之后的字体颜色
    $buttonHeight: 40px; //按钮的高度
    $buttonWidth: 90px; //按钮的宽度

    .changeRate {
        .el-dialog {
            .total_rate,
            .change_title,
            .now_rate,
            .chooseRate {
                height: 40px;
                line-height: 40px;
            }
            .chooseRate {
                float: left;
            }
            &:after {
                display: block;
                clear: both;
                height: 0;
                overflow: hidden;
                visibility: hidden;
                content: "";
            }
        }
        .content {
            border: 1px solid white;
            height: 100%;
            background-color: white;
            .search {
                width: 92%;
                margin: 20px 0 0 4%;
                height: 140px;
                background-color: white;
                .search_title_box {
                    height: 70px;
                    .square {
                        float: left;
                        // margin-left: 50px;
                        margin-top: 35px;
                        display: block;
                        height: 10px;
                        width: 10px;
                        background-color: #3a3d89;
                    }

                    .search_title {
                        display: block;
                        float: left;
                        margin-top: 28px;
                        margin-left: 15px;
                        letter-spacing: 1.2px;
                        font-size: 18px;
                        color: #000000;
                        font-weight: 500;
                    }
                }
                .search_box {
                    margin-top: 10px;
                    .search_button {
                        color: white;
                        background-color: #5455b0;
                    }
                }
            }

            .el-table {
                margin: 25px 0 0 2.5%;
                width: 95%;
            }
            .el-pagination {
                text-align: center;
                margin-top: 20px;
            }
        }
    }
</style>


