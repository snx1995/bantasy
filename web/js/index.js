(function () {

    const main = document.querySelector(".main");
    const createElement = document.createElement.bind(document);
    const articleContainer = document.querySelector("#article");
    const pastContainer = document.querySelector("#past");
    const viewPast = document.querySelector("#viewPast");
    const loading = document.querySelector(".loading");
    const cons = document.querySelector(".console");

    const carousel = document.querySelector("#carousel");

    const pageIndex = {
        start: 0,
        length: 5,
        next: true,
        loading: false
    }

    const pastList = document.createElement("ul");
    const loadMore = document.createElement("div");

    pastList.classList.add("past-list");
    loadMore.classList.add("load-more");
    loadMore.innerHTML = "<div>加载更多</div><div>...没有啦...</div>";

    pastContainer.appendChild(pastList);
    pastContainer.appendChild(loadMore);

    loadMore.addEventListener("click", event => {
        if (!pageIndex.loading) loadPageData();
    })

    viewPast.addEventListener("click", function (event){
        articleContainer.style.display = "none";
        pastContainer.style.display = "block";
    })

    loading.addEventListener("transitionend", event => {
        loading.style.display = "none";
    })

    loadPageData(data => {
        const slideImgs = carousel.querySelectorAll(".slides .slide img");
        const labels = carousel.querySelectorAll(".indicators label");
        for (let i = 1;i< data.length;i ++) {
            const img = slideImgs[i - 1];
            const ph = data[i].phase;
            img.src = data[i].cover;
            img.addEventListener("click", event => {
                loadArticle(ph);
            });
            labels[i - 1].innerHTML = data[i].phaseTitle;
        }
        startCarousel();

        document.body.style.overflow = "auto";
        loading.classList.add("finished");

        function startCarousel() {
            let timer = setInterval(() => {
                const next = carousel.querySelector("input[type='radio']:checked + input[type='radio']");
                (next ? next : labels[0]).click();
            }, 5000);
            const slides = carousel.querySelector(".slides");
            slides.addEventListener("mouseenter", event => {
                clearInterval(timer);
            })

            slides.addEventListener("mouseleave", event => {
                timer = setInterval(() => {
                    const next = carousel.querySelector("input[type='radio']:checked + input[type='radio']");
                    (next ? next : labels[0]).click();
                }, 5000);
            })
        }
    })

    loadArticle();

    function newStyle0(art0) {
        const section = createElement("section");
        section.classList.add("style0");
        section.innerHTML = `<div class="img-container"><img src="${art0.img}" alt=""></div>
            <article><div class="title-container"><h1>${art0.title}</h1><h2>${art0.subtitle}</h2></div>
            <p>${art0.article}</p></article>`;
        return section;
    }

    function newStyle1(art1) {
        const section = createElement("section");
        section.classList.add("style1");
        section.innerHTML = `<div class="container"><div class="title-container"><h1>${art1.title}</h1>
            <h2>${art1.subtitle}</h2></div><div class="img-container">
            <div><img src="${art1.img1}" alt=""></div><div><img src="${art1.img2}" alt=""></div>
            <div><img src="${art1.img3}" alt=""></div><div><img src="${art1.img4}" alt=""></div>
            </div></div>`;
        return section;
    }

    function newStyle2(art2) {
        const section = createElement("section");
        section.classList.add("style2");
        section.innerHTML = `<div class="container"><div><img src="${art2.img1}" alt=""></div>
        <div><article><h1>${art2.article1.title}</h1><p>${art2.article1.article}</p></article></div>
        <div><article><h1>${art2.article2.title}</h1><p>${art2.article2.article}</p></article></div>
        <div><img src="${art2.img2}" alt=""></div><div><img src="${art2.img3}" alt=""></div>
        <div><article><h1>${art2.article3.title}</h1><p>${art2.article3.article}</p></article></div></div>`;
        return section;
    }


    function newStyle3(art3) {
        const section = createElement("section");
        section.classList.add("style3");
        section.style.backgroundImage = `url("${art3.bg}")`;
        section.innerHTML = `<div class="col">
            <div class="row">
                <h1 class="text">${art3.word[0]}</h1>
                <div class="content">
                    <h1>${art3.articles[0].title}</h1>
                    <p>${art3.articles[0].article}</p>
                </div>
            </div>
            <img src="${art3.imgs[0]}" alt="">
            </div>
        <div class="col">
            <div class="row">
                <h1 class="text">${art3.word[1]}</h1>
                <div class="content">
                    <h1>${art3.articles[1].title}</h1>
                    <p>${art3.articles[1].article}</p>
                </div>
            </div>
            <img src="${art3.imgs[1]}" alt="">
            </div>
        <div class="col">
            <div class="row">
                <h1 class="text">${art3.word[2]}</h1>
                <div class="content">
                    <h1>${art3.articles[2].title}</h1>
                    <p>${art3.articles[2].article}</p>
                </div>
            </div>
            <img src="${art3.imgs[2]}" alt="">
            </div>
        <div class="col">
            <div class="row">
                <h1 class="text">${art3.word[3]}</h1>
                <div class="content">
                    <h1>${art3.articles[3].title}</h1>
                    <p>${art3.articles[3].article}</p>
                </div>
            </div>
            <img src="${art3.imgs[3]}" alt="">
        </div>
        `;
        return section;
    }

    function viewPastPage(data) {
        for (var i = 0;i < data.length;i ++) {
            const li = document.createElement("li");
            const cover = document.createElement("div");
            const before = document.createElement("div");
            const after = document.createElement("div");
            const title = document.createElement("h1");
            const phase = document.createElement("span");
            const titleText = document.createElement("span");

            cover.classList.add("cover");
            before.classList.add("before");
            after.classList.add("after");
            phase.classList.add("phase");

            before.style.backgroundImage = `url(${data[i].cover})`;
            after.style.backgroundImage = `url(${data[i].cover})`;
            phase.innerText = data[i].phase;
            titleText.innerText = data[i].phaseTitle;

            title.appendChild(phase);
            title.appendChild(titleText);
            cover.appendChild(before);
            cover.appendChild(after);
            li.appendChild(cover);
            li.appendChild(title);
            pastList.appendChild(li);

            const ph = data[i].phase;
            li.addEventListener("click", function () {
                loadArticle(ph);
            })
        }
        return pastList;
    }

    function loadPageData(cb) {
        pageIndex.loading = true;
        if (pageIndex.next) axios.get(`/serv/article/get?func=t&start=${pageIndex.start}&length=${pageIndex.length}`).then(response => {
            const res = response.data;
            if (res.code === 0) {
                const data = res.data;
                if (data.length < pageIndex.length) {
                    pageIndex.next = false;
                    loadMore.classList.add("disabled");
                }
                pageIndex.start += pageIndex.length;
                viewPastPage(data);
                pageIndex.loading = false;
                if (typeof cb === "function") cb(data);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    function loadArticle(phase) {
        const query = phase === undefined ? "" : `?func=phase&phase=${phase}`;
        axios.get(`/serv/article/get${query}`).then(function (response) {
            const res = response.data;
            if (res.code == 0) {
                articleContainer.innerHTML = "";
                articleContainer.style.display = "block";
                res.data.articles.forEach(e => {
                    switch (e.type) {
                        case 0:
                            articleContainer.appendChild(newStyle0(e));
                            break;
                        case 1:
                            articleContainer.appendChild(newStyle1(e));
                            break;
                        case 2:
                            articleContainer.appendChild(newStyle2(e));
                            break;
                        case 3:
                            articleContainer.appendChild(newStyle3(e));
                            break;
                    }
                })

                articleContainer.appendChild(newStyle3({
                    word: "毕业快乐",
                    bg: "/resource/MTU2MjI0MTQxNjIzNi1JTUdfMDM1OS5qcGc=.jpg",
                    imgs: [
                        "/resource/MTU2MjI0MDk1ODQyNC1JTUdfMDEwMC5qcGc=.jpg",
                        "/resource/MTU2MjI0MDk1ODYzNi1JTUdfMDM5MS5qcGc=.jpg",
                        "/resource/MTU2MjI0MjE3NDE4Ny1JTUdfMDEzOC5qcGc=.jpg",
                        "/resource/MTU2MjI0MjE3NDI2MS1JTUdfMDM2MC5qcGc=.jpg"
                    ],
                    articles: [
                        {
                            title: "时光",
                            article: "过往都是假的，回忆如泡沫般华丽地路过你的一生，没有留下任何归路。岁月总是一去不复返，最浪漫的相约也终究是过往云烟，最漫长的思念只在空中楼阁，路过大海，知道它的有也澎湃的时候;路过高山，知道它曾经也是一座小丘;路过深林，知道它的每一句言语;路过人海，就品味了人生的百味。"
                        },
                        {
                            title: "时光",
                            article: "过往都是假的，回忆如泡沫般华丽地路过你的一生，没有留下任何归路。岁月总是一去不复返，最浪漫的相约也终究是过往云烟，最漫长的思念只在空中楼阁，路过大海，知道它的有也澎湃的时候;路过高山，知道它曾经也是一座小丘;路过深林，知道它的每一句言语;路过人海，就品味了人生的百味。"
                        },
                        {
                            title: "时光",
                            article: "过往都是假的，回忆如泡沫般华丽地路过你的一生，没有留下任何归路。岁月总是一去不复返，最浪漫的相约也终究是过往云烟，最漫长的思念只在空中楼阁，路过大海，知道它的有也澎湃的时候;路过高山，知道它曾经也是一座小丘;路过深林，知道它的每一句言语;路过人海，就品味了人生的百味。"
                        },
                        {
                            title: "时光",
                            article: "过往都是假的，回忆如泡沫般华丽地路过你的一生，没有留下任何归路。岁月总是一去不复返，最浪漫的相约也终究是过往云烟，最漫长的思念只在空中楼阁，路过大海，知道它的有也澎湃的时候;路过高山，知道它曾经也是一座小丘;路过深林，知道它的每一句言语;路过人海，就品味了人生的百味。"
                        }
                    ]
                }));

                pastContainer.style.display = "none";
                window.scrollTo(0, 0);
            }
        }).catch(err => {
            console.log(err);
        })
    }
})();