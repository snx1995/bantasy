<template>
    <div class="index" :class="{finished: loadFinished}">
        <IndexHeader />
        <div class="inner">
            <ArticlePhase :phase="phase" v-show="mode === 'default'"/>
            <PastList v-show="mode === 'past'" @view-article="loadArticle($event)"/>
        </div>
        <IndexFooter @view-past="mode = 'past'"/>
        <div class="loading" :class="{finished: loadFinished}" @transitionend="loadTransitionFinish">
            <div class="in-progress" v-show="!loadError">
                <div class="ani a1">意</div>
                <div class="ani a2">想</div>
                <div class="ani a3">之</div>
                <div class="ani a4">外</div>
                <div class="ani a5">loading...</div>
            </div>
            <div class="error" v-show="loadError">
                加载失败，请重试
            </div>
        </div>
        <a href="#" class="scroll-top-btn">top</a>
    </div>
</template>
<style lang="less" scoped>
.index {
    width: 100%;
    height: 100%;
    background-image: url(/static/index_bg.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    overflow: hidden;
    &.finished {
        overflow: auto;
    }
    .inner {
        width: 1200px;
        margin: 0 auto;
        background: #34495e;
    }
    .scroll-top-btn {
        display: block;
        width: 40px;
        height: 40px;
        background-color: #34495e;
        color: #fff;
        opacity: 0.3;
        position: fixed;
        bottom: 40px;
        right: 10px;
        text-decoration: none;
        text-align: center;
        line-height: 40px;
    }
    .scroll-top-btn:hover {
        opacity: 1;
    }
    .loading {
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 0 0, #1abc9c, #2980b9);
        transition: transform 1s;
        .in-progress {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .error {
            color: #fff;
            font-size: 5em;
            font-weight: bold;
            font-style: italic;
        }
        &.finished {
            transform: translateY(-110%);
        }
        &.failed {
            .error {
                display: block;
            }
            .in-progress {
                display: none;
            }
        }
        .ani {
            color: #fff;
            font-size: 5em;
            font-weight: bold;
            font-style: italic;
            &:not(:last-child) {
                margin-right: 50px;
            }
            @aniTime: 1.5s;
            @aniDelay: .1s;
            &.a1 {
                animation: loading @aniTime infinite;
            }
            &.a2 {
                animation: loading @aniTime @aniDelay infinite;
                
            }
            &.a3 {
                animation: loading @aniTime @aniDelay * 2 infinite;
            }
            &.a4 {
                animation: loading @aniTime @aniDelay * 3 infinite;
            }
            &.a5 {
                height: 5em;
                line-height: 7em;
                vertical-align: bottom;
                animation: loading @aniTime @aniDelay * 4 infinite;
                font-size: 2em;
            }
        }
    }
}
@keyframes loading {
    0%, 20%, 80%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
}
</style>
<script>
import ArticlePhase from "./ArticlePhase";
import IndexFooter from "./IndexFooter";
import IndexHeader from "./IndexHeader";
import PastList from "./PastList";
import axios from "axios";

export default {
    name: "Index",
    components: {
        ArticlePhase,
        IndexFooter,
        IndexHeader,
        PastList
    },
    data (){
        return {
            mode: "default",    // default, past
            phase: {articles: []},
            pastList: [],
            loadError: false,
            loadFinished: false
        }
    },
    created() {
        axios.get("/serv/article/get").then(res => {
            if (!res.error) {
                this.phase = res.data;
                this.loadFinished = true;
            }
        }).catch(err => {
            this.loadError = true;
            console.log(err);
        })
    },
    methods: {
        loadArticle(phase) {
            axios.get(`/serv/article/get?func=phase&phase=${phase}`).then(res => {
                if (!res.error) this.phase = res.data;
                this.mode = "default";
                this.loadFinished = true;
            }).catch(err => {
                this.loadError = true;
                console.log(err);
            })
        },
        loadTransitionFinish(event) {
            event.target.style.display = "none";
        }
    }
}
</script>
