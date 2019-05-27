const fs = require("fs");
const save = config.logger.save_to_file;

Date.prototype.format = function () {
    const y = this.getFullYear();
    const M = this.getMonth() + 1;
    const d = this.getDate();
    const h = this.getHours();
    const m = this.getMinutes();
    const s = this.getSeconds();

    return `${y}-${M}-${d} ${h}:${m}:${s}`;
}

const logger = {
    debug (flag, msg) {
        const m = config.logger.format.replace("${date}", new Date().format())
                    .replace("${flag}", flag ? flag : "flag")
                    .replace("${message}", msg)
                    .replace("${tag}", "DEBUG");
        console.log(m);
        if (save) writeToFile(m + '\n');
    },
    error (flag, msg) {
        const m = config.logger.format.replace("${date}", new Date().format())
                    .replace("${flag}", flag ? flag : "flag")
                    .replace("${message}", msg)
                    .replace("${tag}", "ERROR");
        console.error(m);
        if (save) writeToFile(m + '\n');
    }
}
function writeToFile(msg) {
    fs.appendFile(config.logger.log_file, msg, () => {});
}

module.exports = logger;