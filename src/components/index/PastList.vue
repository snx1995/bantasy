<template>
    <ul class="past-list">
        <li>
            <h2>往期回顾</h2>
        </li>
        <li v-for="p in list" :key="p.phase" @click="$emit('view-article', p.phase)">
            <div class="cover" :style="{'background-image': 'url(/static/' + p.cover + ')'}">
            </div>
            <h1>
                <span>{{p.phase}}</span>
                {{p.phaseTitle}}
            </h1>
        </li>
        <li class="load-more" :class="{disabled: !pageIndex.next}" @click="loadPageData">
            {{pageIndex.next ? "加载更多" : "...没有啦..."}}
        </li>
    </ul>
</template>
<style lang="less" scoped>
.past-list {
    @h: 150px;
    @w: @h / 0.618;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    > li {
        cursor: pointer;
        padding: 0;
        width: 100%;
        height: @h;
        position: relative;
        overflow: hidden;
        background: #fff;
        &:first-child {
            height: 50px;
            h2 {
                margin: 0;
                padding: 0;
                line-height: 50px;
                height: 100%;
                text-align: center;
            }
        }
        &:hover {
            background: #ecf0f1;
        }
        &:not(:first-child) {
            margin-top: 2em;
        }
        &.load-more {
            margin-top: 20px;
            cursor: pointer;
            height: 50px;
            background: #fff;
            text-align: center;
            line-height: 50px;
            &:hover {
                background: #ecf0f1;
            }
        }
        .cover {
            position: absolute;
            top: 0;
            left: 0;
            height: @h;
            width: @w;
            @p1: @w - 40;
            @p2: @p1 / 3;
            overflow: hidden;
            background-size: 0 0;
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: @w;
                height: @h;
                background-image: inherit;
                background-size: auto 100%;
                clip-path: polygon(@p1 + 10 0, @w 0, @p2 + 40 @h, @p2 + 10 @h);
            }
            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: @w;
                height: @h;
                background-image: inherit;
                background-size: auto 100%;
                clip-path: polygon(0 0, @p1 0, @p2 @h, 0 @h);
            }
        }
        h1 {
            margin: 0;
            text-indent: @w / 1.2;
            line-height: @h;
            height: 100%;
            text-align: start;
            span {
                font-style: italic;
                font-weight: 100;
                margin-right: 1em;
            }
        }
    }
}
</style>
<script>
import axios from "axios";

export default {
    name: "PastList",
    data() {
        return {
            pageIndex: {
                start: 0,
                length: 5,
                next: true,
                loading: false
            },
            list: []
        }
    },
    created() {
        this.loadPageData();
    },
    methods: {
        loadPageData() {
            this.pageIndex.loading = true;
            if (this.pageIndex.next) axios.get(`/serv/article/get?func=past&start=${this.pageIndex.start}&length=${this.pageIndex.length}`).then(res => {
                if (res.code === 0) {
                    const data = res.data;
                    if (data.length < this.pageIndex.length) {
                        this.pageIndex.next = false;
                    }
                    this.pageIndex.start += this.pageIndex.length;
                    this.pageIndex.loading = false;
                    this.list.push(...res.data);
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
