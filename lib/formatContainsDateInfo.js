var defs = require("./_defines");

module.exports = function formatContainsDateInfo(format) {
    return defs.dateInfoRe.test(format.replace(defs.stripEscapeRe, ''));
};