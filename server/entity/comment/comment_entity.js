const Common = require("../common");

class CommentEntity extends Common {

    constructor (replyTo, content, userId) {
        super();
        this.replyTo = replyTo;
        this.content = content;
        this.userId = userId;
        this.date = new Date();
        this.replies = [];
    }
}

module.exports = CommentEntity;