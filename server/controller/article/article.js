const logger = require("../../../logger");
const dao = require("../../system/dao");
const Common = require("../../entity/common");
const Results = require("../../system/result");
const lang = require("../../system/language");

const TAG = "article";

const Article = {
    "/get": {
        method: "GET",
        handler(req, res) {

        }
    },
    "/post": {
        method: "POST",
        enctype: "multipart/form-data",
        handler(req, res) {
            const body = req.body;
            let article;
            let img1, img2, img3, img4;
            switch (body.type) {
                case '0':
                    const img = req.files[0] ? req.files[0].filename : "";
                    article = new Article0(img, body.title, body.subtitle, body.article);
                    break;
                case '1':
                    req.files.forEach(e => {
                        if (e.fieldname == "img1") img1 = e.filename;
                        else if (e.fieldname == "img2") img2 = e.filename;
                        else if (e.fieldname == "img3") img3 = e.filename;
                        else if (e.fieldname == "img4") img4 = e.filename;
                    })
                    article = new Article1(body.title, body.subtitle, img1, img2, img3, img4);
                    break;
                case '2':
                    req.files.forEach(e => {
                        if (e.fieldname == "img1") img1 = e.filename;
                        else if (e.fieldname == "img2") img2 = e.filename;
                        else if (e.fieldname == "img3") img3 = e.filename;
                    })
                    article = new Article2(img1, img2, img3, 
                        {title: body.title1, article: body.article1},
                        {title: body.title2, article: body.article2},
                        {title: body.title3, article: body.article3}
                    );
                    break;
                case undefined:
                    res.send(Results.lackParam("type"));
                    return;
                default:
                    res.send(Results.forbidden(lang.invalidArticleType.zhcn));
                    return;
            }
            dao.insert("articles", article, err => {
                if (err) {
                    logger.error(TAG, `error while insert article -> ${err}`);
                    res.send(Results.error("error"));
                } else {
                    res.send(Results.success(article.id));
                }
            })
        }
    }
}

class Article0 extends Common{
    constructor(img, title, subtitle, article) {
        super();
        this.type = 0;
        this.img = img;
        this.title = title;
        this.subtitle = subtitle;
        this.article = article;
    }
}

class Article1 extends Common {
    constructor(title, subtitle, img1, img2, img3, img4) {
        super();
        this.type = 1;
        this.title = title;
        this.subtitle = subtitle;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.img4 = img4;
    }
}

class Article2 extends Common {
    constructor(img1, img2, img3, article1, article2, article3) {
        super();
        this.type = 2;
        this.img1 = img1;
        this.img2 = img2;
        this.img3 = img3;
        this.article1 = article1;
        this.article2 = article2;
        this.article3 = article3;
    }
}

module.exports = Article;