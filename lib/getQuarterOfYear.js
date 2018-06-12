module.exports = function getQuarterOfYear(date) {
    return Math.ceil((date.getMonth() + 1) / 3);
};