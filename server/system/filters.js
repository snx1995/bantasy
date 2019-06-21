const logger = require("../../logger");

const TAG = "filter";

function filter(req, res, handler) {
    logger.debug(TAG, `received req for ${req.url}`);
    handler(req, res);
}

module.exports = filter;