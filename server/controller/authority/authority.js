const dao = require("../../system/dao");
const Result = require("../../system/result");
const User = require("../../entity/user/user_entity");
const Token = require("../../system/token");

const Authority = {
    "/login": {
        method: "GET",
        handler(req, res) {
            const {account, passwd} = req.query;
            if (!account || !passwd) {
                res.send(Result.lackParam("account || passwd"));
                return;
            }
            dao.find("users", {id: account}, (err, result) => {
                if (err) {
                    res.send(Result.error());
                    return;
                }
                const pswd = result[0].passwd;
                if (pswd == passwd) {
                    const token = Token.encode(result[0].id, result[0].type);
                    res.send(Result.success(token));
                } else res.send(Result.forbidden("auth failed."));
            })
        }
    },
    "/register": {
        method: "GET",
        handler: (req, res) => {
            let {name, birth, addr, sex, signature, passwd} = req.query;
            if (!name || !passwd) {
                res.send(Result.lackParam("name || passwd"));
                return;
            }
            const user = new User({name, birth, addr, sex, type: User.TYPE_ADMIN, signature, passwd});
            dao.insert("users", user, (err, result) => {
                if (err) {
                    res.send(Result.error());
                    return;
                }
                res.send(Result.success(result.insertedId));
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