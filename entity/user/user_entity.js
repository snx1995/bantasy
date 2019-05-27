const Common = require("../common");

class User extends Common {
    constructor(user) {
        super();
        this.name = user.name;
        this.birth = user.birth;
        this.addr = user.addr;
        this.sex = user.sex;
        this.registerDate = new Date().format();
        this.type = user.type;
        this.signature = user.signature;
    }
}

User.TYPE_ADMIN = "admin";
User.TYPE_DEVELOPER = "developer";
User.TYPE_NORMAL = "normal";

module.exports = User;