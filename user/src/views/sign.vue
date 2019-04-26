<template>
  <div class="sign_page">
    <div class="box">
      <img class="header" src="../images/sign_head.png">
      <div class="sign" v-if="show_sign">
        <div class="title_1">课程设计</div>
        <div class="title_2">仪器管理系统</div>
        <el-form :model="sign_form">
          <el-form-item>
            <img src="../images/user.png">
            <input v-model="sign_form.username" class="self-input" type="text" placeholder="请输入邮箱">
          </el-form-item>
          <el-form-item>
            <img src="../images/password.png">
            <input
              v-model="sign_form.password"
              class="self-input"
              type="password"
              placeholder="请输入密码"
            >
          </el-form-item>
        </el-form>
        <div class="login_button" @click="login">登录</div>
        <div class="toRegister" @click="login_close">还没有账号，点此注册</div>
      </div>
      <div class="register" v-if="!show_sign">
        <div class="register_little" v-for="item in register_labels" :key="item.id">
          <span>{{item.name}}</span>
          <input
            v-model="item.value"
            class="self-input"
            :type="item.type"
            :placeholder="item.placeholder"
          >
        </div>
        <div class="getCode">点击获取</div>
        <div class="register_button" @click="register">注册</div>
        <div class="toLogin" @click="register_close">已有账号，点此登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "sign",
  data() {
    return {
      show_sign: true, //是否展示登录框
      sign_form: {
        username: "",
        password: ""
      },
      register_form: {},
      register_labels: [
        {
          id: 1,
          name: "用户名：",
          placeholder: "请输入用户名",
          type: "text",
          value: ""
        },
        {
          id: 2,
          name: "邮箱：",
          placeholder: "请输入邮箱",
          type: "text",
          value: ""
        },
        {
          id: 3,
          name: "验证码：",
          placeholder: "请输入验证码",
          type: "text",
          value: ""
        },
          {
              id: 4,
              name: "电话：",
              placeholder: "请输入电话",
              type: "text",
              value: ""
          },
        {
          id: 5,
          name: "密码：",
          placeholder: "请输入密码",
          type: "password",
          value: ""
        },
        {
          id: 6,
          name: "确认密码：",
          placeholder: "请确认密码",
          type: "password",
          value: ""
        }
      ]
    };
  },
  methods: {
    login() {
      if (this.form.username === "") {
        this.$message("请填写用户名！");
        return;
      }
      if (this.form.password === "") {
        this.$message("请填写密码！");
        return;
      }
      let data = this.$qs.stringify({
        username: this.form.username,
        password: this.form.password
      });
      this.$post("/token-auth/", data)
        .then(res => {
          this.$router.push("/case/manager/caseReview");
          this["setToken"](res.data.token);
          this["setRole"](res.data.role);
        })
        .catch(error => {
          this.$message("无法使用提供的认证信息登陆！");
        });
    },
    register() {
      let len = this.register_labels.length;
      for (let i = 0; i < len; i++) {
        if (this.register_labels[i].value === "") {
          this.$message("请将表单填写完整！");
          return;
        }
      }
      if (
        this.register_labels[len - 1].value !==
        this.register_labels[len - 2].value
      ) {
        this.$message("两次输入密码不一致！");
        return;
      }

      let data = this.$qs.stringify({
        name: this.register_labels[0].value,
        studentid: register_labels[1].value,
        email: register_labels[2].value,
        code: register_labels[3].value,
        password: register_labels[4].value
      });
      this.$post("/token-auth/", data)
        .then(res => {
          this.$router.push("/case/manager/caseReview");
          this["setToken"](res.data.token);
          this["setRole"](res.data.role);
        })
        .catch(error => {
          this.$message("无法使用提供的认证信息登陆！");
        });
    },
    login_close() {
      this.sign_form = {
        username: "",
        password: ""
      };
      this.show_sign=false;
    },
    register_close() {
      let len = this.register_labels.length;
      for (let i = 0; i < len; i++) {
        this.register_labels[i].value = "";
      }
      this.show_sign=true;
    },
    ...mapMutations(["setToken", "setRole"])
  }
};
</script>

<style lang="scss" scoped>
$signBoxHeight: 520px; //整个登陆框的高度
$signBoxWidth: 400px; //整个登陆框的宽度

$bigImgHeight: 100px; //登陆框上部分图标的宽高

$titleHeight: 65px; //两行文字的高度
$titleLetterSpacing: 1px; //两行文字的字间距
$titleFontSize: 23px; //两行文字的字体大小

$littleImgHeight: 35px; //小图片的宽高

$inputHeight: 42px; //输入框的高度
$inputWidth: 240px; //输入框的宽度
$inputColor: rgba(136, 136, 136, 1); //输入框的字体颜色
$inputBorderColor: rgba(187, 187, 187, 0.8); //输入框的边框颜色
$inputFocusColor: rgb(121, 171, 254); //输入框获取焦点时的边框颜色
$inputFontSize: 14px; //输入框字体的大小

