(function () {

    const main = document.querySelector(".main");
    const createElement = document.createElement.bind(document);
    const articleContainer = document.querySelector("#article");
    const pastContainer = document.querySelector("#past");
    const viewPast = document.querySelector("#viewPast");
    const pastList = document.createElement("ul");
    const loadMore = document.createElement("div");

    const carousel = document.querySelector("#carousel");

    const pageIndex = {
        start: 0,
        length: 5,
        next: true,
        loading: false
    }

    const cons = document.querySelector(".console");

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
        // if (pageIndex.start === 0) loadPageData();
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
        section.classList.add("style1");
        section.innerHTML = `<div class="img-container"><img src="${art0.img}" alt=""></div>
            <article><div class="title-container"><h1>${art0.title}</h1><h2>${art0.subtitle}</h2></div>
            <p>${art0.article}</p></article>`;
        return section;
    }

    function newStyle1(art1) {
        const section = createElement("section");
        section.classList.add("style2");
        section.innerHTML = `<div class="container"><div class="title-container"><h1>${art1.title}</h1>
            <h2>${art1.subtitle}</h2></div><div class="img-container">
            <div><img src="${art1.img1}" alt=""></div><div><img src="${art1.img2}" alt=""></div>
            <div><img src="${art1.img3}" alt=""></div><div><img src="${art1.img4}" alt=""></div>
            </div></div>`;
        return section;
    }

    function newStyle2(art2) {
        const section = createElement("section");
        section.classList.add("style3");
        section.innerHTML = `<div class="container"><div><img src="${art2.img1}" alt=""></div>
        <div><article><h1>${art2.article1.title}</h1><p>${art2.article1.article}</p></article></div>
        <div><article><h1>${art2.article2.title}</h1><p>${art2.article2.article}</p></article></div>
        <div><img src="${art2.img2}" alt=""></div><div><img src="${art2.img3}" alt=""></div>
        <div><article><h1>${art2.article3.title}</h1><p>${art2.article3.article}</p></article></div></div>`;
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
                    }
                })
                pastContainer.style.display = "none";
                window.scrollTo(0, 0);
            }
        }).catch(err => {
            console.log(err);
        })
    }
})();