const fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json").toString());
global.config = config;

module.exports = config;

