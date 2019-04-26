<template>
    <div class="box changeRate">
        <div class="content">
            <div class="search">
                <div class="search_title_box">
                    <span class="square"></span>
                    <span class="search_title">账户查询</span>
                </div>
                <div class="search_box">
                    <el-form :model="inquireForm" ref="inquireForm" :inline="true">
                        <el-form-item>
                            <el-form-item label="姓名">
                                <el-input v-model="inquireForm.name" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-input v-model="inquireForm.email" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-button class="search_button" @click="inquire">查询</el-button>
                            <el-button @click="getAll">全部</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-table :data="tableData" border>
                <el-table-column label="姓名" align="center" prop="case_id"></el-table-column>
                <el-table-column label="邮箱" align="center" prop="reporter.name"></el-table-column>
                <el-table-column label="联系方式" align="center" prop="reporter.name"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="reporter.name"></el-table-column>
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
                    name: "", //姓名
                    email: "", //邮箱
                },

                tableData: [], //表格展示数据
                page: {
                    //分页
                    pageSize: 8, //每页显示的信息数目
                    total: 0, //总共的信息数目
                    currentPage: 1 //当前页数
                },


            };
        },
        methods: {
            handleCurrentChange() {
                //分页
                this.getData(this.page.currentPage, this.page.pageSize);
            },
            inquire() {
                //查询学生
            },
            getAll() {
                //获取全部学生
            },
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


