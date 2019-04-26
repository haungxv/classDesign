<template>
  <div class="header">
    <img :src="site" class="left_img">
    <span class="title">{{name}}</span>
    <span class="more" @click="more">更多</span>
    <img :src="site" class="right_img">
  </div>
</template>

<script>
export default {
  props: ["name", "site", "id"],
  data() {
    return {};
  },
  methods: {
    more() {
      //点击更多之后路由跳转
      let router = "";
      switch (this.id) {
        case 3:
          router = "checkRate";
          break;
        case 4:
          router = "completed";
          break;
      }
      this.$router.push(`/manager/${router}`);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
$borderBottomColor: #bbbbbb;
$moreTextColor: #337cbb;
$headerHeight: 40px;
$textHeight: 25px;
$textFontSize:14px;

.header {
  border-bottom: 1px solid $borderBottomColor;
  width: 95%;
  margin-left: 2.5%;
  height: $headerHeight;
  .left_img,
  .right_img {
    height: calc(#{$headerHeight} - 19px);
    width: calc(#{$headerHeight} - 19px);
    margin: 14px 10px 0 0;
  }
  .title,
  .more {
    height: $textHeight;
    line-height: $textHeight;
    margin-top: 15px;
    font-size: $textFontSize;
  }
  .left_img {
    display: inline-block;
    float: left;
    margin-left: 5px;
  }
  .title {
    float: left;
  }
  .right_img {
    float: right;
  }
  .more {
    float: right;
    margin-right: 10px;
    color: $moreTextColor;
    cursor: pointer;
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
</style>