$loginColor: white; //登录框字体颜色
$loginBackColor: rgba(26, 173, 25, 1); //登陆框背景颜色
$loginWidth: 300px; //登陆框宽度
$loginHeight: 40px; //登陆框高度
$loginFontSize: 18px; //登陆框字体大小
$loginFontWeight: 500; //登陆框字体粗细
$loginLetterSpacing: 3px; //登陆框字体间距

$registerLabelWidth: 80px; //注册框laebl宽度
$registerInputHeight: 40px; //输入框的高度
$codeHeight: 30px; //注册获取验证码高度

.sign_page {
  width: 100%;
  height: 100%;
  background-image: url("../images/sign_back.jpg");
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: $signBoxWidth;
    height: $signBoxHeight;
    box-shadow: 0 0 8px 5px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 11px;
    background-color: white;
    text-align: center;
    img.header {
      height: $bigImgHeight;
      width: $bigImgHeight;
      margin-top: calc(0px - (#{$bigImgHeight} / 2));
    }
    .sign {
      .title_1,
      .title_2 {
        letter-spacing: $titleLetterSpacing;
        text-indent: $titleLetterSpacing;
        height: $titleHeight;
        font-size: $titleFontSize;
      }
      .title_1 {
        line-height: calc(#{$titleHeight} + 25px);
      }
      .title_2 {
        line-height: calc(#{$titleHeight} - 25px);
      }
      .el-form {
        img {
          height: $littleImgHeight;
          width: $littleImgHeight;
          margin: calc((#{$inputHeight} - #{$littleImgHeight}) / 2 + 20px) 30px
            0 40px;
          float: left;
        }
        .self-input {
          border-radius: 4px;
          border: 1px solid $inputBorderColor;
          color: $inputColor;
          display: block;
          float: left;
          font: $inputFontSize Microsoft Yahei;
          box-shadow: 0 0 4px 0 rgba(170, 170, 170, 0.2);
          width: $inputWidth;
          height: $inputHeight;
          line-height: $inputHeight;
          outline: none;
          margin-top: 20px;
          padding: 0 15px;
        }
        input:focus {
          box-shadow: 0 0 4px 0 $inputFocusColor;
          border: 1px solid $inputFocusColor;
        }
      }
      .login_button {
        width: $loginWidth;
        height: $loginHeight;
        line-height: $loginHeight;
        margin: 50px auto 0;
        border-radius: 5px;
        background-color: $loginBackColor;
        color: $loginColor;
        text-align: center;
        letter-spacing: $loginLetterSpacing;
        text-indent: $loginLetterSpacing;
        font-weight: $loginFontWeight;
        font-size: $loginFontSize;
        cursor: pointer;
      }
      .toRegister {
        margin-top: 5px;
        font-size: 13px;
        cursor: pointer;
      }
    }
    .register {
      position: relative;
      .getCode {
        cursor: pointer;
        display: inline-block;
        position: absolute;
        height: $codeHeight;
        line-height: $codeHeight;
        width: 80px;
        color: $loginBackColor;
        top: calc(
          #{$registerInputHeight}* 2 + 2 * 10px +
            (#{$registerInputHeight} - #{$codeHeight}) / 2
        );
        right: calc(
          (#{$signBoxWidth} - #{$registerLabelWidth} - #{$inputWidth}) / 2
        );
      }
      .register_little {
        margin-top: 10px;
        span {
          display: block;
          float: left;
          width: $registerLabelWidth;
          text-align: right;
          height: $registerInputHeight;
          line-height: $registerInputHeight;
          margin-left: calc(
            (#{$signBoxWidth} - #{$registerLabelWidth} - #{$inputWidth}) / 2
          );
        }
        .self-input {
          border-radius: 4px;
          border: 1px solid $inputBorderColor;
          color: $inputColor;
          display: block;
          float: left;
          font: $inputFontSize Microsoft Yahei;
          box-shadow: 0 0 4px 0 rgba(170, 170, 170, 0.2);
          width: $inputWidth;
          height: $registerInputHeight;
          line-height: $registerInputHeight;
          outline: none;
          //   margin-top: 20px;
          padding: 0 15px;
        }
        input:focus {
          box-shadow: 0 0 4px 0 $inputFocusColor;
          border: 1px solid $inputFocusColor;
        }
        &:after {
          display: block;
          content: "";
          clear: both;
          visibility: hidden;
          overflow: hidden;
          height: 0;
        }
      }
      .register_little:nth-child(1) {
        margin-top: 30px;
      }
      .register_button {
        width: $loginWidth;
        height: $loginHeight;
        line-height: $loginHeight;
        margin: 40px auto 0;
        border-radius: 5px;
        background-color: $loginBackColor;
        color: $loginColor;
        text-align: center;
        letter-spacing: $loginLetterSpacing;
        text-indent: $loginLetterSpacing;
        font-weight: $loginFontWeight;
        font-size: $loginFontSize;
        cursor: pointer;
      }
    }

    .toLogin {
      margin-top: 5px;
      font-size: 13px;
      cursor: pointer;
    }
  }
}
</style>