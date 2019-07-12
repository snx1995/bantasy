const MongoClient = require("mongodb").MongoClient;
const logger = require("../logger");


const MongoDB = new MongoClient(config.mongo.url, {useNewUrlParser: true});
const TAG = "mongo";
const cols = {}

MongoDB.connect((err, db) => {
    logger.debug(TAG, "connecting to mongo");
    if (err) {
        logger.error(TAG, err.errmsg);
        return;
    }
    const d = db.db(config.mongo.db);
    logger.debug(TAG, "mongo connected");
    config.mongo.collections.forEach(e => cols[e] = d.collection(e))
});

const proxy = new Proxy({}, {
    get(target, property, receiver) {
        return function (col, ...args) {
            const collection = cols[col];
            if (!collection) {
                logger.error(TAG, "no collection named " + col);
                return;
            }
            return collection[property](...args);
        }
    },
    set() {

    }
})


module.exports = proxy;