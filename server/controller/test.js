const dao = require("../system/dao");

const Test = {
    "/mongo": {
        method: "GET",
        handler(req, res) {
            dao.findOne("articles", {index: true}, (err, result) => {
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