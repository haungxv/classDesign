<template>
    <div class="every_header">
        <div class="header">
            <img :src="src"/>
            <span>{{name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "everyPage_header",
        props: ['name', 'src'],
        methods:{
        
        }
    }
</script>

<style lang="scss" scoped>
    $backgroundColor: rgb(240, 242, 245); //背景颜色

    $everyHeaderHeight: 90px; //整个组件的高度
    $innerHeaderHeight: 50px; //内部header的高度
    $borderColor: #BBBBBB; //border-bottom的颜色

    $imgHeight: 30px; //图片的宽高

    .every_header {
        border: 1px solid $backgroundColor;
        height: $everyHeaderHeight;
        .header {
            margin-top: calc((#{$everyHeaderHeight} - #{$innerHeaderHeight}) / 2 + 5px);
            height: $innerHeaderHeight;
            width: 100%;
            line-height: $innerHeaderHeight;
            border-bottom: 1px solid $borderColor;
            img {
                display: block;
                float: left;
                width: $imgHeight;
                height: $imgHeight;
                margin: calc((#{$innerHeaderHeight} - #{$imgHeight}) / 2) 13px 0 5px;
            }
            .backToIndex{
                cursor:pointer;
            }
        }
    }
</style>