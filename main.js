const Config = require("./config");
const dao = require("./server/system/dao");
const Comment = require("./server/entity/comment/comment_entity");
const express = require("express");
const logger = require("./logger");
const filter = require("./server/system/filters");
const domain = require("domain")

const TAG = "MAIN";
const app = express();

process.on("uncaughtException", err => {
    logger.error(TAG, `uncaught error ${err}`);
})

registerController("/auth", require("./server/controller/authority/authority"));
registerController("/", require("./server/controller/console"));

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
                    app.get(base + path, (req, res) => {
                        const d = domain.create();
                        d.on("error", err => {
                            logger.error(TAG, `error while call ${path}: ${err}`)
                            res.send({code: -1, data: "error"})
                        })
                        d.run(ctrller.handler, [req, res]);
                    });
                    break;
                case "POST":
                    app.post(base + path, (req, res) => {
                        const d = domain.create();
                        d.on("error", err => {
                            logger.error(TAG, `error while call ${path}: ${err}`)
                            res.send({code: -1, data: "error"})
                        })
                        d.run(ctrller.handler, [req, res]);
                    });
                    break;
                default:
                    logger.error(TAG, `invalid controller method <${ctrller.method}> for path ${base + path}`)
            }
        }
    }
}