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
    const container = document.querySelector(".inner");
    const cons = document.querySelector(".console");

    container.appendChild(newStyle1("./img/pic02.jpg", "静水流深", "人间初静，秋水娉婷", "当走出机舱，又一次来到这座熟悉的城市、呼吸着这久违的空气、踏上这曾经走过的土地、听见这熟悉的口音，我心情有些低落，微微地叹了一口气。我又回来了，仿佛做了一个美妙的梦，终于到了梦醒时分。说实话，我真的不想回来，但我不得不回来。回来后迎接我的是枯燥的工作、无趣的同事、一成不变的日子，我很不喜欢这样的生活，却没有办法改变，毕竟我没有钱，无法洒脱。每一次旅行，都好似上天给我一个做梦的机会，我可以做各式各样的梦。在放假的那些日子，我快乐极了、我幸福极了，如果能一直这样流浪下去该多好，但我却无法真正实现逍遥游，因为现实不允许，我还得工作，还得还房贷，还得养家。"))
    container.appendChild(newStyle2(["./img/pic01.jpg", "./img/pic03.jpg", "./img/pic04.jpg", "./img/pic05.jpg"], "静水流深", "人间初静，秋水娉婷"))
    container.appendChild(newStyle3(["./img/pic06.jpg", "./img/pic07.jpg", "./img/pic08.jpg"], [
        {
            title: "人生苦短，",
            article: "对于我们这些平民百姓,没有太多选择的机会。我们只能在现实中挣扎，这样我们才能抓住属于自己的那根救命稻草，把自己的头匆匆探出水面，大口吸气，以此让自己不被淹死。对于平凡的人，想要活得潇潇洒洒，何其困难。中国人口如此之多，人才多如牛毛，稍不注意，就会被淘汰。我们哪敢勇敢地去做自己，只能把内心的自我，掩埋起来，等着某一天，它能真正地发芽，真正地开花结果。"
        },
        {
            title: "旅行真美啊，",
            article: "在旅行中的自己也很美，我想让自己的人生变得有意思，我想让自己快乐，我不想辜负这短暂的一生，我想去做自己喜欢的事。为了这个梦想，我不得不忍辱负重，捡起地上的砖头，去为富人建造华丽的城堡，如此我才有钱吃饭，我才有钱旅行。"
        },
        {
            title: "虽然过程很慢，",
            article: "虽然需要付出许多青春，但只要有做梦的机会，哪怕一年只有一次，我也心甘情愿。"
        }
    ]));

    main.addEventListener("scroll", function (event) {
        console.log(1);
    })
    
    cons.addEventListener("keydown", event => {
        if (event.keyCode == 13) {
            const ins = cons.value;
            axios.get(`/do/console?i=${ins}`).then(res => {
                
            })
        }
    })

    function newStyle1(img, title, subtitle, article) {
        const section = createElement("section");
        section.classList.add("style1");
        section.innerHTML = `<div class="img-container"><img src="${img}" alt=""></div>
            <article><div class="title-container"><h1>${title}</h1><h2>${subtitle}</h2></div>
            <p>${article}</p></article>`;
        return section;
    }

    function newStyle2(imgs, title, subtitle) {
        const section = createElement("section");
        section.classList.add("style2");
        section.innerHTML = `<div class="container"><div class="title-container"><h1>${title}</h1>
            <h2>${subtitle}</h2></div><div class="img-container">
            <div><img src="${imgs[0]}" alt=""></div><div><img src="${imgs[1]}" alt=""></div>
            <div><img src="${imgs[2]}" alt=""></div><div><img src="${imgs[3]}" alt=""></div>
            </div></div>`;
        return section;
    }

    function newStyle3(imgs, articles) {
        const section = createElement("section");
        section.classList.add("style3");
        section.innerHTML = `<div class="container"><div><img src="${imgs[0]}" alt=""></div>
        <div><article><h1>${articles[0].title}</h1><p>${articles[0].article}</p></article></div>
        <div><article><h1>${articles[1].title}</h1><p>${articles[1].article}</p></article></div>
        <div><img src="${imgs[1]}" alt=""></div><div><img src="${imgs[2]}" alt=""></div>
        <div><article><h1>${articles[2].title}</h1><p>${articles[2].article}</p></article></div></div>`;
        return section;
    }
})();