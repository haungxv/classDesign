<template>
  <div class="sign">
    <div class="sign">登陆</div>
    <div class="register">注册</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sign: {
        email: "",
        pass: ""
      },
      register: {
        user: "",
        email: "",
        code: "",
        pass: ""
      }
    };
  },
  methods: {},
  mounted() {
    //登陆接口
    // this.$post("/sign/login", {
    //   email: "1323178720@qq.com",
    //   pass: "1256"
    // }).then(res => {
    //   console.log(res);
    // });

    // 发邮件接口
    // this.$post("/public/email", {
    //   email: "1323178720@qq.com"
    // }).then(res => {
    //   console.log(res);
    // });

    //注册接口
    // this.$post("/sign/register", {
    //   name:'黄东旭',
    //   code:'123456',
    //   email: "456",
    //   pass:'123456',
    // }).then(res => {
    //   console.log(res);
    // });

    //修改密码接口
    //  this.$post("/public/pass", {
    //   code:'848529',
    //   email: "1323178720@qq.com",
    //   pass:'huangxv',
    // }).then(res => {
    //   console.log(res);
    // });
  }
};
</script>

<style>
</style>


