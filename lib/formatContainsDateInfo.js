var defs = require("./defines");

module.exports = function formatContainsDateInfo(format) {
    return defs.dateInfoRe.test(format.replace(defs.stripEscapeRe, ''));
};