const dao = require("../../system/dao");
const Result = require("../../system/result");
const User = require("../../entity/user/user_entity");

const Authority = {
    "/login": {
        method: "GET",
        handler: (req, res) => {
        
        }
    },
    "/register": {
        method: "GET",
        handler: (req, res) => {
            let {name, birth, addr, sex, signature} = req.query;
            if (!name) {
                res.send(Result.lackParam("name"));
                return;
            }
            const user = new User({name, birth, addr, sex, type: User.TYPE_ADMIN, signature});
            dao.insert("users", user, (err, result) => {
                if (err) {
                    res.send(Result.error());
                    return;
                }
                res.send(Result.success(result));
            })
        }
    },
    "/info": {
        method: "GET",
        handler: (req, res) => {
            const id = req.query.id;
            if (!id) {
                res.send(Result.lackParam("id"));
            } else {
                dao.find("users", {id}, (err, result) => {
                    if (err) {
                        res.send(Result.error());
                        return;
                    }
                    res.send(Result.success(result[0]));
                })
            }
        }
    }
}

module.exports = Authority;