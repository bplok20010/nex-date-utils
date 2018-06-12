module.exports = function isDate(obj) {
    return toString.call(obj) == '[object Date]';
};