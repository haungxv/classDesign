<template>
  <div class="manager">
    <div class="manager_top">
      <img class="logo" src="../images/logo.png">
      <span class="school">仪器管理系统</span>
      <span class="name">{{header.name}}</span>
      <span class="manager" @click="changeRouter(4)">修改个人信息</span>
      <span class="index" @click="changeRouter(1)">仪器管理</span>
    </div>
    <div class="manager_left">
      <div class="left_box" v-for="item in left" :key="item.id">
        <div class="left_title" @click="changeRouter(item.id)">
          <img :src="item.src">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="manager_right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: [
        //左侧边栏标题
        {
          id: 1,
          name: "仪器管理",
          src: "/src/images/left_1.png"
        },
        {
          id: 2,
          name: "新增仪器",
          src: "/src/images/left_2.png"
        },
        {
          id: 3,
          name: "账户管理",
          src: "/src/images/left_6.png"
        },
        {
          id: 4,
          name: "修改信息",
          src: "/src/images/left_5.png"
        }
      ],
      header: {
        //上栏数据
        name: "黄东旭"
      }
    };
  },
  methods: {
    clearOn(num) {
      let array = document.getElementsByClassName("left_title");
      let len = array.length;
      for (let i = 0; i < len; i++) {
        array[i].setAttribute("class", "left_title");
      }
      document
        .getElementsByClassName("left_title")
        [num].setAttribute("class", "left_title on");
    },
    changeRouter(id) {
      //改变路由
      let router = "";
      switch (id) {
        case 1:
          router = "getAppliance";
          this.clearOn(0);
          break;
        case 2:
          router = "addAppliance";
          this.clearOn(1);
          break;
        case 3:
          router = "managerUser";
          this.clearOn(2);
          break;
        case 4:
          router = "changeMsg";
          this.clearOn(3);
          break;
      }
      this.$router.push(`/manager/${router}`);
    },
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
$borderColor: #bbbbbb;
$textColor: #ffffff;
$backColor: #011528;
$topHeight: 79px;
$leftHeight: 90px;
$leftWidth: 190px;
$leftBackColor: rgb(24, 42, 59);

$logoHeight: 30px; //学校logo的长宽

.manager {
  position: relative;
  height: 100%;
  .manager_top {
    background-color: $backColor;
    color: $textColor;
    height: $topHeight;
    width: 100%;
    .logo {
      float: left;
      width: $logoHeight;
      height: $logoHeight;
      margin: calc((#{$topHeight} - #{$logoHeight}) / 2) 0 0 30px;
    }
    .school {
      display: inline-block;
      height: $topHeight;
      line-height: $topHeight;
      margin-left: 8px;
      letter-spacing: 0.1em;
      float: left;
    }
    .index,
    .manager,
    .userImg,
    .part,
    .name {
      float: right;
      height: $topHeight;
      line-height: $topHeight;
      display: inline-block;
      margin-right: 20px;
    }
    .name {
      margin-right: 30px;
    }
    .index,
    .manager {
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
  .manager_left {
    position: absolute;
    top: $topHeight;
    left: 0;
    background-color: $backColor;
    color: $textColor;
    border-top: 1px solid $borderColor;
    width: $leftWidth;
    height: calc(100% - #{$topHeight});
    .left_box {
      height: $leftHeight;
      position: relative;
      .left_title {
        img {
          height: 17px;
          width: 18px;
          margin-top: calc((#{$leftHeight} - 17px) / 2);
          margin-left: 40px;
          float: left;
        }
        span {
          display: block;
          float: left;
          cursor: pointer;
          height: $leftHeight;
          line-height: $leftHeight;
          text-align: center;
          width: 90px;
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
      .on {
        background-color: $leftBackColor;
      }
    }
  }
  .manager_right {
    position: absolute;
    top: $topHeight;
    left: $leftWidth;
    height: calc(100% - #{$topHeight});
    width: calc(100% - #{$leftWidth});
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


