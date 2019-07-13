<template>
    <div class="article-phase">
        <ArticleSection v-for="art in phase.articles" :key="art.id" :art="art" />
    </div>
</template>
<style lang="less" scoped>
.article-phase {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-shadow: 0 12px 24px rgba(7, 17, 27, .2);
    > section:not(:last-child) {
        margin-bottom: 50px;
    }
    &::after {
        content: "-----------  the end  -----------";
        margin-top: 20px;
        display: block;
        width: 100%;
        height: 50px;
        background: #ecf0f1;
        color: #7f8c8d;
        text-align: center;
        line-height: 50px;
        font-style: italic;
    }
}
</style>
<script>
import ArticleSection from "./ArticleSection";
export default {
    name: "ArticlePhase",
    components: {
        ArticleSection
    },
    props: ["phase"]
}
</script>
