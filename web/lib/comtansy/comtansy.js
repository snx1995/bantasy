(function () {
    function comtansy(option) {
        comtansy.$el = this;
    }

    comtansy.test = function () {
        
    }

    comtansy.data = function (data) {

    }

    comtansy.next = function () {

    }

    comtansy.prev = function () {

    }

    comtansy.page = function (page) {

    }

    Node.prototype.comtansy = comtansy;

    const option = {
        ua: {
            android: "来自安卓",
            ios: "来自IOS",
            web: "来自网页",
            onclick(ua) {
                // ua点击事件， 参数ua = [android, ios, web]

            }
        },
        like: {
            init: ["classname"],
            liked: ["classname"],
            hover: ["classname"],
            onclick() {
                
            }
        }
    }

    
})()

