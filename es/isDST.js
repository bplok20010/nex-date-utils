export default function isDST(date) {
    // adapted from http://sencha.com/forum/showthread.php?p=247172#post247172
    // courtesy of @geoffrey.mcgill
    return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() != date.getTimezoneOffset();
}