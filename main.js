const Config = require("./config");
const dao = require("./server/system/dao");
const Comment = require("./server/entity/comment/comment_entity");
const express = require("express");
const logger = require("./logger");
const filter = require("./server/system/filters");

const TAG = "MAIN";
const app = express();

registerController("/auth", require("./server/controller/authority/authority"));
registerController("/", require("./server/controller/console"));

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
                    app.post(base + path, ctrller.handler);
                    break;
                default:
                    logger.error(TAG, `invalid controller method <${ctrller.method}> for path ${base + path}`)
            }
        }
    }
}