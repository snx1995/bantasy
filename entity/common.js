const ObjectId = require("bson").ObjectId;

class Common {
    constructor () {
        this._id = new ObjectId();
        this.id = this._id.toHexString();
    }
}
module.exports = Common;