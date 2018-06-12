module.exports = function pad(v, len, s) {
    var res = "" + v;
    s = s || '0';
    len = len || 2;
    for (; res.length < len; res = s + res) {}
    return res;
};