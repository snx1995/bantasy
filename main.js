const Config = require("./config");
const express = require("express");
const logger = require("./logger");
const multer = require("multer")
const bodyParser = require("body-parser");

const TAG = "MAIN";
const app = express();

// process.on("uncaughtException", err => {
//     logger.error(TAG, `uncaught error ${err}`);
// })

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, './web/resource');
    },
    filename (req, f, cb) {
        const type = f.originalname.substring(f.originalname.lastIndexOf('.') + 1);
        const name = `${Buffer.from(new Date().getTime() + "-" + f.originalname).toString("base64")}.${type}`;
        cb(null, name);
    }
});
const upload = multer({storage});

registerController("/auth", require("./server/controller/authority/authority"));
registerController("/", require("./server/controller/console"));
registerController("/article", require("./server/controller/article/article"));
registerController("/test", require("./server/controller/test"));

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded
app.use((err, req, res, next) => {
    logger.error(TAG, `error while handle ${req.url} -> ${err}`);
    res.send({code: -1, data: "error"});
})

app.listen(55088);

function registerController(base, controller) {
    base = (!base || base == "/") ? "" : base;
    for (let path in controller) {
        if (controller.hasOwnProperty(path)) {
            const ctrller = controller[path];
            if (!ctrller || !ctrller.method || !ctrller.handler) {
                logger.error(TAG, `invalid controller <${path}>`);
                continue;
            }
            switch (ctrller.method) {
                case "GET":
                    app.get(base + path, ctrller.handler);
                    break;
                case "POST":
                    if (ctrller.enctype == "multipart/form-data") app.post(base + path, upload.any(), ctrller.handler)
                    app.post(base + path, ctrller.handler);
                    break;
                default:
                    logger.error(TAG, `invalid controller method <${ctrller.method}> for path ${base + path}`)
            }
        }
    }
}