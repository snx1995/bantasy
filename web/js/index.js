(function () {
    // switch (location.hostname) {
    //     case "www.bantasy.top":
    //     case "bantasy.top":
    //     case "localhost":
    //         break;
    //     default:
    //         window.location = "https://www.bantasy.top";
    // }

    const main = document.querySelector(".main");
    const createElement = document.createElement.bind(document);
    const articleContainer = document.querySelector("#article");
    const pastContainer = document.querySelector("#past");
    const viewPast = document.querySelector("#viewPast");
    const cons = document.querySelector(".console");

    viewPast.addEventListener("click", function (event){
        axios.get("/serv/article/get?func=t&start=0&length=10").then(function (response) {
            const res = response.data;
            if (res.code == 0) {
                articleContainer.style.display = "none";
                pastContainer.innerHTML = "";
                pastContainer.appendChild(viewPastPage(res.data));
                pastContainer.style.display = "block";
            }
        })
    })

    axios.get("/serv/article/get").then(res => {
        const data = res.data.data;
        if (data.articles instanceof Array) {
            data.articles.forEach(e => {
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
        }
    })

    cons.addEventListener("keydown", event => {
        if (event.keyCode == 13) {
            const ins = cons.value;
            axios.get(`/do/console?i=${ins}`).then(res => {
                
            })
        }
    })

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
        const pastList = document.createElement("ul");
        pastList.classList.add("past-list");

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
                axios.get(`/serv/article/get?func=phase&phase=${ph}`).then(function (response) {
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
                    }
                })
                
            })
        }
        return pastList;
    }
})();