<template>
    <Header>
        <h1>意&nbsp;&nbsp;想&nbsp;&nbsp;之&nbsp;&nbsp;外</h1>
    </Header>
</template>
<style lang="less" scoped>
header {
    width: 100%;
    text-align: center;
    h1 {
        margin: 0;
        padding-top: 200px;
        margin-bottom: 200px;
        font-size: 96px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        text-align: center;
        position: relative;
        color: #fff;
        &::before {
            content: "by bantasy";
            position: absolute;
            top: 110%;
            left: 50%;
            transform: translateX(-50%);
            font-size: 20px;
            font-family: 'Courier New', Courier, monospace;
        }
    }
}
</style>
<script>
export default {
    name: "IndexHeader"
}
</script>
