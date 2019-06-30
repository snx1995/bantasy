// resolve uploaded static files
const fs = require("fs");
const logger = require("../../logger");

const TAG = "static";

const Static = {
    storeResource(files, callback) {
        if (files && files instanceof Array) {
            let finish = 0;
            let errors = [];
            files.forEach((f, i) => {
                fs.readFile(f.path, (err, data) => {
                    if (err) {
                        finish ++;
                        logger.error(TAG, `error while read static file ${f.path} -> ${err}`);
                        errors.push(err);
                        finishReq();
                        return;
                    }
                    
                    const type = f.originalname.substring(f.originalname.lastIndexOf('.') + 1);
                    // const path = `./web/resource/${Buffer.from(new Date().getTime() + "-" + i + "-" + f.originalname).toString("hex")}.${type}`;
                    const path = `./web/resource/${f.path.substring(4)}.${type}`;
                    fs.writeFile(path, data, err => {
                        finish ++;
                        if (err) {
                            logger.error(TAG, `error while write static file ${path} -> ${err}`);
                            errors.push(err);
                        }
                        finishReq();
                    })
                })
            })

            function finishReq() {
                if (typeof callback == "function" && finish == files.length) {
                    if (errors.length == 0) callback();
                    else callback(errors);
                }
            }
        }
    }
}

module.exports = Static;