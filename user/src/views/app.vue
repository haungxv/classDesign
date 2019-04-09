<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    //添加设备接口
    // this.$post("/appliance/add", {
    //   name: "哈",
    //   depict: "哈哈哈哈",
    //   alertvalue: 95,
    // }).then(res => {
    //   console.log(res);
    // });

    //修改设备信息接口
    // this.$post("/appliance/change", {
    //   id:'7f7d5590',
    //   name: "哈哈哈",
    //   depict: "哈哈哈哈哈哈",
    //   alertvalue: 95,
    //   startvalue: 13
    // }).then(res => {
    //   console.log(res);
    // });

    //删除设备接口
    // this.$post("/appliance/delete",{
    //   id:"7cc99cb0"
    // })
    // .then(res => {
    //   console.log(res);
    // });


    //检测设备接口
    this.$post("/appliance/check", {
      id:'8c1aeb50',
    }).then(res => {
      console.log(res);
    });
  }
};
</script>

<style>
</style>


