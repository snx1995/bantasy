(function (){
    var uitasys = document.querySelectorAll(".uitasy");
    uitasys.forEach(function (e) {
        switch (true) {
            case e.matches(".ui-img"):
                uiImg(e);
                break;
            case e.matches(".ui-checkbox"):
                uiCheckbox(e);
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
        var cls = el.getAttribute("data-class");
        if (cls) uiImgWrapper.classList.add.apply(uiImgWrapper.classList, cls.split(" "));

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
    
    function uiCheckbox(el) {
        var uiCheckboxWrapper = document.createElement("label");
        var uiCheckboxSubstitute = document.createElement("span");

        uiCheckboxWrapper.classList.add("ui-checkbox-wrapper");
        var cls = el.getAttribute("data-class");
        if (cls) uiCheckboxWrapper.classList.add.apply(uiCheckboxWrapper.classList, cls.split(" "));
        uiCheckboxSubstitute.classList.add("ui-checkbox-substitute");

        el.before(uiCheckboxWrapper);
        uiCheckboxWrapper.appendChild(el);
        uiCheckboxWrapper.appendChild(uiCheckboxSubstitute);
    }
})()