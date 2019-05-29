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
        this.passwd = user.passwd;
    }
}

User.TYPE_ADMIN = 0;
User.TYPE_DEVELOPER = 1;
User.TYPE_NORMAL = 2;

module.exports = User;