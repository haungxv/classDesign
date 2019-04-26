<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "app",
        created() {
            //在页面加载时读取sessionStorage里的状态信息
            // if (sessionStorage.length) {
            //     this.$store.state.token = sessionStorage.getItem("token");
            // }

            //在页面刷新时将vuex里的信息保存到sessionStorage里
            // window.addEventListener("beforeunload", () => {
            //     sessionStorage.setItem("token", this.$store.state.token);
            // })
        }
    }
</script>

<style scoped>
    #app {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>