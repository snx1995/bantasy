(function (){
    var uitasys = document.querySelectorAll(".uitasy");
    uitasys.forEach(function (e) {
        switch (true) {
            case e.matches(".ui-img"):
                uiImg(e);
                break;
            default:
                break;
        }
    })

    function uiImg(el) {
        var img = document.createElement("img");
        var uiImgWrapper = document.createElement("div");

        el.before(uiImgWrapper);
        uiImgWrapper.appendChild(img);
        uiImgWrapper.appendChild(el);

        img.src = "/img/img_example.png";
        uiImgWrapper.classList.add("ui-img-wrapper");
        uiImgWrapper.addEventListener("click", function () {
            el.click();
        })
        el.addEventListener("change", function () {
            var file = this.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (event) {
                img.src = event.target.result;
            }
        })
    }
})()