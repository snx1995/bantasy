const md5 = require("md5");

const passwd = "banyqroot";

const EXPIRED = 1;
const INVALID = 2;
const MS_7_DAYS = 604800000;

function encode(id, type, expire) {
    const buffer = Buffer.from(`${id}.${type}.${new Date().getTime() + (expire ? expire : MS_7_DAYS)}`);
    const en64 = buffer.toString("base64");
    const enMd5 = md5(`${en64}.${passwd}`);
    return `${en64}.${enMd5}`;
}

function decode(token) {
    const [en64, enMd5] = token.split(".");

    console.log(Buffer.from(en64, "base64").toString());

    const now = new Date();
    if (md5(`${en64}.${passwd}`) != enMd5) return INVALID;
    const [id, type, expire] = Buffer.from(en64, "base64").toString().split(".");
    if (now.getTime() >= expire) return EXPIRED;    
    return {id, type};
}

const Token = {
    encode,
    decode,
    EXPIRED,
    INVALID
}

module.exports = Token;