const logger = require("../../../logger");
const dao = require("../../system/dao");
const Common = require("../../entity/common");
const Results = require("../../system/result");
const lang = require("../../system/language");

const TAG = "article";
const ARTICLE = "articles";
const RESOURCE_DIR = "/resource/";

const Article = {
    "/get": {
        method: "GET",
        handler(req, res) {
            const phase = req.query.phase;
            if (phase) {
                dao.findOne(ARTICLE, {phase}, (err, result) => {
                    if (err) {
                        logger.error(TAG, `error while query phase ${phase} => ${err}`);
                        res.send(Results.error());
                        return;
                    }
                    res.send(Results.success(result));
                })
            } else {
                dao.findOne(ARTICLE, {index: true}, (err, result) => {
                    if (err) {
                        logger.error(TAG, `error while query phase index => ${err}`);
                        res.send(Results.error());
                        return;
                    }
                    const phase = result.phase - 1;
                    dao.findOne(ARTICLE, {phase}, (err, result) => {
                        if (err) {
                            logger.error(TAG, `error while query phase ${phase} => ${err}`);
                            res.send(Results.error());
                            return;
                        }
                        res.send(Results.success(result));
                    })
                })
            }
        }
    },
    "/post": {
        method: "POST",
        enctype: "multipart/form-data",
        handler(req, res) {
            const data = req.body;
            data.files = {};
            if (req.files) {
                req.files.forEach(e => {
                    data.files[e.fieldname] = RESOURCE_DIR + e.filename;
                })
            }
            dao.findOneAndUpdate(ARTICLE, {index: true}, {"$inc": {phase: 1}}, (err, result) => {
                if (err) {
                    logger.error(TAG, `error while inc phase -> ${err}`);
                    res.send(Results.error());
                    return;
                }
                const pre = result.value;
                if (!pre) {
                    logger.error(TAG, `phase index not found`);
                    res.send(Results.error());
                    return;
                }
                data.phase = pre.phase;
                const ap = new ArticlePhase(data);
                dao.insert(ARTICLE, ap, err => {
                    if (err) {
                        logger.error(TAG, `error while insert article -> ${err}`);
                        res.send(Results.error());
                        return;
                    }
                    res.send(Results.success({
                        id: ap.id,
                        phase: data.phase
                    }));
                })
            })
        }
    }
}

class ArticlePhase extends Common {
    constructor(data) {
        super();
        this.articles = [
            new Article0(
                data.files["art0.img"], 
                data["art0.title"], 
                data["art0.subtitle"], 
                data["art0.article"]
            ),
            new Article1(
                data["art1.title"],
                data["art1.subtitle"],
                data.files["art1.img0"],
                data.files["art1.img1"],
                data.files["art1.img2"],
                data.files["art1.img3"]
            ),
            new Article2(
                data.files["art1.img0"],
                data.files["art1.img1"],
                data.files["art1.img2"],
                {
                    "title": data["art2.title0"],
                    "article": data["art2.article0"]
                },
                {
                    "title": data["art2.title1"],
                    "article": data["art2.article1"]
                },
                {
                    "title": data["art2.title2"],
                    "article": data["art2.article2"]
                }
            )
        ];
        this.phase = data.phase;
        const now = new Date();
        this.date = `${now.getFullYear()}-${f(now.getMonth() + 1)}-${f(now.getDate())} ${f(now.getHours())}:${f(now.getMinutes())}:${f(now.getSeconds())}`;

        function f(x) {
            return x < 10 ? ('0' + x) : x;
        }
    }
}

class Article0 extends Common {
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