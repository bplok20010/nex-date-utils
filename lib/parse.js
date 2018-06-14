var createParser = require("./createParser");

module.exports = function parse(input, format, strict) {

    return createParser(format)(input, strict);
};