const dao = require("../system/dao");

const Test = {
    "/mongo": {
        method: "GET",
        handler(req, res) {
            dao.findOneAndUpdate("article_phase", {index: true}, {"$inc": {phase: 1}}, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                res.send({err, result});
            })
        }
    }
}

module.exports = Test;