<template>
    <footer>
        <div class="container">
                <span>意想之外</span>
                <span>since 2019</span>
                <span>&copy; Bantasy all rights reserved.</span>
            </div>
            <div></div>
            <div class="container">
                <span><a href="https://snx1995.github.io" target="_blank">Github pages 主页</a></span>
                <span><a href="https://blog.csdn.net/cfmy_ban" target="_blank">CSDN 博客</a></span>
                <span><a href="http://39.106.156.178" target="_blank">个人主页</a></span>
            </div>
            <div></div>
            <div class="container">
                <span>初闻不知曲中意</span>
                <span>再听已是曲中人</span>
                <span><a href="#" @click="$emit('view-past')">往期回顾</a></span>
            </div>
            <div></div>
            <div class="container">
                <span><input type="text" class="console" placeholder="console"></span>
                <span>www-www-www</span>
                <span>
                    <a href="javascript:void(0)"><i class="icon-qq"></i></a>
                    <a href="javascript:void(0)"><i class="icon-wechat"></i></a>
                    <a href="https://weibo.com/u/5392997268/home"><i class="icon-weibo"></i></a>
                    <a href="javascript:void(0)"><i class="icon-facebook"></i></a>
                    <a href="javascript:void(0)"><i class="icon-twitter"></i></a>
                    <a href="javascript:void(0)"><i class="icon-envelope"></i></a>
                </span>
            </div>
    </footer>
</template>
<style lang="less" scoped>
footer {
    margin-top: 100px;
    padding: 30px 0;
    width: 100%;
    height: 200px;
    background: #1e272e;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    .container {
        width: 20%;
        height: 100px;
        color: #95a5a6;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;
        a {
            text-decoration: none;
            color: inherit;
        }
        i {
            font-size: 1.2em;
            cursor: pointer;
            position: relative;
            &::after {
                position: absolute;
                bottom: 130%;
                left: 50%;
                transform: translateX(-50%);
                display: none;
            }
            &[class='icon-wechat']::after {
                content: "";
                width: 200px;
                height: 200px;
                background: url(/static/contact/wechat_code.png);
                background-size: 100% 100%;
            }
            &[class='icon-qq']::after {
                content: "";
                width: 200px;
                height: 200px;
                background-size: 100% 100%;
                background: url(/static/contact/qq_code.png);
                background-size: 100% 100%;
            }
            &[class='icon-weibo']::after {
                content: "@意想之外bantasy";
                width: 20em;
                text-align: center;
                font-size: .8em;
            }
            &:hover::after {
                display: block;
            }
            &:not(:last-child) {
                margin-right: 5px;
            }
        }
    }
    > div:not(.container) {
        width: 1px;
        height: 100%;
        box-sizing: border-box;
        padding: 20px 0;
        background: #95a5a6;
        background-clip: content-box;
    }
    .console {
        display: block;
        width: 100%;
        height: 2em;
        border-radius: 5px;
        color: #95a5a6;
        text-indent: 1em;
        outline: none;
        border: none;
        background: #2c3e50;
    }
}
</style>
<script>
export default {
    name: "IndexFooter",
    data() {
        return {

        }
    }
}
</script>

