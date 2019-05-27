const Config = require("./config");
const dao = require("./system/dao");
const Comment = require("./entity/comment/comment_entity");
const express = require("express");
const logger = require("./logger");

const AuthorityController = require("./controller/authority/authority");

const TAG = "MAIN";

const app = express();

registerController("/authority", AuthorityController);

app.listen(55088);

function registerController(base, controller) {
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
                    logger.error(TAG, `invalid controller method <${ctrller.method}>`)
            }
        }
    }
}