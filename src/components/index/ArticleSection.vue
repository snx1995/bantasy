<template>
    <div>
        <section class="style0" v-if="art.type == 0">
            <div class="img-container">
                <img :src="'/static/' + art.img">
            </div>
            <article>
                <div class="title-container">
                    <h1>{{art.title}}</h1>
                    <h2>{{art.subtitle}}</h2>
                </div>
                <p>{{art.article}}</p>
            </article>
        </section>
        <section class="style1" v-if="art.type == 1">
            <div class="container">
                <div class="title-container">
                    <h1>{{art.title}}</h1>
                    <h2>{{art.subtitle}}</h2>
                </div>
                <div class="img-container">
                    <div>
                        <img :src="'/static/' + art.img1">
                    </div>
                    <div>
                        <img :src="'/static/' + art.img2">
                    </div>
                    <div>
                        <img :src="'/static/' + art.img3">
                    </div>
                    <div>
                        <img :src="'/static/' + art.img4">
                    </div>
                </div>
            </div>
        </section>
        <section class="style2" v-if="art.type == 2">
            <div class="container">
                <div>
                    <img :src="'/static/' + art.img1">
                </div>
                <div>
                    <article>
                        <h1>{{art.article1.title}}</h1>
                        <p>{{art.article1.article}}</p>
                    </article>
                </div>
                <div>
                    <article>
                        <h1>{{art.article2.title}}</h1>
                        <p>{{art.article2.article}}</p>
                    </article>
                </div>
                <div>
                    <img :src="'/static/' + art.img2">
                </div>
                <div>
                    <img :src="'/static/' + art.img3">
                </div>
                <div>
                    <article>
                        <h1>{{art.article3.title}}</h1>
                        <p>{{art.article3.article}}</p>
                    </article>
                </div>
            </div>
        </section>
        <section class="style3" v-if="art.type == 3">
            <div class="col">
                <div class="row">
                    <h1 class="text">{{art.word[0]}}</h1>
                    <div class="content">
                        <h1>{{art.articles[0].title}}</h1>
                        <p>{{art.articles[0].article}}</p>
                    </div>
                </div>
                <img :src="'/static/' + art.imgs[0]">
            </div>
            <div class="col">
                <div class="row">
                    <h1 class="text">{{art.word[1]}}</h1>
                    <div class="content">
                        <h1>{{art.articles[1].title}}</h1>
                        <p>{{art.articles[1].article}}</p>
                    </div>
                </div>
                <img :src="'/static/' + art.imgs[1]">
            </div>
            <div class="col">
                <div class="row">
                    <h1 class="text">{{art.word[2]}}</h1>
                    <div class="content">
                        <h1>{{art.articles[2].title}}</h1>
                        <p>{{art.articles[2].article}}</p>
                    </div>
                </div>
                <img :src="'/static/' + art.imgs[2]">
            </div>
            <div class="col">
                <div class="row">
                    <h1 class="text">{{art.word[3]}}</h1>
                    <div class="content">
                        <h1>{{art.articles[3].title}}</h1>
                        <p>{{art.articles[3].article}}</p>
                    </div>
                </div>
                <img :src="'/static/' + art.imgs[3]">
            </div>
        </section>
    </div>
</template>
<style lang="less" scoped>
section.style0 {
    display: flex;
    flex-direction: column;
    .img-container{
        width: 100%;
        overflow: hidden;
        background: #fff;
        img {
            width: 100%;
            height: auto;
        }
    }
    > article {
        background: #fff;
        .title-container {
            padding: 30px 0;
        }
        h1 {
            text-align: center;
            padding: 20px;
            position: relative;
            font-size: 1.8em;
            letter-spacing: 10px;
            &::before {
                content: "";
                position: absolute;
                width: 100px;
                display: block;
                top: 100%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #bdc3c7;
                font-weight: 100;
                font-size: .8em;
                border-bottom: 1px solid #7f8c8d;
            }
        }
        h2 {
            text-align: center;
            padding: 20px;
            color: #bdc3c7;
            font-size: .8em;
            letter-spacing: 5px;
        }
        p {
            background: #ecf0f1;
            padding: 40px;
            line-height: 2em;
            color: #7f8c8d;
            // text-indent: 1em;
            text-align: center;
        }
    }
}
section.style1 {
    .container {
        padding: 100px 50px;
        .title-container {
            background: #353b48;
            padding: 30px 0;
            h1 {
                color: #fff;
                text-align: center;
                padding: 20px;
                position: relative;
                font-size: 1.8em;
                letter-spacing: 10px;
                &::before {
                    content: "";
                    position: absolute;
                    display: block;
                    width: 100px;
                    top: 100%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: #ecf0f1;
                    font-weight: 100;
                    font-size: .8em;
                    border-bottom: 1px solid #7f8c8d;
                }
            }
            h2 {
                text-align: center;
                padding: 20px;
                color: #7f8c8d;
                font-size: .8em;
                letter-spacing: 5px;
            }
        }
        .img-container {
            display: flex;
            flex-wrap: wrap;
            > div {
                width: 50%;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
section.style2  {
    .container {
        display: flex;
        flex-wrap: wrap;
        > div {
            width: 50%;
            position: relative;
            background: #ecf0f1;
            &:nth-child(3) {
                background: #34495e;
                article{
                    text-align: end;
                    color: #ecf0f1;
                }
            }
            img {
                width: 100%;
                height: 100%;
            }
            article {
                position: absolute;
                width: 70%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: start;
                h1 {
                    padding: 1em 0;
                    font-size: 1.5em;
                }
                p {
                    color: #7f8c8d;
                }
            }
        }
    }
}
section.style3 {
    z-index: 0;
    overflow: hidden;
    display: flex;
    width: 100%;
    height: 700px;
    background-size: cover;
    * {
        box-sizing: border-box;
    }
    position: relative;
    .col {
        height: 100%;
        width: 25%;
        display: flex;
        align-items: center;
        &:not(:last-child) {
            border-right: 2px solid #000;
        }
        .row {
            display: flex;
            align-items: center;
            width: 100%;
            height: 33.333%;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            position: relative;
            .text {
                cursor: default;
                padding: 0;
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                text-align: center;
                color: #ffffffcc;
                font-size: 7em;
            }
            .content {
                padding: 1em;
                width: 100%;
                height: 150%;
                background-color: #fff;
                transform: translateY(220%);
                transition: transform .6s, opacity .6s;
                opacity: 0;
                h1, p {
                    text-align: center;
                    padding: 1em 0;
                }
            }
        }
        &:hover {
            .content {
                transform: translateY(0);
                opacity: 1;
            }
            img {
                transform: translateY(-10%);
                opacity: 1;
            }
        }
        img {
            display: block;
            width: 100%;
            height: 120%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            transform: translateY(0);
            opacity: 0;
            transition: transform .6s, opacity .6s;
        }
    }
}
</style>
<script>
export default {
    name: "ArticleSection",
    props: ["art"]
}
</script>
