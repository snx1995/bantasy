const MongoClient = require("mongodb").MongoClient;
const logger = require("../../logger");


const MongoDB = new MongoClient(config.mongo.url, {useNewUrlParser: true});
const TAG = "mongo";
const cols = {}
let DB = {
    ready: false,
    queue: [],
    db: {},
    execOnReady(callback) {
        if (typeof callback == "function")  {
            if (!this.ready) {
                this.queue.push(callback);
                return;
            }
            callback();
        }
        else logger.error("mongo", "callback is not a function " + callback);
    },
    emitReady(db) {
        logger.debug(TAG, "mongo is ready");
        this.db = db;
        this.ready = true;
        this.queue.forEach(callback => {
            callback();
        })
    }
};

MongoDB.connect((err, db) => {
    logger.debug(TAG, "connecting to mongo");
    if (err) {
        logger.error(TAG, err.errmsg);
        return;
    }
    const d = db.db(config.mongo.db);
    logger.debug(TAG, "mongo connected");
    config.mongo.collections.forEach(e => cols[e] = d.collection(e))

    DB.emitReady(d);
});

const dao = {
    insert(col, data, callback) {
        DB.execOnReady(() => {
            const collection = cols[col];
            if (!collection) {
                logger.error(TAG, "no collection named " + col);
                return;
            }
            collection.insertOne(data, (err, result) => {
                if (err) {
                    logger.error(TAG, err.errmsg);
                    callback(err, null);
                    return;
                }
                if (typeof callback == "function") {
                    callback(null, result);
                }
            });
        })
    },
    inc(col, id, field, callback) {
        DB.execOnReady(() => {
            const collection = cols[col];
            if (!collection) {
                logger.error(TAG, "no collection named " + col);
                return;
            }
            collection.updateOne({id}, {"$inc": {[field]: 1}}, (err, result) => {
                if (err) {
                    logger.error(TAG, err.errmsg);
                    callback(err, null);
                    return;
                }
                if (typeof callback == "function") {
                    callback(null, result);
                }
            });
        })
    },
    dec(col, id, field, callback) {
        DB.execOnReady(() => {
            const collection = cols[col];
            if (!collection) {
                logger.error(TAG, "no collection named " + col);
                return;
            }
            collection.updateOne({id}, {"$inc": {[field]: -1}}, (err, result) => {
                if (err) {
                    logger.error(TAG, err.errmsg);
                    callback(err, null);
                    return;
                }
                if (typeof callback == "function") {
                    callback(null, result);
                }
            });
        })
    },
    delete(col, id, callback) {
        DB.execOnReady(() => {
            const collection = cols[col];
            if (!collection) {
                logger.error(TAG, "no collection named " + col);
                return;
            }
            collection.deleteOne({id}, (err, result) => {
                if (err) {
                    logger.error(TAG, err.errmsg);
                    callback(err, null);
                    return;
                }
                if (typeof callback == "function") {
                    callback(null, result);
                }
            });
        })
    },
    close() {
        DB.execOnReady(() => {
            MongoDB.close();
        })
    },
    find(col, query, callback) {
        DB.execOnReady(() => {
            const collection = cols[col];
            if (!collection) {
                logger.error(TAG, "no collection named " + col);
                return;
            }
            collection.find(query).toArray(callback);
        })
    },
    // findOne(col, query, callback) {
    //     DB.execOnReady(() => {
    //         const collection = cols[col];
    //         if (!collection) {
    //             logger.error(TAG, "no collection named " + col);
    //             return;
    //         }
    //         if (typeof callback == "function") callback(null, collection.findOne(query));
    //     })
    // }
}


module.exports = dao;